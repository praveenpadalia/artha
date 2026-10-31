    // Supabase Credentials & Client Initialization
    const SUPABASE_URL = 'https://qndvwsfgajclxvdchteq.supabase.co';
    const SUPABASE_ANON_KEY = 'sb_publishable_tRjYWmondQ22mEMzp_7bMg__i6__MJ8';
    let supabaseClient = null;
    let currentSupabaseUser = null;
    let cloudSyncTimer = null;
    let authMode = 'signin';

    try {
      if (window.supabase) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      }
    } catch (e) {
      console.warn('Supabase client init error:', e);
    }

    function updateCloudUI() {
      const syncBtnText = document.getElementById('cloud-sync-btn-text');
      const syncBtn = document.getElementById('btn-cloud-sync');
      if (!syncBtn) return;

      if (currentSupabaseUser) {
        const userEmail = currentSupabaseUser.email || 'User';
        const shortEmail = userEmail.split('@')[0];
        if (syncBtnText) {
          syncBtnText.innerHTML = `
            <span class="inline-flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="truncate max-w-[90px] sm:max-w-[120px]">${escapeHtml(shortEmail)}</span>
            </span>
          `;
          syncBtnText.classList.remove('hidden');
        }
        syncBtn.className = 'inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-xl border border-emerald-500/50 bg-emerald-100/70 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 shadow-xs transition-colors';
      } else {
        if (syncBtnText) {
          syncBtnText.textContent = 'Cloud Sync';
          syncBtnText.classList.remove('hidden');
        }
        syncBtn.className = 'inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 transition-colors shadow-xs';
      }
    }

    async function syncPortfolioToCloud(immediate = false) {
      if (!supabaseClient || !currentSupabaseUser) return;

      const pushToSupabase = async () => {
        try {
          const { error } = await supabaseClient
            .from('portfolios')
            .upsert({
              user_id: currentSupabaseUser.id,
              portfolio_data: appData,
              updated_at: new Date().toISOString()
            }, { onConflict: 'user_id' });

          if (error) {
            console.warn('Supabase cloud sync error:', error);
          } else {
            const timeStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
            const statusLabel = document.getElementById('sync-status-label');
            if (statusLabel) statusLabel.textContent = `Cloud synced: ${timeStr}`;
          }
        } catch (e) {
          console.warn('Cloud sync error:', e);
        }
      };

      if (immediate) {
        await pushToSupabase();
      } else {
        clearTimeout(cloudSyncTimer);
        cloudSyncTimer = setTimeout(pushToSupabase, 800);
      }
    }

    async function fetchCloudPortfolio() {
      if (!supabaseClient || !currentSupabaseUser) return;
      try {
        const { data, error } = await supabaseClient
          .from('portfolios')
          .select('portfolio_data, updated_at')
          .eq('user_id', currentSupabaseUser.id)
          .maybeSingle();

        if (error) {
          console.warn('Error fetching portfolio from Supabase:', error);
          return;
        }

        if (data && data.portfolio_data && (Array.isArray(data.portfolio_data.banks) || Array.isArray(data.portfolio_data.stocks) || Array.isArray(data.portfolio_data.funds))) {
          appData = {
            banks: Array.isArray(data.portfolio_data.banks) ? data.portfolio_data.banks : [],
            stocks: Array.isArray(data.portfolio_data.stocks) ? data.portfolio_data.stocks : [],
            funds: Array.isArray(data.portfolio_data.funds) ? data.portfolio_data.funds : [],
            targets: data.portfolio_data.targets || { cash: 20, stocks: 40, mf: 40 }
          };
          saveData(false);
          renderAll();
          showToast('✓ Loaded your cloud portfolio from Supabase!');
        } else {
          // First time user: upload current local data
          await syncPortfolioToCloud(true);
          showToast('✓ Uploaded current portfolio to your cloud account!');
        }
      } catch (err) {
        console.warn('Error syncing cloud portfolio:', err);
      }
    }

    async function initSupabaseAuth() {
      if (!supabaseClient) return;
      try {
        if (window.location.hash && (window.location.hash.includes('access_token') || window.location.hash.includes('type=signup'))) {
          setTimeout(() => {
            history.replaceState(null, document.title, window.location.pathname + window.location.search);
          }, 1200);
        }
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session && session.user) {
          currentSupabaseUser = session.user;
          updateCloudUI();
          await fetchCloudPortfolio();
        }
        supabaseClient.auth.onAuthStateChange(async (event, session) => {
          if ((event === 'SIGNED_IN' || event === 'USER_UPDATED') && session?.user) {
            currentSupabaseUser = session.user;
            updateCloudUI();
            await fetchCloudPortfolio();
          } else if (event === 'SIGNED_OUT') {
            currentSupabaseUser = null;
            updateCloudUI();
          }
        });
      } catch (e) {
        console.warn('Supabase auth session error:', e);
      }
    }

    function openCloudModal() {
      const modal = document.getElementById('cloud-modal-container');
      const body = document.getElementById('cloud-modal-body');
      if (!modal || !body) return;

      if (currentSupabaseUser) {
        const userEmail = currentSupabaseUser.email || 'User';
        body.innerHTML = `
          <div class="space-y-4">
            <div class="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <div class="flex items-center gap-2 mb-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="text-xs font-bold text-emerald-900 dark:text-emerald-200">Logged In &amp; Synced</span>
              </div>
              <div class="text-sm font-semibold text-slate-900 dark:text-white">${escapeHtml(userEmail)}</div>
              <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Connected to Supabase Mumbai (ap-south-1). Your holdings automatically sync across devices.
              </div>
            </div>

            <div class="grid grid-cols-3 gap-2.5 text-center">
              <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div class="text-xs font-bold text-slate-900 dark:text-white">${appData.banks.length}</div>
                <div class="text-[10px] text-slate-500 dark:text-slate-400">Accounts</div>
              </div>
              <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div class="text-xs font-bold text-slate-900 dark:text-white">${appData.stocks.length}</div>
                <div class="text-[10px] text-slate-500 dark:text-slate-400">Stocks</div>
              </div>
              <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div class="text-xs font-bold text-slate-900 dark:text-white">${appData.funds.length}</div>
                <div class="text-[10px] text-slate-500 dark:text-slate-400">Mutual Funds</div>
              </div>
            </div>

            <div class="pt-2 flex flex-col gap-2">
              <button id="btn-cloud-force-sync" type="button" class="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                Sync Local to Cloud Now
              </button>
              <button id="btn-cloud-force-pull" type="button" class="w-full py-2 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-colors">
                Pull Latest from Cloud
              </button>
              <button id="btn-cloud-signout" type="button" class="w-full py-2 px-4 text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors">
                Sign Out of Supabase
              </button>
            </div>
          </div>
        `;

        document.getElementById('btn-cloud-force-sync')?.addEventListener('click', async () => {
          showToast('Syncing to Supabase...');
          await syncPortfolioToCloud(true);
          showToast('✓ Successfully backed up to Supabase Cloud!');
        });

        document.getElementById('btn-cloud-force-pull')?.addEventListener('click', async () => {
          showToast('Pulling cloud data...');
          await fetchCloudPortfolio();
          closeCloudModal();
        });

        document.getElementById('btn-cloud-signout')?.addEventListener('click', async () => {
          if (supabaseClient) {
            await supabaseClient.auth.signOut();
            currentSupabaseUser = null;
            updateCloudUI();
            showToast('Signed out of cloud account');
            closeCloudModal();
          }
        });

      } else {
        body.innerHTML = `
          <div class="space-y-4">
            <!-- Segmented Switcher -->
            <div class="flex p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-xs font-semibold">
              <button id="tab-auth-signin" type="button" class="flex-1 py-1.5 rounded-lg transition-all ${authMode === 'signin' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 dark:text-slate-400'}">Sign In</button>
              <button id="tab-auth-signup" type="button" class="flex-1 py-1.5 rounded-lg transition-all ${authMode === 'signup' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 dark:text-slate-400'}">Create Account</button>
              <button id="tab-auth-magic" type="button" class="flex-1 py-1.5 rounded-lg transition-all ${authMode === 'magic' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 dark:text-slate-400'}">Magic Link</button>
            </div>

            <form id="cloud-auth-form" class="space-y-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input required id="cloud-email-input" type="email" placeholder="you@example.com" class="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium">
              </div>

              ${authMode !== 'magic' ? `
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
                    <span class="text-[10px] text-slate-400">Min 6 characters</span>
                  </div>
                  <input required id="cloud-password-input" type="password" minlength="6" placeholder="••••••••" class="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium">
                </div>
              ` : `
                <div class="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[11px] text-blue-700 dark:text-blue-300">
                  No password needed! Supabase will send a secure 1-click login link directly to your inbox.
                </div>
              `}

              <div id="cloud-auth-alert" class="hidden p-2.5 rounded-xl text-xs font-medium"></div>

              <button id="cloud-auth-submit-btn" type="submit" class="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 mt-2">
                ${authMode === 'signin' ? 'Sign In &amp; Sync' : authMode === 'signup' ? 'Create Free Account &amp; Sync' : 'Send Magic Login Link'}
              </button>
            </form>

            <p class="text-[10px] text-center text-slate-400 dark:text-slate-500">
              🔒 Your financial data is secured with Supabase Row-Level Security in Mumbai, India.
            </p>
          </div>
        `;

        document.getElementById('tab-auth-signin')?.addEventListener('click', () => { authMode = 'signin'; openCloudModal(); });
        document.getElementById('tab-auth-signup')?.addEventListener('click', () => { authMode = 'signup'; openCloudModal(); });
        document.getElementById('tab-auth-magic')?.addEventListener('click', () => { authMode = 'magic'; openCloudModal(); });

        document.getElementById('cloud-auth-form')?.addEventListener('submit', async (e) => {
          e.preventDefault();
          const email = document.getElementById('cloud-email-input').value.trim();
          const password = document.getElementById('cloud-password-input')?.value;
          const alertBox = document.getElementById('cloud-auth-alert');
          const submitBtn = document.getElementById('cloud-auth-submit-btn');

          if (!supabaseClient) {
            showToast('Supabase client is not loaded. Check internet connection.', 'error');
            return;
          }

          submitBtn.disabled = true;
          submitBtn.textContent = 'Connecting to Supabase...';
          if (alertBox) alertBox.classList.add('hidden');

          try {
            if (authMode === 'signin') {
              const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
              if (error) throw error;
              currentSupabaseUser = data.user;
              updateCloudUI();
              await fetchCloudPortfolio();
              closeCloudModal();
              showToast(`Welcome back, ${email.split('@')[0]}!`);
            } else if (authMode === 'signup') {
              const redirectTarget = window.location.href.split('#')[0];
              const { data, error } = await supabaseClient.auth.signUp({
                email,
                password,
                options: { emailRedirectTo: redirectTarget }
              });
              if (error) throw error;
              if (data.session) {
                currentSupabaseUser = data.user;
                updateCloudUI();
                await syncPortfolioToCloud(true);
                closeCloudModal();
                showToast(`Account created & portfolio backed up!`);
              } else {
                alertBox.className = 'p-2.5 rounded-xl text-xs font-medium bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border border-emerald-200';
                alertBox.textContent = `Confirmation email sent to ${email}! Please click the link in your email to activate your account.`;
                alertBox.classList.remove('hidden');
              }
            } else if (authMode === 'magic') {
              const redirectTarget = window.location.href.split('#')[0];
              const { error } = await supabaseClient.auth.signInWithOtp({
                email,
                options: { emailRedirectTo: redirectTarget }
              });
              if (error) throw error;
              alertBox.className = 'p-2.5 rounded-xl text-xs font-medium bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border border-emerald-200';
              alertBox.textContent = `Magic link sent to ${email}! Check your inbox and click the link to log in instantly.`;
              alertBox.classList.remove('hidden');
            }
          } catch (err) {
            if (alertBox) {
              alertBox.className = 'p-2.5 rounded-xl text-xs font-medium bg-rose-50 dark:bg-rose-950 text-rose-800 dark:text-rose-200 border border-rose-200';
              alertBox.textContent = err.message || 'Authentication failed. Please check credentials.';
              alertBox.classList.remove('hidden');
            }
          } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = authMode === 'signin' ? 'Sign In & Sync' : authMode === 'signup' ? 'Create Free Account & Sync' : 'Send Magic Login Link';
          }
        });
      }

      modal.classList.remove('hidden');
    }

    function closeCloudModal() {
      document.getElementById('cloud-modal-container')?.classList.add('hidden');
    }

    function saveData(syncCloud = true) {
      try {
        localStorage.setItem('artha_data_v6', JSON.stringify(appData));
        if (syncCloud && typeof syncPortfolioToCloud === 'function') {
          syncPortfolioToCloud();
        }
      } catch (e) {
        console.warn('Storage error', e);
      }
    }

