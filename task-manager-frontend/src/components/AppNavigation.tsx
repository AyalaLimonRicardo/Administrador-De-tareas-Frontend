import { Link, NavLink } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export function AppNavigation() {
  const { status, user, logout } = useAuth();

  return (
    <div className="app-navigation-bar">
      <nav
        className="app-navigation"
        aria-label="Navegación principal"
      >
        <NavLink to="/" end>
          Inicio
        </NavLink>
        {status === 'authenticated' && (
          <NavLink to="/tasks">Tareas</NavLink>
        )}
      </nav>

      {status === 'checking' && (
        <p role="status">Validando sesión...</p>
      )}

      {status === 'anonymous' && (
        <div className="auth-actions">
          <Link
            className="button-link button-link--secondary"
            to="/login"
          >
            Iniciar sesión
          </Link>
          <Link className="button-link" to="/register">
            Crear cuenta
          </Link>
        </div>
      )}

      {status === 'authenticated' && user && (
        <div className="session-summary">
          <span>
            {user.name} · {user.role}
          </span>
          <button type="button" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
