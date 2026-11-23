import type { Task } from '../models/task.interface';

interface TaskSummaryProps {
  // Tareas de la página actual y total de la consulta según la API.
  tasks: Task[];
  total: number;
}

export function TaskSummary({
  tasks,
  total,
}: TaskSummaryProps) {
  const completed = tasks.filter(
    ({ status }) => status === 'completed',
  ).length;
  const pending = tasks.length - completed;

  return (
    <section
      className="summary-grid"
      aria-label="Resumen de tareas"
    >
      <article className="summary-card">
        <span>Total de la consulta</span>
        <strong>{total}</strong>
      </article>
      <article className="summary-card">
        <span>Pendientes en esta página</span>
        <strong>{pending}</strong>
      </article>
      <article className="summary-card">
        <span>Completadas en esta página</span>
        <strong>{completed}</strong>
      </article>
    </section>
  );
}
