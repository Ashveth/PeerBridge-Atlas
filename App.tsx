
import React, { useState, useEffect, useRef } from 'react';
import { Story, AppView, Comment, ConnectionRequest, ConnectionStatus, User, MoodEntry, AudioTrack } from './types';
import { analyzeStory } from './geminiService';
import Layout from './components/Layout';
import Feed from './components/Feed';
import ShareStory from './components/ShareStory';
import ConceptOverview from './components/ConceptOverview';
import CrisisAlert from './components/CrisisAlert';
import MySpace from './components/MySpace';
import PersistentSupportButton from './components/PersistentSupportButton';
import AuthGateway from './components/AuthGateway';
import SanctuarySpaces from './components/SanctuarySpaces';
import SanctuaryMiniPlayer from './components/SanctuaryMiniPlayer';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('atlas_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(() => {
    const saved = localStorage.getItem('atlas_mood_history');
    if (!saved) return [];
    try {
      return JSON.parse(saved).map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      }));
    } catch {
      return [];
    }
  });

  const [view, setView] = useState<AppView>(currentUser ? AppView.FEED : AppView.AUTH);
  const [connections, setConnections] = useState<ConnectionRequest[]>([]);
  
  // Audio State
  const [activeTrack, setActiveTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // seconds
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [stories, setStories] = useState<Story[]>([
    {
      id: '1',
      content: "I've been feeling so disconnected from my family lately. Moving across the country for this job was my dream, but now the silence in my apartment is deafening. I miss the noise of my parents' house.",
      author: "WanderingSpirit",
      timestamp: new Date(Date.now() - 3600000),
      tags: ["Loneliness"],
      similarFeelingCount: 12,
      upliftCount: 38,
      comments: [
        { id: 'c1', author: "CityFriend", content: "I felt exactly the same when I moved to Seattle. Finding a local 'third space' really helped me feel grounded.", timestamp: new Date(Date.now() - 3000000), helpfulCount: 5 },
        { id: 'c2', author: "Nora_K", content: "The silence can be heavy, but it's also where you'll find your new self. Sending you some warmth today.", timestamp: new Date(Date.now() - 2800000), helpfulCount: 3 },
        { id: 'c3', author: "Soul_Seeker", content: "Video calls help, but nothing beats a physical presence. Have you tried joining a local hobby group? I found a book club that changed everything for me.", timestamp: new Date(Date.now() - 2400000), helpfulCount: 7 }
      ],
      analysis: {
        emotionalTone: ["Homesick", "Isolated"],
        summary: "You're navigating a major life transition and missing home.",
        copingStrategies: [{ title: "Behavioral Activation", description: "Visit one local spot this week.", type: "CBT" }],
        culturalNuance: "Transitioning from collectivist family dynamics can be an emotional shock.",
        isCrisis: false
      }
    },
    {
      id: '2',
      content: "Does anyone else feel like they're just performing 'okay' at work while drowning inside? The pressure to be productive is immense, and I feel like I'm failing everyone.",
      author: "Echo_Cloud",
      timestamp: new Date(Date.now() - 7200000),
      tags: ["Work Stress"],
      similarFeelingCount: 45,
      upliftCount: 22,
      comments: [
        { id: 'c2_1', author: "QuietLion", content: "Imposter syndrome is a thief. You are doing much better than your brain is telling you.", timestamp: new Date(Date.now() - 6000000), helpfulCount: 11 },
        { id: 'c2_2', author: "Daily_Survivor", content: "I started setting 'hard stops' at 5 PM. It was scary at first, but the work was still there the next day.", timestamp: new Date(Date.now() - 5000000), helpfulCount: 4 }
      ],
      analysis: {
        emotionalTone: ["Overwhelmed", "Anxious"],
        summary: "The weight of expectations is making you feel like you aren't enough.",
        copingStrategies: [{ title: "Cognitive Reframing", description: "Challenge the thought that worth is tied to productivity.", type: "CBT" }],
        isCrisis: false
      }
    },
    {
      id: '4',
      content: "My parents expect me to take over the family business, but I've always wanted to be an artist. Every time I think about telling them, my chest gets tight. I don't want to dishonor them, but I'm dying inside.",
      author: "DutifulSon",
      timestamp: new Date(Date.now() - 15000000),
      tags: ["Family", "Career"],
      similarFeelingCount: 28,
      upliftCount: 54,
      comments: [
        { id: 'c4_1', author: "ArtistBound", content: "The weight of expectation is so heavy. You aren't dishonoring them by living your truth.", timestamp: new Date(Date.now() - 14000000), helpfulCount: 9 },
        { id: 'c4_2', author: "Elder_Grace", content: "In my culture, we say the first duty is to the family, but the second is to the soul. You need both.", timestamp: new Date(Date.now() - 10000000), helpfulCount: 14 }
      ],
      analysis: {
        emotionalTone: ["Reflective", "Anxious"],
        summary: "You are caught between cultural loyalty and personal fulfillment.",
        copingStrategies: [
          { title: "Value Clarification", description: "Identify which values are yours vs. inherited.", type: "CBT" },
          { title: "Box Breathing", description: "Calm the physical tightness in your chest.", type: "Grounding" }
        ],
        culturalNuance: "Filial piety often creates a 'double bind' in career decisions.",
        isCrisis: false
      }
    },
    {
      id: '5',
      content: "I've been caring for my sick mother for two years now. I love her, but sometimes I feel so angry that my life has stopped while my friends are traveling and getting married. Then I feel guilty for being angry.",
      author: "SilentCaregiver",
      timestamp: new Date(Date.now() - 25000000),
      tags: ["Caregiving", "Burnout"],
      similarFeelingCount: 67,
      upliftCount: 89,
      comments: [
        { id: 'c5_1', author: "BeenThere", content: "Caregiver resentment is the most natural thing in the world. It doesn't mean you don't love her.", timestamp: new Date(Date.now() - 20000000), helpfulCount: 21 },
        { id: 'c5_2', author: "Healing_Heart", content: "You are doing holy work, but even saints need a break. Please find an hour for yourself today.", timestamp: new Date(Date.now() - 18000000), helpfulCount: 15 }
      ],
      analysis: {
        emotionalTone: ["Resentful", "Overwhelmed"],
        summary: "You are experiencing deep compassion fatigue and valid grief for your own life.",
        copingStrategies: [
          { title: "Radical Acceptance", description: "Accept the anger without judging it.", type: "CBT" },
          { title: "Self-Compassion Pause", description: "Treat yourself with the same kindness you give your mother.", type: "Mindfulness" }
        ],
        isCrisis: false
      }
    },
    {
      id: '6',
      content: "After months of therapy and finally finding the right medication, I woke up today and actually felt... okay. Not happy, not sad, just steady. It feels like the first breath of air after being underwater.",
      author: "SurfaceBreather",
      timestamp: new Date(Date.now() - 40000000),
      tags: ["Recovery"],
      similarFeelingCount: 112,
      upliftCount: 342,
      comments: [
        { id: 'c6_1', author: "StillFighting", content: "This gives me so much hope. Thank you for sharing the light at the end of the tunnel.", timestamp: new Date(Date.now() - 35000000), helpfulCount: 45 },
        { id: 'c6_2', author: "CompassPoint", content: "Steady is a beautiful place to be. Savor this peace.", timestamp: new Date(Date.now() - 30000000), helpfulCount: 12 }
      ],
      analysis: {
        emotionalTone: ["Relieved", "Hopeful"],
        summary: "You are reaching a plateau of stability after a long emotional climb.",
        copingStrategies: [
          { title: "Savoring", description: "Notice and prolong the feeling of being 'steady'.", type: "Mindfulness" }
        ],
        isCrisis: false
      }
    },
    {
      id: '3',
      content: "Finally took a 10-minute walk today after being stuck in bed for three days. It wasn't much, but the air felt good on my face.",
      author: "TinyVictory",
      timestamp: new Date(Date.now() - 86400000),
      tags: ["Depression"],
      similarFeelingCount: 89,
      upliftCount: 156,
      comments: [
        { id: 'c3_1', author: "ProudOfYou", content: "Those 10 minutes are everything. Keep going, one step at a time.", timestamp: new Date(Date.now() - 80000000), helpfulCount: 12 },
        { id: 'c3_2', author: "Sunlight_Chaser", content: "10 minutes is a massive victory when you've been in the dark. So proud of you.", timestamp: new Date(Date.now() - 70000000), helpfulCount: 8 }
      ],
      analysis: {
        emotionalTone: ["Hopeful", "Tired"],
        summary: "You are celebrating a small but significant moment of self-care.",
        copingStrategies: [{ title: "Behavioral Activation", description: "Small consistent tasks build momentum.", type: "CBT" }],
        isCrisis: false
      }
    }
  ]);
  const [isCrisisVisible, setIsCrisisVisible] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('atlas_mood_history', JSON.stringify(moodEntries));
  }, [moodEntries]);

  // Audio Logic
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    let interval: any;
    if (isPlaying && timeLeft !== null && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => (t !== null ? t - 1 : null));
      }, 1000);
    } else if (timeLeft === 0) {
      handleStopAudio();
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  const handleStartAudio = (track: AudioTrack, durationMins: number) => {
    setActiveTrack(track);
    setTimeLeft(durationMins * 60);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.play();
    }
  };

  const handleStopAudio = () => {
    setIsPlaying(false);
    setActiveTrack(null);
    setTimeLeft(null);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleTogglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAddMood = (type: string, label: string, note?: string) => {
    const newEntry: MoodEntry = {
      id: Math.random().toString(36).substring(7),
      type,
      label,
      timestamp: new Date(),
      note
    };
    setMoodEntries(prev => [newEntry, ...prev]);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('atlas_user', JSON.stringify(user));
    setView(AppView.FEED);
  };

  const handleUpdateUser = (updates: Partial<User>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    localStorage.setItem('atlas_user', JSON.stringify(updatedUser));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('atlas_user');
    localStorage.removeItem('atlas_mood_history');
    setMoodEntries([]);
    handleStopAudio();
    setView(AppView.AUTH);
  };

  const handleShare = async (content: string) => {
    if (!currentUser) return;
    const analysis = await analyzeStory(content);
    const newStory: Story = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      author: currentUser.alias,
      authorAvatarSeed: currentUser.avatarSeed,
      authorAvatarColor: currentUser.avatarColor,
      timestamp: new Date(),
      tags: [],
      comments: [],
      similarFeelingCount: 1,
      upliftCount: 0,
      analysis,
    };
    
    setStories(prev => [newStory, ...prev]);
    if (analysis.isCrisis) setIsCrisisVisible(true);
    setView(AppView.FEED);
  };

  const handleEditStory = async (storyId: string, newContent: string) => {
    const analysis = await analyzeStory(newContent);
    setStories(prev => prev.map(s => s.id === storyId ? { ...s, content: newContent, analysis } : s));
    if (analysis.isCrisis) setIsCrisisVisible(true);
  };

  const handleAddComment = (storyId: string, content: string) => {
    if (!currentUser) return;
    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      author: currentUser.alias,
      content,
      timestamp: new Date(),
      helpfulCount: 0
    };
    setStories(prev => prev.map(s => s.id === storyId ? { ...s, comments: [...(s.comments || []), newComment] } : s));
  };

  const handleDeleteComment = (storyId: string, commentId: string) => {
    setStories(prev => prev.map(s => s.id === storyId ? { ...s, comments: (s.comments || []).filter(c => c.id !== commentId) } : s));
  };

  const handleHelpfulComment = (storyId: string, commentId: string) => {
    setStories(prev => prev.map(story => {
      if (story.id !== storyId) return story;
      return {
        ...story,
        comments: story.comments?.map(comment => {
          if (comment.id !== commentId) return comment;
          return { ...comment, helpfulCount: (comment.helpfulCount || 0) + 1 };
        })
      };
    }));
  };

  const handleUpliftStory = (storyId: string) => {
    setStories(prev => prev.map(s => s.id === storyId ? { ...s, upliftCount: (s.upliftCount || 0) + 1 } : s));
  };

  const handleSendConnectionRequest = (storyId: string, receiverAlias: string, note: string) => {
    if (!currentUser) return;
    const newRequest: ConnectionRequest = {
      id: Math.random().toString(36).substr(2, 9),
      senderAlias: currentUser.alias, 
      receiverAlias,
      storyId,
      initialNote: note,
      status: ConnectionStatus.PENDING,
      timestamp: new Date(),
    };
    setConnections(prev => [...prev, newRequest]);
  };

  const handleUpdateConnection = (requestId: string, status: ConnectionStatus) => {
    setConnections(prev => prev.map(c => c.id === requestId ? { ...c, status } : c));
  };

  return (
    <Layout currentView={view} setView={setView} currentUser={currentUser} onLogout={handleLogout}>
      <div className="max-w-4xl mx-auto px-4 py-8 pb-32">
        {view === AppView.AUTH && <AuthGateway onLogin={handleLogin} />}
        {view === AppView.FEED && (
          <Feed 
            stories={stories} 
            onAddComment={handleAddComment} 
            onDeleteComment={handleDeleteComment}
            onHelpfulComment={handleHelpfulComment}
            onUpliftStory={handleUpliftStory}
            onEditStory={handleEditStory}
            onSendConnectionRequest={handleSendConnectionRequest}
            connections={connections}
            currentUserAlias={currentUser?.alias}
          />
        )}
        {view === AppView.SHARE && <ShareStory onShare={handleShare} />}
        {view === AppView.CONCEPT && <ConceptOverview />}
        {view === AppView.SANCTUARY && (
          <SanctuarySpaces 
            activeTrack={activeTrack} 
            isPlaying={isPlaying}
            volume={volume}
            setVolume={setVolume}
            timeLeft={timeLeft}
            onStart={handleStartAudio} 
            onToggle={handleTogglePlay}
            onStop={handleStopAudio} 
          />
        )}
        {view === AppView.MY_SPACE && currentUser && (
          <MySpace 
            stories={stories} 
            currentUser={currentUser}
            connections={connections} 
            onUpdateConnection={handleUpdateConnection}
            onUpdateUser={handleUpdateUser}
            moodEntries={moodEntries}
            onAddMood={handleAddMood}
          />
        )}
      </div>

      <audio ref={audioRef} loop hidden />
      
      {activeTrack && (
        <SanctuaryMiniPlayer 
          track={activeTrack} 
          isPlaying={isPlaying} 
          onToggle={handleTogglePlay} 
          onStop={handleStopAudio}
          volume={volume}
          setVolume={setVolume}
          timeLeft={timeLeft}
          onExpand={() => setView(AppView.SANCTUARY)}
        />
      )}

      {isCrisisVisible && <CrisisAlert onClose={() => setIsCrisisVisible(false)} />}
      <PersistentSupportButton />
    </Layout>
  );
};

export default App;
