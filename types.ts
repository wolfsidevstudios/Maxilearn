
export interface Message {
  role: 'user' | 'model';
  text: string;
  sources?: string[];
}

export interface UserState {
  credits: number;
  xp: number;
  isPro: boolean;
  isAuthenticated: boolean;
  isOnboarded: boolean; // New flag
  name?: string;
  email?: string;
  userAvatar?: string;
  aiAvatar?: string;
  studyLevel?: string; // e.g., High School, College
  studyGoal?: string; // e.g., Exam Prep, General
  lastReset: string; // ISO Date string
}

export enum ToolType {
  TUTOR = 'tutor',
  HUMANIZER = 'humanizer',
  NOTES = 'notes',
  WRITER = 'writer',
  DETECTOR = 'detector',
  LECTURE = 'lecture',
  RESEARCH = 'research',
  SUMMARIZER = 'summarizer',
  QUIZ = 'quiz'
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  isPro: boolean;
}

export interface QuizItem {
  question: string;
  answer: string;
}
