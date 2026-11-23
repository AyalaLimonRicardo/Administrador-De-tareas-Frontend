import type { TaskPageMeta } from '../models/task.interface';

interface PaginationProps {
  meta: TaskPageMeta;
  disabled: boolean;
  onPageChange: (page: number) => void;
}

export function Pagination({ meta, disabled, onPageChange }: PaginationProps) {
  if (meta.totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Paginación de tareas">
      <button
        type="button"
        className="button-secondary"
        onClick={() => onPageChange(meta.page - 1)}
        disabled={disabled || !meta.hasPreviousPage}
      >
        Anterior
      </button>
      <span aria-live="polite">
        Página {meta.page} de {meta.totalPages}
      </span>
      <button
        type="button"
        className="button-secondary"
        onClick={() => onPageChange(meta.page + 1)}
        disabled={disabled || !meta.hasNextPage}
      >
        Siguiente
      </button>
    </nav>
  );
}
