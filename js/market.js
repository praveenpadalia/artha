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


    // Smart Multi-Token & Partial Mutual Fund Search (e.g. "motilal midcap" matches "Motilal Oswal Midcap Direct Growth")
    async function searchMutualFundsByName(query) {
      const qRaw = (query || "").trim();
      if (!qRaw) return [];

      const q = qRaw.toLowerCase();
      const tokens = q.split(/[\s,.-]+/).filter(t => t.length > 0);
      if (tokens.length === 0) return [];

      const results = [];
      const seenCodes = new Set();

      // 1. Instant Match in Local Directory with Smart Token Scoring
      for (const [code, item] of Object.entries(POPULAR_MF_DIRECTORY)) {
        const nameLower = (item.name || '').toLowerCase();
        const codeStr = String(code);
        const combinedTarget = `${codeStr} ${nameLower}`;

        // Exact AMFI code match
        if (codeStr === q) {
          results.push({
            schemeCode: codeStr,
            schemeName: item.name,
            nav: item.nav,
            source: "Verified Catalog",
            score: 200
          });
          seenCodes.add(codeStr);
          continue;
        }

        // Count how many user tokens match
        const matchedTokens = tokens.filter(t => combinedTarget.includes(t));
        if (matchedTokens.length > 0) {
          const matchRatio = matchedTokens.length / tokens.length;
          
          // Require at least matching all tokens OR at least 2 primary tokens if long query
          if (matchRatio >= 0.75 || (tokens.length >= 2 && matchedTokens.length >= 2)) {
            let score = matchRatio * 100;
            if (nameLower.startsWith(tokens[0])) score += 30;
            if (nameLower.includes('direct')) score += 20;
            if (nameLower.includes('growth')) score += 10;

            results.push({
              schemeCode: codeStr,
              schemeName: item.name,
              nav: item.nav,
              source: "Verified Catalog",
              score: score
            });
            seenCodes.add(codeStr);
          }
        }
      }

      // 2. Query Live AMFI Search API for 37,000+ schemes
      // If user typed multi-word like "motilal midcap", use the most distinctive token (e.g. "motilal") for API query
      if (tokens.length > 0 && tokens[0].length >= 2) {
        const primaryApiToken = tokens[0];
        try {
          const searchUrl = `https://api.mfapi.in/mf/search?q=${encodeURIComponent(primaryApiToken)}`;
          const ctrl = new AbortController();
          const tid = setTimeout(() => ctrl.abort(), 3500);
          const resp = await fetch(searchUrl, { signal: ctrl.signal });
          clearTimeout(tid);

          if (resp.ok) {
            const data = await resp.json();
            if (Array.isArray(data)) {
              for (const item of data) {
                const cStr = String(item.schemeCode);
                if (seenCodes.has(cStr)) continue;

                const nameLower = (item.schemeName || '').toLowerCase();
                const combined = `${cStr} ${nameLower}`;
                const matched = tokens.filter(t => combined.includes(t));

                if (matched.length / tokens.length >= 0.75 || (tokens.length >= 2 && matched.length >= 2)) {
                  let score = (matched.length / tokens.length) * 80;
                  if (nameLower.startsWith(primaryApiToken)) score += 25;
                  if (nameLower.includes('direct')) score += 20;
                  if (nameLower.includes('growth')) score += 10;

                  results.push({
                    schemeCode: cStr,
                    schemeName: item.schemeName,
                    nav: null,
                    source: "AMFI API",
                    score: score
                  });
                  seenCodes.add(cStr);
                }
              }
            }
          }
        } catch (e) {
          // Fallback via CORS proxy if direct fetch is blocked
          try {
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.mfapi.in/mf/search?q=${encodeURIComponent(primaryApiToken)}`)}`;
            const ctrl = new AbortController();
            const tid = setTimeout(() => ctrl.abort(), 4000);
            const resp = await fetch(proxyUrl, { signal: ctrl.signal });
            clearTimeout(tid);

            if (resp.ok) {
              const data = await resp.json();
              if (Array.isArray(data)) {
                for (const item of data) {
                  const cStr = String(item.schemeCode);
                  if (seenCodes.has(cStr)) continue;

                  const nameLower = (item.schemeName || '').toLowerCase();
                  const combined = `${cStr} ${nameLower}`;
                  const matched = tokens.filter(t => combined.includes(t));

                  if (matched.length / tokens.length >= 0.75 || (tokens.length >= 2 && matched.length >= 2)) {
                    let score = (matched.length / tokens.length) * 70;
                    if (nameLower.includes('direct')) score += 20;
                    if (nameLower.includes('growth')) score += 10;

                    results.push({
                      schemeCode: cStr,
                      schemeName: item.schemeName,
                      nav: null,
                      source: "AMFI Live",
                      score: score
                    });
                    seenCodes.add(cStr);
                  }
                }
              }
            }
          } catch (err) {}
        }
      }

      // Sort by relevance score (highest score first)
      return results.sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 12);
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
    async function fetchStockLiveQuote(symbolsQuery, preferredExchange = 'NSE') {
      const rawQ = (symbolsQuery || '').trim().toUpperCase();
      if (!rawQ) return null;

      const isExplicitBse = rawQ.endsWith('.BO') || preferredExchange === 'BSE';
      const cleanSym = rawQ.replace(/\.(NS|BO)$/, '');
      const exchange = isExplicitBse ? 'BSE' : ((INDIAN_STOCK_DIRECTORY[cleanSym] && INDIAN_STOCK_DIRECTORY[cleanSym].exchange) || preferredExchange || 'NSE');

      // 1. Query Personal Google Finance Webhook
      const customBridge = localStorage.getItem('artha_google_bridge') || 'https://script.google.com/macros/s/AKfycbxjbwxkEBgoi2c2TU1IdbkUoWnQIo4JzEwtbj-VxJrsmm-MNMMWvm3i99i66LWCyDsJ/exec';
      if (customBridge) {
        // Build tickers to test in priority order based on exchange
        const tickersToTest = exchange === 'BSE' 
          ? [`BOM:${cleanSym}`, `BSE:${cleanSym}`, cleanSym, `NSE:${cleanSym}`]
          : [cleanSym, `NSE:${cleanSym}`, `BOM:${cleanSym}`, `BSE:${cleanSym}`];

        for (const t of tickersToTest) {
          try {
            const bridgeUrl = `${customBridge}?ticker=${encodeURIComponent(t)}`;
            const ctrl = new AbortController();
            const tid = setTimeout(() => ctrl.abort(), 4500);
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
                const detectedEx = t.startsWith('BOM') || t.startsWith('BSE') ? 'BSE' : 'NSE';
                resObj[cleanSym] = { 
                  price: cleanP, 
                  name: (data.name && data.name !== '#N/A') ? data.name : (INDIAN_STOCK_DIRECTORY[cleanSym] ? INDIAN_STOCK_DIRECTORY[cleanSym].name : `${cleanSym} Ltd.`), 
                  exchange: detectedEx,
                  source: `Google Finance (${detectedEx})` 
                };
                return resObj;
              }
            }
          } catch (e) {}
        }
      }

      // 2. Query Yahoo Finance via CORS Proxy (Supports both .NS and .BO with cross-exchange fallback)
      const yahooSuffixes = exchange === 'BSE' ? ['.BO', '.NS'] : ['.NS', '.BO'];
      for (const suffix of yahooSuffixes) {
        try {
          const yfTicker = `${cleanSym}${suffix}`;
          const yfTarget = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yfTicker)}?interval=1d`;
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
              const detectedExch = suffix === '.BO' ? 'BSE' : 'NSE';
              const resObj = {};
              resObj[cleanSym] = { 
                price: Math.round(price * 100) / 100, 
                name: meta.shortName || meta.longName || (INDIAN_STOCK_DIRECTORY[cleanSym] ? INDIAN_STOCK_DIRECTORY[cleanSym].name : `${cleanSym} Ltd.`), 
                exchange: detectedExch,
                source: `Live Feed (${detectedExch})` 
              };
              return resObj;
            }
          }
        } catch (e) {}
      }

      // 3. Query Rediff via reliable CORS proxy
      try {
        const rediffTarget = `https://money.rediff.com/money1/current_status_new.php?companylist=${encodeURIComponent(cleanSym)}`;
        const rawUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rediffTarget)}`;
        const ctrl = new AbortController();
        const tid = setTimeout(() => ctrl.abort(), 3500);
        const resp = await fetch(rawUrl, { signal: ctrl.signal });
        clearTimeout(tid);
        if (resp.ok) {
          const text = await resp.text();
          const parsed = parseRediffResponse(text, cleanSym);
          if (parsed && Object.keys(parsed).length > 0) return parsed;
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

    // Automatic Stock Info Lookup Function (Supports Symbol, Company Name & Partial Keywords)
    async function lookupAndFillStockInfo(symbolRaw) {
      const rawTerm = (symbolRaw || '').trim();
      if (!rawTerm) return;

      const stockSymbolInput = document.getElementById('field-stock-symbol');
      const nameInput = document.getElementById('field-stock-name');
      const currentInput = document.getElementById('field-stock-current');
      const buyInput = document.getElementById('field-stock-buy');
      const exchangeSelect = document.getElementById('field-stock-exchange');
      const divInput = document.getElementById('field-stock-divyield');
      const lookupBtn = document.getElementById('btn-fetch-stock-info');
      const autoStatus = document.getElementById('stock-auto-status');
      const autoList = document.getElementById('stock-autocomplete-list');

      let symbol = rawTerm.toUpperCase().replace(/\.(NS|BO)$/, '');

      // Smart Resolution: If term is not a direct ticker symbol, search the directory
      if (!INDIAN_STOCK_DIRECTORY[symbol]) {
        const candidates = searchIndianStocks(rawTerm);
        if (candidates.length === 1) {
          // Exactly 1 clear match: auto-select it!
          symbol = candidates[0][0];
          if (stockSymbolInput) stockSymbolInput.value = symbol;
        } else if (candidates.length > 1) {
          // Multiple candidate stocks found (e.g. for "POWER" -> POWERGRID, PFC, TATAPOWER)
          if (typeof renderAutocomplete === 'function') {
            renderAutocomplete(rawTerm);
          }
          if (autoStatus) {
            autoStatus.classList.remove('hidden');
            autoStatus.className = 'text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold';
            autoStatus.textContent = `Found ${candidates.length} stocks matching "${rawTerm}". Select your company from the dropdown below:`;
          }
          showToast(`Found ${candidates.length} stocks matching "${rawTerm}". Please select from dropdown.`);
          return;
        }
      }

      if (autoList) autoList.classList.add('hidden');

      if (lookupBtn) {
        lookupBtn.textContent = 'Calling API...';
        lookupBtn.disabled = true;
      }
      if (autoStatus) {
        autoStatus.classList.remove('hidden');
        autoStatus.textContent = `Fetching live price for ${symbol}...`;
        autoStatus.className = 'text-[11px] text-blue-600 dark:text-blue-400 font-medium';
      }

      if (INDIAN_STOCK_DIRECTORY[symbol] && nameInput) {
        nameInput.value = INDIAN_STOCK_DIRECTORY[symbol].name;
        if (exchangeSelect) exchangeSelect.value = INDIAN_STOCK_DIRECTORY[symbol].exchange || 'NSE';
        if (divInput && !divInput.value) divInput.value = INDIAN_STOCK_DIRECTORY[symbol].divYield || '1.2';
      }

      try {
        const chosenEx = (exchangeSelect && exchangeSelect.value) || (INDIAN_STOCK_DIRECTORY[symbol] && INDIAN_STOCK_DIRECTORY[symbol].exchange) || 'NSE';
        const quotes = await fetchStockLiveQuote(symbol, chosenEx);

        if (quotes && quotes[symbol] && quotes[symbol].price > 0) {
          const item = quotes[symbol];
          const livePrice = item.price;
          const compTitle = (INDIAN_STOCK_DIRECTORY[symbol] && INDIAN_STOCK_DIRECTORY[symbol].name) || item.name || `${symbol} Ltd.`;
          const activeEx = item.exchange || chosenEx;

          if (nameInput) nameInput.value = compTitle;
          if (currentInput) currentInput.value = livePrice;
          if (buyInput && (!buyInput.value || parseFloat(buyInput.value) <= 0)) {
            buyInput.value = livePrice;
          }
          if (exchangeSelect) exchangeSelect.value = activeEx;

          if (autoStatus) {
            autoStatus.textContent = `✓ Live Price: ${symbol} (${compTitle}) • Price: ${formatINR(livePrice)} [${item.source || activeEx}]`;
            autoStatus.className = 'text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold';
          }
          showToast(`Live price fetched for ${symbol}: ${formatINR(livePrice)} [${activeEx}]`);
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


    // Groww-Style Indian Share Market Live Feed & Data
    const MARKET_SCREEN_DATA = {
      indices: [
        { name: 'NIFTY 50', symbol: 'NIFTY', value: 24320.50, change: 135.20, changePct: 0.56, exchange: 'NSE' },
        { name: 'SENSEX', symbol: 'SENSEX', value: 79942.10, change: 415.80, changePct: 0.52, exchange: 'BSE' },
        { name: 'BANK NIFTY', symbol: 'BANKNIFTY', value: 51850.30, change: 310.40, changePct: 0.60, exchange: 'NSE' },
        { name: 'NIFTY IT', symbol: 'NIFTYIT', value: 41200.00, change: 280.15, changePct: 0.68, exchange: 'NSE' },
        { name: 'INDIA VIX', symbol: 'INDIAVIX', value: 14.25, change: -0.45, changePct: -3.06, exchange: 'NSE' }
      ],
      fiiDii: {
        date: 'Latest Session',
        fiiNet: -1850.40,
        diiNet: 2480.20
      },
      movers: {
        gainers: [
          { symbol: 'TRENT', name: 'Trent Ltd.', price: 3017.30, change: 155.60, changePct: 5.44, low: 2850.00, high: 3045.00, cap: 'large', exchange: 'NSE' },
          { symbol: 'ZYDUSLIFE', name: 'Zydus Lifesciences', price: 1245.50, change: 61.10, changePct: 5.16, low: 1180.00, high: 1255.00, cap: 'large', exchange: 'NSE' },
          { symbol: 'INDIGO', name: 'Interglobe Aviation', price: 4877.60, change: 202.60, changePct: 4.33, low: 4660.00, high: 4910.00, cap: 'large', exchange: 'NSE' },
          { symbol: 'WIPRO', name: 'Wipro Ltd.', price: 548.80, change: 22.40, changePct: 4.26, low: 524.00, high: 552.00, cap: 'large', exchange: 'NSE' },
          { symbol: 'SUZLON', name: 'Suzlon Energy Ltd.', price: 74.50, change: 3.10, changePct: 4.34, low: 71.00, high: 75.80, cap: 'mid', exchange: 'NSE' },
          { symbol: 'BEL', name: 'Bharat Electronics Ltd.', price: 312.40, change: 11.20, changePct: 3.72, low: 299.50, high: 315.00, cap: 'large', exchange: 'NSE' },
          { symbol: 'PERSISTENT', name: 'Persistent Systems', price: 5410.00, change: 185.00, changePct: 3.54, low: 5215.00, high: 5440.00, cap: 'mid', exchange: 'NSE' },
          { symbol: 'DIXON', name: 'Dixon Technologies', price: 14850.00, change: 490.00, changePct: 3.41, low: 14300.00, high: 14920.00, cap: 'mid', exchange: 'NSE' }
        ],
        losers: [
          { symbol: 'VBL', name: 'Varun Beverages', price: 592.00, change: -22.80, changePct: -3.71, low: 588.00, high: 618.00, cap: 'large', exchange: 'NSE' },
          { symbol: 'MUTHOOTFIN', name: 'Muthoot Finance', price: 2408.60, change: -88.50, changePct: -3.54, low: 2390.00, high: 2510.00, cap: 'large', exchange: 'NSE' },
          { symbol: 'MAZDOCK', name: 'Mazagon Dock Shipbuilders', price: 4705.30, change: -157.40, changePct: -3.24, low: 4680.00, high: 4890.00, cap: 'mid', exchange: 'NSE' },
          { symbol: 'SOLARINDS', name: 'Solar Industries India', price: 10800.00, change: -330.00, changePct: -2.96, low: 10720.00, high: 11150.00, cap: 'large', exchange: 'NSE' },
          { symbol: 'IRFC', name: 'Indian Railway Finance Corp', price: 153.30, change: -4.30, changePct: -2.73, low: 152.00, high: 158.50, cap: 'large', exchange: 'NSE' },
          { symbol: 'GODREJCP', name: 'Godrej Consumer Products', price: 1218.00, change: -29.00, changePct: -2.33, low: 1205.00, high: 1250.00, cap: 'large', exchange: 'NSE' },
          { symbol: 'IDEA', name: 'Vodafone Idea', price: 8.85, change: -0.25, changePct: -2.75, low: 8.70, high: 9.20, cap: 'mid', exchange: 'NSE' },
          { symbol: 'TATAPOWER', name: 'Tata Power Co Ltd.', price: 428.10, change: -8.90, changePct: -2.04, low: 425.00, high: 439.00, cap: 'large', exchange: 'NSE' }
        ],
        volume: [
          { symbol: 'ZOMATO', name: 'Eternal (Zomato)', price: 268.40, change: 8.20, changePct: 3.15, volume: '8.4 Cr shares', cap: 'large', exchange: 'NSE' },
          { symbol: 'SUZLON', name: 'Suzlon Energy Ltd.', price: 74.50, change: 3.10, changePct: 4.34, volume: '14.2 Cr shares', cap: 'mid', exchange: 'NSE' },
          { symbol: 'IDEA', name: 'Vodafone Idea', price: 8.85, change: -0.25, changePct: -2.75, volume: '22.8 Cr shares', cap: 'mid', exchange: 'NSE' },
          { symbol: 'TATASTEEL', name: 'Tata Steel Ltd.', price: 152.40, change: 1.85, changePct: 1.23, volume: '4.9 Cr shares', cap: 'large', exchange: 'NSE' },
          { symbol: 'YESBANK', name: 'Yes Bank Ltd.', price: 21.60, change: 0.35, changePct: 1.65, volume: '11.5 Cr shares', cap: 'mid', exchange: 'NSE' },
          { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.', price: 1748.20, change: 18.50, changePct: 1.07, volume: '2.1 Cr shares', cap: 'large', exchange: 'NSE' }
        ],
        high52: [
          { symbol: 'TRENT', name: 'Trent Ltd.', price: 3017.30, change: 155.60, changePct: 5.44, high52: 3045.00, cap: 'large', exchange: 'NSE' },
          { symbol: 'ZOMATO', name: 'Eternal (Zomato)', price: 268.40, change: 8.20, changePct: 3.15, high52: 272.50, cap: 'large', exchange: 'NSE' },
          { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', price: 1885.60, change: 21.40, changePct: 1.15, high52: 1910.00, cap: 'large', exchange: 'NSE' },
          { symbol: 'DIVISLAB', name: 'Divis Laboratories', price: 5880.00, change: 86.00, changePct: 1.48, high52: 5940.00, cap: 'large', exchange: 'NSE' },
          { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd.', price: 1715.00, change: 14.80, changePct: 0.87, high52: 1735.00, cap: 'large', exchange: 'NSE' },
          { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical', price: 1910.00, change: 24.50, changePct: 1.30, high52: 1928.00, cap: 'large', exchange: 'NSE' }
        ]
      },
      sectors: [
        { name: 'Nifty Auto', changePct: 1.42 },
        { name: 'Nifty IT', changePct: 1.15 },
        { name: 'Nifty Bank', changePct: 0.68 },
        { name: 'Nifty Metal', changePct: 0.90 },
        { name: 'Nifty Pharma', changePct: 0.55 },
        { name: 'Nifty FMCG', changePct: -0.32 },
        { name: 'Nifty Energy', changePct: -0.45 }
      ],
      news: [
        { source: 'Business Standard', time: 'Today', title: 'Q2 Corporate Earnings: Broad-based revenue growth beats analyst estimates across Auto & Banking majors.', tag: 'Earnings' },
        { source: 'The Economic Times', time: 'Today', title: 'FIIs turn net buyers in Indian equities while DII inflows hit record levels in October.', tag: 'Institutions' },
        { source: 'LiveMint', time: 'Today', title: 'RBI Monetary Policy: Focus remains on disinflation as domestic liquidity conditions ease.', tag: 'Economy' },
        { source: 'CNBC TV18', time: 'Today', title: 'Defence & Renewable PSUs see robust order book execution and capital goods revival.', tag: 'Sectors' }
      ]
    };

    let currentMoverTab = 'gainers';
    let currentCapFilter = 'all';

    function renderMarketScreen() {
      // 1. Render Indices
      const indicesContainer = document.getElementById('market-indices-container');
      if (indicesContainer) {
        indicesContainer.innerHTML = MARKET_SCREEN_DATA.indices.map(idx => {
          const isUp = idx.change >= 0;
          return `
            <div class="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">${escapeHtml(idx.name)}</span>
                <span class="text-[9px] font-semibold px-1.5 py-0.2 rounded ${idx.exchange === 'NSE' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300' : 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300'}">${idx.exchange}</span>
              </div>
              <div class="my-1.5 font-extrabold text-slate-900 dark:text-white text-base">
                ${Number(idx.value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div class="flex items-center gap-1 text-[11px] font-semibold ${isUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">
                <span>${isUp ? '▲ +' : '▼ '}${Number(idx.change).toFixed(2)}</span>
                <span>(${isUp ? '+' : ''}${Number(idx.changePct).toFixed(2)}%)</span>
              </div>
            </div>
          `;
        }).join('');
      }

      // 2. Render Sector Pills
      const sectorContainer = document.getElementById('sector-pills-container');
      if (sectorContainer) {
        sectorContainer.innerHTML = MARKET_SCREEN_DATA.sectors.map(sec => {
          const isUp = sec.changePct >= 0;
          return `
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold ${isUp ? 'bg-emerald-50/70 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300' : 'bg-rose-50/70 border-rose-200 dark:bg-rose-950/40 dark:border-rose-800 text-rose-800 dark:text-rose-300'}">
              <span>${escapeHtml(sec.name)}</span>
              <span class="font-mono text-[11px]">${isUp ? '+' : ''}${sec.changePct.toFixed(2)}%</span>
            </div>
          `;
        }).join('');
      }

      // 3. Render Movers Grid
      renderMoversGrid();

      // 4. Render News Highlights
      const newsContainer = document.getElementById('market-news-container');
      if (newsContainer) {
        newsContainer.innerHTML = MARKET_SCREEN_DATA.news.map(n => `
          <div class="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col justify-between">
            <div class="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">${escapeHtml(n.title)}</div>
            <div class="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <span class="text-emerald-600 dark:text-emerald-400 font-semibold">${escapeHtml(n.source)} • ${escapeHtml(n.time)}</span>
              <span class="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">${escapeHtml(n.tag)}</span>
            </div>
          </div>
        `).join('');
      }
    }

    function renderMoversGrid() {
      const grid = document.getElementById('market-movers-grid');
      if (!grid) return;

      const rawItems = MARKET_SCREEN_DATA.movers[currentMoverTab] || [];
      const filtered = rawItems.filter(item => {
        if (currentCapFilter === 'all') return true;
        return item.cap === currentCapFilter;
      });

      if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-full py-8 text-center text-slate-400 text-xs">No stocks match the selected market cap.</div>`;
        return;
      }

      grid.innerHTML = filtered.map(stock => {
        const isUp = stock.change >= 0;
        return `
          <div class="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-emerald-500/50 transition-all group">
            <div>
              <div class="flex items-center justify-between gap-1">
                <span class="font-bold text-slate-900 dark:text-white text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">${escapeHtml(stock.symbol)}</span>
                <span class="px-1.5 py-0.2 rounded text-[9px] font-semibold ${stock.cap === 'large' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300' : 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300'}">${stock.cap === 'large' ? 'Large Cap' : 'Mid Cap'}</span>
              </div>
              <div class="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">${escapeHtml(stock.name)}</div>
            </div>

            <div class="my-2.5">
              <div class="text-base font-extrabold text-slate-900 dark:text-white">${formatINR(stock.price)}</div>
              <div class="flex items-center gap-1.5 mt-0.5 text-xs font-semibold ${isUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">
                <span>${isUp ? '+' : ''}${formatINR(stock.change)}</span>
                <span class="px-1 py-0.2 rounded ${isUp ? 'bg-emerald-50 dark:bg-emerald-950' : 'bg-rose-50 dark:bg-rose-950'}">
                  ${isUp ? '+' : ''}${stock.changePct.toFixed(2)}%
                </span>
              </div>
              ${stock.volume ? `<div class="text-[10px] text-slate-400 mt-1">Vol: ${escapeHtml(stock.volume)}</div>` : ''}
              ${stock.high52 ? `<div class="text-[10px] text-purple-600 dark:text-purple-400 font-medium mt-1">52W High: ${formatINR(stock.high52)}</div>` : ''}
            </div>

            <button type="button" data-market-add-symbol="${stock.symbol}" data-market-add-name="${escapeHtml(stock.name)}" data-market-add-price="${stock.price}" data-market-add-exch="${stock.exchange || 'NSE'}" class="w-full py-1.5 px-3 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-600 transition-colors flex items-center justify-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              <span>+ Add to Portfolio</span>
            </button>
          </div>
        `;
      }).join('');

      // Wire up '+ Add to Portfolio' buttons
      grid.querySelectorAll('[data-market-add-symbol]').forEach(btn => {
        btn.addEventListener('click', () => {
          const sym = btn.getAttribute('data-market-add-symbol');
          const nm = btn.getAttribute('data-market-add-name');
          const pr = parseFloat(btn.getAttribute('data-market-add-price')) || 0;
          const ex = btn.getAttribute('data-market-add-exch') || 'NSE';

          switchTab('stocks');
          editingItemId = null;
          openModal();

          setTimeout(() => {
            const symInp = document.getElementById('field-stock-symbol');
            const nmInp = document.getElementById('field-stock-name');
            const exInp = document.getElementById('field-stock-exchange');
            const currInp = document.getElementById('field-stock-current');
            const buyInp = document.getElementById('field-stock-buy');
            const qtyInp = document.getElementById('field-stock-qty');

            if (symInp) symInp.value = sym;
            if (nmInp) nmInp.value = nm;
            if (exInp) exInp.value = ex;
            if (currInp) currInp.value = pr;
            if (buyInp) buyInp.value = pr;
            if (qtyInp) qtyInp.focus();

            showToast(`Loaded ${sym} (${formatINR(pr)}). Enter quantity to save!`);
          }, 150);
        });
      });
    }

