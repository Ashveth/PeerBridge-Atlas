
import React, { useState, useRef, useEffect } from 'react';
import { Story, Comment, ConnectionRequest, ConnectionStatus, emotionColors } from '../types';
import SnapshotCard from './SnapshotCard';
import ConnectionModal from './ConnectionModal';

interface StoryCardProps {
  story: Story;
  onAddComment: (content: string) => void;
  onDeleteComment?: (commentId: string) => void;
  onHelpfulComment?: (commentId: string) => void;
  onUpliftStory?: () => void;
  onEditStory?: (newContent: string) => Promise<void>;
  onSendConnectionRequest?: (storyId: string, receiverAlias: string, note: string) => void;
  connections?: ConnectionRequest[];
  currentUserAlias?: string;
}

const INITIAL_COMMENTS_LIMIT = 8;

const StoryCard: React.FC<StoryCardProps> = ({ story, onAddComment, onDeleteComment, onHelpfulComment, onUpliftStory, onEditStory, onSendConnectionRequest, connections = [], currentUserAlias }) => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showSnapshot, setShowSnapshot] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [commentToDeleteId, setCommentToDeleteId] = useState<string | null>(null);
  const [showAllComments, setShowAllComments] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(story.content);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const handleStartEdit = () => {
    setEditContent(story.content);
    setIsEditing(true);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentContent.trim()) {
      onAddComment(commentContent);
      setCommentContent('');
    }
  };

  const handleSaveAttempt = () => {
    if (editContent.trim() !== story.content) {
      setShowSaveConfirm(true);
    } else {
      setIsEditing(false); 
    }
  };

  const handleConfirmSave = async () => {
    setShowSaveConfirm(false);
    if (editContent.trim() && onEditStory) {
      setIsSavingEdit(true);
      await onEditStory(editContent);
      setIsSavingEdit(false);
      setIsEditing(false);
    }
  };

  const handleConfirmDeleteComment = () => {
    if (commentToDeleteId && onDeleteComment) {
      onDeleteComment(commentToDeleteId);
      setCommentToDeleteId(null);
    }
  };

  const comments = story.comments || [];
  const visibleComments = showAllComments ? comments : comments.slice(0, INITIAL_COMMENTS_LIMIT);
  const hasMoreComments = comments.length > INITIAL_COMMENTS_LIMIT;

  const existingRequest = connections.find(c => c.storyId === story.id && c.senderAlias === currentUserAlias);
  const isPending = existingRequest?.status === ConnectionStatus.PENDING;
  const isConnected = existingRequest?.status === ConnectionStatus.CONNECTED;

  const isOwner = currentUserAlias === story.author;

  const primaryEmotion = story.analysis?.emotionalTone[0] || 'Reflective';
  const emotionGradient = emotionColors[primaryEmotion] || emotionColors.Reflective;

  const avatarSeed = story.authorAvatarSeed || story.author;
  const avatarColor = story.authorAvatarColor || 'transparent';
  const avatarUrl = `https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURIComponent(avatarSeed)}&backgroundColor=${encodeURIComponent(avatarColor.replace('#', ''))}`;

  return (
    <>
      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-slate-100 dark:border-neutral-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] hover:-translate-y-1.5 hover:border-indigo-100 dark:hover:border-indigo-900 group relative">
        <div className={`absolute inset-0 bg-gradient-to-br ${emotionGradient} opacity-[0.04] dark:opacity-[0.1] pointer-events-none`}></div>
        
        <div className="p-10 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-indigo-200 dark:group-hover:shadow-indigo-900/40 group-hover:shadow-lg overflow-hidden border-2 border-white/20">
                <img 
                  src={avatarUrl} 
                  alt={`${story.author}'s avatar`}
                  className="w-10 h-10 object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-slate-900 dark:text-neutral-100 tracking-tight transition-colors duration-300 group-hover:text-indigo-900 dark:group-hover:text-indigo-400">@{story.author}</h4>
                  {isOwner && !isEditing && (
                    <button 
                      onClick={handleStartEdit}
                      className="px-2 py-1 text-[9px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 rounded-md hover:bg-indigo-600 hover:text-white transition-all transform active:scale-95"
                    >
                      Edit Story
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-400 dark:text-neutral-500 font-medium uppercase tracking-wider">{story.timestamp.toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={(e) => { e.stopPropagation(); onUpliftStory?.(); }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all active:scale-90 group/uplift"
              >
                <svg className="h-3.5 w-3.5 transition-transform group-hover/uplift:scale-125" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                <span>{story.upliftCount || 0} Uplifts</span>
              </button>
            </div>
          </div>

          <div className="mb-10">
            {isEditing ? (
              <div className="space-y-4 animate-in fade-in duration-300">
                <textarea 
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-neutral-800 border border-indigo-100 dark:border-neutral-700 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 transition-all font-medium text-lg leading-relaxed dark:text-neutral-100 min-h-[150px] resize-none"
                  autoFocus
                />
                <div className="flex gap-3">
                  <button 
                    disabled={isSavingEdit || !editContent.trim()}
                    onClick={handleSaveAttempt}
                    className="px-6 py-2.5 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none active:scale-95 flex items-center gap-2"
                  >
                    {isSavingEdit && (
                      <svg className="animate-spin h-3 w-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" />
                        <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    )}
                    {isSavingEdit ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button 
                    disabled={isSavingEdit}
                    onClick={() => { setIsEditing(false); setEditContent(story.content); }}
                    className="px-6 py-2.5 bg-slate-100 dark:bg-neutral-800 text-slate-500 dark:text-neutral-400 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-200 dark:hover:bg-neutral-700 transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-slate-700 dark:text-neutral-300 leading-relaxed text-lg font-medium whitespace-pre-wrap transition-colors duration-500 group-hover:text-slate-900 dark:group-hover:text-neutral-100">
                {story.content}
              </p>
            )}
          </div>

          {!isEditing && story.analysis && (
            <div className="flex flex-wrap gap-2.5 mb-10">
              {story.analysis.emotionalTone.map(tone => (
                <span key={tone} className="px-4 py-1.5 bg-slate-50 dark:bg-neutral-800 text-slate-500 dark:text-neutral-400 border border-slate-100 dark:border-neutral-700 rounded-xl text-xs font-bold uppercase tracking-wide transition-all duration-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-100 dark:hover:border-indigo-800 hover:scale-105 cursor-default">
                  {tone}
                </span>
              ))}
            </div>
          )}

          <div className="border-t border-slate-50 dark:border-neutral-800 pt-8 flex flex-wrap gap-4 justify-between items-center">
            <div className="flex gap-3">
              <button 
                onClick={() => { setShowAnalysis(!showAnalysis); setShowComments(false); }}
                className={`px-6 py-2.5 rounded-2xl text-xs font-extrabold uppercase tracking-widest transition-all duration-300 transform active:scale-95 hover:scale-105 ${showAnalysis ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none' : 'bg-indigo-50 dark:bg-neutral-800/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-neutral-800 hover:shadow-md'}`}
              >
                AI Insight
              </button>
              <button 
                onClick={() => { setShowComments(!showComments); setShowAnalysis(false); }}
                className={`px-6 py-2.5 rounded-2xl text-xs font-extrabold uppercase tracking-widest transition-all duration-300 transform active:scale-95 hover:scale-105 ${showComments ? 'bg-purple-600 text-white shadow-lg shadow-purple-100 dark:shadow-none' : 'bg-purple-50 dark:bg-neutral-800/50 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-neutral-800 hover:shadow-md'}`}
              >
                {comments.length} {comments.length === 1 ? 'Response' : 'Responses'}
              </button>
              {isConnected ? (
                <button 
                  disabled
                  className="px-6 py-2.5 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all cursor-default"
                >
                  Bridge Active
                </button>
              ) : isPending ? (
                <button 
                  disabled
                  className="px-6 py-2.5 bg-slate-100 dark:bg-neutral-800 text-slate-400 dark:text-neutral-500 text-[10px] font-black uppercase tracking-widest rounded-2xl border border-slate-200 dark:border-neutral-700 cursor-not-allowed"
                >
                  Pending
                </button>
              ) : (
                <button 
                  disabled={!currentUserAlias || isOwner}
                  onClick={() => setShowConnectModal(true)}
                  className="px-6 py-2.5 bg-slate-50 dark:bg-neutral-800 text-slate-400 dark:text-neutral-500 text-xs font-extrabold uppercase tracking-widest rounded-2xl hover:bg-indigo-600 hover:text-white transition-all transform active:scale-95 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
                >
                  Private Connect
                </button>
              )}
            </div>
            
            <button 
              onClick={() => setShowSnapshot(true)}
              className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest underline decoration-dotted underline-offset-4"
            >
              Export Snapshot
            </button>
          </div>
        </div>

        {showAnalysis && story.analysis && (
          <div className="bg-indigo-50/40 dark:bg-indigo-900/5 p-10 border-t border-slate-100 dark:border-neutral-800 animate-in slide-in-from-top-4 duration-500 relative z-10">
            <div className="flex gap-5 mb-8">
              <div className="bg-white dark:bg-neutral-800 p-3 rounded-2xl shadow-sm border border-indigo-100 dark:border-neutral-700 shrink-0 h-fit">
                <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41M12 7a5 5 0 100 10 5 5 0 000-10z"/></svg>
              </div>
              <div>
                <h5 className="text-[10px] font-black text-indigo-900 dark:text-indigo-300 uppercase tracking-[0.2em] mb-2">Bridge Analysis</h5>
                <p className="text-slate-700 dark:text-neutral-300 text-base leading-relaxed font-medium">"{story.analysis.summary}"</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-6 rounded-3xl border border-indigo-100 dark:border-neutral-700 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                <h6 className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  Strategies
                </h6>
                <div className="space-y-5">
                  {story.analysis.copingStrategies.map((s, i) => (
                    <div key={i} className="group/strat">
                      <div className="flex items-center gap-2 mb-1">
                         <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-lg text-[8px] font-black uppercase transition-colors group-hover/strat:bg-indigo-600 dark:group-hover/strat:bg-indigo-400 group-hover/strat:text-white dark:group-hover/strat:text-neutral-900">{s.type}</span>
                         <p className="font-bold text-sm text-slate-900 dark:text-neutral-100 group-hover/strat:text-indigo-600 dark:group-hover/strat:text-indigo-400 transition-colors">{s.title}</p>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed font-medium pl-1">{s.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              {story.analysis.culturalNuance && (
                <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-6 rounded-3xl border border-amber-100 dark:border-amber-900/40 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                  <h6 className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Cultural Note
                  </h6>
                  <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed font-medium">{story.analysis.culturalNuance}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {showComments && (
          <div className="bg-purple-50/40 dark:bg-purple-900/5 p-10 border-t border-slate-100 dark:border-neutral-800 animate-in slide-in-from-top-4 duration-500 relative z-10">
            <div className="space-y-4 mb-8">
              {comments.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {visibleComments.map(c => (
                      <div key={c.id} className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-5 rounded-2xl border border-purple-100 dark:border-neutral-700 shadow-sm transition-all hover:bg-white dark:hover:bg-neutral-800 hover:scale-[1.01] hover:shadow-md group/comment">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-neutral-100 text-sm tracking-tight transition-colors group-hover/comment:text-purple-600 dark:group-hover/comment:text-purple-400">@{c.author}</span>
                            {currentUserAlias === c.author && (
                              <button 
                                onClick={() => setCommentToDeleteId(c.id)}
                                className="p-1 text-slate-300 hover:text-rose-500 transition-colors"
                                title="Delete response"
                              >
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 dark:text-neutral-500 font-bold uppercase tracking-wider">
                            {new Date(c.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} • {new Date(c.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-neutral-400 text-sm leading-relaxed mb-3">{c.content}</p>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => onHelpfulComment?.(c.id)}
                            className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-purple-600 hover:text-white transition-all active:scale-95 group/helpful"
                          >
                            <svg className="h-2.5 w-2.5 group-hover/helpful:scale-125 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 10.133a1.5 1.5 0 00-.8.2z"/></svg>
                            Helpful
                          </button>
                          {c.helpfulCount !== undefined && c.helpfulCount > 0 && (
                            <span className="text-[10px] font-bold text-slate-400 dark:text-neutral-500 italic">
                              {c.helpfulCount} uplift{c.helpfulCount !== 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {hasMoreComments && !showAllComments && (
                    <button 
                      onClick={() => setShowAllComments(true)}
                      className="w-full py-4 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-[0.2em] bg-purple-100/30 dark:bg-neutral-800 rounded-2xl hover:bg-purple-100/50 dark:hover:bg-neutral-700 transition-all border border-transparent hover:border-purple-100/50"
                    >
                      View all {comments.length} responses
                    </button>
                  )}
                  {showAllComments && comments.length > INITIAL_COMMENTS_LIMIT && (
                    <button 
                      onClick={() => setShowAllComments(false)}
                      className="w-full py-4 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-slate-600 dark:hover:text-neutral-300 transition-all"
                    >
                      Show less
                    </button>
                  )}
                </>
              ) : (
                <div className="text-center py-8 bg-white/40 dark:bg-neutral-800/20 rounded-3xl border-2 border-dashed border-purple-100 dark:border-neutral-700">
                  <p className="text-sm text-slate-400 dark:text-neutral-500 font-medium">Be the first to offer support.</p>
                </div>
              )}
            </div>
            
            {currentUserAlias ? (
              <form onSubmit={handleCommentSubmit} className="flex gap-3 mt-4">
                <div className="w-24 px-4 py-3 text-sm bg-slate-50 dark:bg-neutral-800 border border-purple-100 dark:border-neutral-700 rounded-2xl flex items-center justify-center font-bold text-indigo-600">
                  @{currentUserAlias}
                </div>
                <input 
                  type="text" 
                  placeholder="Offer a kind word..." 
                  value={commentContent} 
                  onChange={(e) => setCommentContent(e.target.value)} 
                  className="flex-grow px-5 py-3 text-sm bg-white dark:bg-neutral-800 border border-purple-100 dark:border-neutral-700 rounded-2xl outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/50 transition-all font-medium dark:text-neutral-100" 
                  required 
                />
                <button 
                  type="submit" 
                  className="bg-purple-600 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-purple-100 dark:shadow-none hover:bg-purple-700 hover:scale-105 active:scale-95 transition-all"
                >
                  Post
                </button>
              </form>
            ) : (
              <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-2xl text-center text-xs font-bold text-purple-600 dark:text-purple-400">
                Please sign in to join the conversation.
              </div>
            )}
          </div>
        )}
      </div>

      {showSnapshot && story.analysis && (
        <SnapshotCard 
          author={story.author}
          date={story.timestamp}
          analysis={story.analysis}
          onClose={() => setShowSnapshot(false)}
        />
      )}

      {showConnectModal && (
        <ConnectionModal 
          targetAlias={story.author}
          onClose={() => setShowConnectModal(false)}
          onSend={(note) => onSendConnectionRequest?.(story.id, story.author, note)}
        />
      )}

      {/* Modals with Click-Outside to close logic via overlay */}
      {showSaveConfirm && (
        <div 
          className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setShowSaveConfirm(false)}
        >
          <div 
            className="bg-white dark:bg-neutral-900 max-w-sm w-full rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100 dark:border-neutral-800 p-8 text-center"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto mb-6">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-neutral-50 mb-3 brand-font">Save your changes?</h3>
            <p className="text-slate-500 dark:text-neutral-400 text-sm mb-8 leading-relaxed">
              Are you sure you want to save these changes? This will re-trigger our AI insight analysis to reflect your new perspective.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowSaveConfirm(false)}
                className="flex-1 py-3 text-slate-400 dark:text-neutral-500 text-xs font-black uppercase tracking-widest hover:text-slate-600 dark:hover:text-neutral-300 transition-all"
              >
                Go Back
              </button>
              <button 
                onClick={handleConfirmSave}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all active:scale-95 text-xs uppercase tracking-widest"
              >
                Yes, Save
              </button>
            </div>
          </div>
        </div>
      )}

      {commentToDeleteId && (
        <div 
          className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setCommentToDeleteId(null)}
        >
          <div 
            className="bg-white dark:bg-neutral-900 max-w-sm w-full rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100 dark:border-neutral-800 p-8 text-center"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-rose-50 dark:bg-rose-900/30 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-400 mx-auto mb-6">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-neutral-50 mb-3 brand-font">Remove response?</h3>
            <p className="text-slate-500 dark:text-neutral-400 text-sm mb-8 leading-relaxed">
              Are you sure you want to delete this kindness? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setCommentToDeleteId(null)}
                className="flex-1 py-3 text-slate-400 dark:text-neutral-500 text-xs font-black uppercase tracking-widest hover:text-slate-600 dark:hover:text-neutral-300 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmDeleteComment}
                className="flex-1 bg-rose-600 text-white py-3 rounded-2xl font-bold shadow-lg shadow-rose-100 dark:shadow-none hover:bg-rose-700 transition-all active:scale-95 text-xs uppercase tracking-widest"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StoryCard;
