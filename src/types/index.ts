export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoSettings {
  autoDeleteCompleted: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';
