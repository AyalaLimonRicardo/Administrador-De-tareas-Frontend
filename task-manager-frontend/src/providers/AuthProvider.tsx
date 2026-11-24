import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from '../context/auth-context';
import type {
  AuthStatus,
  AuthUser,
  LoginCredentials,
  RegisterInput,
} from '../models/auth.types';
import {
  getCurrentUser,
  loginAccount,
  registerAccount,
} from '../services/auth.api.service';
import {
  isAbortError,
  isHttpError,
  setUnauthorizedHandler,
} from '../services/http.service';
import {
  clearAccessToken,
  readAccessToken,
  saveAccessToken,
} from '../services/session.service';

interface AuthProviderProps {
  children: ReactNode;
}

const INVALID_SESSION_MESSAGE =
  'Tu sesión no es válida o expiró. Inicia sesión nuevamente.';

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [initialToken] = useState(readAccessToken);
  const [accessToken, setAccessToken] =
    useState<string | null>(initialToken);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>(
    initialToken ? 'checking' : 'anonymous',
  );
  const [sessionMessage, setSessionMessage] =
    useState('');

  const endSession = useCallback(
    (message = '') => {
      clearAccessToken();
      setAccessToken(null);
      setUser(null);
      setStatus('anonymous');
      setSessionMessage(message);
    },
    [],
  );

  // Restauración: el token guardado se valida con /auth/me.
  useEffect(() => {
    if (!initialToken) {
      return;
    }

    const controller = new AbortController();

    async function restore(): Promise<void> {
      try {
        const response = await getCurrentUser(
          initialToken as string,
          controller.signal,
        );
        setUser(response.data.user);
        setStatus('authenticated');
      } catch (error) {
        if (isAbortError(error)) {
          return;
        }

        if (isHttpError(error) && error.status === 401) {
          endSession(INVALID_SESSION_MESSAGE);
          return;
        }

        // Error de red u otro: no se confía en el token sin validarlo.
        endSession(
          'No fue posible validar la sesión. Inicia sesión nuevamente.',
        );
      }
    }

    void restore();

    return () => controller.abort();
  }, [initialToken, endSession]);

  // Cualquier 401 en una petición autenticada cierra la sesión local.
  useEffect(() => {
    setUnauthorizedHandler(() =>
      endSession(INVALID_SESSION_MESSAGE),
    );
    return () => setUnauthorizedHandler(null);
  }, [endSession]);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const response = await loginAccount(credentials);
      saveAccessToken(response.data.accessToken);
      setAccessToken(response.data.accessToken);
      setUser(response.data.user);
      setStatus('authenticated');
      setSessionMessage('');
    },
    [],
  );

  const register = useCallback(
    async (input: RegisterInput) => {
      // 201 no inicia sesión: la persona debe autenticarse después.
      await registerAccount(input);
    },
    [],
  );

  const logout = useCallback(() => endSession(), [endSession]);

  const clearSessionMessage = useCallback(
    () => setSessionMessage(''),
    [],
  );

  const value = useMemo(
    () => ({
      status,
      user,
      accessToken,
      isAdmin: user?.role === 'admin',
      sessionMessage,
      login,
      register,
      logout,
      clearSessionMessage,
    }),
    [
      status,
      user,
      accessToken,
      sessionMessage,
      login,
      register,
      logout,
      clearSessionMessage,
    ],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
