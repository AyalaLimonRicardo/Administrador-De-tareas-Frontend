import type { Task } from '../models/task.interface';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  total: number;
  onToggleStatus: (id: string) => void;
  onEditTask: (id: string, title: string) => Promise<boolean>;
  onDeleteTask: (id: string) => void;
}

export function TaskList({
  tasks,
  total,
  onToggleStatus,
  onEditTask,
  onDeleteTask,
}: TaskListProps) {
  const resultLabel =
    total === 1
      ? '1 tarea'
      : `${total} tareas`;

  return (
    <section
      className="panel"
      aria-labelledby="task-list-title"
    >
      <div className="section-heading">
        <div>
          <p className="section-heading__eyebrow">
            Actividades
          </p>

          <h2 id="task-list-title">
            Tareas registradas
          </h2>
        </div>

        <span className="result-count">
          {resultLabel}
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state" role="status">
          <h3>No hay tareas para mostrar</h3>
          <p>
            Registra una actividad nueva o cambia
            los filtros de búsqueda.
          </p>
        </div>
      ) : (
        <div className="task-list" role="list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleStatus={onToggleStatus}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      )}
    </section>
  );
}
