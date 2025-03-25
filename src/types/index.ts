export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoSettings {
  autoDeleteCompleted: boolean;
  // Другие настройки можно добавить здесь
}

export type FilterType = 'all' | 'active' | 'completed';
