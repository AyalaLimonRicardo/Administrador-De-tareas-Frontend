import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type {
  AuthUser,
  LoginCredentials,
  RegisterInput,
} from '../models/auth.interface';
import {
  fetchCurrentUser,
  loginAccount,
  registerAccount,
} from '../services/auth.service';
import { ApiError, setUnauthorizedHandler } from '../services/http';
import { clearToken, getToken, setToken } from '../services/token-storage';
import { AuthContext } from './auth-context';
import type { AuthContextValue, AuthStatus } from './auth-context';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>(() =>
    getToken() ? 'checking' : 'anonymous',
  );
  const [user, setUser] = useState<AuthUser | null>(null);
  const [sessionNotice, setSessionNotice] = useState<string | null>(null);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    setSessionNotice(null);
    setStatus('anonymous');
  }, []);

  // Cuando la API responde 401 a una petición con token, la sesión local ya no sirve.
  useEffect(() => {
    setUnauthorizedHandler(() => {
      setUser(null);
      setSessionNotice('Tu sesión expiró o ya no es válida. Inicia sesión de nuevo.');
      setStatus('anonymous');
    });
    return () => setUnauthorizedHandler(undefined);
  }, []);

  // Al abrir la aplicación se valida el token guardado y se recupera la identidad.
  useEffect(() => {
    if (!getToken()) return;

    const controller = new AbortController();
    fetchCurrentUser(controller.signal)
      .then((currentUser) => {
        setUser(currentUser);
        setStatus('authenticated');
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        // Un 401 ya limpió el token en la capa HTTP. Si fue otro error (red, 503),
        // no se confía en una sesión sin verificar.
        if (!(error instanceof ApiError) || error.status !== 401) clearToken();
        setUser(null);
        setStatus('anonymous');
      });

    return () => controller.abort();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const result = await loginAccount(credentials);
    setToken(result.accessToken);
    try {
      // La identidad se toma de /me, la fuente de verdad (incluye el rol vigente).
      const currentUser = await fetchCurrentUser();
      setUser(currentUser);
      setSessionNotice(null);
      setStatus('authenticated');
    } catch (error: unknown) {
      clearToken();
      throw error;
    }
  }, []);

  const register = useCallback(
    async (input: RegisterInput) => {
      await registerAccount(input);
      await login({ email: input.email, password: input.password });
    },
    [login],
  );

  const value = useMemo<AuthContextValue>(
    () => ({ status, user, sessionNotice, login, register, logout }),
    [status, user, sessionNotice, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
