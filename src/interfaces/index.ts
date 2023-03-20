export interface Filter {
  categoryId?: number;
  isUrgent?: boolean;
  date?: string;
}

export interface Task {
  id: number;
  title: string;
  date: Date;
  time: string;
  isDone: boolean;
  isUrgent: boolean;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
  color: string;
}

export interface Color {
  id: number;
  color: string;
}
