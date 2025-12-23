
import React, { useState } from 'react';

const PersistentSupportButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-3">
      {isOpen && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-2xl border border-rose-100 dark:border-rose-900/50 w-64 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 text-sm transition-colors">Need immediate help?</h4>
          <div className="space-y-3">
            <a href="tel:988" className="flex items-center gap-3 p-3 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-2xl hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors">
              <span className="font-black text-xs">988</span>
              <span className="text-xs font-bold">Suicide Lifeline</span>
            </a>
            <a href="sms:741741" className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <span className="font-black text-[10px]">SMS</span>
              <span className="text-xs font-bold text-center">Text HOME to 741741</span>
            </a>
          </div>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-90 ${isOpen ? 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900' : 'bg-rose-500 text-white'}`}
      >
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
        )}
      </button>
    </div>
  );
};

export default PersistentSupportButton;
