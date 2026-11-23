import { Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RegisterPage } from './pages/RegisterPage';
import { TasksPage } from './pages/TasksPage';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { PublicOnlyRoute } from './routes/PublicOnlyRoute';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        {/* Públicas: solo para quien todavía no tiene sesión. */}
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protegidas: exigen sesión; la API vuelve a validar el JWT en cada petición. */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<TasksPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
