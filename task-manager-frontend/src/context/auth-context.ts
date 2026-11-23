import { createContext } from 'react';
import type {
  AuthUser,
  LoginCredentials,
  RegisterInput,
} from '../models/auth.interface';

// checking: aún se verifica el token guardado con GET /api/auth/me.
export type AuthStatus = 'checking' | 'authenticated' | 'anonymous';

export interface AuthContextValue {
  status: AuthStatus;
  user: AuthUser | null;
  // Mensaje para la pantalla de login cuando la sesión terminó sin que el usuario lo pidiera.
  sessionNotice: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
