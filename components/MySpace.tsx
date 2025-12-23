
import React, { useState } from 'react';
import { Story, StoryAnalysis, ConnectionRequest, ConnectionStatus, User, MoodEntry, MOOD_TYPES } from '../types';
import SnapshotCard from './SnapshotCard';
import MoodTracker from './MoodTracker';

interface MySpaceProps {
  stories: Story[];
  currentUser: User;
  connections: ConnectionRequest[];
  onUpdateConnection: (requestId: string, status: ConnectionStatus) => void;
  onUpdateUser: (updates: Partial<User>) => void;
  moodEntries: MoodEntry[];
  onAddMood: (type: string, label: string, note?: string) => void;
}

const COLOR_THEMES = [
  { name: 'Pure', hex: 'transparent' },
  { name: 'Ocean', hex: '#6366f1' },
  { name: 'Rose', hex: '#f43f5e' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Slate', hex: '#475569' },
  { name: 'Midnight', hex: '#1e1b4b' },
];

const MySpace: React.FC<MySpaceProps> = ({ stories, currentUser, connections, onUpdateConnection, onUpdateUser, moodEntries, onAddMood }) => {
  const [showSummarySnapshot, setShowSummarySnapshot] = useState(false);
  const [activeTab, setActiveTab] = useState<'reflections' | 'connections'>('reflections');
  const [showAvatarCustomizer, setShowAvatarCustomizer] = useState(false);
  
  const userStories = stories.filter(s => s.author === currentUser.alias);

  const pendingIncoming = connections.filter(c => c.receiverAlias === currentUser.alias && c.status === ConnectionStatus.PENDING);
  const activeIncoming = connections.filter(c => c.receiverAlias === currentUser.alias && c.status === ConnectionStatus.CONNECTED);
  const outgoingRequests = connections.filter(c => c.senderAlias === currentUser.alias);

  const latestMoodEntry = moodEntries[0];
  const latestMoodInfo = latestMoodEntry ? MOOD_TYPES.find(m => m.type === latestMoodEntry.type) : null;

  // Formatting the join date
  const joinDate = new Date(currentUser.joinedAt);
  const formattedJoinDate = joinDate.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  const avatarSeed = currentUser.avatarSeed || currentUser.alias;
  const avatarColor = currentUser.avatarColor || 'transparent';
  const avatarUrl = `https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURIComponent(avatarSeed)}&backgroundColor=${encodeURIComponent(avatarColor.replace('#', ''))}`;

  const shuffleShapes = () => {
    const newSeed = Math.random().toString(36).substring(7);
    onUpdateUser({ avatarSeed: newSeed });
  };

  const selectColor = (hex: string) => {
    onUpdateUser({ avatarColor: hex });
  };

  const weatherAnalysis: StoryAnalysis = {
    emotionalTone: latestMoodEntry ? [latestMoodEntry.label] : ['Hopeful'],
    summary: latestMoodEntry 
      ? `Based on your recent "${latestMoodEntry.label}" mood, you are currently exploring your emotional landscape with honesty.` 
      : 'You are moving through a period of transition with growing resilience.',
    copingStrategies: [],
    isCrisis: false
  };

  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="w-20 h-20 rounded-[2.5rem] bg-gradient-to-br from-indigo-500 to-indigo-700 p-1 shadow-xl shadow-indigo-100 dark:shadow-none transition-all group-hover:scale-105">
              <div className="w-full h-full bg-white dark:bg-neutral-900 rounded-[2.3rem] flex items-center justify-center overflow-hidden">
                 <img src={avatarUrl} alt="Your Atlas Avatar" className="w-14 h-14 object-contain" />
              </div>
            </div>
            <button 
              onClick={() => setShowAvatarCustomizer(!showAvatarCustomizer)}
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-white dark:bg-neutral-800 border border-slate-100 dark:border-neutral-700 rounded-full shadow-lg flex items-center justify-center text-indigo-600 hover:scale-110 active:scale-95 transition-all"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
            </button>
          </div>
          <div>
            <h1 className="text-4xl font-bold brand-font text-slate-900 dark:text-neutral-50 mb-1 transition-colors">@{currentUser.alias}</h1>
            <div className="flex items-center gap-2 text-slate-500 dark:text-neutral-400">
               <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
               </svg>
               <span className="text-xs font-medium uppercase tracking-widest">Mapping since {formattedJoinDate}</span>
            </div>
          </div>
        </div>

        {showAvatarCustomizer && (
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-indigo-100 dark:border-neutral-800 shadow-xl animate-in slide-in-from-right-4 duration-300">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Customize Visual ID</h4>
              <button onClick={() => setShowAvatarCustomizer(false)} className="text-slate-400 hover:text-indigo-600 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[9px] font-bold text-slate-500 mb-2 uppercase">Background Theme</p>
                <div className="flex flex-wrap gap-2">
                  {COLOR_THEMES.map(theme => (
                    <button
                      key={theme.hex}
                      onClick={() => selectColor(theme.hex)}
                      title={theme.name}
                      className={`w-6 h-6 rounded-lg border-2 transition-all ${avatarColor === theme.hex ? 'border-indigo-600 scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: theme.hex === 'transparent' ? '#f8fafc' : theme.hex }}
                    >
                      {theme.hex === 'transparent' && <span className="text-[10px] text-slate-400">×</span>}
                    </button>
                  ))}
                </div>
              </div>
              <button 
                onClick={shuffleShapes}
                className="w-full py-2.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-600 hover:text-white transition-all active:scale-95"
              >
                Shuffle Geometric Shapes
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mb-12">
        <MoodTracker moodEntries={moodEntries} onAddMood={onAddMood} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className={`p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col justify-between transition-all ${latestMoodInfo ? `bg-gradient-to-br ${latestMoodInfo.color}` : 'bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-indigo-100 dark:shadow-none'}`}>
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 opacity-80">Emotional Weather</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
                {latestMoodInfo?.emoji || '🌤️'}
              </div>
              <div>
                <p className="text-2xl font-bold">{latestMoodInfo?.label || 'Calm'}</p>
                <p className="text-xs opacity-70">Trends: {latestMoodEntry?.label || 'Reflective'}</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed opacity-90 mb-6">
              {latestMoodEntry 
                ? `You've checked in today. Your ${latestMoodEntry.label.toLowerCase()} energy is part of your journey.` 
                : "Your recent shares suggest a shift toward resilience. The fog is lifting."}
            </p>
          </div>
          <button 
            disabled={userStories.length === 0 && moodEntries.length === 0}
            onClick={() => setShowSummarySnapshot(true)}
            className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-white/10 disabled:opacity-30 active:scale-95"
          >
            Generate Snapshot
          </button>
        </div>

        <div className="md:col-span-2 bg-white dark:bg-neutral-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-neutral-800 shadow-sm transition-all flex flex-col justify-between overflow-hidden">
          <div className="flex gap-8 mb-6 border-b border-slate-50 dark:border-neutral-800 pb-2">
            <button 
              onClick={() => setActiveTab('reflections')}
              className={`text-xs font-black uppercase tracking-widest pb-2 transition-all ${activeTab === 'reflections' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600 dark:hover:text-neutral-300'}`}
            >
              My Reflections ({userStories.length})
            </button>
            <button 
              onClick={() => setActiveTab('connections')}
              className={`text-xs font-black uppercase tracking-widest pb-2 transition-all relative ${activeTab === 'connections' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600 dark:hover:text-neutral-300'}`}
            >
              Kindred Bridges
              {pendingIncoming.length > 0 && (
                <span className="absolute -top-1 -right-2 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
              )}
            </button>
          </div>

          <div className="flex-grow">
            {activeTab === 'reflections' ? (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {userStories.length === 0 ? (
                  <div className="py-20 text-center">
                    <div className="w-12 h-12 bg-slate-50 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                    </div>
                    <p className="text-slate-400 italic text-sm">You haven't added to the Atlas yet.</p>
                  </div>
                ) : (
                  userStories.map(s => (
                    <div key={s.id} className="bg-slate-50 dark:bg-neutral-800/50 p-6 rounded-3xl border border-transparent flex items-center justify-between group hover:border-indigo-100 dark:hover:border-indigo-900 transition-all cursor-default">
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-slate-400 dark:text-neutral-500 text-[10px] font-bold uppercase tracking-wider">{new Date(s.timestamp).toLocaleDateString()}</p>
                          <div className="flex gap-1">
                            {s.analysis?.emotionalTone.slice(0, 2).map(tone => (
                              <span key={tone} className="px-2 py-0.5 bg-white dark:bg-neutral-900 text-[8px] font-bold text-slate-500 border border-slate-100 dark:border-neutral-800 rounded-md">{tone}</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-800 dark:text-neutral-200 font-medium line-clamp-1">{s.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {/* Pending Requests Section */}
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    Awaiting Your Response ({pendingIncoming.length})
                  </h4>
                  {pendingIncoming.length === 0 ? (
                    <p className="text-xs text-slate-400 italic mb-6 ml-1">No pending invitations. The map is quiet for now.</p>
                  ) : (
                    <div className="space-y-3 mb-6">
                      {pendingIncoming.map(req => (
                        <div key={req.id} className="bg-slate-50 dark:bg-neutral-800/50 p-5 rounded-[2rem] border border-indigo-50 dark:border-indigo-900/20 animate-in slide-in-from-right-2 duration-300">
                          <div className="mb-4">
                            <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">Note from @{req.senderAlias}</p>
                            <div className="bg-white/60 dark:bg-neutral-900/60 p-3 rounded-2xl italic">
                               <p className="text-xs text-slate-700 dark:text-neutral-300 font-medium leading-relaxed">"{req.initialNote}"</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => onUpdateConnection(req.id, ConnectionStatus.CONNECTED)}
                              className="flex-1 py-3 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 dark:shadow-none active:scale-95"
                            >
                              Accept Bridge
                            </button>
                            <button 
                              onClick={() => onUpdateConnection(req.id, ConnectionStatus.DECLINED)}
                              className="px-6 py-3 text-slate-400 dark:text-neutral-500 text-[10px] font-bold uppercase tracking-widest hover:text-rose-500 transition-all hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl active:scale-95"
                            >
                              Decline
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Active Bridges Section */}
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Established Connections ({activeIncoming.length})
                  </h4>
                  {activeIncoming.length === 0 ? (
                    <p className="text-xs text-slate-400 italic mb-6 ml-1">Connect with others to build your support bridge.</p>
                  ) : (
                    <div className="space-y-3 mb-6">
                      {activeIncoming.map(req => (
                        <div key={req.id} className="bg-white dark:bg-neutral-900/50 p-4 rounded-2xl border border-slate-100 dark:border-neutral-800 flex items-center justify-between group hover:border-emerald-100 dark:hover:border-emerald-900 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase">Kindred Peer</p>
                              <p className="text-sm font-bold text-slate-900 dark:text-neutral-100">@{req.senderAlias}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Active Bridge
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Outgoing Section */}
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    My Outgoing Invites ({outgoingRequests.length})
                  </h4>
                  {outgoingRequests.length === 0 ? (
                    <p className="text-xs text-slate-400 italic mb-6 ml-1">You haven't sent any kindred notes yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {outgoingRequests.map(req => (
                        <div key={req.id} className="bg-slate-50 dark:bg-neutral-800/20 p-4 rounded-2xl flex justify-between items-center opacity-75 group hover:opacity-100 transition-all">
                          <div className="truncate flex-grow mr-4">
                            <p className="text-[9px] font-black text-slate-500 uppercase">To @{req.receiverAlias}</p>
                            <p className="text-[11px] text-slate-600 dark:text-neutral-400 truncate italic">"{req.initialNote}"</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                             <span className={`text-[9px] font-black uppercase px-2 py-1 bg-white dark:bg-neutral-900 rounded-lg ${req.status === ConnectionStatus.CONNECTED ? 'text-emerald-600' : req.status === ConnectionStatus.DECLINED ? 'text-rose-500' : 'text-slate-400'}`}>
                               {req.status}
                             </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-indigo-50 dark:bg-indigo-900/10 p-5 rounded-3xl border border-indigo-100 dark:border-indigo-900/30 mb-12">
        <div className="w-10 h-10 bg-white dark:bg-neutral-800 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <p className="text-xs text-indigo-800 dark:text-indigo-400 leading-relaxed font-medium">
          Kindred Bridges are private, anonymous connections. We never exchange real names or professional advice. Our AI filters for safety, but if a connection feels harmful, use the <strong>Ignore</strong> feature to disconnect immediately.
        </p>
      </div>

      {showSummarySnapshot && (
        <SnapshotCard 
          author={currentUser.alias}
          date={new Date()}
          analysis={weatherAnalysis}
          onClose={() => setShowSummarySnapshot(false)}
        />
      )}
    </div>
  );
};

export default MySpace;
