import { API_URL } from '../config/env';
import { clearToken, getToken } from './token-storage';

export interface ApiFieldIssue {
  field: string;
  message: string;
}

// Refleja el contrato de error de la API: { error: { code, message, details?, requestId } }.
export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details: ApiFieldIssue[];
  readonly requestId: string | undefined;

  constructor(
    status: number,
    code: string,
    message: string,
    details: ApiFieldIssue[] = [],
    requestId?: string,
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
    this.requestId = requestId;
  }
}

type UnauthorizedHandler = () => void;
let unauthorizedHandler: UnauthorizedHandler | undefined;

// AuthProvider lo registra para cerrar la sesión local cuando la API rechaza el token.
export const setUnauthorizedHandler = (
  handler: UnauthorizedHandler | undefined,
): void => {
  unauthorizedHandler = handler;
};

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  signal?: AbortSignal;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const toApiError = (status: number, payload: unknown): ApiError => {
  const error = isRecord(payload) && isRecord(payload.error) ? payload.error : undefined;
  const details = Array.isArray(error?.details)
    ? (error.details as unknown[]).filter(
        (item): item is ApiFieldIssue =>
          isRecord(item)
          && typeof item.field === 'string'
          && typeof item.message === 'string',
      )
    : [];

  return new ApiError(
    status,
    typeof error?.code === 'string' ? error.code : 'UNKNOWN_ERROR',
    typeof error?.message === 'string'
      ? error.message
      : 'La API respondió con un error inesperado.',
    details,
    typeof error?.requestId === 'string' ? error.requestId : undefined,
  );
};

export async function request<T>(
  path: string,
  { method = 'GET', body, signal }: RequestOptions = {},
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = { Accept: 'application/json' };

  // Authorization solo viaja cuando existe un token; login y registro salen sin él.
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers['Content-Type'] = 'application/json';

  let response: Response;
  try {
    const init: RequestInit = { method, headers };
    if (body !== undefined) init.body = JSON.stringify(body);
    if (signal) init.signal = signal;
    response = await fetch(`${API_URL}${path}`, init);
  } catch (error: unknown) {
    // Una petición cancelada a propósito no es un fallo de red.
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
    throw new ApiError(
      0,
      'NETWORK_ERROR',
      'No fue posible conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.',
    );
  }

  if (response.status === 204) return undefined as T;

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    payload = undefined;
  }

  if (!response.ok) {
    const apiError = toApiError(response.status, payload);
    // 401 con token enviado: venció, fue alterado o la cuenta ya no existe.
    if (response.status === 401 && token) {
      clearToken();
      unauthorizedHandler?.();
    }
    throw apiError;
  }

  return payload as T;
}
