import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormMessage } from '../components/FormMessage';
import { useAuth } from '../hooks/useAuth';
import { describeError } from '../utils/errors';

const MIN_PASSWORD_CHARACTERS = 15;

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const passwordLength = Array.from(password).length;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setFieldErrors({});
    setSubmitting(true);

    try {
      // El registro no devuelve token: AuthProvider inicia sesión justo después.
      await register({ name: name.trim(), email: email.trim(), password });
      navigate('/', { replace: true });
    } catch (caught: unknown) {
      const described = describeError(caught);
      setError(described.message);
      setFieldErrors(described.fields);
      setSubmitting(false);
    }
  }

  return (
    <section className="panel auth-card" aria-labelledby="register-title">
      <div className="section-heading">
        <div>
          <p className="section-heading__eyebrow">Cuenta nueva</p>
          <h2 id="register-title">Crear cuenta</h2>
        </div>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="register-name">Nombre</label>
          <input
            id="register-name"
            type="text"
            autoComplete="name"
            maxLength={80}
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={Boolean(fieldErrors.name)}
            required
          />
          {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
        </div>

        <div className="field">
          <label htmlFor="register-email">Correo electrónico</label>
          <input
            id="register-email"
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
          <label htmlFor="register-password">Contraseña</label>
          <input
            id="register-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-describedby="register-password-help"
            aria-invalid={Boolean(fieldErrors.password)}
            required
          />
          <span id="register-password-help" className="helper-text">
            Mínimo {MIN_PASSWORD_CHARACTERS} caracteres ({passwordLength} escritos).
          </span>
          {fieldErrors.password && (
            <span className="field-error">{fieldErrors.password}</span>
          )}
        </div>

        <FormMessage message={error} />

        <button
          type="submit"
          disabled={submitting || !name.trim() || !email.trim() || !password}
        >
          {submitting ? 'Creando cuenta…' : 'Registrarme'}
        </button>
      </form>

      <p className="helper-text auth-switch">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </section>
  );
}
