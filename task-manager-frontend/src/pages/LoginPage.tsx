import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormMessage } from '../components/FormMessage';
import { useAuth } from '../hooks/useAuth';
import { describeError } from '../utils/errors';

export function LoginPage() {
  const { login, sessionNotice } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setFieldErrors({});
    setSubmitting(true);

    try {
      await login({ email: email.trim(), password });
      navigate('/', { replace: true });
    } catch (caught: unknown) {
      const described = describeError(caught);
      setError(described.message);
      setFieldErrors(described.fields);
      setSubmitting(false);
    }
  }

  return (
    <section className="panel auth-card" aria-labelledby="login-title">
      <div className="section-heading">
        <div>
          <p className="section-heading__eyebrow">Acceso</p>
          <h2 id="login-title">Iniciar sesión</h2>
        </div>
      </div>

      <FormMessage message={sessionNotice} tone="info" />

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="login-email">Correo electrónico</label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            required
          />
          {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
        </div>

        <div className="field">
          <label htmlFor="login-password">Contraseña</label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={Boolean(fieldErrors.password)}
            required
          />
          {fieldErrors.password && (
            <span className="field-error">{fieldErrors.password}</span>
          )}
        </div>

        <FormMessage message={error} />

        <button type="submit" disabled={submitting || !email.trim() || !password}>
          {submitting ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>

      <p className="helper-text auth-switch">
        ¿Todavía no tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </section>
  );
}
