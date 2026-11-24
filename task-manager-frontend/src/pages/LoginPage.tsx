import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { getHttpErrorMessage } from '../services/http.service';

interface LoginLocationState {
  from?: { pathname: string; search?: string };
  registered?: boolean;
  email?: string;
}

export function LoginPage() {
  const { login, sessionMessage, clearSessionMessage } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ??
    {}) as LoginLocationState;

  const [email, setEmail] = useState(state.email ?? '');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const destination = state.from
    ? `${state.from.pathname}${state.from.search ?? ''}`
    : '/tasks';

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    setErrorMessage('');
    clearSessionMessage();

    if (!email.trim() || !password) {
      setErrorMessage(
        'Escribe tu correo y tu contraseña.',
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await login({ email: email.trim(), password });
      navigate(destination, { replace: true });
    } catch (error) {
      setErrorMessage(getHttpErrorMessage(error));
      setIsSubmitting(false);
    }
  }

  return (
    <section
      className="panel auth-panel"
      aria-labelledby="login-title"
    >
      <p className="section-heading__eyebrow">Acceso</p>
      <h2 id="login-title">Iniciar sesión</h2>

      {state.registered && (
        <p role="status" className="permission-note">
          Cuenta creada. Ahora inicia sesión.
        </p>
      )}

      {sessionMessage && (
        <p role="alert" className="field-error">
          {sessionMessage}
        </p>
      )}

      <form
        className="auth-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="form-field">
          <label htmlFor="login-email">
            Correo electrónico
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            disabled={isSubmitting}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />
        </div>

        <div className="form-field">
          <label htmlFor="login-password">
            Contraseña
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            disabled={isSubmitting}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />
        </div>

        {errorMessage && (
          <p className="field-error" role="alert">
            {errorMessage}
          </p>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      <p className="auth-alternative">
        ¿No tienes cuenta?{' '}
        <Link to="/register">Crear cuenta</Link>
      </p>
    </section>
  );
}
