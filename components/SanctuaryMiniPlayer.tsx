
import React from 'react';
import { AudioTrack } from '../types';

interface SanctuaryMiniPlayerProps {
  track: AudioTrack;
  isPlaying: boolean;
  onToggle: () => void;
  onStop: () => void;
  volume: number;
  setVolume: (v: number) => void;
  timeLeft: number | null;
  onExpand: () => void;
}

const SanctuaryMiniPlayer: React.FC<SanctuaryMiniPlayerProps> = ({ track, isPlaying, onToggle, onStop, volume, setVolume, timeLeft, onExpand }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-teal-100 dark:border-teal-900/30 rounded-[2rem] shadow-2xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-grow overflow-hidden">
          <button 
            onClick={onExpand}
            className="w-10 h-10 rounded-2xl bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center text-xl shrink-0 shadow-sm hover:scale-105 transition-transform"
          >
            {track.emoji}
          </button>
          <div className="truncate cursor-pointer" onClick={onExpand}>
            <p className="text-[10px] font-black uppercase tracking-widest text-teal-600 dark:text-teal-400">Sanctuary Playing</p>
            <p className="text-sm font-bold text-slate-900 dark:text-neutral-50 truncate">{track.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 pr-2">
          {timeLeft !== null && (
            <span className="text-[10px] font-black text-slate-400 tabular-nums">{formatTime(timeLeft)}</span>
          )}
          
          <button 
            onClick={onToggle}
            className="w-10 h-10 rounded-full bg-slate-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
          >
            {isPlaying ? (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            ) : (
              <svg className="h-5 w-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
            )}
          </button>

          <button 
            onClick={onStop}
            className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-colors"
            title="Stop Sanctuary"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 border-l border-slate-100 dark:border-neutral-800 pl-4 mr-2">
          <svg className="h-3 w-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" /></svg>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume} 
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-16 h-1 bg-teal-100 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
          />
        </div>
      </div>
    </div>
  );
};

export default SanctuaryMiniPlayer;
