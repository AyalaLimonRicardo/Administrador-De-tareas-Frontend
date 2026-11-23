import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Mejora la experiencia: la seguridad real la aplica la API al validar el JWT.
export function ProtectedRoute() {
  const { status } = useAuth();
  const location = useLocation();

  if (status === 'checking') {
    return (
      <p className="panel session-check" role="status">
        Verificando la sesión…
      </p>
    );
  }

  if (status === 'anonymous') {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
