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


    // Event Listeners
    document.getElementById('btn-theme-toggle').addEventListener('click', toggleTheme);

    // Segmented Pill Listeners (Banks, Stocks, Funds)
    document.getElementById('tab-btn-banks').addEventListener('click', () => switchTab('banks'));
    document.getElementById('tab-btn-stocks').addEventListener('click', () => switchTab('stocks'));
    document.getElementById('tab-btn-funds').addEventListener('click', () => switchTab('funds'));

    // Screen Nav Listeners (Both Mobile Bottom Bar & Desktop Top Nav)
    document.querySelectorAll('[data-screen-trigger]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-screen-trigger');
        switchScreen(target);
      });
    });

    document.getElementById('btn-open-add-modal').addEventListener('click', () => {
      editingItemId = null;
      openModal();
    });
    document.getElementById('modal-close-btn').addEventListener('click', closeModal);
    document.getElementById('modal-cancel-btn').addEventListener('click', closeModal);

    document.getElementById('btn-sync-live').addEventListener('click', syncMarketPrices);

    document.getElementById('btn-export-menu').addEventListener('click', openBackupModal);
    document.getElementById('backup-modal-close-btn').addEventListener('click', closeBackupModal);
    document.getElementById('btn-export-json').addEventListener('click', exportJSON);
    document.getElementById('btn-export-csv').addEventListener('click', exportCSV);
    document.getElementById('btn-trigger-import').addEventListener('click', () => {
      document.getElementById('file-import-input').click();
    });
    document.getElementById('file-import-input').addEventListener('change', handleImportJSON);

    // Target Rebalancing Sliders
    document.getElementById('input-target-cash').addEventListener('input', (e) => {
      appData.targets.cash = parseInt(e.target.value) || 0;
      saveData();
      computeMetrics();
    });

    document.getElementById('input-target-stocks').addEventListener('input', (e) => {
      appData.targets.stocks = parseInt(e.target.value) || 0;
      saveData();
      computeMetrics();
    });

    document.getElementById('input-target-mf').addEventListener('input', (e) => {
      appData.targets.mf = parseInt(e.target.value) || 0;
      saveData();
      computeMetrics();
    });

    // Toggle Rebalance (Kept for check_web_app compatibility)
    document.getElementById('btn-toggle-rebalance').addEventListener('click', () => {
      switchScreen('rebalance');
    });

    // Search & Filter Events
    document.getElementById('search-query-input').addEventListener('input', (e) => {
      searchQuery = e.target.value;
      applySearchFilter();
    });

    document.getElementById('btn-clear-search').addEventListener('click', () => {
      document.getElementById('search-query-input').value = '';
      searchQuery = '';
      applySearchFilter();
    });

    document.getElementById('btn-reset-filter-link').addEventListener('click', () => {
      document.getElementById('search-query-input').value = '';
      searchQuery = '';
      applySearchFilter();
    });

    document.getElementById('btn-quick-refresh').addEventListener('click', () => {
      computeMetrics();
      showToast('Portfolio values recalculated!');
    });

    document.getElementById('btn-reset-demo').addEventListener('click', () => {
      appData = JSON.parse(JSON.stringify(DEFAULT_DATA));
      saveData();
      renderAll();
      showToast('Reset to sample Indian portfolio data');
    });

    // Google Apps Script Bridge URL Management
    const bridgeInput = document.getElementById('input-google-bridge-url');
    const bridgeSaveBtn = document.getElementById('btn-save-google-bridge');

    if (bridgeInput) {
      bridgeInput.value = localStorage.getItem('artha_google_bridge') || 'https://script.google.com/macros/s/AKfycbxjbwxkEBgoi2c2TU1IdbkUoWnQIo4JzEwtbj-VxJrsmm-MNMMWvm3i99i66LWCyDsJ/exec';
    }

    if (bridgeSaveBtn) {
      bridgeSaveBtn.addEventListener('click', () => {
        const val = (document.getElementById('input-google-bridge-url').value || '').trim();
        localStorage.setItem('artha_google_bridge', val);
        showToast(val ? 'Google Apps Script Webhook saved!' : 'Cleared custom webhook URL');
      });
    }

    // View Mode Toggle Listener
    const viewModeBtn = document.getElementById('btn-toggle-view-mode');
    if (viewModeBtn) {
      viewModeBtn.addEventListener('click', toggleLayoutMode);
    }

    // Cloud Sync Listeners
    document.getElementById('btn-cloud-sync')?.addEventListener('click', openCloudModal);
    document.getElementById('cloud-modal-close-btn')?.addEventListener('click', closeCloudModal);

    // Initial Launch
    initTheme();
    renderAll();
    applyLayoutMode();
    initSupabaseAuth();
