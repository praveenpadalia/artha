    // Formatters (Supports Clean ₹ XXX Masking in Privacy Mode)
    const formatINR = (val, forceReal = false) => {
      if (!forceReal && ((typeof appData !== 'undefined' && appData.settings?.privacyMode) || document.body.classList.contains('privacy-mode'))) {
        return '₹ XXX';
      }
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

      // Gold & Sovereign Gold Bonds (SGB)
      const goldInvested = (appData.gold || []).reduce((acc, g) => acc + ((Number(g.units) || 1) * (Number(g.buyPrice) || 0)), 0);
      const goldCurrent = (appData.gold || []).reduce((acc, g) => acc + ((Number(g.units) || 1) * (Number(g.currentPrice || g.buyPrice) || 0)), 0);
      const goldPnl = goldCurrent - goldInvested;
      const goldPnlPct = goldInvested > 0 ? (goldPnl / goldInvested) * 100 : 0;

      // Retirement (EPF / PPF / NPS)
      const retTotal = (appData.retirement || []).reduce((acc, r) => acc + (Number(r.balance) || 0), 0);

      // Unified Net Worth across all 5 asset classes
      const netWorth = bankTotal + stocksCurrent + mfCurrent + goldCurrent + retTotal;
      const totalInvested = bankTotal + stocksInvested + mfInvested + goldInvested + retTotal;
      const totalPnl = stocksPnl + mfPnl + goldPnl;
      const totalPnlPct = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;

      // Update Top Hero Net Worth Card
      const netWorthEl = document.getElementById('stat-total-networth');
      if (netWorthEl) {
        netWorthEl.textContent = formatINR(netWorth);
        netWorthEl.classList.add('money-val');
      }

      const bankTotalEl = document.getElementById('stat-bank-total');
      if (bankTotalEl) {
        bankTotalEl.textContent = formatINR(bankTotal);
        bankTotalEl.classList.add('money-val');
      }
      const bankCountEl = document.getElementById('stat-bank-count');
      if (bankCountEl) bankCountEl.textContent = `${appData.banks.length} account${appData.banks.length === 1 ? '' : 's'}`;

      const stocksTotalEl = document.getElementById('stat-stocks-total');
      if (stocksTotalEl) {
        stocksTotalEl.textContent = formatINR(stocksCurrent);
        stocksTotalEl.classList.add('money-val');
      }
      const stocksPnlEl = document.getElementById('stat-stocks-pnl');
      if (stocksPnlEl) {
        stocksPnlEl.innerHTML = `<span class="${stocksPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'} font-semibold money-val">${stocksPnl >= 0 ? '+' : ''}${formatINR(stocksPnl)} (${stocksPnlPct.toFixed(1)}%)</span>`;
      }

      const mfTotalEl = document.getElementById('stat-mf-total');
      if (mfTotalEl) {
        mfTotalEl.textContent = formatINR(mfCurrent);
        mfTotalEl.classList.add('money-val');
      }
      const mfPnlEl = document.getElementById('stat-mf-pnl');
      if (mfPnlEl) {
        mfPnlEl.innerHTML = `<span class="${mfPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'} font-semibold money-val">${mfPnl >= 0 ? '+' : ''}${formatINR(mfPnl)} (${mfPnlPct.toFixed(1)}%)</span>`;
      }

      // Update Gold & Retirement Stats if present
      const goldTotalEl = document.getElementById('stat-gold-total');
      if (goldTotalEl) {
        goldTotalEl.textContent = formatINR(goldCurrent);
        goldTotalEl.classList.add('money-val');
      }
      const goldPnlEl = document.getElementById('stat-gold-pnl');
      if (goldPnlEl) {
        goldPnlEl.innerHTML = `<span class="${goldPnl >= 0 ? 'text-amber-400' : 'text-rose-400'} font-semibold money-val">${goldPnl >= 0 ? '+' : ''}${formatINR(goldPnl)} (${goldPnlPct.toFixed(1)}%)</span>`;
      }

      const retTotalEl = document.getElementById('stat-ret-total');
      if (retTotalEl) {
        retTotalEl.textContent = formatINR(retTotal);
        retTotalEl.classList.add('money-val');
      }

      // Update Proportional Distribution Mini-Bar
      const cashPct = netWorth > 0 ? (bankTotal / netWorth) * 100 : 20;
      const stocksPct = netWorth > 0 ? (stocksCurrent / netWorth) * 100 : 30;
      const mfPct = netWorth > 0 ? (mfCurrent / netWorth) * 100 : 30;
      const goldPct = netWorth > 0 ? (goldCurrent / netWorth) * 100 : 10;
      const retPct = netWorth > 0 ? (retTotal / netWorth) * 100 : 10;

      const barCash = document.getElementById('bar-cash');
      const barStocks = document.getElementById('bar-stocks');
      const barMf = document.getElementById('bar-mf');
      const barGold = document.getElementById('bar-gold');
      const barRet = document.getElementById('bar-ret');

      if (barCash) barCash.style.width = `${cashPct}%`;
      if (barStocks) barStocks.style.width = `${stocksPct}%`;
      if (barMf) barMf.style.width = `${mfPct}%`;
      if (barGold) barGold.style.width = `${goldPct}%`;
      if (barRet) barRet.style.width = `${retPct}%`;

      // Update Allocation Screen Breakdown Cards
      const setAlloc = (idVal, idPct, val, pct) => {
        const vEl = document.getElementById(idVal);
        const pEl = document.getElementById(idPct);
        if (vEl) {
          vEl.textContent = formatINR(val);
          vEl.classList.add('money-val');
        }
        if (pEl) pEl.textContent = `${pct.toFixed(1)}% of portfolio`;
      };

      setAlloc('alloc-cash-val', 'alloc-cash-pct', bankTotal, cashPct);
      setAlloc('alloc-stocks-val', 'alloc-stocks-pct', stocksCurrent, stocksPct);
      setAlloc('alloc-mf-val', 'alloc-mf-pct', mfCurrent, mfPct);
      setAlloc('alloc-gold-val', 'alloc-gold-pct', goldCurrent, goldPct);
      setAlloc('alloc-ret-val', 'alloc-ret-pct', retTotal, retPct);

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

      const annualSgbInterest = (appData.gold || []).reduce((acc, g) => {
        const rate = Number(g.interestRate) || 0;
        const buyVal = (Number(g.units) || 1) * (Number(g.buyPrice) || 0);
        return acc + (buyVal * (rate / 100));
      }, 0);

      const annualRetInterest = (appData.retirement || []).reduce((acc, r) => {
        const rate = Number(r.interestRate) || 0;
        return acc + (Number(r.balance) * (rate / 100));
      }, 0);

      const totalAnnualPassive = annualBankInterest + annualStockDividends + annualSgbInterest + annualRetInterest;
      const monthlyPassive = totalAnnualPassive / 12;
      const portfolioYield = netWorth > 0 ? (totalAnnualPassive / netWorth) * 100 : 0;

      const setVal = (id, str) => {
        const el = document.getElementById(id);
        if (el) {
          el.textContent = str;
          el.classList.add('money-val');
        }
      };

      setVal('stat-passive-annual', `${formatINR(totalAnnualPassive)} / year`);
      const moEl = document.getElementById('stat-passive-monthly');
      if (moEl) moEl.textContent = `(~${formatINR(monthlyPassive)} / month)`;
      setVal('stat-interest-annual', `${formatINR(annualBankInterest + annualRetInterest)} / yr`);
      setVal('stat-dividends-annual', `${formatINR(annualStockDividends + annualSgbInterest)} / yr`);
      const yldEl = document.getElementById('stat-portfolio-yield');
      if (yldEl) yldEl.textContent = `${portfolioYield.toFixed(2)}%`;

      // Update Donut Chart
      updateAllocationChart(bankTotal, stocksCurrent, mfCurrent, goldCurrent, retTotal);

      // Update Rebalancing
      computeRebalancing(netWorth, bankTotal, stocksCurrent, mfCurrent, goldCurrent, retTotal);

      // Compute Health & Runway Insights
      computePortfolioHealth(netWorth, bankTotal, stocksCurrent, mfCurrent, goldCurrent, retTotal);

      // Compute Goal Tracking
      computeGoalTracking(netWorth);
    }

    function updateAllocationChart(cash, stocks, mf, gold = 0, ret = 0) {
      const total = cash + stocks + mf + gold + ret;
      const chartData = total > 0 ? [cash, stocks, mf, gold, ret] : [1, 0, 0, 0, 0];
      const ctx = document.getElementById('allocation-donut-chart')?.getContext('2d');
      if (!ctx) return;

      if (donutChartInstance) {
        donutChartInstance.data.datasets[0].data = chartData;
        donutChartInstance.update();
      } else {
        donutChartInstance = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Bank Cash', 'Direct Stocks', 'Mutual Funds', 'Gold & SGBs', 'Retirement (EPF/NPS)'],
            datasets: [{
              data: chartData,
              backgroundColor: ['#3b82f6', '#6366f1', '#10b981', '#f59e0b', '#8b5cf6'],
              borderWidth: 0,
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
                    const value = context.parsed || 0;
                    const pct = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                    return ` ${label}: ${formatINR(value)} (${pct}%)`;
                  }
                }
              }
            }
          }
        });
      }
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



    // Feature 1: Privacy Stealth Mode Toggle & Manager (Clean ₹ XXX Masking)
    function togglePrivacyMode() {
      const isPrivacy = !document.body.classList.contains('privacy-mode');
      if (!appData.settings) appData.settings = {};
      appData.settings.privacyMode = isPrivacy;
      applyPrivacyMode(isPrivacy);
      renderAll();
      saveData(false);
      showToast(isPrivacy ? 'Stealth Mode ON (Balances masked as ₹ XXX)' : 'Stealth Mode OFF (Balances visible)');
    }

    function applyPrivacyMode(enable) {
      const iconOn = document.getElementById('privacy-icon-on');
      const iconOff = document.getElementById('privacy-icon-off');
      const privacyBtn = document.getElementById('btn-toggle-privacy');

      if (enable) {
        document.body.classList.add('privacy-mode');
        if (iconOn) iconOn.classList.add('hidden');
        if (iconOff) iconOff.classList.remove('hidden');
        if (privacyBtn) privacyBtn.setAttribute('title', 'Disable Privacy Mode (Show Numbers)');
      } else {
        document.body.classList.remove('privacy-mode');
        if (iconOn) iconOn.classList.remove('hidden');
        if (iconOff) iconOff.classList.add('hidden');
        if (privacyBtn) privacyBtn.setAttribute('title', 'Enable Privacy Mode (Blur Numbers)');
      }
    }

    // Feature 6: Portfolio Health, Emergency Runway & Concentration Insights
    function computePortfolioHealth(netWorth, cash, stocks, mf, gold, ret) {
      const monthlyExp = (appData.settings && appData.settings.monthlyExpenses) || 60000;
      const runwayMonths = monthlyExp > 0 ? (cash / monthlyExp) : 0;

      // Update Runway badge
      const runwayValEl = document.getElementById('health-runway-months');
      const runwayDescEl = document.getElementById('health-runway-desc');
      if (runwayValEl) runwayValEl.textContent = `${runwayMonths.toFixed(1)} Months`;
      if (runwayDescEl) {
        if (runwayMonths >= 6) {
          runwayDescEl.textContent = 'Excellent safety buffer (6+ months)';
          runwayDescEl.className = 'text-[11px] font-semibold text-emerald-600 dark:text-emerald-400';
        } else if (runwayMonths >= 3) {
          runwayDescEl.textContent = 'Adequate buffer (Aim for 6 months)';
          runwayDescEl.className = 'text-[11px] font-semibold text-amber-600 dark:text-amber-400';
        } else {
          runwayDescEl.textContent = 'Low runway buffer (Under 3 months)';
          runwayDescEl.className = 'text-[11px] font-semibold text-rose-500';
        }
      }

      // Check Concentration Risk (highest stock or fund % of net worth)
      let maxItemName = '';
      let maxItemVal = 0;
      (appData.stocks || []).forEach(s => {
        const val = s.qty * s.currentPrice;
        if (val > maxItemVal) { maxItemVal = val; maxItemName = s.symbol || s.name; }
      });
      (appData.funds || []).forEach(f => {
        const val = f.units * f.currentNav;
        if (val > maxItemVal) { maxItemVal = val; maxItemName = f.name; }
      });

      const maxPct = netWorth > 0 ? (maxItemVal / netWorth) * 100 : 0;
      const concValEl = document.getElementById('health-concentration-val');
      const concDescEl = document.getElementById('health-concentration-desc');
      if (concValEl) concValEl.textContent = `${maxPct.toFixed(1)}% (${maxItemName || 'None'})`;
      if (concDescEl) {
        if (maxPct <= 15) {
          concDescEl.textContent = 'Well-diversified portfolio';
          concDescEl.className = 'text-[11px] font-semibold text-emerald-600 dark:text-emerald-400';
        } else if (maxPct <= 25) {
          concDescEl.textContent = 'Moderate concentration';
          concDescEl.className = 'text-[11px] font-semibold text-amber-600 dark:text-amber-400';
        } else {
          concDescEl.textContent = 'High concentration risk (>25%)';
          concDescEl.className = 'text-[11px] font-semibold text-rose-500';
        }
      }
    }

    // Feature 4: Financial Goal Tracker ("Artha Goals")
    function computeGoalTracking(netWorth) {
      const container = document.getElementById('goals-list-container');
      if (!container) return;

      const goals = appData.goals || [];
      if (goals.length === 0) {
        container.innerHTML = `
          <div class="text-center py-6 text-slate-400 text-xs">
            No financial milestones set. Click "+ Add Goal" to track your milestones.
          </div>
        `;
        return;
      }

      container.innerHTML = goals.map(g => {
        const target = Number(g.targetAmount) || 100000;
        // Allocate proportionally or based on net worth
        const currentAssigned = Math.min(target, netWorth * 0.4);
        const progressPct = Math.min(100, (currentAssigned / target) * 100);
        return `
          <div class="p-3.5 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">🎯</span>
                <div>
                  <div class="font-bold text-xs text-slate-900 dark:text-white">${escapeHtml(g.name)}</div>
                  <div class="text-[10px] text-slate-400">${escapeHtml(g.category || 'General')} • Target: ${escapeHtml(g.targetDate || '2030')}</div>
                </div>
              </div>
              <div class="text-right">
                <span class="font-bold text-xs text-slate-900 dark:text-white money-val">${formatINR(target)}</span>
                <div class="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">${progressPct.toFixed(0)}% Achieved</div>
              </div>
            </div>
            <div class="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300" style="width: ${progressPct}%"></div>
            </div>
          </div>
        `;
      }).join('');
    }
