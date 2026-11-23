export type UserRole = 'user' | 'admin';

// Identidad pública: la API nunca devuelve contraseña ni hash.
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

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: string;
}
