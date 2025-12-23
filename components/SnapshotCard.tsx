
import React from 'react';
import { StoryAnalysis, emotionColors } from '../types';

interface SnapshotCardProps {
  author: string;
  date: Date;
  analysis: StoryAnalysis;
  onClose: () => void;
}

const SnapshotCard: React.FC<SnapshotCardProps> = ({ author, date, analysis, onClose }) => {
  const primaryEmotion = analysis.emotionalTone[0] || 'Reflective';
  const colorGradient = emotionColors[primaryEmotion] || emotionColors.Reflective;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/60 dark:bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative max-w-sm w-full animate-in zoom-in-95 duration-300">
        {/* The Card */}
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-[2rem] shadow-2xl overflow-hidden border-8 border-white dark:border-neutral-800">
          <div className={`aspect-square rounded-[1.5rem] bg-gradient-to-br ${colorGradient} p-8 flex flex-col justify-between text-white relative overflow-hidden group`}>
            {/* Background Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-sm">P</div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">PeerBridge Snapshot</span>
              </div>
              <h3 className="text-4xl font-bold brand-font leading-tight mb-2 tracking-tight">{primaryEmotion}</h3>
              <div className="flex flex-wrap gap-1.5 opacity-90">
                {analysis.emotionalTone.slice(1).map(tone => (
                  <span key={tone} className="text-[10px] font-bold px-2 py-0.5 bg-white/20 rounded-full backdrop-blur-sm">
                    {tone}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10">
              <p className="text-sm font-medium leading-relaxed italic mb-6 opacity-90">
                "{analysis.summary.split('.')[0]}."
              </p>
              <div className="flex justify-between items-end border-t border-white/20 pt-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-0.5">Author</p>
                  <p className="font-bold text-xs">@{author}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-0.5">Date</p>
                  <p className="font-bold text-xs">{date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          <button 
            className="w-full bg-white dark:bg-neutral-100 text-slate-900 py-4 rounded-2xl font-bold shadow-xl hover:bg-slate-50 dark:hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 active:scale-95"
            onClick={() => window.print()} 
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            Save to Device
          </button>
          <button 
            className="w-full bg-slate-800/50 dark:bg-neutral-900/50 backdrop-blur-md text-white/80 py-3 rounded-2xl font-bold hover:bg-slate-800 dark:hover:bg-neutral-900 transition-all active:scale-95"
            onClick={onClose}
          >
            Close Snapshot
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnapshotCard;
