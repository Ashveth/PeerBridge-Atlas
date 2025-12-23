
import React, { useState } from 'react';
import { MOOD_TYPES, MoodEntry } from '../types';

interface MoodTrackerProps {
  moodEntries: MoodEntry[];
  onAddMood: (type: string, label: string, note?: string) => void;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ moodEntries, onAddMood }) => {
  const [selectedMood, setSelectedMood] = useState<{type: string, label: string} | null>(null);
  const [note, setNote] = useState('');
  
  const latestMood = moodEntries[0];
  const lastEntryToday = latestMood && new Date(latestMood.timestamp).toDateString() === new Date().toDateString();

  const handleLogMood = () => {
    if (selectedMood) {
      onAddMood(selectedMood.type, selectedMood.label, note.trim() || undefined);
      setSelectedMood(null);
      setNote('');
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-[2.5rem] border border-slate-100 dark:border-neutral-800 p-8 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Internal Compass</h3>
          <h2 className="text-2xl font-bold brand-font text-slate-900 dark:text-neutral-50">How are you feeling?</h2>
        </div>
        {lastEntryToday && (
          <div className="bg-emerald-50 dark:bg-emerald-950/20 px-4 py-2 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 animate-in fade-in zoom-in duration-300">
             <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Logged for today</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
        {MOOD_TYPES.map((m) => (
          <button
            key={m.type}
            onClick={() => setSelectedMood({type: m.type, label: m.label})}
            className={`group relative flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all active:scale-95 ${
              selectedMood?.type === m.type
                ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-600 shadow-md scale-105'
                : 'bg-slate-50 dark:bg-neutral-800/30 border-transparent hover:border-slate-200 dark:hover:border-neutral-700'
            }`}
          >
            <span className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">{m.emoji}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-neutral-400">{m.label}</span>
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="animate-in slide-in-from-top-4 duration-300 space-y-4 mb-10">
          <div className="relative">
            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Context (Optional)</label>
            <textarea
              placeholder={`Why do you feel ${selectedMood.label.toLowerCase()}?...`}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-5 py-3 bg-slate-50 dark:bg-neutral-800 border border-transparent dark:border-neutral-700 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 transition-all font-medium text-sm dark:text-neutral-100 resize-none"
              rows={2}
            />
          </div>
          <button
            onClick={handleLogMood}
            className="w-full py-4 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 dark:shadow-none transition-all active:scale-95"
          >
            Check In as {selectedMood.label}
          </button>
        </div>
      )}

      <div className="border-t border-slate-50 dark:border-neutral-800 pt-8">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Recent Trajectory</h4>
        {moodEntries.length === 0 ? (
          <p className="text-xs text-slate-400 italic text-center py-4">Your emotional map is waiting for its first point.</p>
        ) : (
          <div className="flex items-center gap-4 overflow-x-auto pb-6 scrollbar-hide">
            {moodEntries.slice(0, 10).map((entry) => {
              const moodType = MOOD_TYPES.find(m => m.type === entry.type);
              return (
                <div key={entry.id} className="flex flex-col items-center shrink-0 group/entry relative">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${moodType?.color || 'from-slate-200 to-slate-300'} flex items-center justify-center text-white text-xl shadow-sm mb-2 transition-all hover:scale-110 cursor-help`}>
                    {moodType?.emoji}
                  </div>
                  <p className="text-[9px] font-black text-slate-400 dark:text-neutral-500 uppercase tracking-tighter">
                    {new Date(entry.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </p>
                  
                  {entry.note && (
                    <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 bg-slate-900 text-white p-3 rounded-xl text-[10px] leading-relaxed shadow-xl opacity-0 group-hover/entry:opacity-100 transition-opacity pointer-events-none z-20 text-center">
                      <p className="font-bold mb-1 uppercase tracking-widest opacity-60 text-[8px]">Context</p>
                      "{entry.note}"
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodTracker;
