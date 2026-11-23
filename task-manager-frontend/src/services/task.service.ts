import type { Task, TaskPage, TaskQuery, TaskStatus } from '../models/task.interface';
import { request } from './http';

const toSearchParams = (query: TaskQuery): string => {
  const params = new URLSearchParams({
    page: String(query.page),
    limit: String(query.limit),
    sortBy: query.sortBy,
    order: query.order,
  });
  if (query.status) params.set('status', query.status);
  if (query.search) params.set('search', query.search);
  return params.toString();
};

export const fetchTasks = (
  query: TaskQuery,
  signal?: AbortSignal,
): Promise<TaskPage> =>
  request<TaskPage>(
    `/api/tasks?${toSearchParams(query)}`,
    signal ? { signal } : {},
  );

export const createTask = async (title: string): Promise<Task> => {
  const response = await request<{ data: Task }>('/api/tasks', {
    method: 'POST',
    body: { title },
  });
  return response.data;
};

export const updateTask = async (
  id: string,
  changes: { title?: string; status?: TaskStatus },
): Promise<Task> => {
  const response = await request<{ data: Task }>(
    `/api/tasks/${encodeURIComponent(id)}`,
    { method: 'PATCH', body: changes },
  );
  return response.data;
};

// Solo admin: aunque la interfaz oculte el botón, la API valida el rol del JWT.
export const deleteTask = (id: string): Promise<void> =>
  request<void>(`/api/tasks/${encodeURIComponent(id)}`, { method: 'DELETE' });
