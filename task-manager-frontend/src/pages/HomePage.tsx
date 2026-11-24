import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export function HomePage() {
  const { status, user } = useAuth();

  return (
    <section
      className="panel welcome-panel"
      aria-labelledby="home-title"
    >
      <p className="section-heading__eyebrow">
        Inicio
      </p>

      <h2 id="home-title">
        Administrador de tareas conectado
      </h2>

      <p>
        Las tareas se consultan y actualizan mediante
        la API REST de Express y MongoDB Atlas.
      </p>

      <div className="welcome-panel__actions">
        {status === 'authenticated' && user ? (
          <>
            <p>
              Sesión activa como {user.name} ({user.role}).
            </p>
            <Link className="button-link" to="/tasks">
              Administrar tareas
            </Link>
          </>
        ) : (
          <>
            <Link className="button-link" to="/login">
              Iniciar sesión
            </Link>
            <Link
              className="button-link button-link--secondary"
              to="/register"
            >
              Crear cuenta
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
