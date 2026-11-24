import type {
  CurrentUserResponse,
  LoginCredentials,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
} from '../models/auth.types';
import { httpRequest } from './http.service';

export function registerAccount(
  input: RegisterInput,
): Promise<RegisterResponse> {
  return httpRequest<RegisterResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function loginAccount(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  return httpRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export function getCurrentUser(
  accessToken: string,
  signal?: AbortSignal,
): Promise<CurrentUserResponse> {
  return httpRequest<CurrentUserResponse>('/auth/me', {
    accessToken,
    signal,
  });
}
