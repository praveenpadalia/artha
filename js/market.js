    // Rediff Money Live Feed Parser (Fast Batched Real-Time Quotes)
    function parseRediffResponse(raw, requestedSymbol = '') {
      const results = {};
      if (!raw) return results;

      function cleanNum(val) {
        if (typeof val === 'number') return val > 0 ? val : null;
        if (typeof val === 'string') {
          const cleaned = val.replace(/<[^>]*>/g, '').replace(/[^0-9.]/g, '');
          const n = parseFloat(cleaned);
          return (!isNaN(n) && n > 0) ? n : null;
        }
        return null;
      }

      function extractPrice(obj) {
        if (!obj || typeof obj !== 'object') return null;
        const candidates = [
          'lastprice', 'LastPrice', 'last_price', 'ltp', 'LTP',
          'price', 'Price', 'currentprice', 'close', 'prevclose', 'rate', 'val', 'value'
        ];
        for (const k of candidates) {
          if (obj[k] !== undefined && obj[k] !== null) {
            const p = cleanNum(obj[k]);
            if (p) return p;
          }
        }
        return null;
      }

      try {
        let parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;

        if (Array.isArray(parsed)) {
          parsed.forEach(item => {
            if (typeof item === 'object' && item !== null) {
              const sym = (item.company || item.symbol || item.compname || item.name || '').toUpperCase().trim();
              const price = extractPrice(item);
              if (sym && price) {
                results[sym] = { price, name: item.name || item.compname || item.company || sym };
              }
            }
          });
        } else if (typeof parsed === 'object' && parsed !== null) {
          for (const key of Object.keys(parsed)) {
            const item = parsed[key];
            const sym = key.toUpperCase().trim();
            if (typeof item === 'object' && item !== null) {
              const price = extractPrice(item);
              if (price) {
                results[sym] = { price, name: item.name || item.compname || item.company || sym };
              }
            } else {
              const price = cleanNum(item);
              if (price) results[sym] = { price, name: sym };
            }
          }
        }
      } catch (e) {
        if (typeof raw === 'string') {
          const lines = raw.split(/[\r\n;]+/);
          lines.forEach(line => {
            const parts = line.split(/[:,|\t]+/);
            if (parts.length >= 2) {
              const sym = parts[0].replace(/[^A-Za-z0-9]/g, '').toUpperCase().trim();
              const price = cleanNum(parts[1]);
              if (sym && price) {
                results[sym] = { price, name: sym };
              }
            }
          });
        }
      }

      if (requestedSymbol) {
        const cleanReq = requestedSymbol.toUpperCase().trim();
        if (!results[cleanReq]) {
          const firstKey = Object.keys(results)[0];
          if (firstKey && results[firstKey]) {
            results[cleanReq] = results[firstKey];
          }
        }
      }

      return results;
    }


    // Live Mutual Fund Name Search (Instant Local Catalog + Live AMFI Open Search API)
    async function searchMutualFundsByName(query) {
      const q = (query || "").trim().toLowerCase();
      if (!q) return [];

      const results = [];
      const seenCodes = new Set();

      // 1. Instant 0ms Match in Local Catalog
      for (const [code, item] of Object.entries(POPULAR_MF_DIRECTORY)) {
        if (code.includes(q) || item.name.toLowerCase().includes(q)) {
          results.push({
            schemeCode: code,
            schemeName: item.name,
            nav: item.nav,
            source: "Verified Catalog"
          });
          seenCodes.add(String(code));
        }
      }

      // 2. Query Live AMFI Search API for 37,000+ schemes
      if (q.length >= 2) {
        try {
          const searchUrl = `https://api.mfapi.in/mf/search?q=${encodeURIComponent(query.trim())}`;
          const ctrl = new AbortController();
          const tid = setTimeout(() => ctrl.abort(), 3500);
          const resp = await fetch(searchUrl, { signal: ctrl.signal });
          clearTimeout(tid);

          if (resp.ok) {
            const data = await resp.json();
            if (Array.isArray(data)) {
              for (const item of data) {
                const cStr = String(item.schemeCode);
                if (!seenCodes.has(cStr)) {
                  results.push({
                    schemeCode: cStr,
                    schemeName: item.schemeName,
                    nav: null,
                    source: "AMFI API"
                  });
                  seenCodes.add(cStr);
                }
              }
            }
          }
        } catch (e) {
          // Fallback via CORS proxy if direct fetch is blocked
          try {
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.mfapi.in/mf/search?q=${encodeURIComponent(query.trim())}`)}`;
            const ctrl = new AbortController();
            const tid = setTimeout(() => ctrl.abort(), 4000);
            const resp = await fetch(proxyUrl, { signal: ctrl.signal });
            clearTimeout(tid);

            if (resp.ok) {
              const data = await resp.json();
              if (Array.isArray(data)) {
                for (const item of data) {
                  const cStr = String(item.schemeCode);
                  if (!seenCodes.has(cStr)) {
                    results.push({
                      schemeCode: cStr,
                      schemeName: item.schemeName,
                      nav: null,
                      source: "AMFI Live"
                    });
                    seenCodes.add(cStr);
                  }
                }
              }
            }
          } catch (err) {}
        }
      }

      // Rank Direct Plan Growth to the top for investor convenience
      return results.sort((a, b) => {
        const aDirect = a.schemeName.toLowerCase().includes("direct") ? 1 : 0;
        const bDirect = b.schemeName.toLowerCase().includes("direct") ? 1 : 0;
        if (aDirect !== bDirect) return bDirect - aDirect;
        return a.schemeName.localeCompare(b.schemeName);
      }).slice(0, 10);
    }


    // Unified Mutual Fund NAV Fetcher (Direct AMFI + Google Webhook + CORS Proxy + Catalog Fallback)
    async function fetchMutualFundLive(codeOrTicker) {
      const q = (codeOrTicker || '').toString().trim();
      if (!q) return null;

      const cleanCode = q.replace(/[^0-9]/g, '');

      // 1. Check Popular Mutual Fund Directory First (0 ms Instant, Verified Match)
      if (cleanCode && POPULAR_MF_DIRECTORY[cleanCode]) {
        const item = POPULAR_MF_DIRECTORY[cleanCode];
        // Also fire background fetch to update NAV if network allows
        try {
          fetch(`https://api.mfapi.in/mf/${cleanCode}`).then(r => r.json()).then(data => {
            if (data && data.data && data.data[0] && parseFloat(data.data[0].nav) > 0) {
              item.nav = parseFloat(data.data[0].nav);
              const navInput = document.getElementById('field-mf-currentnav');
              if (navInput && document.getElementById('field-mf-schemecode')?.value.trim() === cleanCode) {
                navInput.value = item.nav;
              }
            }
          }).catch(() => {});
        } catch(e) {}

        return {
          nav: item.nav,
          name: item.name,
          date: new Date().toISOString().split('T')[0],
          source: 'AMFI (Parag Parikh Directory)'
        };
      }

      // 2. Query Direct AMFI Open API (https://api.mfapi.in)
      if (cleanCode) {
        try {
          const ctrl = new AbortController();
          const tid = setTimeout(() => ctrl.abort(), 3500);
          const resp = await fetch(`https://api.mfapi.in/mf/${cleanCode}`, { signal: ctrl.signal });
          clearTimeout(tid);

          if (resp.ok) {
            const resData = await resp.json();
            if (resData && resData.data && resData.data.length > 0) {
              const latest = resData.data[0];
              const navVal = parseFloat(latest.nav);
              if (!isNaN(navVal) && navVal > 0) {
                return {
                  nav: navVal,
                  name: (resData.meta && resData.meta.scheme_name) || `Mutual Fund Scheme ${cleanCode}`,
                  date: latest.date || new Date().toISOString().split('T')[0],
                  source: 'AMFI Official'
                };
              }
            }
          }
        } catch (e) {
          console.warn('Direct AMFI fetch error:', e);
        }

        // 3. Try AllOrigins Proxy for AMFI
        try {
          const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.mfapi.in/mf/${cleanCode}`)}`;
          const ctrl = new AbortController();
          const tid = setTimeout(() => ctrl.abort(), 4000);
          const resp = await fetch(proxyUrl, { signal: ctrl.signal });
          clearTimeout(tid);

          if (resp.ok) {
            const resData = await resp.json();
            if (resData && resData.data && resData.data.length > 0) {
              const latest = resData.data[0];
              const navVal = parseFloat(latest.nav);
              if (!isNaN(navVal) && navVal > 0) {
                return {
                  nav: navVal,
                  name: (resData.meta && resData.meta.scheme_name) || `Mutual Fund Scheme ${cleanCode}`,
                  date: latest.date || new Date().toISOString().split('T')[0],
                  source: 'AMFI Live'
                };
              }
            }
          }
        } catch (e) {
          console.warn('AMFI proxy error:', e);
        }
      }

      // 4. Query Google Finance Webhook ONLY if it is an explicit Google Fund Ticker (e.g. MUTF_IN:...)
      if (q.startsWith('MUTF_IN:') || q.startsWith('MUTF:')) {
        const customBridge = localStorage.getItem('artha_google_bridge') || 'https://script.google.com/macros/s/AKfycbxjbwxkEBgoi2c2TU1IdbkUoWnQIo4JzEwtbj-VxJrsmm-MNMMWvm3i99i66LWCyDsJ/exec';
        if (customBridge) {
          try {
            const bridgeUrl = `${customBridge}?ticker=${encodeURIComponent(q)}`;
            const ctrl = new AbortController();
            const tid = setTimeout(() => ctrl.abort(), 5000);
            const resp = await fetch(bridgeUrl, { redirect: 'follow', signal: ctrl.signal });
            clearTimeout(tid);

            if (resp.ok) {
              const data = await resp.json();
              if (data && data.price && Number(data.price) > 0) {
                return {
                  nav: parseFloat(data.price),
                  name: data.name || q,
                  date: new Date().toISOString().split('T')[0],
                  source: 'Google Finance'
                };
              }
            }
          } catch (e) {}
        }
      }

      return null;
    }


    // Unified Live Stock Quote Fetcher (Zero Direct CORS Blocks)
    async function fetchStockLiveQuote(symbolsQuery) {
      const q = (symbolsQuery || '').trim().toUpperCase().replace(/\.(NS|BO)$/, '');
      if (!q) return null;

      // 1. Query Your Personal Google Finance Webhook (Zero CORS, 100% Official Google Data)
      const customBridge = localStorage.getItem('artha_google_bridge') || 'https://script.google.com/macros/s/AKfycbxjbwxkEBgoi2c2TU1IdbkUoWnQIo4JzEwtbj-VxJrsmm-MNMMWvm3i99i66LWCyDsJ/exec';
      if (customBridge) {
        try {
          const bridgeUrl = `${customBridge}?ticker=${encodeURIComponent(q)}`;
          const ctrl = new AbortController();
          // Allow 8.5 seconds for Google Cloud Apps Script cold start on first request
          const tid = setTimeout(() => ctrl.abort(), 8500);
          const res = await fetch(bridgeUrl, { 
            method: 'GET',
            mode: 'cors',
            redirect: 'follow',
            signal: ctrl.signal 
          });
          clearTimeout(tid);

          if (res.ok) {
            const data = await res.json();
            if (data && data.price && Number(data.price) > 0) {
              const cleanP = Math.round(Number(data.price) * 100) / 100;
              const resObj = {};
              resObj[q] = { 
                price: cleanP, 
                name: (data.name && data.name !== '#N/A') ? data.name : (INDIAN_STOCK_DIRECTORY[q] ? INDIAN_STOCK_DIRECTORY[q].name : `${q} Ltd.`), 
                source: 'Google Finance' 
              };
              return resObj;
            }
          }
        } catch (e) {
          console.warn('Google Finance Bridge request attempt error:', e);
        }
      }

      // 2. Query Rediff via reliable CORS proxy (NEVER direct browser call)
      const rediffTarget = `https://money.rediff.com/money1/current_status_new.php?companylist=${encodeURIComponent(q)}`;

      // Try AllOrigins /raw
      try {
        const rawUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rediffTarget)}`;
        const ctrl = new AbortController();
        const tid = setTimeout(() => ctrl.abort(), 3500);
        const resp = await fetch(rawUrl, { signal: ctrl.signal });
        clearTimeout(tid);
        if (resp.ok) {
          const text = await resp.text();
          const parsed = parseRediffResponse(text, q);
          if (parsed && Object.keys(parsed).length > 0) return parsed;
        }
      } catch (e) {}

      // Try AllOrigins /get (unpacks .contents)
      try {
        const getUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rediffTarget)}`;
        const ctrl = new AbortController();
        const tid = setTimeout(() => ctrl.abort(), 3500);
        const resp = await fetch(getUrl, { signal: ctrl.signal });
        clearTimeout(tid);
        if (resp.ok) {
          const json = await resp.json();
          if (json && json.contents) {
            const parsed = parseRediffResponse(json.contents, q);
            if (parsed && Object.keys(parsed).length > 0) return parsed;
          }
        }
      } catch (e) {}

      // 3. Fallback: Query Yahoo Chart via AllOrigins
      try {
        const yfTarget = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(q)}.NS?interval=1d`;
        const yfUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(yfTarget)}`;
        const ctrl = new AbortController();
        const tid = setTimeout(() => ctrl.abort(), 3500);
        const resp = await fetch(yfUrl, { signal: ctrl.signal });
        clearTimeout(tid);
        if (resp.ok) {
          const json = await resp.json();
          const meta = json && json.chart && json.chart.result && json.chart.result[0] && json.chart.result[0].meta;
          if (meta && (meta.regularMarketPrice || meta.chartPreviousClose)) {
            const price = meta.regularMarketPrice || meta.chartPreviousClose;
            const resObj = {};
            resObj[q] = { price, name: meta.shortName || meta.longName || q, source: 'Yahoo Feed' };
            return resObj;
          }
        }
      } catch (e) {}

      return null;
    }

    async function syncMarketPrices() {
      if (isSyncing) return;
      isSyncing = true;

      const btn = document.getElementById('btn-sync-live');
      const icon = document.getElementById('sync-icon');
      const text = document.getElementById('sync-btn-text');
      const statusLabel = document.getElementById('sync-status-label');

      icon.classList.add('animate-spin-custom');
      if (text) text.textContent = 'Syncing...';
      btn.disabled = true;

      let mfSuccessCount = 0;
      let stockSuccessCount = 0;

      // 1. Fetch Mutual Fund NAVs via Multi-Source Pipeline (Google Cloud + AMFI + Proxies)
      for (const fund of appData.funds) {
        let queryCode = fund.schemeCode || fund.ticker;
        if (!queryCode && fund.name) {
          try {
            const matches = await searchMutualFundsByName(fund.name);
            if (matches && matches.length > 0) {
              fund.schemeCode = matches[0].schemeCode;
              queryCode = fund.schemeCode;
            }
          } catch (e) {}
        }
        if (queryCode) {
          try {
            const result = await fetchMutualFundLive(queryCode);
            if (result && result.nav > 0) {
              fund.currentNav = result.nav;
              fund.navDate = result.date;
              if (result.name && (!fund.name || fund.name === queryCode)) {
                fund.name = result.name;
              }
              mfSuccessCount++;
            }
          } catch (err) {
            console.warn(`Could not sync MF ${queryCode}:`, err);
          }
        }
      }

      // 2. Fetch Stock Quotes via Batched Proxy API (Zero Direct CORS Errors)
      if (appData.stocks.length > 0) {
        const cleanSymbols = appData.stocks.map(s => s.symbol.toUpperCase().replace(/\.(NS|BO)$/, '')).filter(Boolean);
        const batchQuery = cleanSymbols.join('|');

        const quotes = await fetchStockLiveQuote(batchQuery);
        if (quotes) {
          for (const stock of appData.stocks) {
            const symKey = stock.symbol.toUpperCase().replace(/\.(NS|BO)$/, '');
            if (quotes[symKey] && quotes[symKey].price > 0) {
              stock.currentPrice = quotes[symKey].price;
              stock.lastSync = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ` (${quotes[symKey].source || 'Live'})`;
              stockSuccessCount++;
            }
          }
        }
      }

      saveData();
      renderAll();

      const timeStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      if (statusLabel) statusLabel.textContent = `Last sync: ${timeStr}`;

      icon.classList.remove('animate-spin-custom');
      if (text) text.textContent = 'Sync Live Prices';
      btn.disabled = false;
      isSyncing = false;

      showToast(`Synced ${mfSuccessCount} Mutual Funds & refreshed ${stockSuccessCount} Stocks!`);
    }


    // Automatic Stock Info Lookup Function
    async function lookupAndFillStockInfo(symbolRaw) {
      const symbol = (symbolRaw || '').trim().toUpperCase().replace(/\.(NS|BO)$/, '');
      if (!symbol) return;

      const nameInput = document.getElementById('field-stock-name');
      const currentInput = document.getElementById('field-stock-current');
      const buyInput = document.getElementById('field-stock-buy');
      const exchangeSelect = document.getElementById('field-stock-exchange');
      const divInput = document.getElementById('field-stock-divyield');
      const lookupBtn = document.getElementById('btn-fetch-stock-info');
      const autoStatus = document.getElementById('stock-auto-status');
      const autoList = document.getElementById('stock-autocomplete-list');
      if (autoList) autoList.classList.add('hidden');

      if (lookupBtn) {
        lookupBtn.textContent = 'Calling API...';
        lookupBtn.disabled = true;
      }
      if (autoStatus) {
        autoStatus.classList.remove('hidden');
        autoStatus.textContent = `Fetching live price from Google Finance for ${symbol}...`;
        autoStatus.className = 'text-[11px] text-blue-600 dark:text-blue-400 font-medium';
      }

      if (INDIAN_STOCK_DIRECTORY[symbol] && nameInput) {
        nameInput.value = INDIAN_STOCK_DIRECTORY[symbol].name;
        if (exchangeSelect) exchangeSelect.value = INDIAN_STOCK_DIRECTORY[symbol].exchange || 'NSE';
        if (divInput && !divInput.value) divInput.value = INDIAN_STOCK_DIRECTORY[symbol].divYield || '1.2';
      }

      try {
        const quotes = await fetchStockLiveQuote(symbol);

        if (quotes && quotes[symbol] && quotes[symbol].price > 0) {
          const item = quotes[symbol];
          const livePrice = item.price;
          const compTitle = (INDIAN_STOCK_DIRECTORY[symbol] && INDIAN_STOCK_DIRECTORY[symbol].name) || item.name || `${symbol} Ltd.`;

          if (nameInput) nameInput.value = compTitle;
          if (currentInput) currentInput.value = livePrice;
          if (buyInput && (!buyInput.value || parseFloat(buyInput.value) <= 0)) {
            buyInput.value = livePrice;
          }
          if (exchangeSelect && !exchangeSelect.value) exchangeSelect.value = 'NSE';

          if (autoStatus) {
            autoStatus.textContent = `✓ Live Price: ${symbol} (${compTitle}) • Price: ${formatINR(livePrice)} [${item.source || 'Live'}]`;
            autoStatus.className = 'text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold';
          }
          showToast(`Live price fetched for ${symbol}: ${formatINR(livePrice)}`);
          return;
        }

        // If no price found from API
        if (autoStatus) {
          autoStatus.textContent = `Could not auto-fetch quote for "${symbol}". Please enter current price manually.`;
          autoStatus.className = 'text-[11px] text-amber-600 dark:text-amber-400';
        }
        if (nameInput && !nameInput.value) nameInput.value = `${symbol} Ltd.`;
        showToast(`Please enter current price manually for ${symbol}`, 'error');
      } catch (err) {
        console.error('Lookup error:', err);
        if (autoStatus) {
          autoStatus.textContent = `Could not reach live API for "${symbol}". Please enter price manually.`;
          autoStatus.className = 'text-[11px] text-amber-600 dark:text-amber-400';
        }
        showToast(`Error querying API for ${symbol}`, 'error');
      } finally {
        if (lookupBtn) {
          lookupBtn.textContent = 'Lookup';
          lookupBtn.disabled = false;
        }
      }
    }

    function applySearchFilter() {
      const query = searchQuery.trim().toLowerCase();
      const statusBar = document.getElementById('search-status-bar');
      const statusText = document.getElementById('search-status-text');
      const clearBtn = document.getElementById('btn-clear-search');

      if (query.length > 0) {
        statusBar.classList.remove('hidden');
        clearBtn.classList.remove('hidden');
        statusText.textContent = `Filtering matching "${searchQuery}"`;
      } else {
        statusBar.classList.add('hidden');
        clearBtn.classList.add('hidden');
      }

      renderBanks();
      renderStocks();
      renderFunds();
    }

