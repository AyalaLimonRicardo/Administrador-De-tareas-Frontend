import { useState } from 'react';
import type { FormEvent } from 'react';

interface TaskFormProps {
  // Devuelve true cuando la API aceptó la tarea; si falla, el título se conserva.
  onAddTask: (title: string) => Promise<boolean>;
}

export function TaskForm({
  onAddTask,
}: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const normalizedTitle = title.trim();

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!normalizedTitle || submitting) {
      return;
    }

    setSubmitting(true);
    const created = await onAddTask(normalizedTitle);
    setSubmitting(false);

    if (created) {
      setTitle('');
    }
  }

  return (
    <section
      className="panel"
      aria-labelledby="task-form-title"
    >
      <div className="section-heading">
        <div>
          <p className="section-heading__eyebrow">
            Registro
          </p>

          <h2 id="task-form-title">
            Nueva tarea
          </h2>
        </div>
      </div>

      <form
        className="task-form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="task-title">
          Título de la tarea
        </label>

        <div className="task-form__row">
          <input
            id="task-title"
            name="title"
            type="text"
            placeholder="Ejemplo: revisar documentación"
            maxLength={120}
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            required
          />

          <button
            type="submit"
            disabled={!normalizedTitle || submitting}
          >
            {submitting ? 'Guardando…' : 'Agregar tarea'}
          </button>
        </div>

        <p className="helper-text">
          {title.length}/120 caracteres
        </p>
      </form>
    </section>
  );
}
