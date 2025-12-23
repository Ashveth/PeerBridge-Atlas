
import React, { useState } from 'react';

interface ConnectionModalProps {
  targetAlias: string;
  onClose: () => void;
  onSend: (note: string) => void;
}

const TEMPLATES = [
  "Your story resonated with me deeply. I'd like to offer a safe space to chat.",
  "I'm navigating something similar and found your perspective helpful. Could we connect?",
  "Thank you for sharing your vulnerability. I'd love to support you peer-to-peer."
];

const ConnectionModal: React.FC<ConnectionModalProps> = ({ targetAlias, onClose, onSend }) => {
  const [note, setNote] = useState(TEMPLATES[0]);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-neutral-900 max-w-lg w-full rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100 dark:border-neutral-800">
        <div className="p-10">
          <h3 className="text-2xl font-bold brand-font text-slate-900 dark:text-neutral-50 mb-2">Send a Kind Note</h3>
          <p className="text-slate-500 dark:text-neutral-400 text-sm mb-8 italic">To: @{targetAlias}</p>
          
          <div className="space-y-4 mb-8">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Choose a starting point</label>
            <div className="flex flex-wrap gap-2">
              {TEMPLATES.map((t, i) => (
                <button 
                  key={i} 
                  onClick={() => setNote(t)}
                  className={`text-[11px] px-4 py-2 rounded-xl border transition-all text-left max-w-full ${note === t ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none' : 'bg-slate-50 dark:bg-neutral-800 border-transparent text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-neutral-700'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <textarea 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-slate-50 dark:bg-neutral-800 border-none rounded-2xl p-5 text-sm dark:text-neutral-100 outline-none focus:ring-2 focus:ring-indigo-100 transition-all min-h-[120px] resize-none"
              placeholder="Write your note here..."
            />
          </div>

          <div className="flex items-start gap-3 mb-8 bg-amber-50 dark:bg-amber-950/20 p-4 rounded-2xl border border-amber-100 dark:border-amber-900/30">
            <input 
              type="checkbox" 
              id="safety-agree" 
              checked={agreed} 
              onChange={() => setAgreed(!agreed)}
              className="mt-1 accent-indigo-600"
            />
            <label htmlFor="safety-agree" className="text-[11px] text-amber-800 dark:text-amber-400 leading-relaxed font-medium">
              I understand this is anonymous peer support, not professional therapy. I agree not to share personal contact information (phones, social IDs).
            </label>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 py-4 text-slate-400 text-xs font-black uppercase tracking-widest hover:text-slate-600 transition-all"
            >
              Cancel
            </button>
            <button 
              disabled={!agreed || !note.trim()}
              onClick={() => { onSend(note); onClose(); }}
              className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100 dark:shadow-none hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100"
            >
              Establish Bridge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionModal;
