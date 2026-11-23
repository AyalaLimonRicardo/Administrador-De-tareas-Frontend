import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import type { Task } from '../models/task.interface';
import { TaskStatusBadge } from './TaskStatusBadge';

interface TaskItemProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onEditTask: (id: string, title: string) => Promise<boolean>;
  onDeleteTask: (id: string) => void;
}

function formatTaskDate(value: string): string {
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'medium',
  }).format(new Date(value));
}

export function TaskItem({
  task,
  onToggleStatus,
  onEditTask,
  onDeleteTask,
}: TaskItemProps) {
  const { id, title, status, updatedAt } = task;
  // Solo oculta el botón: DELETE sigue exigiendo rol admin en la API.
  const { user } = useAuth();
  const canDelete = user?.role === 'admin';
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const normalizedDraft = draftTitle.trim();

  function handleStartEdit() {
    setDraftTitle(title);
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setDraftTitle(title);
    setIsEditing(false);
  }

  async function handleEditSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!normalizedDraft) {
      return;
    }

    const saved = await onEditTask(id, normalizedDraft);

    if (saved) {
      setIsEditing(false);
    }
  }

  return (
    <article
      className={`task-item task-item--${status}`}
      role="listitem"
    >
      <div className="task-item__content">
        {isEditing ? (
          <form
            className="task-item__edit-form"
            onSubmit={handleEditSubmit}
          >
            <label
              className="sr-only"
              htmlFor={`edit-task-${id}`}
            >
              Editar título de la tarea
            </label>

            <input
              id={`edit-task-${id}`}
              className="task-item__edit-input"
              value={draftTitle}
              onChange={(event) =>
                setDraftTitle(event.target.value)
              }
              maxLength={120}
              autoFocus
              required
            />

            <div className="task-item__edit-actions">
              <button
                type="submit"
                disabled={!normalizedDraft}
              >
                Guardar
              </button>

              <button
                type="button"
                onClick={handleCancelEdit}
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <>
            <h3 className="task-item__title">
              {title}
            </h3>

            <TaskStatusBadge status={status} />

            <p className="task-item__date">
              Actualizada:{' '}
              <time dateTime={updatedAt}>
                {formatTaskDate(updatedAt)}
              </time>
            </p>
          </>
        )}
      </div>

      <div
        className="task-item__actions"
        role="group"
        aria-label={`Acciones para ${title}`}
      >
        <button
          type="button"
          onClick={() => onToggleStatus(id)}
          disabled={isEditing}
        >
          {status === 'completed'
            ? 'Reabrir'
            : 'Completar'}
        </button>

        <button
          type="button"
          onClick={handleStartEdit}
          disabled={isEditing}
        >
          Editar
        </button>

        {canDelete && (
          <button
            type="button"
            className="button-danger"
            onClick={() => onDeleteTask(id)}
            disabled={isEditing}
          >
            Eliminar
          </button>
        )}
      </div>
    </article>
  );
}
