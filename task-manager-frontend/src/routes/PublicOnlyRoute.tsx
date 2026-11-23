import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Quien ya inició sesión no necesita ver login ni registro.
export function PublicOnlyRoute() {
  const { status } = useAuth();

  if (status === 'checking') {
    return (
      <p className="panel session-check" role="status">
        Verificando la sesión…
      </p>
    );
  }

  if (status === 'authenticated') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
