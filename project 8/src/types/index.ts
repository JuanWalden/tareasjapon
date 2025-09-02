export interface Task {
  id: string;
  title: string;
  description: string | null;
  type: 'pending' | 'review';
  created_at: string;
  maria_completed: boolean;
  juan_completed: boolean;
  javier_completed: boolean;
  helena_completed: boolean;
}

export type Traveler = 'maria' | 'juan' | 'javier' | 'helena';

export interface TravelerInfo {
  name: string;
  color: string;
  avatar: string;
}