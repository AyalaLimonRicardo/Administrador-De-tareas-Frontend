# Administrador de tareas - Frontend

Aplicación React + TypeScript + Vite (PNPM) conectada a la API REST de tareas
(Express + MongoDB Atlas). Incluye registro, inicio de sesión con JWT, rutas
protegidas y administración de tareas según el rol.

## Qué hace

- Registro de cuenta y inicio de sesión (`POST /api/auth/register` y `/login`).
- Recupera la identidad con `GET /api/auth/me` al abrir o recargar la página.
- Cierra la sesión local (borra el token).
- React Context (`AuthProvider` + `useAuth`) comparte la sesión sin prop drilling.
- React Router separa rutas públicas (`/login`, `/register`) y protegidas (`/`).
- La capa HTTP (`src/services/http.ts`) envía `Authorization: Bearer <token>`
  solo cuando existe un token; login y registro salen sin él.
- Tareas contra la API: listar con paginación, búsqueda, filtro por estado y
  orden; crear, editar, completar/reabrir y eliminar.
- El botón **Eliminar** solo se muestra al rol `admin`. Es una mejora de
  experiencia: la API sigue validando el JWT y responde 403 a cualquier otro rol.

## Instalación y ejecución

```bash
pnpm install
cp .env.example .env.local   # ajusta VITE_API_URL si tu API no está en localhost:3000
pnpm dev                     # http://localhost:5173
```

El backend debe estar corriendo y su `CORS_ORIGIN` debe coincidir con el origen
del frontend (`http://localhost:5173` en desarrollo).

## Validación

```bash
pnpm lint
pnpm build
```

## Despliegue en Vercel

1. Importa el repositorio y define la carpeta raíz del proyecto (`task-manager-frontend`).
2. En *Settings > Environment Variables* crea `VITE_API_URL` con la URL pública de la API.
3. `vercel.json` redirige todas las rutas a `index.html`, necesario para que
   `/login` o `/register` funcionen al recargar.
4. En el servidor del backend, cambia `CORS_ORIGIN` a la URL de Vercel.

## Estructura principal

- `src/config`: lectura de `VITE_API_URL`.
- `src/services`: `http.ts` (fetch, Bearer, errores), `auth.service.ts`, `task.service.ts`, `token-storage.ts`.
- `src/context` y `src/hooks`: `AuthProvider`, `auth-context`, `useAuth`.
- `src/routes`: `ProtectedRoute` y `PublicOnlyRoute`.
- `src/pages`: `LoginPage`, `RegisterPage`, `TasksPage`, `NotFoundPage`.
- `src/components`: piezas visuales reutilizables.
- `src/models`: tipos de la API.
- `docs`: documentación y evidencias.

## Decisiones de seguridad

- El token se guarda en `localStorage` para que la sesión sobreviva a una recarga.
  Es una práctica común en estas actividades, pero un XSS podría leerlo; en
  producción conviene una cookie `HttpOnly` emitida por el servidor.
- Un `401` con token enviado (expirado, alterado o cuenta eliminada) borra el
  token y lleva a `/login` con un aviso.
- `/me` devuelve el rol del token, el mismo que la API aplica. Si cambias el rol
  de una cuenta en MongoDB, esa persona debe iniciar sesión de nuevo.
