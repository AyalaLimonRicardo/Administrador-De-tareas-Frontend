import { createContext } from 'react';
import type {
  AuthStatus,
  AuthUser,
  LoginCredentials,
  RegisterInput,
} from '../models/auth.types';

export interface AuthContextValue {
  status: AuthStatus;
  user: AuthUser | null;
  accessToken: string | null;
  isAdmin: boolean;
  sessionMessage: string;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
  clearSessionMessage: () => void;
}

export const AuthContext =
  createContext<AuthContextValue | null>(null);
