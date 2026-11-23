export type TaskStatus =
  | 'pending'
  | 'completed';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority?: TaskPriority;
  createdAt: string;
  updatedAt: string;
}

export type TaskSortBy = 'createdAt' | 'updatedAt' | 'title' | 'status';
export type TaskSortOrder = 'asc' | 'desc';

export interface TaskQuery {
  page: number;
  limit: number;
  status?: TaskStatus;
  search?: string;
  sortBy: TaskSortBy;
  order: TaskSortOrder;
}

export interface TaskPageMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface TaskPage {
  data: Task[];
  meta: TaskPageMeta;
}
