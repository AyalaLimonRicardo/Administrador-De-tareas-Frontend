# Administrador de tareas Frontend

SPA desarrollada con React, TypeScript, Vite, React Router y Fetch API.

## Funciones actuales

- Registro e inicio de sesión.
- Restauración de identidad con `/api/auth/me`.
- Rutas públicas y protegidas (`ProtectedRoute`, `PublicOnlyRoute`).
- CRUD remoto de tareas con `Authorization: Bearer`.
- Búsqueda, filtros, ordenamiento y paginación.
- Eliminación visible solo para `admin` (la API aplica la regla real).
- Manejo de carga, vacío, error, 401 y 403.

## Rutas

- `/`
- `/login`
- `/register`
- `/tasks` protegida
- `/tasks/:taskId` protegida

## Variables

```env
VITE_API_URL=/api
```

Vite redirige `/api` a `http://localhost:3000` (ver `vite.config.ts`).

## Ejecución

```bash
pnpm install
pnpm dev
```

La API debe estar corriendo en el puerto 3000 con `CORS_ORIGIN=http://localhost:5173`.
Para probar el rol admin: `pnpm role:set <correo> admin` en el backend y volver a iniciar sesión.

## Seguridad didáctica

El access token se conserva en `sessionStorage` para practicar la restauración dentro de la pestaña.
No se almacenan contraseñas ni se imprimen tokens. La API mantiene la autenticación y autorización reales.

## Validación

```bash
pnpm lint
pnpm build
```
