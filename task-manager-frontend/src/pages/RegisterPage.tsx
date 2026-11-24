import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { getHttpErrorMessage } from '../services/http.service';

const MIN_PASSWORD_LENGTH = 15;

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim()) {
      setErrorMessage('Completa nombre y correo.');
      return;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      setErrorMessage(
        `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`,
      );
      return;
    }

    if (password !== confirmation) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      navigate('/login', {
        replace: true,
        state: {
          registered: true,
          email: email.trim(),
        },
      });
    } catch (error) {
      setErrorMessage(getHttpErrorMessage(error));
      setIsSubmitting(false);
    }
  }

  return (
    <section
      className="panel auth-panel"
      aria-labelledby="register-title"
    >
      <p className="section-heading__eyebrow">Cuenta</p>
      <h2 id="register-title">Crear cuenta</h2>

      <form
        className="auth-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="form-field">
          <label htmlFor="register-name">Nombre</label>
          <input
            id="register-name"
            autoComplete="name"
            value={name}
            disabled={isSubmitting}
            onChange={(event) =>
              setName(event.target.value)
            }
          />
        </div>

        <div className="form-field">
          <label htmlFor="register-email">
            Correo electrónico
          </label>
          <input
            id="register-email"
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
          <label htmlFor="register-password">
            Contraseña
          </label>
          <input
            id="register-password"
            type="password"
            autoComplete="new-password"
            value={password}
            disabled={isSubmitting}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />
          <small>
            Mínimo {MIN_PASSWORD_LENGTH} caracteres.
          </small>
        </div>

        <div className="form-field">
          <label htmlFor="register-confirmation">
            Confirmar contraseña
          </label>
          <input
            id="register-confirmation"
            type="password"
            autoComplete="new-password"
            value={confirmation}
            disabled={isSubmitting}
            onChange={(event) =>
              setConfirmation(event.target.value)
            }
          />
        </div>

        {errorMessage && (
          <p className="field-error" role="alert">
            {errorMessage}
          </p>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creando...' : 'Crear cuenta'}
        </button>
      </form>

      <p className="auth-alternative">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </section>
  );
}
