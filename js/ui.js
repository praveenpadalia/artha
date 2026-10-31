    // Render Functions (Both Mobile Cards and Desktop Tables)
    function renderBanks() {
      const tbody = document.getElementById('bank-table-body');
      const cardContainer = document.getElementById('bank-card-container');
      const query = searchQuery.trim().toLowerCase();

      const filtered = appData.banks.filter(b => {
        if (!query) return true;
        return (b.name && b.name.toLowerCase().includes(query)) ||
               (b.type && b.type.toLowerCase().includes(query));
      });

      if (filtered.length === 0) {
        const emptyMsg = query ? 'No matching accounts or deposits found.' : 'No accounts added yet. Tap "+ Add Account" to start.';
        tbody.innerHTML = `<tr><td colspan="6" class="px-4 py-8 text-center text-slate-400 text-xs">${emptyMsg}</td></tr>`;
        cardContainer.innerHTML = `<div class="p-6 text-center text-slate-400 text-xs bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">${emptyMsg}</div>`;
        return;
      }

      // Desktop Table View
      tbody.innerHTML = filtered.map(bank => {
        const rate = Number(bank.interestRate) || 0;
        const isFd = (bank.type || '').includes('Fixed Deposit');
        const isRd = (bank.type || '').includes('Recurring Deposit');
        const annualInterest = (Number(bank.balance) * rate) / 100;
        const maturityVal = bank.maturityAmount || bank.balance;

        let badgeStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300';
        let badgeText = bank.type;
        if (isFd) {
          badgeStyle = 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold';
          badgeText = `FD (${bank.tenure || 'Lump Sum'})`;
        } else if (isRd) {
          badgeStyle = 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-bold';
          badgeText = `RD (${formatINR(bank.monthlyDeposit || 0)}/mo)`;
        }

        return `
          <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <td class="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100">
              <div class="flex items-center gap-2">
                <span>${escapeHtml(bank.name)}</span>
                ${isFd ? '<span class="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">FD</span>' : ''}
                ${isRd ? '<span class="px-1.5 py-0.2 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">RD</span>' : ''}
              </div>
              ${(isFd || isRd) && bank.endDate ? `<div class="text-[10px] text-slate-400 font-normal">Maturity: ${escapeHtml(bank.endDate)} • Tenure: ${escapeHtml(bank.tenure || 'N/A')}</div>` : ''}
            </td>
            <td class="px-4 py-3">
              <span class="px-2 py-0.5 rounded-full text-xs ${badgeStyle}">${escapeHtml(badgeText)}</span>
            </td>
            <td class="px-4 py-3 text-right text-xs font-medium text-slate-600 dark:text-slate-400">${rate.toFixed(1)}% p.a.</td>
            <td class="px-4 py-3 text-right text-xs">
              <div class="font-semibold text-emerald-600 dark:text-emerald-400">+${formatINR(annualInterest)}/yr</div>
              ${(isFd || isRd) && bank.maturityAmount ? `<div class="text-[10px] text-slate-400 font-normal">Matures: ${formatINR(maturityVal)}</div>` : ''}
            </td>
            <td class="px-4 py-3 text-right font-medium text-slate-900 dark:text-white">
              <div>${formatINR(bank.balance)}</div>
              ${isFd ? '<div class="text-[9px] text-slate-400 uppercase font-semibold">Principal</div>' : ''}
              ${isRd ? '<div class="text-[9px] text-slate-400 uppercase font-semibold">Total Target</div>' : ''}
            </td>
            <td class="px-4 py-3 text-right">
              <div class="flex items-center justify-end gap-1.5">
                <button type="button" data-edit-bank="${bank.id}" title="Edit Account" class="inline-flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-medium px-2 py-1 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                  <span>Edit</span>
                </button>
                <button type="button" data-delete-bank="${bank.id}" title="Delete Account" class="inline-flex items-center gap-1 text-xs text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 font-medium px-2 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  <span>Delete</span>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      // Mobile Card List (Distinct visual cards for Savings vs FD vs RD)
      cardContainer.innerHTML = filtered.map(bank => {
        const rate = Number(bank.interestRate) || 0;
        const isFd = (bank.type || '').includes('Fixed Deposit');
        const isRd = (bank.type || '').includes('Recurring Deposit');
        const annualInterest = (Number(bank.balance) * rate) / 100;
        const maturityVal = bank.maturityAmount || bank.balance;

        let icon = '🏦';
        let cardBorder = 'border-slate-200 dark:border-slate-800';
        let iconBg = 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400';
        let badgeHtml = '';

        if (isFd) {
          icon = '🔒';
          cardBorder = 'border-amber-200/80 dark:border-amber-900/40 bg-amber-50/20 dark:bg-amber-950/10';
          iconBg = 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300';
          badgeHtml = '<span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 shrink-0">FD</span>';
        } else if (isRd) {
          icon = '🔄';
          cardBorder = 'border-indigo-200/80 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-950/10';
          iconBg = 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300';
          badgeHtml = '<span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 shrink-0">RD</span>';
        }

        return `
          <div class="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border ${cardBorder} shadow-xs flex items-center justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center font-bold text-xs shrink-0">
                ${icon}
              </div>
              <div class="min-w-0 truncate">
                <div class="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5 truncate">
                  <span>${escapeHtml(bank.name)}</span>
                  ${badgeHtml}
                </div>
                <div class="flex items-center gap-1.5 mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                  <span>${isRd ? `${formatINR(bank.monthlyDeposit || 0)}/month` : escapeHtml(bank.type)}</span>
                  <span class="text-emerald-600 dark:text-emerald-400 font-semibold">• ${rate.toFixed(1)}% p.a.</span>
                </div>
                ${(isFd || isRd) && bank.endDate ? `
                  <div class="text-[10px] ${isFd ? 'text-amber-700 dark:text-amber-300' : 'text-indigo-700 dark:text-indigo-300'} font-medium mt-0.5">
                    Matures: ${escapeHtml(bank.endDate)} (${escapeHtml(bank.tenure || 'N/A')})
                  </div>
                ` : ''}
              </div>
            </div>
            <div class="text-right shrink-0">
              <div class="font-bold text-slate-900 dark:text-white text-sm">${formatINR(bank.balance)}</div>
              <div class="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                ${(isFd || isRd) && bank.maturityAmount ? `Matures: ${formatINR(maturityVal)}` : `+${formatINR(annualInterest)}/yr`}
              </div>
              <div class="mt-1 flex items-center justify-end gap-1">
                <button type="button" data-edit-bank="${bank.id}" title="Edit Account" class="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 p-1 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-colors">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                  <span>Edit</span>
                </button>
                <button type="button" data-delete-bank="${bank.id}" title="Delete Account" class="inline-flex items-center gap-0.5 text-[11px] text-rose-500 hover:text-rose-700 p-1 font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    function renderStocks() {
      const tbody = document.getElementById('stocks-table-body');
      const cardContainer = document.getElementById('stocks-card-container');
      const query = searchQuery.trim().toLowerCase();

      const filtered = appData.stocks.filter(s => {
        if (!query) return true;
        return (s.symbol && s.symbol.toLowerCase().includes(query)) ||
               (s.name && s.name.toLowerCase().includes(query)) ||
               (s.exchange && s.exchange.toLowerCase().includes(query));
      });

      if (filtered.length === 0) {
        const emptyMsg = query ? 'No matching stocks found.' : 'No stocks added yet. Tap "+ Add Stock" to start.';
        tbody.innerHTML = `<tr><td colspan="9" class="px-4 py-8 text-center text-slate-400 text-xs">${emptyMsg}</td></tr>`;
        cardContainer.innerHTML = `<div class="p-6 text-center text-slate-400 text-xs bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">${emptyMsg}</div>`;
        return;
      }

      // Desktop Table
      tbody.innerHTML = filtered.map(stock => {
        const invested = stock.qty * stock.buyPrice;
        const current = stock.qty * stock.currentPrice;
        const pnl = current - invested;
        const pnlPct = invested > 0 ? (pnl / invested) * 100 : 0;
        const isProfit = pnl >= 0;
        const yld = Number(stock.divYield) || 0;
        const annualDividend = (current * yld) / 100;

        return `
          <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <td class="px-4 py-3">
              <div class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                ${escapeHtml(stock.symbol)}
                <span class="w-1.5 h-1.5 rounded-full ${isProfit ? 'bg-emerald-500' : 'bg-rose-500'}"></span>
              </div>
              <div class="text-xs text-slate-500 dark:text-slate-400">${escapeHtml(stock.name || stock.symbol)}</div>
            </td>
            <td class="px-4 py-3">
              <span class="px-2 py-0.5 rounded text-xs font-semibold ${stock.exchange === 'NSE' ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300' : 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300'}">${escapeHtml(stock.exchange)}</span>
            </td>
            <td class="px-4 py-3 text-right font-medium dark:text-slate-200">${stock.qty}</td>
            <td class="px-4 py-3 text-right text-slate-500 dark:text-slate-400">${formatINR(stock.buyPrice)}</td>
            <td class="px-4 py-3 text-right font-semibold text-slate-900 dark:text-white">
              ${formatINR(stock.currentPrice)}
              <div class="text-[10px] text-slate-400 font-normal">Live Feed</div>
            </td>
            <td class="px-4 py-3 text-right">
              <div class="text-xs font-semibold text-emerald-600 dark:text-emerald-400">+${formatINR(annualDividend)}</div>
              <div class="text-[10px] text-slate-400">Yield: ${yld.toFixed(1)}%</div>
            </td>
            <td class="px-4 py-3 text-right font-bold text-slate-900 dark:text-white">${formatINR(current)}</td>
            <td class="px-4 py-3 text-right">
              <div class="font-semibold text-xs ${isProfit ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">
                ${isProfit ? '+' : ''}${formatINR(pnl)}
              </div>
              <div class="text-[11px] ${isProfit ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}">
                ${isProfit ? '+' : ''}${pnlPct.toFixed(2)}%
              </div>
            </td>
            <td class="px-4 py-3 text-right">
              <div class="flex items-center justify-end gap-1.5">
                <button type="button" data-edit-stock="${stock.id}" title="Edit Stock" class="inline-flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-medium px-2 py-1 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                  <span>Edit</span>
                </button>
                <button type="button" data-delete-stock="${stock.id}" title="Delete Stock" class="inline-flex items-center gap-1 text-xs text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 font-medium px-2 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  <span>Delete</span>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      // Mobile Card List (Fintech Mobile Pattern)
      cardContainer.innerHTML = filtered.map(stock => {
        const invested = stock.qty * stock.buyPrice;
        const current = stock.qty * stock.currentPrice;
        const pnl = current - invested;
        const pnlPct = invested > 0 ? (pnl / invested) * 100 : 0;
        const isProfit = pnl >= 0;

        return `
          <div class="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-3">
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-1.5">
                <span class="font-bold text-slate-900 dark:text-white text-sm">${escapeHtml(stock.symbol)}</span>
                <span class="px-1.5 py-0.2 rounded text-[9px] font-semibold ${stock.exchange === 'NSE' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300' : 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300'}">${escapeHtml(stock.exchange)}</span>
              </div>
              <div class="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">${escapeHtml(stock.name || stock.symbol)}</div>
              <div class="text-[10px] text-slate-400 mt-1">
                Qty: <strong class="text-slate-700 dark:text-slate-300">${stock.qty}</strong> • Avg: ${formatINR(stock.buyPrice)} • LTP: ${formatINR(stock.currentPrice)}
              </div>
            </div>
            <div class="text-right shrink-0">
              <div class="font-bold text-slate-900 dark:text-white text-sm">${formatINR(current)}</div>
              <div class="flex items-center justify-end gap-1.5 mt-0.5">
                <span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${isProfit ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400' : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'}">
                  ${isProfit ? '+' : ''}${formatINR(pnl)} (${pnlPct.toFixed(1)}%)
                </span>
              </div>
              <div class="mt-1 flex items-center justify-end gap-1">
                <button type="button" data-edit-stock="${stock.id}" title="Edit Stock" class="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 p-1 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-colors">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                  <span>Edit</span>
                </button>
                <button type="button" data-delete-stock="${stock.id}" title="Delete Stock" class="inline-flex items-center gap-0.5 text-[11px] text-rose-500 hover:text-rose-700 p-1 font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    function renderFunds() {
      const tbody = document.getElementById('mf-table-body');
      const cardContainer = document.getElementById('mf-card-container');
      const query = searchQuery.trim().toLowerCase();

      const filtered = appData.funds.filter(f => {
        if (!query) return true;
        return (f.name && f.name.toLowerCase().includes(query)) ||
               (f.schemeCode && f.schemeCode.includes(query));
      });

      if (filtered.length === 0) {
        const emptyMsg = query ? 'No matching mutual funds found.' : 'No mutual funds added yet. Tap "+ Add Mutual Fund" to start.';
        tbody.innerHTML = `<tr><td colspan="7" class="px-4 py-8 text-center text-slate-400 text-xs">${emptyMsg}</td></tr>`;
        cardContainer.innerHTML = `<div class="p-6 text-center text-slate-400 text-xs bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">${emptyMsg}</div>`;
        return;
      }

      // Desktop Table
      tbody.innerHTML = filtered.map(fund => {
        const invested = fund.units * fund.buyNav;
        const current = fund.units * fund.currentNav;
        const pnl = current - invested;
        const pnlPct = invested > 0 ? (pnl / invested) * 100 : 0;
        const isProfit = pnl >= 0;

        return `
          <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <td class="px-4 py-3">
              <div class="font-semibold text-slate-900 dark:text-white">${escapeHtml(fund.name)}</div>
              <div class="flex items-center gap-2 mt-0.5">
                <span class="text-[11px] font-mono text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-100 dark:border-emerald-900/50">
                  AMFI: ${escapeHtml(fund.schemeCode || 'Custom')}
                </span>
                <span class="text-[10px] text-slate-400">Date: ${escapeHtml(fund.navDate || 'Latest')}</span>
              </div>
            </td>
            <td class="px-4 py-3 text-right font-medium dark:text-slate-200">${Number(fund.units).toFixed(3)}</td>
            <td class="px-4 py-3 text-right text-slate-500 dark:text-slate-400">${formatINR(fund.buyNav)}</td>
            <td class="px-4 py-3 text-right font-semibold text-slate-900 dark:text-white">
              ${formatINR(fund.currentNav)}
              <div class="text-[10px] text-emerald-600 dark:text-emerald-400 font-normal">Official AMFI</div>
            </td>
            <td class="px-4 py-3 text-right font-bold text-slate-900 dark:text-white">${formatINR(current)}</td>
            <td class="px-4 py-3 text-right">
              <div class="font-semibold text-xs ${isProfit ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">
                ${isProfit ? '+' : ''}${formatINR(pnl)}
              </div>
              <div class="text-[11px] ${isProfit ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}">
                ${isProfit ? '+' : ''}${pnlPct.toFixed(2)}%
              </div>
            </td>
            <td class="px-4 py-3 text-right">
              <div class="flex items-center justify-end gap-1.5">
                <button type="button" data-edit-fund="${fund.id}" title="Edit Fund" class="inline-flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-medium px-2 py-1 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                  <span>Edit</span>
                </button>
                <button type="button" data-delete-fund="${fund.id}" title="Delete Fund" class="inline-flex items-center gap-1 text-xs text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 font-medium px-2 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  <span>Delete</span>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      // Mobile Card List
      cardContainer.innerHTML = filtered.map(fund => {
        const invested = fund.units * fund.buyNav;
        const current = fund.units * fund.currentNav;
        const pnl = current - invested;
        const pnlPct = invested > 0 ? (pnl / invested) * 100 : 0;
        const isProfit = pnl >= 0;

        return `
          <div class="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-3">
            <div class="min-w-0 flex-1">
              <div class="font-bold text-slate-900 dark:text-white text-xs sm:text-sm truncate">${escapeHtml(fund.name)}</div>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="text-[10px] font-mono text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-1 py-0.2 rounded">AMFI: ${escapeHtml(fund.schemeCode || 'Custom')}</span>
                <span class="text-[10px] text-slate-400">NAV: ${formatINR(fund.currentNav)}</span>
              </div>
              <div class="text-[10px] text-slate-400 mt-1">
                Units: <strong class="text-slate-700 dark:text-slate-300">${Number(fund.units).toFixed(2)}</strong> • Buy: ${formatINR(fund.buyNav)}
              </div>
            </div>
            <div class="text-right shrink-0">
              <div class="font-bold text-slate-900 dark:text-white text-sm">${formatINR(current)}</div>
              <div class="flex items-center justify-end gap-1.5 mt-0.5">
                <span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${isProfit ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400' : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'}">
                  ${isProfit ? '+' : ''}${formatINR(pnl)} (${pnlPct.toFixed(1)}%)
                </span>
              </div>
              <div class="mt-1 flex items-center justify-end gap-1">
                <button type="button" data-edit-fund="${fund.id}" title="Edit Fund" class="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 p-1 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-colors">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                  <span>Edit</span>
                </button>
                <button type="button" data-delete-fund="${fund.id}" title="Delete Fund" class="inline-flex items-center gap-0.5 text-[11px] text-rose-500 hover:text-rose-700 p-1 font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    function renderAll() {
      computeMetrics();
      renderBanks();
      renderStocks();
      renderFunds();
    }

    // Tab Navigation within Portfolio View
    function switchTab(tab) {
      activeTab = tab;
      
      const tabConfigs = {
        banks: { label: 'Add Account', title: 'Add Bank Account' },
        stocks: { label: 'Add Stock', title: 'Add Stock Holding' },
        funds: { label: 'Add Mutual Fund', title: 'Add Mutual Fund' }
      };

      document.getElementById('btn-add-label').textContent = tabConfigs[tab].label;

      document.querySelectorAll('.tab-trigger').forEach(btn => {
        btn.classList.remove('active', 'font-bold', 'text-emerald-800', 'dark:text-emerald-300', 'bg-white', 'dark:bg-slate-800', 'shadow-xs');
        btn.classList.add('font-medium', 'text-slate-600', 'dark:text-slate-400');
      });

      const activeBtn = document.getElementById(`tab-btn-${tab}`);
      if (activeBtn) {
        activeBtn.classList.add('active', 'font-bold', 'text-emerald-800', 'dark:text-emerald-300', 'bg-white', 'dark:bg-slate-800', 'shadow-xs');
        activeBtn.classList.remove('font-medium', 'text-slate-600', 'dark:text-slate-400');
      }

      document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.add('hidden'));
      const activePanel = document.getElementById(`tab-panel-${tab}`);
      if (activePanel) {
        activePanel.classList.remove('hidden');
      }
    }

    // Hybrid Architecture: Support BOTH (Full All-In-One Dashboard & Clean Mobile App)
    let layoutMode = localStorage.getItem('artha_layout_mode') || (window.innerWidth >= 1024 ? 'dashboard' : 'app');

    function applyLayoutMode() {
      const modeLabel = document.getElementById('view-mode-label');
      const bottomNav = document.querySelector('nav.sm\\:hidden, nav[class*="fixed bottom-0"]');
      const desktopNav = document.querySelector('header .border-t');

      if (layoutMode === 'dashboard') {
        // Show ALL screens simultaneously (Full all-in-one dashboard like on laptop)
        document.querySelectorAll('.screen-panel').forEach(p => p.classList.remove('hidden'));
        if (bottomNav) bottomNav.classList.add('hidden');
        if (modeLabel) modeLabel.textContent = 'Full Dashboard';
        showToast('Viewing Full Dashboard (All-in-One)');
      } else {
        // Tabbed Mobile-First App Mode (Zero endless scroll)
        switchScreen(currentScreen || 'portfolio', false);
        if (bottomNav) bottomNav.classList.remove('hidden');
        if (modeLabel) modeLabel.textContent = 'Mobile App Mode';
        showToast('Viewing Mobile App Mode (Tabbed)');
      }
    }

    function toggleLayoutMode() {
      layoutMode = (layoutMode === 'dashboard') ? 'app' : 'dashboard';
      localStorage.setItem('artha_layout_mode', layoutMode);
      applyLayoutMode();
    }

    function switchScreen(screenName, doScroll = true) {
      currentScreen = screenName;

      if (layoutMode === 'dashboard') {
        // In full dashboard mode, clicking nav smoothly scrolls to the section
        const targetSection = document.getElementById(`screen-${screenName}`);
        if (targetSection && doScroll) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // In app mode, display only the selected screen
        document.querySelectorAll('.screen-panel').forEach(p => p.classList.add('hidden'));
        const activeScreen = document.getElementById(`screen-${screenName}`);
        if (activeScreen) {
          activeScreen.classList.remove('hidden');
        }
        if (doScroll) window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      if (screenName === 'markets') {
        renderMarketScreen();
      }

      // Update Desktop Breadcrumb Title
      const breadcrumbEl = document.getElementById('desktop-breadcrumb');
      if (breadcrumbEl) {
        const titles = {
          portfolio: 'Portfolio Dashboard',
          markets: 'Share Market Today (Live Feeds)',
          allocation: 'Asset Allocation Breakdown',
          rebalance: 'Target Rebalancing Calculator',
          yield: 'Passive Income & Yield Projections'
        };
        breadcrumbEl.textContent = titles[screenName] || 'Dashboard';
      }

      // Update bottom nav active state
      document.querySelectorAll('.bottom-nav-btn').forEach(btn => {
        const isMatch = btn.getAttribute('data-screen-trigger') === screenName;
        if (isMatch) {
          btn.classList.add('active', 'text-emerald-600', 'dark:text-emerald-400', 'font-semibold');
          btn.classList.remove('text-slate-400', 'dark:text-slate-500');
        } else {
          btn.classList.remove('active', 'text-emerald-600', 'dark:text-emerald-400', 'font-semibold');
          btn.classList.add('text-slate-400', 'dark:text-slate-500');
        }
      });

      // Update desktop sidebar nav buttons & icons
      document.querySelectorAll('.screen-nav-btn').forEach(btn => {
        const isMatch = btn.getAttribute('data-screen-trigger') === screenName;
        const icon = btn.querySelector('svg');
        if (isMatch) {
          btn.classList.add('active', 'font-semibold', 'text-emerald-700', 'dark:text-emerald-400', 'bg-emerald-50', 'dark:bg-emerald-950/60');
          btn.classList.remove('text-slate-600', 'dark:text-slate-400');
          if (icon) {
            icon.classList.add('text-emerald-600', 'dark:text-emerald-400');
            icon.classList.remove('text-slate-400', 'dark:text-slate-500');
          }
        } else {
          btn.classList.remove('active', 'font-semibold', 'text-emerald-700', 'dark:text-emerald-400', 'bg-emerald-50', 'dark:bg-emerald-950/60');
          btn.classList.add('text-slate-600', 'dark:text-slate-400');
          if (icon) {
            icon.classList.remove('text-emerald-600', 'dark:text-emerald-400');
            icon.classList.add('text-slate-400', 'dark:text-slate-500');
          }
        }
      });
    }

    // Modal Form Configuration
        // Global editing state & Edit Modal Trigger
    let editingItemId = null;

    function openEditModal(category, id) {
      editingItemId = id;
      switchTab(category);
      openModal();
    }

    function openModal() {
      const modal = document.getElementById('modal-container');
      const title = document.getElementById('modal-title');
      const fieldsContainer = document.getElementById('modal-form-fields');

      if (activeTab === 'banks') {
        title.textContent = editingItemId ? 'Edit Account / Deposit (Savings, FD, RD)' : 'Add Account / Deposit (Savings, FD, RD)';
        const submitBtn = document.getElementById('modal-submit-btn');
        if (submitBtn) submitBtn.textContent = editingItemId ? 'Update Account' : 'Save Entry';
        fieldsContainer.innerHTML = `
          <!-- 1. ACCOUNT TYPE IS FIRST -->
          <div>
            <label class="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center justify-between">
              <span>Account / Product Type</span>
              <span id="product-type-badge" class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">Savings Account</span>
            </label>
            <select id="field-bank-type" class="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-emerald-500/40 rounded-xl focus:ring-2 focus:ring-emerald-500 font-bold transition-all">
              <option value="Savings Account">Savings Account</option>
              <option value="Fixed Deposit (FD)">Fixed Deposit (FD) — Lump Sum</option>
              <option value="Recurring Deposit (RD)">Recurring Deposit (RD) — Monthly SIP</option>
              <option value="Salary Account">Salary Account</option>
              <option value="Current Account">Current Account</option>
            </select>
          </div>

          <!-- 2. BANK OR INSTITUTION NAME -->
          <div>
            <label id="label-bank-name" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Bank Name</label>
            <input required id="field-bank-name" type="text" placeholder="e.g. HDFC Bank, SBI, ICICI, Post Office" class="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500">
          </div>

          <!-- 3. COMMON OR SAVINGS BALANCE FIELD -->
          <div id="section-savings-balance">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label id="label-bank-balance" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Account Balance (₹)</label>
                <input id="field-bank-balance" type="number" step="0.01" min="0" placeholder="50000" class="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 font-semibold">
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Annual Interest Rate (% p.a.)</label>
                <input id="field-bank-rate" type="number" step="0.05" min="0" placeholder="3.5" class="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 font-semibold">
              </div>
            </div>
          </div>

          <!-- 4. DEDICATED FIXED DEPOSIT (FD) SECTION -->
          <div id="fd-extra-fields" class="hidden p-3.5 rounded-2xl border border-amber-300 dark:border-amber-800/60 bg-amber-50/40 dark:bg-amber-950/20 space-y-3">
            <div class="flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-200">
              <span class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                Fixed Deposit Details (Lump Sum)
              </span>
              <span class="text-[10px] text-amber-700 dark:text-amber-400 font-normal">Quarterly Compounding</span>
            </div>

            <div>
              <label class="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Principal Deposit Amount (₹)</label>
              <input id="field-fd-principal" type="number" min="500" step="100" placeholder="100000" class="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 font-bold">
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">FD Tenure</label>
                <input id="field-fd-tenure" type="text" placeholder="e.g. 12 Months, 2 Years" value="12 Months" class="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500">
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Maturity Date</label>
                <input id="field-fd-enddate" type="date" class="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500">
              </div>
            </div>

            <!-- Live FD Preview -->
            <div id="fd-calc-preview" class="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-900/50 flex items-center justify-between text-xs">
              <div>
                <div class="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">Est. Maturity Value</div>
                <div id="fd-preview-maturity" class="font-bold text-slate-900 dark:text-white text-sm">₹0</div>
              </div>
              <div class="text-right">
                <div class="text-[10px] uppercase font-semibold text-emerald-600 dark:text-emerald-400">Total Interest Gain</div>
                <div id="fd-preview-gain" class="font-bold text-emerald-600 dark:text-emerald-400 text-xs">+₹0</div>
              </div>
            </div>
          </div>

          <!-- 5. DEDICATED RECURRING DEPOSIT (RD) SECTION -->
          <div id="section-rd-fields" class="hidden p-3.5 rounded-2xl border border-indigo-300 dark:border-indigo-800/60 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-3">
            <div class="flex items-center justify-between text-xs font-bold text-indigo-900 dark:text-indigo-200">
              <span class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                Recurring Deposit (Monthly SIP)
              </span>
              <span class="text-[10px] text-indigo-600 dark:text-indigo-400 font-normal">Monthly Compounding</span>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Monthly Deposit (₹/mo)</label>
                <input id="field-rd-monthly" type="number" min="100" step="100" placeholder="5000" value="5000" class="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold">
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Tenure (Months)</label>
                <input id="field-rd-months" type="number" min="6" max="120" step="1" value="24" placeholder="24" class="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold">
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Maturity Date</label>
              <input id="field-rd-enddate" type="date" class="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500">
            </div>

            <!-- Live RD Preview -->
            <div class="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-900/50 space-y-1.5 text-xs">
              <div class="flex items-center justify-between">
                <span class="text-[10px] text-slate-500">Total Deposited Principal:</span>
                <span id="rd-preview-total-invested" class="font-semibold text-slate-800 dark:text-slate-200">₹1,20,000</span>
              </div>
              <div class="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-1">
                <div>
                  <div class="text-[10px] uppercase font-semibold text-slate-500">Maturity Payout</div>
                  <div id="rd-preview-maturity" class="font-bold text-slate-900 dark:text-white text-sm">₹1,29,214</div>
                </div>
                <div class="text-right">
                  <div class="text-[10px] uppercase font-semibold text-emerald-600">Total Interest Gain</div>
                  <div id="rd-preview-gain" class="font-bold text-emerald-600 text-xs">+₹9,214</div>
                </div>
              </div>
            </div>
          </div>
        `;

        // Wire up dynamic product switcher & live calculation
        const typeSelect = document.getElementById('field-bank-type');
        const badge = document.getElementById('product-type-badge');
        const nameLabel = document.getElementById('label-bank-name');
        const nameInput = document.getElementById('field-bank-name');
        const savingsSection = document.getElementById('section-savings-balance');
        const fdSection = document.getElementById('fd-extra-fields');
        const rdSection = document.getElementById('section-rd-fields');
        const rateInput = document.getElementById('field-bank-rate');
        const balInput = document.getElementById('field-bank-balance');

        const fdPrincipal = document.getElementById('field-fd-principal');
        const fdTenure = document.getElementById('field-fd-tenure');
        const fdEndDate = document.getElementById('field-fd-enddate');

        const rdMonthly = document.getElementById('field-rd-monthly');
        const rdMonths = document.getElementById('field-rd-months');
        const rdEndDate = document.getElementById('field-rd-enddate');

        // Set default future dates
        const date1Yr = new Date();
        date1Yr.setFullYear(date1Yr.getFullYear() + 1);
        fdEndDate.value = date1Yr.toISOString().split('T')[0];

        const date2Yr = new Date();
        date2Yr.setFullYear(date2Yr.getFullYear() + 2);
        rdEndDate.value = date2Yr.toISOString().split('T')[0];

        function calcFd() {
          const principal = parseFloat(fdPrincipal.value) || 0;
          const rate = parseFloat(rateInput.value) || 7.1;
          let years = 1;
          const tenureStr = (fdTenure.value || '').toLowerCase();
          if (tenureStr.includes('month')) {
            years = (parseFloat(tenureStr) || 12) / 12;
          } else {
            years = parseFloat(tenureStr) || 1;
          }
          const maturity = principal > 0 ? principal * Math.pow(1 + (rate / 400), 4 * years) : 0;
          const gain = maturity - principal;
          document.getElementById('fd-preview-maturity').textContent = formatINR(maturity);
          document.getElementById('fd-preview-gain').textContent = `+${formatINR(gain)}`;
        }

        function calcRd() {
          const p = parseFloat(rdMonthly.value) || 0;
          const n = parseInt(rdMonths.value) || 12;
          const r = parseFloat(rateInput.value) || 7.0;
          const totalInvested = p * n;

          let maturity = 0;
          for (let m = 1; m <= n; m++) {
            const monthsRemaining = n - m + 1;
            const quarters = monthsRemaining / 3;
            maturity += p * Math.pow(1 + (r / 400), quarters);
          }
          const gain = maturity > totalInvested ? maturity - totalInvested : 0;

          document.getElementById('rd-preview-total-invested').textContent = formatINR(totalInvested);
          document.getElementById('rd-preview-maturity').textContent = formatINR(maturity);
          document.getElementById('rd-preview-gain').textContent = `+${formatINR(gain)}`;
        }

        function handleAccountTypeChange() {
          const chosen = typeSelect.value;
          if (chosen === 'Fixed Deposit (FD)') {
            badge.textContent = 'Fixed Deposit (Lump Sum)';
            badge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
            nameLabel.textContent = 'Bank / NBFC Name';
            nameInput.placeholder = 'e.g. HDFC Bank, ICICI Bank, SBI, Bajaj Finance';
            savingsSection.classList.add('hidden');
            fdSection.classList.remove('hidden');
            rdSection.classList.add('hidden');
            rateInput.value = '7.1';
            calcFd();
          } else if (chosen === 'Recurring Deposit (RD)') {
            badge.textContent = 'Recurring Deposit (Monthly SIP)';
            badge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300';
            nameLabel.textContent = 'Bank / Post Office Name';
            nameInput.placeholder = 'e.g. Post Office, SBI, HDFC Bank';
            savingsSection.classList.add('hidden');
            fdSection.classList.add('hidden');
            rdSection.classList.remove('hidden');
            rateInput.value = '7.0';
            calcRd();
          } else {
            badge.textContent = chosen;
            badge.className = 'px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
            nameLabel.textContent = 'Bank Name';
            nameInput.placeholder = 'e.g. HDFC Bank, SBI, Kotak';
            savingsSection.classList.remove('hidden');
            fdSection.classList.add('hidden');
            rdSection.classList.add('hidden');
            rateInput.value = (chosen === 'Current Account') ? '0.0' : '3.5';
          }
        }

        typeSelect.addEventListener('change', handleAccountTypeChange);
        rateInput.addEventListener('input', () => {
          if (typeSelect.value === 'Fixed Deposit (FD)') calcFd();
          if (typeSelect.value === 'Recurring Deposit (RD)') calcRd();
        });
        fdPrincipal.addEventListener('input', calcFd);
        fdTenure.addEventListener('input', calcFd);
        rdMonthly.addEventListener('input', calcRd);
        rdMonths.addEventListener('input', calcRd);

        handleAccountTypeChange();

        if (editingItemId) {
          const bank = appData.banks.find(b => b.id === editingItemId);
          if (bank) {
            typeSelect.value = bank.type || 'Savings Account';
            handleAccountTypeChange();
            nameInput.value = bank.name || '';
            rateInput.value = bank.interestRate !== undefined ? bank.interestRate : 3.5;
            if (bank.type === 'Fixed Deposit (FD)') {
              fdPrincipal.value = bank.balance || '';
              if (bank.tenure) fdTenure.value = bank.tenure;
              if (bank.endDate) fdEndDate.value = bank.endDate;
              calcFd();
            } else if (bank.type === 'Recurring Deposit (RD)') {
              rdMonthly.value = bank.monthlyDeposit || '';
              if (bank.tenure) {
                const m = parseInt(bank.tenure);
                if (m > 0) rdMonths.value = m;
              }
              if (bank.endDate) rdEndDate.value = bank.endDate;
              calcRd();
            } else {
              balInput.value = bank.balance !== undefined ? bank.balance : '';
            }
          }
        }
      } else if (activeTab === 'stocks') {
        title.textContent = editingItemId ? 'Edit Stock Holding (BSE / NSE)' : 'Add Stock Holding (BSE / NSE)';
        const submitBtn = document.getElementById('modal-submit-btn');
        if (submitBtn) submitBtn.textContent = editingItemId ? 'Update Stock' : 'Save Entry';
        fieldsContainer.innerHTML = `
          <div class="relative">
            <div class="flex items-center justify-between mb-1">
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Stock Symbol or Company Name</label>
              
            </div>
            <div class="flex gap-2">
              <div class="relative flex-1">
                <input required id="field-stock-symbol" type="text" autocomplete="off" placeholder="e.g. SUZLON, TATA, RELIANCE..." class="uppercase w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-bold">
                <!-- Autocomplete Dropdown List -->
                <div id="stock-autocomplete-list" class="absolute z-50 left-0 right-0 top-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl max-h-56 overflow-y-auto hidden divide-y divide-slate-100 dark:divide-slate-700"></div>
              </div>
              <button id="btn-fetch-stock-info" type="button" class="shrink-0 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs flex items-center gap-1 transition-colors">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                Lookup
              </button>
            </div>
            <div id="stock-auto-status" class="mt-1 text-[11px] text-slate-500 hidden"></div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
              <input id="field-stock-name" type="text" placeholder="Auto-populated or type" class="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Exchange</label>
              <select id="field-stock-exchange" class="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden">
                <option value="NSE">NSE (National)</option>
                <option value="BSE">BSE (Bombay)</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-2.5">
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Quantity</label>
              <input required id="field-stock-qty" type="number" min="1" step="1" placeholder="10" class="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Buy Price (₹)</label>
              <input required id="field-stock-buy" type="number" min="0.05" step="0.05" placeholder="1250" class="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Current (₹)</label>
              <input required id="field-stock-current" type="number" min="0.05" step="0.05" placeholder="1300" class="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-semibold">
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Dividend Yield (% p.a.)</label>
            <input id="field-stock-divyield" type="number" step="0.1" min="0" placeholder="1.5" class="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden">
          </div>
        `;

        // Wire up auto-lookup & Live Autocomplete Dropdown
        const stockSymbolInput = document.getElementById('field-stock-symbol');
        const stockLookupBtn = document.getElementById('btn-fetch-stock-info');
        const autoList = document.getElementById('stock-autocomplete-list');

        function renderAutocomplete(query) {
          if (!autoList) return;
          const q = (query || '').trim();
          if (q.length < 1) {
            autoList.classList.add('hidden');
            autoList.innerHTML = '';
            return;
          }

          const matches = searchIndianStocks(q);

          // Direct Ticker Fallback Row (shown only at bottom or if no match)
          const liveLookupPrompt = `
            <div class="stock-item-rediff px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer flex items-center justify-between text-xs transition-colors border-t border-slate-100 dark:border-slate-700/60" data-rediff-sym="${escapeHtml(q.toUpperCase())}">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="font-bold text-slate-800 dark:text-slate-200">Fetch Quote for exact symbol "${escapeHtml(q.toUpperCase())}"</span>
              </div>
              <span class="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Query Live Feed →</span>
            </div>
          `;

          if (matches.length === 0) {
            autoList.innerHTML = `
              <div class="px-3.5 py-2.5 text-[11px] text-slate-500 dark:text-slate-400">
                No company name or symbol matching "<strong>${escapeHtml(q)}</strong>" in catalog.
              </div>
              ${liveLookupPrompt}
            `;
            autoList.classList.remove('hidden');

            const rediffTrigger = autoList.querySelector('.stock-item-rediff');
            if (rediffTrigger) {
              rediffTrigger.addEventListener('click', () => {
                stockSymbolInput.value = q.toUpperCase();
                autoList.classList.add('hidden');
                lookupAndFillStockInfo(q.toUpperCase());
              });
            }
            return;
          }

          const catalogList = matches.map(([sym, data]) => {
            const isBse = data.exchange === 'BSE';
            const displaySym = isBse && data.altSymbol ? data.altSymbol : sym;
            const codeNote = isBse && data.bseCode ? `(${data.bseCode})` : (data.bseCode ? `• BSE: ${data.bseCode}` : '');
            const targetSym = isBse ? (data.bseCode || sym) : sym;

            return `
              <div class="stock-item-option px-3.5 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-700/60 cursor-pointer flex items-center justify-between text-xs transition-colors"
                   data-sym="${escapeHtml(targetSym)}"
                   data-alt="${escapeHtml(data.altSymbol || '')}"
                   data-exchange="${escapeHtml(data.exchange)}"
                   data-name="${escapeHtml(data.name)}"
                   data-div="${escapeHtml(String(data.divYield || '1.2'))}">
                <div class="pr-2 min-w-0">
                  <div class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>${escapeHtml(displaySym)}</span>
                    ${isBse ? `<span class="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-normal">${escapeHtml(codeNote)}</span>` : ''}
                    <span class="px-1.5 py-0.2 rounded text-[9px] font-semibold ${data.exchange === 'NSE' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300' : 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300'}">${data.exchange}</span>
                    ${data.group ? `<span class="text-[9px] px-1 py-0.2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded">Grp ${escapeHtml(data.group)}</span>` : ''}
                  </div>
                  <div class="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    ${escapeHtml(data.name)} ${!isBse && codeNote ? codeNote : ''}
                  </div>
                </div>
                <div class="text-right shrink-0">
                  <span class="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">Select &amp; Fetch →</span>
                </div>
              </div>
            `;
          }).join('');

          autoList.innerHTML = `${catalogList}${liveLookupPrompt}`;
          autoList.classList.remove('hidden');

          const rediffTrigger = autoList.querySelector('.stock-item-rediff');
          if (rediffTrigger) {
            rediffTrigger.addEventListener('click', () => {
              stockSymbolInput.value = q.toUpperCase();
              autoList.classList.add('hidden');
              lookupAndFillStockInfo(q.toUpperCase());
            });
          }

          autoList.querySelectorAll('.stock-item-option').forEach(item => {
            item.addEventListener('click', () => {
              const chosen = item.getAttribute('data-sym');
              const chosenEx = item.getAttribute('data-exchange') || 'NSE';
              const chosenName = item.getAttribute('data-name') || '';
              const chosenDiv = item.getAttribute('data-div') || '';

              stockSymbolInput.value = chosen;
              const exchField = document.getElementById('field-stock-exchange');
              const nameField = document.getElementById('field-stock-name');
              const divField = document.getElementById('field-stock-divyield');

              if (exchField) exchField.value = chosenEx;
              if (nameField) nameField.value = chosenName;
              if (divField && chosenDiv) divField.value = chosenDiv;

              autoList.classList.add('hidden');
              lookupAndFillStockInfo(chosen, chosenEx);
            });
          });
        }

        const exchField = document.getElementById('field-stock-exchange');
        if (exchField) {
          exchField.addEventListener('change', () => {
            const currentSym = (stockSymbolInput?.value || '').trim();
            if (currentSym) {
              lookupAndFillStockInfo(currentSym, exchField.value);
            }
          });
        }

        if (stockLookupBtn) {
          stockLookupBtn.addEventListener('click', () => {
            lookupAndFillStockInfo(stockSymbolInput.value);
          });
        }

        if (stockSymbolInput) {
          stockSymbolInput.addEventListener('input', (e) => {
            renderAutocomplete(e.target.value);
          });

          stockSymbolInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              autoList.classList.add('hidden');
              lookupAndFillStockInfo(stockSymbolInput.value);
            }
          });
        }

        document.addEventListener('click', (e) => {
          if (autoList && !autoList.contains(e.target) && e.target !== stockSymbolInput) {
            autoList.classList.add('hidden');
          }
        });

        if (editingItemId) {
          const stock = appData.stocks.find(s => s.id === editingItemId);
          if (stock) {
            stockSymbolInput.value = stock.symbol;
            const nameField = document.getElementById('field-stock-name');
            if (nameField) nameField.value = stock.name || stock.symbol;
            const exchField = document.getElementById('field-stock-exchange');
            if (exchField) exchField.value = stock.exchange || 'NSE';
            const qtyField = document.getElementById('field-stock-qty');
            if (qtyField) qtyField.value = stock.qty;
            const buyField = document.getElementById('field-stock-buy');
            if (buyField) buyField.value = stock.buyPrice;
            const currField = document.getElementById('field-stock-current');
            if (currField) currField.value = stock.currentPrice;
            const divField = document.getElementById('field-stock-divyield');
            if (divField) divField.value = stock.divYield !== undefined ? stock.divYield : 1.5;

            const autoStatus = document.getElementById('stock-auto-status');
            if (autoStatus) {
              autoStatus.classList.remove('hidden');
              autoStatus.className = 'mt-1 text-[11px] text-blue-600 dark:text-blue-400 font-medium';
              autoStatus.textContent = `Editing ${stock.symbol} (${stock.name || stock.symbol})`;
            }
          }
        }

      } else if (activeTab === 'funds') {
        title.textContent = editingItemId ? 'Edit Mutual Fund Scheme' : 'Add Mutual Fund Scheme';
        const submitBtn = document.getElementById('modal-submit-btn');
        if (submitBtn) submitBtn.textContent = editingItemId ? 'Update Mutual Fund' : 'Save Entry';
        fieldsContainer.innerHTML = `
          <!-- 1. Google Finance Style Mutual Fund Search Input -->
          <div class="relative">
            <div class="flex items-center justify-between mb-1">
              <label class="block text-xs font-bold text-slate-800 dark:text-slate-200">Search Mutual Fund (by Name or Code)</label>
              <span class="text-[10px] text-slate-400">Search 37,000+ schemes or type AMFI code</span>
            </div>
            <div class="flex gap-2">
              <div class="relative flex-1">
                <input required id="field-mf-search" type="text" autocomplete="off" placeholder="e.g. Parag Parikh, SBI Bluechip, Quant, HDFC..." class="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-emerald-500/40 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-bold transition-all">
                <!-- Autocomplete Dropdown List -->
                <div id="mf-autocomplete-list" class="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl max-h-64 overflow-y-auto hidden divide-y divide-slate-100 dark:divide-slate-700/60"></div>
              </div>
              <button id="btn-fetch-amfi-info" type="button" class="shrink-0 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                Lookup NAV
              </button>
            </div>
            <div id="mf-auto-status" class="mt-1.5 text-[11px] text-slate-500 hidden"></div>
          </div>

          <!-- 2. Auto-Populated Scheme Details (Name & AMFI Code) -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div class="sm:col-span-2">
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Scheme Name</label>
              <input required id="field-mf-name" type="text" placeholder="Auto-populated or enter custom name" class="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">AMFI Scheme Code</label>
              <input id="field-mf-schemecode" type="text" placeholder="e.g. 122639" class="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-bold">
            </div>
          </div>

          <!-- 3. Units, Buy NAV, Current NAV -->
          <div class="grid grid-cols-3 gap-2.5">
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Units Allocated</label>
              <input required id="field-mf-units" type="number" min="0.001" step="0.001" placeholder="150.5" class="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-bold">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Buy NAV (₹)</label>
              <input required id="field-mf-buynav" type="number" min="0.01" step="0.01" placeholder="45.20" class="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Current NAV (₹)</label>
              <input required id="field-mf-currentnav" type="number" min="0.01" step="0.01" placeholder="52.80" class="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-semibold">
            </div>
          </div>
        `;

        const searchInput = document.getElementById('field-mf-search');
        const nameInput = document.getElementById('field-mf-name');
        const codeInput = document.getElementById('field-mf-schemecode');
        const currentNavInput = document.getElementById('field-mf-currentnav');
        const buyNavInput = document.getElementById('field-mf-buynav');
        const unitsInput = document.getElementById('field-mf-units');
        const autoList = document.getElementById('mf-autocomplete-list');
        const autoStatus = document.getElementById('mf-auto-status');
        const lookupBtn = document.getElementById('btn-fetch-amfi-info');

        let mfDebounceTimer = null;

        async function selectSchemeItem(schemeCode, schemeName, knownNav) {
          if (autoList) autoList.classList.add('hidden');
          if (searchInput) searchInput.value = schemeName;
          if (nameInput) nameInput.value = schemeName;
          if (codeInput) codeInput.value = schemeCode;

          if (autoStatus) {
            autoStatus.classList.remove('hidden');
            autoStatus.className = 'mt-1.5 text-[11px] text-blue-600 dark:text-blue-400 font-medium';
            autoStatus.textContent = `Fetching live NAV for ${schemeName}...`;
          }

          if (knownNav && knownNav > 0) {
            if (currentNavInput) currentNavInput.value = knownNav;
            if (buyNavInput && (!buyNavInput.value || parseFloat(buyNavInput.value) <= 0)) {
              buyNavInput.value = knownNav;
            }
          }

          try {
            const live = await fetchMutualFundLive(schemeCode);
            if (live && live.nav > 0) {
              if (currentNavInput) currentNavInput.value = live.nav;
              if (buyNavInput && (!buyNavInput.value || parseFloat(buyNavInput.value) <= 0)) {
                buyNavInput.value = live.nav;
              }
              if (live.name && nameInput) nameInput.value = live.name;
              if (autoStatus) {
                autoStatus.className = 'mt-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold';
                autoStatus.textContent = `✓ Selected: ${live.name || schemeName} • Code: ${schemeCode} • Live NAV: ₹${live.nav}`;
              }
              showToast(`Selected: ₹${live.nav} NAV`);
            } else if (knownNav && knownNav > 0) {
              if (autoStatus) {
                autoStatus.className = 'mt-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold';
                autoStatus.textContent = `✓ Selected: ${schemeName} • Code: ${schemeCode} • NAV: ₹${knownNav}`;
              }
            } else {
              if (autoStatus) {
                autoStatus.className = 'mt-1.5 text-[11px] text-amber-600 dark:text-amber-400';
                autoStatus.textContent = `Scheme code ${schemeCode} selected. Please enter current NAV if not updated.`;
              }
            }
          } catch (err) {
            if (autoStatus) {
              autoStatus.className = 'mt-1.5 text-[11px] text-amber-600 dark:text-amber-400';
              autoStatus.textContent = `Selected: ${schemeName}. Please enter NAV manually if offline.`;
            }
          }

          if (unitsInput) {
            setTimeout(() => unitsInput.focus(), 150);
          }
        }

        function renderMfDropdown(items, query) {
          if (!autoList) return;
          if (!items || items.length === 0) {
            autoList.innerHTML = `
              <div class="px-3.5 py-2.5 text-[11px] text-slate-500 dark:text-slate-400">
                No mutual funds found matching "<strong>${escapeHtml(query)}</strong>". Try typing fund house name (e.g. Parag, SBI, HDFC, Quant) or AMFI code.
              </div>
            `;
            autoList.classList.remove('hidden');
            return;
          }

          autoList.innerHTML = items.map(item => {
            const isDirect = item.schemeName.toLowerCase().includes('direct');
            const isGrowth = item.schemeName.toLowerCase().includes('growth');
            return `
              <div class="mf-item-option px-3.5 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-700/60 cursor-pointer flex items-center justify-between text-xs transition-colors"
                   data-code="${item.schemeCode}" data-name="${escapeHtml(item.schemeName)}" data-nav="${item.nav || ''}">
                <div class="pr-2 flex-1 min-w-0">
                  <div class="font-bold text-slate-900 dark:text-white truncate">${escapeHtml(item.schemeName)}</div>
                  <div class="flex items-center gap-1.5 mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                    <span class="font-mono font-semibold text-emerald-600 dark:text-emerald-400">AMFI: ${item.schemeCode}</span>
                    ${isDirect ? '<span class="px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-semibold">Direct</span>' : '<span class="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 font-semibold">Regular</span>'}
                    ${isGrowth ? '<span class="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">Growth</span>' : ''}
                    <span>• ${item.source || 'AMFI'}</span>
                  </div>
                </div>
                ${item.nav ? `<div class="text-right shrink-0 font-bold text-slate-800 dark:text-slate-200">₹${Number(item.nav).toFixed(2)}</div>` : '<div class="text-right shrink-0 text-[10px] text-emerald-600 font-semibold">Select →</div>'}
              </div>
            `;
          }).join('');

          autoList.classList.remove('hidden');

          autoList.querySelectorAll('.mf-item-option').forEach(el => {
            el.addEventListener('click', () => {
              const c = el.getAttribute('data-code');
              const n = el.getAttribute('data-name');
              const nv = parseFloat(el.getAttribute('data-nav')) || null;
              selectSchemeItem(c, n, nv);
            });
          });
        }

        if (searchInput) {
          searchInput.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            if (val.length < 1) {
              if (autoList) {
                autoList.classList.add('hidden');
                autoList.innerHTML = '';
              }
              return;
            }

            // Instant 0ms Match in Local Catalog
            const instantMatches = [];
            const qLower = val.toLowerCase();
            for (const [code, item] of Object.entries(POPULAR_MF_DIRECTORY)) {
              if (code.includes(qLower) || item.name.toLowerCase().includes(qLower)) {
                instantMatches.push({
                  schemeCode: code,
                  schemeName: item.name,
                  nav: item.nav,
                  source: 'Verified Catalog'
                });
              }
            }
            if (instantMatches.length > 0) {
              renderMfDropdown(instantMatches.slice(0, 8), val);
            }

            // Debounced Live Search against full AMFI database
            clearTimeout(mfDebounceTimer);
            mfDebounceTimer = setTimeout(async () => {
              const fullMatches = await searchMutualFundsByName(val);
              renderMfDropdown(fullMatches, val);
            }, 250);
          });

          searchInput.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter') {
              ev.preventDefault();
              lookupBtn?.click();
            }
          });

          // Close dropdown on click outside
          document.addEventListener('click', (ev) => {
            if (autoList && !autoList.contains(ev.target) && ev.target !== searchInput) {
              autoList.classList.add('hidden');
            }
          });
        }

        if (lookupBtn) {
          lookupBtn.addEventListener('click', async () => {
            const searchVal = (searchInput?.value || codeInput?.value || '').trim();
            if (!searchVal) {
              showToast('Please enter a mutual fund name (e.g. Parag Parikh) or AMFI code', 'error');
              return;
            }

            lookupBtn.textContent = 'Searching...';
            lookupBtn.disabled = true;

            try {
              const cleanCode = searchVal.replace(/[^0-9]/g, '');
              if (cleanCode && cleanCode.length >= 5) {
                const result = await fetchMutualFundLive(cleanCode);
                if (result && result.nav > 0) {
                  selectSchemeItem(cleanCode, result.name || `Mutual Fund Scheme ${cleanCode}`, result.nav);
                } else {
                  showToast('Could not fetch NAV for code. You can enter NAV manually.', 'error');
                }
              } else {
                const matches = await searchMutualFundsByName(searchVal);
                if (matches && matches.length > 0) {
                  const top = matches[0];
                  await selectSchemeItem(top.schemeCode, top.schemeName, top.nav);
                  showToast(`Selected: ${top.schemeName}`);
                } else {
                  showToast(`No mutual funds found matching "${searchVal}". Enter details manually.`, 'error');
                }
              }
            } catch (err) {
              showToast('Search error. Please enter details manually.', 'error');
            } finally {
              lookupBtn.textContent = 'Lookup NAV';
              lookupBtn.disabled = false;
            }
          });
        }

        if (editingItemId) {
          const fund = appData.funds.find(f => f.id === editingItemId);
          if (fund) {
            if (searchInput) searchInput.value = fund.name;
            if (nameInput) nameInput.value = fund.name;
            if (codeInput) codeInput.value = fund.schemeCode || '';
            if (unitsInput) unitsInput.value = fund.units;
            if (buyNavInput) buyNavInput.value = fund.buyNav;
            if (currentNavInput) currentNavInput.value = fund.currentNav;

            if (autoStatus) {
              autoStatus.classList.remove('hidden');
              autoStatus.className = 'mt-1.5 text-[11px] text-blue-600 dark:text-blue-400 font-medium';
              autoStatus.textContent = `Editing: ${fund.name} (AMFI: ${fund.schemeCode || 'Custom'})`;
            }
          }
        }
      }

      modal.classList.remove('hidden');
    }

    function closeModal() {
      editingItemId = null;
      const submitBtn = document.getElementById('modal-submit-btn');
      if (submitBtn) submitBtn.textContent = 'Save Entry';
      document.getElementById('modal-container').classList.add('hidden');
    }


    // Theme Toggle Logic
    function initTheme() {
      const savedTheme = localStorage.getItem('artha_theme_v6') || localStorage.getItem('dhantrack_theme_v5');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.getElementById('theme-icon-sun').classList.remove('hidden');
        document.getElementById('theme-icon-moon').classList.add('hidden');
      } else {
        document.documentElement.classList.remove('dark');
        document.getElementById('theme-icon-sun').classList.add('hidden');
        document.getElementById('theme-icon-moon').classList.remove('hidden');
      }
    }

    function toggleTheme() {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('artha_theme_v6', isDark ? 'dark' : 'light');

      document.getElementById('theme-icon-sun').classList.toggle('hidden', !isDark);
      document.getElementById('theme-icon-moon').classList.toggle('hidden', isDark);

      computeMetrics();
    }

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

