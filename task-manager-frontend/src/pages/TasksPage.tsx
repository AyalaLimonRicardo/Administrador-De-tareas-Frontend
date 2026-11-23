import { useCallback, useEffect, useRef, useState } from 'react';
import { Pagination } from '../components/Pagination';
import { FormMessage } from '../components/FormMessage';
import { TaskActions } from '../components/TaskActions';
import { TaskFilters } from '../components/TaskFilters';
import type { OrderOption, StatusFilter } from '../components/TaskFilters';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { TaskSummary } from '../components/TaskSummary';
import type { Task, TaskPage, TaskQuery } from '../models/task.interface';
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from '../services/task.service';
import { describeError } from '../utils/errors';

const PAGE_SIZE = 10;
const SEARCH_DELAY_MS = 300;

const ORDER_PARAMS: Record<OrderOption, Pick<TaskQuery, 'sortBy' | 'order'>> = {
  newest: { sortBy: 'createdAt', order: 'desc' },
  oldest: { sortBy: 'createdAt', order: 'asc' },
  title: { sortBy: 'title', order: 'asc' },
};

export function TasksPage() {
  // Cada respuesta recuerda a qué consulta pertenece; "cargando" se deriva de comparar claves.
  const [loaded, setLoaded] = useState<{ key: string; page: TaskPage } | null>(null);
  const [failure, setFailure] = useState<{ key: string; message: string } | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [order, setOrder] = useState<OrderOption>('newest');
  // Cambiar este número vuelve a consultar la API con los mismos filtros.
  const [reloadKey, setReloadKey] = useState(0);
  const appliedSearch = useRef('');

  const requestKey = `${page}|${search}|${status}|${order}|${reloadKey}`;
  const result = loaded?.page ?? null;
  const loadError = failure?.key === requestKey ? failure.message : null;
  const loading = loaded?.key !== requestKey && failure?.key !== requestKey;

  // Se espera a que el usuario deje de escribir antes de consultar.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const normalized = searchInput.trim();
      if (normalized === appliedSearch.current) return;
      appliedSearch.current = normalized;
      setSearch(normalized);
      setPage(1);
    }, SEARCH_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const controller = new AbortController();
    const query: TaskQuery = {
      page,
      limit: PAGE_SIZE,
      ...ORDER_PARAMS[order],
      ...(status === 'all' ? {} : { status }),
      ...(search ? { search } : {}),
    };

    fetchTasks(query, controller.signal)
      .then((response) => {
        // Si se borró la última tarea de una página, se retrocede a una que exista.
        if (response.data.length === 0 && page > 1 && response.meta.totalPages > 0) {
          setPage(response.meta.totalPages);
          return;
        }
        setLoaded({ key: requestKey, page: response });
      })
      .catch((error: unknown) => {
        // Una consulta reemplazada por otra más reciente se descarta sin avisar.
        if (controller.signal.aborted) return;
        setFailure({ key: requestKey, message: describeError(error).message });
      });

    return () => controller.abort();
  }, [page, search, status, order, reloadKey, requestKey]);

  const reload = useCallback(() => setReloadKey((key) => key + 1), []);

  async function runAction(action: () => Promise<unknown>): Promise<boolean> {
    setActionError(null);
    try {
      await action();
      reload();
      return true;
    } catch (error: unknown) {
      setActionError(describeError(error).message);
      return false;
    }
  }

  function handleAddTask(title: string): Promise<boolean> {
    // La tarea nueva aparece primero en el orden por defecto: se vuelve a la página 1.
    setPage(1);
    return runAction(() => createTask(title));
  }

  function handleToggleStatus(id: string) {
    const task = result?.data.find((item) => item.id === id);
    if (!task) return;
    void runAction(() =>
      updateTask(id, { status: task.status === 'pending' ? 'completed' : 'pending' }),
    );
  }

  function handleEditTask(id: string, title: string): Promise<boolean> {
    return runAction(() => updateTask(id, { title }));
  }

  function handleDeleteTask(id: string) {
    const task = result?.data.find((item) => item.id === id);
    if (!task) return;
    if (!window.confirm(`¿Eliminar la tarea "${task.title}"?`)) return;
    void runAction(() => deleteTask(id));
  }

  async function handleClearCompleted() {
    const completed: Task[] = (result?.data ?? []).filter(
      (task) => task.status === 'completed',
    );
    if (completed.length === 0) return;
    if (!window.confirm(`¿Eliminar ${completed.length} tarea(s) completada(s) de esta página?`)) {
      return;
    }

    setActionError(null);
    const outcomes = await Promise.allSettled(
      completed.map((task) => deleteTask(task.id)),
    );
    const failed = outcomes.filter((outcome) => outcome.status === 'rejected');
    if (failed.length > 0) {
      const first = failed[0];
      setActionError(
        first?.status === 'rejected'
          ? describeError(first.reason).message
          : 'No se pudieron eliminar algunas tareas.',
      );
    }
    reload();
  }

  const tasks = result?.data ?? [];
  const completedCount = tasks.filter((task) => task.status === 'completed').length;

  return (
    <>
      <TaskForm onAddTask={handleAddTask} />
      <TaskFilters
        search={searchInput}
        status={status}
        order={order}
        onSearchChange={setSearchInput}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
        onOrderChange={(value) => {
          setOrder(value);
          setPage(1);
        }}
      />

      <FormMessage message={actionError} />

      {loadError ? (
        <section className="panel" role="alert">
          <p className="alert alert--error">{loadError}</p>
          <button type="button" onClick={reload}>
            Reintentar
          </button>
        </section>
      ) : result === null ? (
        <p className="panel session-check" role="status">
          Cargando tareas…
        </p>
      ) : (
        <div className={loading ? 'results results--loading' : 'results'} aria-busy={loading}>
          <TaskSummary tasks={tasks} total={result.meta.total} />

          <TaskActions
            completedCount={completedCount}
            onClearCompleted={() => void handleClearCompleted()}
          />

          <TaskList
            tasks={tasks}
            total={result.meta.total}
            onToggleStatus={handleToggleStatus}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />

          <Pagination meta={result.meta} disabled={loading} onPageChange={setPage} />
        </div>
      )}
    </>
  );
}
