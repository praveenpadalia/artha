    // Formatters
    const formatINR = (val) => {
      const num = Number(val) || 0;
      return '₹' + num.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    };

    const showToast = (message, type = 'success') => {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = `px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold pointer-events-auto flex items-center justify-between gap-2 transition-all transform duration-200 ${
        type === 'success' ? 'bg-emerald-800 text-emerald-100' : 'bg-rose-800 text-rose-100'
      }`;
      toast.textContent = message;
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 250);
      }, 3000);
    };


    // Calculations & Metrics
    function computeMetrics() {
      const bankTotal = appData.banks.reduce((acc, b) => acc + (Number(b.balance) || 0), 0);

      const stocksInvested = appData.stocks.reduce((acc, s) => acc + (s.qty * s.buyPrice), 0);
      const stocksCurrent = appData.stocks.reduce((acc, s) => acc + (s.qty * s.currentPrice), 0);
      const stocksPnl = stocksCurrent - stocksInvested;
      const stocksPnlPct = stocksInvested > 0 ? (stocksPnl / stocksInvested) * 100 : 0;

      const mfInvested = appData.funds.reduce((acc, f) => acc + (f.units * f.buyNav), 0);
      const mfCurrent = appData.funds.reduce((acc, f) => acc + (f.units * f.currentNav), 0);
      const mfPnl = mfCurrent - mfInvested;
      const mfPnlPct = mfInvested > 0 ? (mfPnl / mfInvested) * 100 : 0;

      const netWorth = bankTotal + stocksCurrent + mfCurrent;

      // Update Top Hero Net Worth Card
      document.getElementById('stat-total-networth').textContent = formatINR(netWorth);
      document.getElementById('stat-bank-total').textContent = formatINR(bankTotal);
      document.getElementById('stat-bank-count').textContent = `${appData.banks.length} account${appData.banks.length === 1 ? '' : 's'}`;

      document.getElementById('stat-stocks-total').textContent = formatINR(stocksCurrent);
      document.getElementById('stat-stocks-pnl').innerHTML = `<span class="${stocksPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'} font-semibold">${stocksPnl >= 0 ? '+' : ''}${formatINR(stocksPnl)} (${stocksPnlPct.toFixed(1)}%)</span>`;

      document.getElementById('stat-mf-total').textContent = formatINR(mfCurrent);
      document.getElementById('stat-mf-pnl').innerHTML = `<span class="${mfPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'} font-semibold">${mfPnl >= 0 ? '+' : ''}${formatINR(mfPnl)} (${mfPnlPct.toFixed(1)}%)</span>`;

      // Update Proportional Distribution Mini-Bar
      const cashPct = netWorth > 0 ? (bankTotal / netWorth) * 100 : 33.3;
      const stocksPct = netWorth > 0 ? (stocksCurrent / netWorth) * 100 : 33.3;
      const mfPct = netWorth > 0 ? (mfCurrent / netWorth) * 100 : 33.4;

      document.getElementById('bar-cash').style.width = `${cashPct}%`;
      document.getElementById('bar-stocks').style.width = `${stocksPct}%`;
      document.getElementById('bar-mf').style.width = `${mfPct}%`;

      // Update Allocation Screen Breakdown Cards
      document.getElementById('alloc-cash-val').textContent = formatINR(bankTotal);
      document.getElementById('alloc-cash-pct').textContent = `${cashPct.toFixed(1)}% of portfolio`;

      document.getElementById('alloc-stocks-val').textContent = formatINR(stocksCurrent);
      document.getElementById('alloc-stocks-pct').textContent = `${stocksPct.toFixed(1)}% of portfolio`;

      document.getElementById('alloc-mf-val').textContent = formatINR(mfCurrent);
      document.getElementById('alloc-mf-pct').textContent = `${mfPct.toFixed(1)}% of portfolio`;

      // Passive Income & Yield Calculations
      const annualBankInterest = appData.banks.reduce((acc, b) => {
        const rate = Number(b.interestRate) || 0;
        return acc + (Number(b.balance) * (rate / 100));
      }, 0);

      const annualStockDividends = appData.stocks.reduce((acc, s) => {
        const currentVal = s.qty * s.currentPrice;
        const yld = Number(s.divYield) || 0;
        return acc + (currentVal * (yld / 100));
      }, 0);

      const totalAnnualPassive = annualBankInterest + annualStockDividends;
      const monthlyPassive = totalAnnualPassive / 12;
      const portfolioYield = netWorth > 0 ? (totalAnnualPassive / netWorth) * 100 : 0;

      document.getElementById('stat-passive-annual').textContent = `${formatINR(totalAnnualPassive)} / year`;
      document.getElementById('stat-passive-monthly').textContent = `(~${formatINR(monthlyPassive)} / month)`;
      document.getElementById('stat-interest-annual').textContent = `${formatINR(annualBankInterest)} / yr`;
      document.getElementById('stat-dividends-annual').textContent = `${formatINR(annualStockDividends)} / yr`;
      document.getElementById('stat-portfolio-yield').textContent = `${portfolioYield.toFixed(2)}%`;

      // Update Donut Chart
      updateAllocationChart(bankTotal, stocksCurrent, mfCurrent);

      // Update Rebalancing
      computeRebalancing(netWorth, bankTotal, stocksCurrent, mfCurrent);
    }

    function computeRebalancing(netWorth, currentCash, currentStocks, currentMf) {
      const targetCashPct = appData.targets.cash || 20;
      const targetStocksPct = appData.targets.stocks || 40;
      const targetMfPct = appData.targets.mf || 40;

      document.getElementById('rebal-cash-badge').textContent = `Target: ${targetCashPct}%`;
      document.getElementById('rebal-stocks-badge').textContent = `Target: ${targetStocksPct}%`;
      document.getElementById('rebal-mf-badge').textContent = `Target: ${targetMfPct}%`;

      document.getElementById('label-target-cash').textContent = `${targetCashPct}%`;
      document.getElementById('label-target-stocks').textContent = `${targetStocksPct}%`;
      document.getElementById('label-target-mf').textContent = `${targetMfPct}%`;

      document.getElementById('input-target-cash').value = targetCashPct;
      document.getElementById('input-target-stocks').value = targetStocksPct;
      document.getElementById('input-target-mf').value = targetMfPct;

      const sum = targetCashPct + targetStocksPct + targetMfPct;
      const sumBadge = document.getElementById('target-total-badge');
      if (sum === 100) {
        sumBadge.textContent = 'Target Sum: 100%';
        sumBadge.className = 'px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300';
      } else {
        sumBadge.textContent = `Target Sum: ${sum}% (Aim for 100%)`;
        sumBadge.className = 'px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300';
      }

      const targetCashVal = (netWorth * targetCashPct) / 100;
      const targetStocksVal = (netWorth * targetStocksPct) / 100;
      const targetMfVal = (netWorth * targetMfPct) / 100;

      renderRebalanceAction('action-cash-rebalance', targetCashVal - currentCash, 'Cash');
      renderRebalanceAction('action-stocks-rebalance', targetStocksVal - currentStocks, 'Stocks');
      renderRebalanceAction('action-mf-rebalance', targetMfVal - currentMf, 'Mutual Funds');
    }

    function renderRebalanceAction(elementId, diff, assetName) {
      const el = document.getElementById(elementId);
      if (!el) return;

      const absVal = Math.abs(diff);
      if (absVal < 1000) {
        el.innerHTML = `<span class="text-emerald-600 dark:text-emerald-400 font-semibold">✓ On Target</span> (Balanced)`;
      } else if (diff > 0) {
        el.innerHTML = `<span class="text-blue-600 dark:text-blue-400 font-semibold">+ Add ${formatINR(absVal)}</span> to hit target`;
      } else {
        el.innerHTML = `<span class="text-amber-700 dark:text-amber-400 font-semibold">Overweight by ${formatINR(absVal)}</span>`;
      }
    }

    function updateAllocationChart(cash, stocks, mf) {
      const ctx = document.getElementById('allocation-donut-chart');
      if (!ctx) return;

      const isDark = document.documentElement.classList.contains('dark');
      const borderColor = isDark ? '#0f172a' : '#ffffff';

      const total = cash + stocks + mf;
      const chartData = total > 0 ? [cash, stocks, mf] : [1, 0, 0];
      const chartColors = total > 0 ? ['#3b82f6', '#4f46e5', '#10b981'] : ['#e2e8f0', '#e2e8f0', '#e2e8f0'];

      if (donutChartInstance) {
        donutChartInstance.data.datasets[0].data = chartData;
        donutChartInstance.data.datasets[0].backgroundColor = chartColors;
        donutChartInstance.data.datasets[0].borderColor = borderColor;
        donutChartInstance.update();
      } else if (typeof Chart !== 'undefined') {
        donutChartInstance = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Bank Cash', 'Direct Stocks', 'Mutual Funds'],
            datasets: [{
              data: chartData,
              backgroundColor: chartColors,
              borderWidth: 2,
              borderColor: borderColor,
              hoverOffset: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '72%',
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const label = context.label || '';
                    const val = context.raw || 0;
                    const pct = total > 0 ? ((val / total) * 100).toFixed(1) : '0.0';
                    return ` ${label}: ${formatINR(val)} (${pct}%)`;
                  }
                }
              }
            }
          }
        });
      }
    }


    // Backup & Export Functions
    function openBackupModal() {
      document.getElementById('backup-modal-container').classList.remove('hidden');
    }

    function closeBackupModal() {
      document.getElementById('backup-modal-container').classList.add('hidden');
    }

    function exportJSON() {
      try {
        const jsonStr = JSON.stringify(appData, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `artha_backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('JSON backup downloaded!');
        closeBackupModal();
      } catch (err) {
        showToast('Export failed', 'error');
      }
    }

    function exportCSV() {
      try {
        let csv = 'Category,Identifier,Name,Details,Units/Quantity,Purchase Price,Current Price,Total Current Value,Total PnL,Yield/Interest Rate\n';

        appData.banks.forEach(b => {
          csv += `"Bank Cash","${escapeCsv(b.type)}","${escapeCsv(b.name)}","${b.tenure ? `FD Tenure: ${escapeCsv(b.tenure)} Ends: ${escapeCsv(b.endDate || "")}` : escapeCsv(b.type)}",1,"${b.balance}","${b.maturityAmount || b.balance}","${b.balance}",0,"${b.interestRate || 3.5}%"\n`;
        });

        appData.stocks.forEach(s => {
          const invested = s.qty * s.buyPrice;
          const current = s.qty * s.currentPrice;
          const pnl = current - invested;
          csv += `"Direct Stocks","${escapeCsv(s.symbol)}","${escapeCsv(s.name || s.symbol)}","${escapeCsv(s.exchange)}",${s.qty},${s.buyPrice},${s.currentPrice},${current},${pnl},"${s.divYield || 1.5}%"\n`;
        });

        appData.funds.forEach(f => {
          const invested = f.units * f.buyNav;
          const current = f.units * f.currentNav;
          const pnl = current - invested;
          csv += `"Mutual Funds","AMFI:${escapeCsv(f.schemeCode || 'N/A')}","${escapeCsv(f.name)}","AMFI Mutual Fund",${f.units},${f.buyNav},${f.currentNav},${current},${pnl},"Growth"\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `artha_portfolio_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('CSV spreadsheet downloaded!');
        closeBackupModal();
      } catch (err) {
        showToast('CSV export failed', 'error');
      }
    }

    function escapeCsv(str) {
      if (!str) return '';
      return String(str).replace(/"/g, '""');
    }

    function handleImportJSON(event) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target.result);
          if (parsed && (Array.isArray(parsed.banks) || Array.isArray(parsed.stocks) || Array.isArray(parsed.funds))) {
            appData = {
              banks: Array.isArray(parsed.banks) ? parsed.banks : [],
              stocks: Array.isArray(parsed.stocks) ? parsed.stocks : [],
              funds: Array.isArray(parsed.funds) ? parsed.funds : [],
              targets: parsed.targets || { cash: 20, stocks: 40, mf: 40 }
            };
            saveData();
            renderAll();
            showToast('Portfolio restored from backup!');
            closeBackupModal();
          } else {
            showToast('Invalid backup file structure', 'error');
          }
        } catch (err) {
          showToast('Error reading JSON file', 'error');
        }
      };
      reader.readAsText(file);
      event.target.value = '';
    }

