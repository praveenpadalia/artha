// Handle Form Submit (Supports Add & Edit Updates)
    document.getElementById('active-entry-form').addEventListener('submit', (e) => {
      e.preventDefault();

      if (activeTab === 'banks') {
        const type = document.getElementById('field-bank-type').value;
        const name = document.getElementById('field-bank-name').value.trim();
        const rateInput = document.getElementById('field-bank-rate');
        const interestRate = parseFloat(rateInput.value) || 0;

        let balance = 0;
        let tenure = '';
        let endDate = '';
        let maturityAmount = 0;
        let monthlyDeposit = 0;

        if (type === 'Fixed Deposit (FD)') {
          const principal = parseFloat(document.getElementById('field-fd-principal').value) || 0;
          balance = principal;
          tenure = (document.getElementById('field-fd-tenure').value || '12 Months').trim();
          endDate = document.getElementById('field-fd-enddate').value || '';
          
          let years = 1;
          const tenureLower = tenure.toLowerCase();
          if (tenureLower.includes('month')) {
            years = (parseFloat(tenureLower) || 12) / 12;
          } else {
            years = parseFloat(tenureLower) || 1;
          }
          maturityAmount = principal * Math.pow(1 + (interestRate / 400), 4 * years);

        } else if (type === 'Recurring Deposit (RD)') {
          monthlyDeposit = parseFloat(document.getElementById('field-rd-monthly').value) || 0;
          const months = parseInt(document.getElementById('field-rd-months').value) || 12;
          tenure = `${months} Months`;
          endDate = document.getElementById('field-rd-enddate').value || '';
          balance = monthlyDeposit * months;

          let maturity = 0;
          for (let m = 1; m <= months; m++) {
            const monthsRemaining = months - m + 1;
            const quarters = monthsRemaining / 3;
            maturity += monthlyDeposit * Math.pow(1 + (interestRate / 400), quarters);
          }
          maturityAmount = maturity;

        } else {
          balance = parseFloat(document.getElementById('field-bank-balance').value) || 0;
          maturityAmount = balance;
        }

        if (editingItemId) {
          const existing = appData.banks.find(b => b.id === editingItemId);
          if (existing) {
            existing.name = name;
            existing.type = type;
            existing.balance = balance;
            existing.interestRate = interestRate;
            existing.tenure = tenure;
            existing.endDate = endDate;
            existing.monthlyDeposit = monthlyDeposit;
            existing.maturityAmount = Math.round(maturityAmount);
            showToast(`Updated ${name}!`);
          }
          editingItemId = null;
        } else {
          appData.banks.push({
            id: 'b_' + Date.now(),
            name,
            type,
            balance,
            interestRate,
            tenure,
            endDate,
            monthlyDeposit,
            maturityAmount: Math.round(maturityAmount)
          });
          showToast(`Added ${name}!`);
        }

      } else if (activeTab === 'stocks') {
        const symbol = document.getElementById('field-stock-symbol').value.trim().toUpperCase();
        const exchange = document.getElementById('field-stock-exchange').value;
        const name = document.getElementById('field-stock-name').value.trim() || symbol;
        const qty = parseFloat(document.getElementById('field-stock-qty').value) || 0;
        const buyPrice = parseFloat(document.getElementById('field-stock-buy').value) || 0;
        const currentPrice = parseFloat(document.getElementById('field-stock-current').value) || 0;
        const divInput = document.getElementById('field-stock-divyield');
        const divYield = divInput && divInput.value ? parseFloat(divInput.value) : 1.5;

        if (editingItemId) {
          const existing = appData.stocks.find(s => s.id === editingItemId);
          if (existing) {
            existing.symbol = symbol;
            existing.name = name;
            existing.exchange = exchange;
            existing.qty = qty;
            existing.buyPrice = buyPrice;
            existing.currentPrice = currentPrice;
            existing.divYield = divYield;
            showToast(`Updated ${symbol}!`);
          }
          editingItemId = null;
        } else {
          appData.stocks.push({
            id: 's_' + Date.now(),
            symbol,
            name,
            exchange,
            qty,
            buyPrice,
            currentPrice,
            divYield,
            lastSync: 'Manual'
          });
          showToast(`Added ${symbol} (${exchange})!`);
        }

      } else if (activeTab === 'funds') {
        const schemeCode = document.getElementById('field-mf-schemecode') ? document.getElementById('field-mf-schemecode').value.trim() : '';
        const name = document.getElementById('field-mf-name').value.trim();
        const units = parseFloat(document.getElementById('field-mf-units').value) || 0;
        const buyNav = parseFloat(document.getElementById('field-mf-buynav').value) || 0;
        const currentNav = parseFloat(document.getElementById('field-mf-currentnav').value) || 0;

        if (editingItemId) {
          const existing = appData.funds.find(f => f.id === editingItemId);
          if (existing) {
            existing.schemeCode = schemeCode;
            existing.name = name;
            existing.units = units;
            existing.buyNav = buyNav;
            existing.currentNav = currentNav;
            showToast(`Updated ${name}!`);
          }
          editingItemId = null;
        } else {
          appData.funds.push({
            id: 'f_' + Date.now(),
            schemeCode,
            name,
            units,
            buyNav,
            currentNav,
            navDate: 'Today'
          });
          showToast(`Added ${name}!`);
        }
      }

      saveData();
      renderAll();
      closeModal();
    });

    // Delegated Action Listeners (Edit & Delete)
    function attachDeleteListeners(elementId, filterKey) {
      const container = document.getElementById(elementId);
      if (!container) return;
      container.addEventListener('click', (e) => {
        // Delete Handler
        const delBtn = e.target.closest(`[data-delete-${filterKey}]`);
        if (delBtn) {
          const id = delBtn.getAttribute(`data-delete-${filterKey}`);
          if (filterKey === 'bank') appData.banks = appData.banks.filter(b => b.id !== id);
          if (filterKey === 'stock') appData.stocks = appData.stocks.filter(s => s.id !== id);
          if (filterKey === 'fund') appData.funds = appData.funds.filter(f => f.id !== id);
          saveData();
          renderAll();
          showToast('Item removed');
          return;
        }

        // Edit Handler
        const editBtn = e.target.closest(`[data-edit-${filterKey}]`);
        if (editBtn) {
          const id = editBtn.getAttribute(`data-edit-${filterKey}`);
          const tabMap = { bank: 'banks', stock: 'stocks', fund: 'funds' };
          openEditModal(tabMap[filterKey], id);
          return;
        }
      });
    }

    attachDeleteListeners('bank-table-body', 'bank');
    attachDeleteListeners('bank-card-container', 'bank');
    attachDeleteListeners('stocks-table-body', 'stock');
    attachDeleteListeners('stocks-card-container', 'stock');
    attachDeleteListeners('mf-table-body', 'fund');
    attachDeleteListeners('mf-card-container', 'fund');


    // Market Screen Tab & Cap Listeners
    const moverTabIds = [
      { id: 'tab-mover-gainers', key: 'gainers' },
      { id: 'tab-mover-losers', key: 'losers' },
      { id: 'tab-mover-volume', key: 'volume' },
      { id: 'tab-mover-52whigh', key: 'high52' }
    ];

    moverTabIds.forEach(tab => {
      document.getElementById(tab.id)?.addEventListener('click', () => {
        currentMoverTab = tab.key;
        moverTabIds.forEach(t => {
          const el = document.getElementById(t.id);
          if (el) {
            if (t.key === currentMoverTab) {
              el.className = 'mover-tab-btn active px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 transition-colors flex items-center gap-1.5 shrink-0';
            } else {
              el.className = 'mover-tab-btn px-3.5 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 shrink-0';
            }
          }
        });
        renderMoversGrid();
      });
    });

    const capBtns = [
      { id: 'cap-filter-all', key: 'all' },
      { id: 'cap-filter-large', key: 'large' },
      { id: 'cap-filter-mid', key: 'mid' }
    ];

    capBtns.forEach(cap => {
      document.getElementById(cap.id)?.addEventListener('click', () => {
        currentCapFilter = cap.key;
        capBtns.forEach(c => {
          const el = document.getElementById(c.id);
          if (el) {
            if (c.key === currentCapFilter) {
              el.className = 'cap-filter-btn active px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs transition-all';
            } else {
              el.className = 'cap-filter-btn px-2.5 py-1 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all';
            }
          }
        });
        renderMoversGrid();
      });
    });

    document.getElementById('btn-refresh-market-data')?.addEventListener('click', () => {
      renderMarketScreen();
      showToast('✓ Refreshed market feeds from Indian exchanges!');
    });

    // Initial Launch
    initTheme();
    renderAll();
    applyLayoutMode();
    initSupabaseAuth();
