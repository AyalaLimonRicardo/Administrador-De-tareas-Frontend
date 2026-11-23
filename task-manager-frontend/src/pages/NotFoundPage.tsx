import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="panel empty-state">
      <h2>Página no encontrada</h2>
      <p>La dirección que abriste no existe.</p>
      <Link to="/">Ir al inicio</Link>
    </section>
  );
}
