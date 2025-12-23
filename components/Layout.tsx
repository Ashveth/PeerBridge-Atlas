
import React, { useState, useEffect } from 'react';
import { AppView, User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  setView: (view: AppView) => void;
  currentUser: User | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView, currentUser, onLogout }) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const isAuthView = currentView === AppView.AUTH;

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdfe] dark:bg-neutral-950">
      {!isAuthView && (
        <header className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-slate-100 dark:border-neutral-800 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <button onClick={() => setView(AppView.FEED)} className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">P</div>
              <span className="brand-font text-xl text-slate-800 dark:text-neutral-100">
                PeerBridge <span className="text-indigo-600 dark:text-indigo-400">Atlas</span>
              </span>
            </button>
            
            <nav className="flex items-center gap-3">
              <button 
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-xl text-slate-500 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-all"
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              <div className="h-6 w-px bg-slate-100 dark:bg-neutral-800 mx-1"></div>

              {currentUser ? (
                <>
                  <button onClick={() => setView(AppView.FEED)} className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${currentView === AppView.FEED ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' : 'text-slate-500 dark:text-neutral-400 hover:bg-slate-50 dark:hover:bg-neutral-800'}`}>Feed</button>
                  <button onClick={() => setView(AppView.SANCTUARY)} className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${currentView === AppView.SANCTUARY ? 'text-teal-600 bg-teal-50 dark:bg-teal-900/30' : 'text-slate-500 dark:text-neutral-400 hover:bg-slate-50 dark:hover:bg-neutral-800'}`}>Sanctuary</button>
                  <button onClick={() => setView(AppView.MY_SPACE)} className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${currentView === AppView.MY_SPACE ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30' : 'text-slate-500 dark:text-neutral-400 hover:bg-slate-50 dark:hover:bg-neutral-800'}`}>
                    @{currentUser.alias}
                  </button>
                  <button onClick={onLogout} className="p-2 text-slate-400 hover:text-rose-500 transition-colors" title="Logout">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                  </button>
                  <button onClick={() => setView(AppView.SHARE)} className="ml-2 bg-indigo-600 text-white px-5 py-2 rounded-full text-xs font-bold shadow-indigo-100 dark:shadow-none shadow-lg hover:scale-105 active:scale-95 transition-all">Share</button>
                </>
              ) : (
                <button onClick={() => setView(AppView.AUTH)} className="px-5 py-2 bg-indigo-600 text-white rounded-full text-xs font-bold">Sign In</button>
              )}
            </nav>
          </div>
        </header>
      )}

      <main className="flex-grow">{children}</main>

      {!isAuthView && (
        <footer className="bg-slate-900 dark:bg-neutral-900 text-slate-400 dark:text-neutral-500 py-12 px-4 mt-12">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div>
              <h3 className="text-white dark:text-neutral-100 font-bold mb-4 brand-font text-lg">PeerBridge Atlas</h3>
              <p>Peer support and AI education. Not medical advice.</p>
            </div>
            <div className="flex flex-col gap-2">
              <p>Crisis Text Line: HOME to 741741</p>
              <p>USA Support: 988</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
