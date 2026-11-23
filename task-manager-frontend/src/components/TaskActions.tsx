import { useAuth } from '../hooks/useAuth';

interface TaskActionsProps {
  completedCount: number;
  onClearCompleted: () => void;
}

export function TaskActions({
  completedCount,
  onClearCompleted,
}: TaskActionsProps) {
  const { user } = useAuth();
  // Eliminar requiere rol admin en la API; aquí solo se evita mostrar una acción que fallaría.
  const canDelete = user?.role === 'admin';

  return (
    <section
      className="panel task-actions"
      aria-label="Acciones sobre la colección"
    >
      <p className="helper-text">
        {completedCount === 1
          ? '1 tarea completada en esta página'
          : `${completedCount} tareas completadas en esta página`}
      </p>

      {canDelete && (
        <button
          type="button"
          className="button-danger"
          onClick={onClearCompleted}
          disabled={completedCount === 0}
        >
          Eliminar completadas
        </button>
      )}
    </section>
  );
}
