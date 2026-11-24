import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export function PublicOnlyRoute() {
  const { status } = useAuth();

  if (status === 'checking') {
    return <p role="status">Validando la sesión...</p>;
  }

  if (status === 'authenticated') {
    return <Navigate to="/tasks" replace />;
  }

  return <Outlet />;
}
