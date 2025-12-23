
import React, { useState } from 'react';
import { Story, ConnectionRequest } from '../types';
import StoryCard from './StoryCard';

interface FeedProps {
  stories: Story[];
  onAddComment: (storyId: string, content: string) => void;
  onDeleteComment: (storyId: string, commentId: string) => void;
  onHelpfulComment: (storyId: string, commentId: string) => void;
  onUpliftStory: (storyId: string) => void;
  onEditStory: (storyId: string, newContent: string) => Promise<void>;
  onSendConnectionRequest: (storyId: string, receiverAlias: string, note: string) => void;
  connections: ConnectionRequest[];
  currentUserAlias?: string;
}

const PAGE_SIZE = 5;

const Feed: React.FC<FeedProps> = ({ stories, onAddComment, onDeleteComment, onHelpfulComment, onUpliftStory, onEditStory, onSendConnectionRequest, connections, currentUserAlias }) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [filter, setFilter] = useState<string>('All');

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + PAGE_SIZE);
      setIsLoadingMore(false);
    }, 800);
  };

  // Extract unique emotional tones for filtering
  const allTones = ['All', ...new Set(stories.flatMap(s => s.analysis?.emotionalTone || []))];

  const filteredStories = filter === 'All' 
    ? stories 
    : stories.filter(s => s.analysis?.emotionalTone.includes(filter));

  const visibleStories = filteredStories.slice(0, visibleCount);
  const hasMore = visibleCount < filteredStories.length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-neutral-50 brand-font mb-4 transition-colors">The Human Atlas</h1>
        <p className="text-slate-600 dark:text-neutral-400 max-w-xl mx-auto transition-colors">
          Every point on this map is a shared human experience. Browse others' stories, offer support, and realize you are never truly alone.
        </p>
      </div>

      <div className="sticky top-20 z-40 py-4 bg-[#fcfdfe]/80 dark:bg-neutral-950/80 backdrop-blur-md -mx-4 px-4 border-y border-transparent transition-all">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-neutral-500">Filter Atlas</span>
              <div className="h-px w-8 bg-slate-200 dark:bg-neutral-800"></div>
            </div>
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {allTones.map(tone => (
                <button
                  key={tone}
                  onClick={() => { setFilter(tone); setVisibleCount(PAGE_SIZE); }}
                  className={`whitespace-nowrap px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 transform active:scale-95 ${filter === tone 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none' 
                    : 'bg-white dark:bg-neutral-900 text-slate-500 dark:text-neutral-400 border border-slate-100 dark:border-neutral-800 hover:border-indigo-200 dark:hover:border-indigo-800'}`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase tracking-widest px-1">
            <span>{filter === 'All' ? 'Showing Entire Map' : `Filtered by ${filter}`}</span>
            <span>{filteredStories.length} Points Found</span>
          </div>
        </div>
      </div>

      {visibleStories.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-neutral-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-neutral-800 animate-in zoom-in-95 duration-500">
          <div className="w-16 h-16 bg-slate-50 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A2 2 0 013 15.491V6a2 2 0 011.106-1.789l5.447-2.724a2 2 0 011.894 0l5.447 2.724A2 2 0 0118 6v9.491a2 2 0 01-1.106 1.789L11.447 20a2 2 0 01-1.894 0z" />
            </svg>
          </div>
          <p className="text-slate-400 dark:text-neutral-500 font-medium mb-4">No stories found in this section of the Atlas.</p>
          <button 
            onClick={() => setFilter('All')} 
            className="text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-4"
          >
            Reset Compass
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-10">
            {visibleStories.map(story => (
              <StoryCard 
                key={story.id} 
                story={story} 
                onAddComment={(content) => onAddComment(story.id, content)} 
                onDeleteComment={(commentId) => onDeleteComment(story.id, commentId)}
                onHelpfulComment={(commentId) => onHelpfulComment(story.id, commentId)}
                onUpliftStory={() => onUpliftStory(story.id)}
                onEditStory={(newContent) => onEditStory(story.id, newContent)}
                onSendConnectionRequest={onSendConnectionRequest}
                connections={connections}
                currentUserAlias={currentUserAlias}
              />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center pt-12 pb-20">
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="group relative flex items-center gap-3 px-10 py-4 bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-800 text-slate-500 dark:text-neutral-400 text-xs font-black uppercase tracking-[0.2em] rounded-[2rem] hover:bg-slate-50 dark:hover:bg-neutral-800 hover:border-indigo-300 dark:hover:border-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm active:scale-95 disabled:opacity-70"
              >
                {isLoadingMore ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Unfolding Map...</span>
                  </>
                ) : (
                  <>
                    <span>Load Older Stories</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Feed;
