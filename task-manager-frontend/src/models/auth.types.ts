export type UserRole = 'user' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterInput extends LoginCredentials {
  name: string;
}

export interface RegisterResponse {
  data: { user: AuthUser };
}

export interface LoginResult {
  user: AuthUser;
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: string;
}

export interface LoginResponse {
  data: LoginResult;
}

export interface CurrentUserResponse {
  data: { user: AuthUser };
}

export type AuthStatus =
  | 'checking'
  | 'anonymous'
  | 'authenticated';
