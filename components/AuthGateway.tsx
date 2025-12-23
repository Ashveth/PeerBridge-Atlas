
import React, { useState } from 'react';
import { User } from '../types';

interface AuthGatewayProps {
  onLogin: (user: User) => void;
}

const AuthGateway: React.FC<AuthGatewayProps> = ({ onLogin }) => {
  const [isNew, setIsNew] = useState(true);
  const [alias, setAlias] = useState('');
  const [pin, setPin] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alias || !pin || (isNew && !agreed)) return;

    // Simple hackathon-style storage/check
    const userData: User = {
      alias,
      pin,
      joinedAt: new Date()
    };
    onLogin(userData);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center animate-in fade-in zoom-in-95 duration-500">
      <div className="max-w-md w-full bg-white dark:bg-neutral-900 rounded-[3rem] p-10 shadow-2xl border border-slate-100 dark:border-neutral-800">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-xl shadow-indigo-200 dark:shadow-none">P</div>
          <h2 className="text-3xl font-bold brand-font text-slate-900 dark:text-neutral-50 mb-2">Welcome to the Atlas</h2>
          <p className="text-slate-500 dark:text-neutral-400 text-sm">A safe space for shared journeys.</p>
        </div>

        <div className="flex bg-slate-100 dark:bg-neutral-800 p-1.5 rounded-2xl mb-8">
          <button 
            onClick={() => setIsNew(true)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isNew ? 'bg-white dark:bg-neutral-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-400'}`}
          >
            New Identity
          </button>
          <button 
            onClick={() => setIsNew(false)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${!isNew ? 'bg-white dark:bg-neutral-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-400'}`}
          >
            Resume Path
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 dark:text-neutral-500 uppercase tracking-[0.2em] mb-2 ml-2">Atlas Alias</label>
            <input 
              type="text" 
              placeholder="e.g. WanderingSpirit"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 dark:bg-neutral-800 border border-transparent dark:border-neutral-700 rounded-2xl focus:bg-white dark:focus:bg-neutral-800 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/40 outline-none transition-all font-medium dark:text-neutral-100"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 dark:text-neutral-500 uppercase tracking-[0.2em] mb-2 ml-2">Secret PIN (4 digits)</label>
            <input 
              type="password" 
              maxLength={4}
              placeholder="••••"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 dark:bg-neutral-800 border border-transparent dark:border-neutral-700 rounded-2xl focus:bg-white dark:focus:bg-neutral-800 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/40 outline-none transition-all font-medium dark:text-neutral-100 text-center tracking-[1em] text-2xl"
              required
            />
            <p className="mt-2 text-[10px] text-slate-400 text-center italic">There are no passwords to reset. Keep your Alias and PIN safe.</p>
          </div>

          {isNew && (
            <div className="flex items-start gap-3 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
              <input 
                type="checkbox" 
                id="agree" 
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                className="mt-1 accent-indigo-600"
              />
              <label htmlFor="agree" className="text-[11px] text-indigo-800 dark:text-indigo-400 leading-relaxed font-medium">
                I agree to be empathetic, keep connections anonymous, and follow the Atlas code of conduct.
              </label>
            </div>
          )}

          <button 
            type="submit"
            disabled={!alias || !pin || (isNew && !agreed)}
            className="w-full bg-indigo-600 text-white py-5 rounded-[2rem] font-bold shadow-xl shadow-indigo-100 dark:shadow-none hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50"
          >
            {isNew ? 'Create Identity' : 'Resume Journey'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthGateway;
