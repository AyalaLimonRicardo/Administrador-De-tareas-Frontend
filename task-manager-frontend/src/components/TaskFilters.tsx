import type { TaskStatus } from '../models/task.interface';

export type StatusFilter = TaskStatus | 'all';
export type OrderOption = 'newest' | 'oldest' | 'title';

interface TaskFiltersProps {
  search: string;
  status: StatusFilter;
  order: OrderOption;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
  onOrderChange: (value: OrderOption) => void;
}

export function TaskFilters({
  search,
  status,
  order,
  onSearchChange,
  onStatusChange,
  onOrderChange,
}: TaskFiltersProps) {
  return (
    <section className="panel" aria-labelledby="filters-title">
      <div className="section-heading">
        <div>
          <p className="section-heading__eyebrow">Consulta</p>
          <h2 id="filters-title">Buscar y organizar</h2>
        </div>
      </div>

      <div className="filters-grid">
        <div className="field">
          <label htmlFor="task-search">Buscar por título</label>
          <input
            id="task-search"
            type="search"
            maxLength={60}
            placeholder="Escribe una palabra"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="status-filter">Estado</label>
          <select
            id="status-filter"
            value={status}
            onChange={(event) => onStatusChange(event.target.value as StatusFilter)}
          >
            <option value="all">Todas</option>
            <option value="pending">Pendientes</option>
            <option value="completed">Completadas</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="task-order">Orden</label>
          <select
            id="task-order"
            value={order}
            onChange={(event) => onOrderChange(event.target.value as OrderOption)}
          >
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguas</option>
            <option value="title">Por título</option>
          </select>
        </div>
      </div>
    </section>
  );
}
