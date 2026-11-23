import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function AppHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <header className="app-header">
      <div className="app-header__content">
        <div className="app-header__top">
          <p className="eyebrow">
            Diseño Frontend con Frameworks
          </p>

          {user && (
            <div className="session-info">
              <span className="session-info__name">
                {user.name}
                <span className={`role-badge role-badge--${user.role}`}>
                  {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                </span>
              </span>
              <button
                type="button"
                className="button-secondary"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>

        <h1>Administrador de tareas</h1>

        <p className="app-header__description">
          Organiza las actividades pendientes y consulta
          el avance del trabajo.
        </p>
      </div>
    </header>
  );
}
