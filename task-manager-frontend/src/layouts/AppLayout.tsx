import { Outlet } from 'react-router';
import { AppNavigation } from '../components/AppNavigation';

export function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__content">
          <p className="eyebrow">
            Diseño Frontend con Frameworks
          </p>

          <h1>Administrador de tareas</h1>

          <AppNavigation />
        </div>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        <div className="app-footer__content">
          <p>Diseño Frontend con Frameworks</p>
        </div>
      </footer>
    </div>
  );
}
