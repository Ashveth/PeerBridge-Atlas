
import React, { useState } from 'react';
import { checkTone } from '../geminiService';

interface ShareStoryProps {
  onShare: (content: string) => Promise<void>;
}

const ShareStory: React.FC<ShareStoryProps> = ({ onShare }) => {
  const [content, setContent] = useState('');
  const [toneFeedback, setToneFeedback] = useState<string | null>(null);
  const [isCheckingTone, setIsCheckingTone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckTone = async () => {
    if (!content.trim()) return;
    setIsCheckingTone(true);
    const feedback = await checkTone(content);
    setToneFeedback(feedback);
    setIsCheckingTone(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setIsSubmitting(true);
    await onShare(content);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom duration-500">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold brand-font text-slate-900 dark:text-neutral-50 mb-3 transition-colors">Build a Bridge</h2>
        <p className="text-slate-600 dark:text-neutral-400 transition-colors">Share your journey. Your vulnerability is someone else's map.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-neutral-800 shadow-2xl dark:shadow-black/50">
        <div className="mb-6">
          <label className="block text-xs font-black text-slate-400 dark:text-neutral-500 uppercase tracking-[0.2em] mb-3 ml-2 transition-colors">Your Story</label>
          <textarea rows={6} placeholder="How are you feeling?..." value={content} onChange={e => { setContent(e.target.value); setToneFeedback(null); }} className="w-full px-6 py-4 bg-slate-50 dark:bg-neutral-800/50 border border-transparent dark:border-neutral-700 rounded-3xl focus:bg-white dark:focus:bg-neutral-800 focus:border-indigo-100 dark:focus:border-indigo-900 outline-none transition-all resize-none font-medium text-lg dark:text-neutral-100" required />
          
          <div className="mt-4 flex flex-col gap-3">
            <button type="button" onClick={handleCheckTone} disabled={isCheckingTone || !content.trim()} className="self-start text-xs font-bold text-indigo-600 dark:text-indigo-400 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-full hover:bg-indigo-100 dark:hover:bg-neutral-800 transition-all disabled:opacity-50">
              {isCheckingTone ? "Refining Tone..." : "Check Tone & Preview"}
            </button>
            {toneFeedback && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 animate-in fade-in slide-in-from-left-2">
                <p className="text-xs text-emerald-800 dark:text-emerald-400 font-medium italic transition-colors">" {toneFeedback} "</p>
              </div>
            )}
          </div>
        </div>

        <button type="submit" disabled={isSubmitting || !content.trim()} className="w-full bg-indigo-600 text-white py-5 rounded-[2rem] font-bold shadow-xl shadow-indigo-100 dark:shadow-none hover:scale-[1.02] transition-all disabled:opacity-50 mt-4">
          {isSubmitting ? "Building Bridge..." : "Post to the Atlas"}
        </button>
      </form>
    </div>
  );
};

export default ShareStory;
