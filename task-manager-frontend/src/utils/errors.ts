import { ApiError } from '../services/http';

export interface DescribedError {
  message: string;
  // Mensajes por campo (details de la API) para mostrarlos junto a cada input.
  fields: Record<string, string>;
}

export const describeError = (error: unknown): DescribedError => {
  if (error instanceof ApiError) {
    const fields: Record<string, string> = {};
    for (const issue of error.details) {
      fields[issue.field] ??= issue.message;
    }
    return { message: error.message, fields };
  }
  return { message: 'Ocurrió un error inesperado. Inténtalo de nuevo.', fields: {} };
};
