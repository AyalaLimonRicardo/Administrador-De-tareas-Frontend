export const TASK_TITLE_MAX_LENGTH = 120;

export function validateTaskTitle(
  value: string,
): string | null {
  const title = value.trim();

  if (!title) {
    return 'El título es obligatorio.';
  }

  if (title.length > TASK_TITLE_MAX_LENGTH) {
    return `El título no debe superar ${TASK_TITLE_MAX_LENGTH} caracteres.`;
  }

  return null;
}
