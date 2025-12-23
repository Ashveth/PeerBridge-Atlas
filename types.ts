
export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  helpfulCount?: number;
}

export enum ConnectionStatus {
  PENDING = 'PENDING',
  CONNECTED = 'CONNECTED',
  DECLINED = 'DECLINED'
}

export interface ConnectionRequest {
  id: string;
  senderAlias: string;
  receiverAlias: string;
  storyId: string;
  initialNote: string;
  status: ConnectionStatus;
  timestamp: Date;
}

export interface User {
  alias: string;
  pin: string;
  joinedAt: Date;
  avatarSeed?: string;
  avatarColor?: string;
}

export interface MoodEntry {
  id: string;
  type: string;
  label: string;
  timestamp: Date;
  note?: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  category: 'Nature' | 'Ambient' | 'ASMR' | 'Guided';
  emoji: string;
  url: string; // Placeholder or static URL
}

export const SANCTUARY_TRACKS: AudioTrack[] = [
  { id: 'n1', title: 'Rain on Leaves', category: 'Nature', emoji: '🌧️', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'n2', title: 'Mountain Wind', category: 'Nature', emoji: '🏔️', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 'a1', title: 'Deep Space Drift', category: 'Ambient', emoji: '🪐', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 'a2', title: 'Zen Garden', category: 'Ambient', emoji: '🎍', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: 'as1', title: 'Soft Whispers', category: 'ASMR', emoji: '🎙️', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  { id: 'as2', title: 'Crinkling Sounds', category: 'ASMR', emoji: '📄', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
  { id: 'g1', title: '2-Min Grounding', category: 'Guided', emoji: '🧘', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
];

export const MOOD_TYPES = [
  { type: 'radiant', label: 'Radiant', emoji: '☀️', color: 'from-yellow-400 to-orange-400' },
  { type: 'calm', label: 'Calm', emoji: '🌿', color: 'from-emerald-400 to-teal-500' },
  { type: 'foggy', label: 'Foggy', emoji: '☁️', color: 'from-slate-300 to-slate-500' },
  { type: 'stormy', label: 'Stormy', emoji: '⛈️', color: 'from-indigo-600 to-blue-800' },
  { type: 'cloudy', label: 'Cloudy', emoji: '🌧️', color: 'from-blue-400 to-indigo-500' },
  { type: 'numb', label: 'Numb', emoji: '🌑', color: 'from-zinc-600 to-zinc-900' },
];

export interface Story {
  id: string;
  content: string;
  author: string;
  authorAvatarSeed?: string;
  authorAvatarColor?: string;
  timestamp: Date;
  tags: string[];
  analysis?: StoryAnalysis;
  comments?: Comment[];
  similarFeelingCount?: number;
  upliftCount?: number;
}

export interface StoryAnalysis {
  emotionalTone: string[];
  summary: string;
  copingStrategies: CopingStrategy[];
  culturalNuance?: string;
  isCrisis: boolean;
}

export interface CopingStrategy {
  title: string;
  description: string;
  type: 'CBT' | 'Grounding' | 'Mindfulness';
}

export enum AppView {
  AUTH = 'AUTH',
  FEED = 'FEED',
  SHARE = 'SHARE',
  CONCEPT = 'CONCEPT',
  MY_SPACE = 'MY_SPACE',
  SANCTUARY = 'SANCTUARY'
}

export const emotionColors: Record<string, string> = {
  Homesick: 'from-blue-400 to-indigo-500',
  Isolated: 'from-slate-400 to-slate-600',
  Overwhelmed: 'from-orange-400 to-red-500',
  Resentful: 'from-rose-500 to-red-700',
  Relieved: 'from-emerald-300 to-teal-500',
  Hopeful: 'from-yellow-300 to-amber-500',
  Anxious: 'from-indigo-300 to-purple-500',
  Responsible: 'from-cyan-400 to-blue-600',
  Reflective: 'from-violet-400 to-purple-600',
};
