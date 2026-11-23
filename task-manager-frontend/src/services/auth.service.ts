import type {
  AuthUser,
  LoginCredentials,
  LoginResponse,
  RegisterInput,
} from '../models/auth.interface';
import { request } from './http';

export const registerAccount = async (input: RegisterInput): Promise<AuthUser> => {
  const response = await request<{ data: { user: AuthUser } }>(
    '/api/auth/register',
    { method: 'POST', body: input },
  );
  return response.data.user;
};

export const loginAccount = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  const response = await request<{ data: LoginResponse }>(
    '/api/auth/login',
    { method: 'POST', body: credentials },
  );
  return response.data;
};

// Recupera la identidad a partir del token guardado (Bearer lo agrega la capa HTTP).
export const fetchCurrentUser = async (signal?: AbortSignal): Promise<AuthUser> => {
  const response = await request<{ data: { user: AuthUser } }>(
    '/api/auth/me',
    signal ? { signal } : {},
  );
  return response.data.user;
};
