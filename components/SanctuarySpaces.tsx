
import React, { useState, useEffect } from 'react';
import { AudioTrack, SANCTUARY_TRACKS } from '../types';

interface SanctuarySpacesProps {
  activeTrack: AudioTrack | null;
  isPlaying: boolean;
  volume: number;
  setVolume: (v: number) => void;
  timeLeft: number | null;
  onStart: (track: AudioTrack, durationMins: number) => void;
  onToggle: () => void;
  onStop: () => void;
}

const SanctuarySpaces: React.FC<SanctuarySpacesProps> = ({ 
  activeTrack, 
  isPlaying, 
  volume, 
  setVolume, 
  timeLeft, 
  onStart, 
  onToggle, 
  onStop 
}) => {
  const [duration, setDuration] = useState(10);
  const [asmrEnabled, setAsmrEnabled] = useState(() => {
    const saved = localStorage.getItem('atlas_asmr_enabled');
    return saved === null ? true : saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('atlas_asmr_enabled', asmrEnabled.toString());
  }, [asmrEnabled]);

  const categories = asmrEnabled 
    ? (['Nature', 'Ambient', 'ASMR', 'Guided'] as const)
    : (['Nature', 'Ambient', 'Guided'] as const);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom duration-700 max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold brand-font text-slate-900 dark:text-neutral-50 mb-4 transition-colors">Sanctuary Spaces</h1>
        <p className="text-slate-600 dark:text-neutral-400 max-w-md mx-auto">
          Ground yourself with calming background audio. Perfect for journaling or deep reading.
        </p>
      </div>

      {activeTrack && (
        <div className="bg-gradient-to-br from-teal-600 to-teal-800 p-1 rounded-[3rem] shadow-2xl mb-12 animate-in zoom-in duration-500">
          <div className="bg-white dark:bg-neutral-900 rounded-[2.8rem] p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 rounded-[2rem] bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-5xl shadow-inner shrink-0">
                {activeTrack.emoji}
              </div>
              <div className="flex-grow text-center md:text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400 mb-2">Currently Grounding</p>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-neutral-50 brand-font mb-4">{activeTrack.title}</h2>
                
                <div className="flex items-center justify-center md:justify-start gap-8 mb-6">
                  <div className="text-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Time Left</p>
                    <p className="text-xl font-bold text-slate-700 dark:text-neutral-200 tabular-nums">{timeLeft !== null ? formatTime(timeLeft) : '--:--'}</p>
                  </div>
                  <div className="h-8 w-px bg-slate-100 dark:bg-neutral-800"></div>
                  <div className="text-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Category</p>
                    <p className="text-sm font-bold text-teal-600 dark:text-teal-400">{activeTrack.category}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={onToggle}
                      className="w-14 h-14 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-100 dark:shadow-none hover:bg-teal-700 hover:scale-110 active:scale-95 transition-all"
                    >
                      {isPlaying ? (
                        <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                      ) : (
                        <svg className="h-7 w-7 ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                      )}
                    </button>
                    <button 
                      onClick={onStop}
                      className="px-6 py-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all active:scale-95"
                    >
                      Stop
                    </button>
                  </div>

                  <div className="flex-grow w-full sm:w-auto bg-slate-50 dark:bg-neutral-800/50 p-4 rounded-3xl flex items-center gap-4 border border-slate-100 dark:border-neutral-800">
                    <svg className="h-4 w-4 text-slate-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" /></svg>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.01" 
                      value={volume} 
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="flex-grow h-1.5 bg-teal-100 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-neutral-900 p-8 rounded-[3rem] border border-slate-100 dark:border-neutral-800 shadow-2xl mb-8 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 border-b border-slate-50 dark:border-neutral-800 pb-8">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Start a Session</h3>
            <div className="flex gap-2">
              {[5, 10, 15].map(d => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${duration === d ? 'bg-teal-600 text-white shadow-lg' : 'bg-slate-50 dark:bg-neutral-800 text-slate-500 hover:bg-slate-100'}`}
                >
                  {d} min
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
             <div className="flex items-center gap-3">
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Include ASMR</span>
               <button 
                onClick={() => setAsmrEnabled(!asmrEnabled)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 relative ${asmrEnabled ? 'bg-teal-500' : 'bg-slate-200 dark:bg-neutral-800'}`}
               >
                 <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${asmrEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
               </button>
             </div>
          </div>
        </div>

        <div className="space-y-10">
          {categories.map(cat => (
            <div key={cat} className="animate-in fade-in slide-in-from-top-2 duration-500">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${cat === 'ASMR' ? 'bg-purple-500' : 'bg-teal-500'}`}></span>
                {cat}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SANCTUARY_TRACKS.filter(t => t.category === cat).map(track => (
                  <button
                    key={track.id}
                    onClick={() => onStart(track, duration)}
                    className={`group relative p-5 rounded-3xl text-left transition-all border-2 overflow-hidden ${activeTrack?.id === track.id ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/10' : 'border-slate-50 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-800/30 hover:border-teal-200 hover:bg-white dark:hover:bg-neutral-800'}`}
                  >
                    <div className="flex items-center gap-3 relative z-10">
                      <span className="text-2xl transition-transform group-hover:scale-125 duration-500">{track.emoji}</span>
                      <span className="font-bold text-sm text-slate-800 dark:text-neutral-100">{track.title}</span>
                    </div>
                    {activeTrack?.id === track.id && (
                      <div className="absolute right-4 bottom-4 w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/10 p-6 rounded-3xl border border-amber-100 dark:border-amber-900/30 flex items-start gap-3">
        <svg className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xs text-amber-800 dark:text-amber-400 font-medium leading-relaxed italic">
          Disclaimer: Sanctuary Spaces is for sensory relaxation and emotional regulation only. It is not a clinical intervention or professional therapeutic advice.
        </p>
      </div>
    </div>
  );
};

export default SanctuarySpaces;
