# Autenticación en el Frontend

## Flujo

1. **Al abrir la app**: `AuthProvider` revisa si hay token en `localStorage`.
   - Sin token: estado `anonymous`.
   - Con token: estado `checking` y `GET /api/auth/me` (con `Authorization: Bearer`).
     Si responde 200 pasa a `authenticated`; si responde 401 borra el token y pasa a `anonymous`.
2. **Registro**: `POST /api/auth/register` (sin Authorization). La API no devuelve token,
   así que `AuthProvider` inicia sesión enseguida con las mismas credenciales.
3. **Login**: `POST /api/auth/login` (sin Authorization) → guarda `accessToken` →
   `GET /api/auth/me` para fijar la identidad → navega a `/`.
4. **Peticiones de tareas**: `http.ts` agrega `Authorization: Bearer <token>` solo si hay token.
5. **Cerrar sesión**: borra el token, limpia el usuario y navega a `/login`.
6. **Token vencido o inválido**: la API responde 401; `http.ts` borra el token y avisa a
   `AuthProvider`, que muestra el mensaje en `/login`.

## Rutas

| Ruta | Tipo | Comportamiento |
|---|---|---|
| `/login`, `/register` | Pública | Con sesión activa redirige a `/` |
| `/` | Protegida | Sin sesión redirige a `/login`; mientras verifica muestra "Verificando la sesión…" |
| `*` | Pública | Página 404 |

## Roles

- `user`: lista, consulta, crea, edita y completa tareas.
- `admin`: además elimina (`DELETE /api/tasks/:id`).
- La interfaz oculta "Eliminar" a `user` solo por comodidad. Probado: un `DELETE` directo a la
  API con rol `user` responde 403.

## Cambios en el backend

Se agregó `GET /api/auth/me` (protegido con `authenticate`). Devuelve
`{ "data": { "user": { id, name, email, role, createdAt, updatedAt } } }`
sin `passwordHash`. El limitador de intentos quedó solo en login y registro,
porque `/me` se llama en cada recarga.

## Pruebas realizadas

Se ejecutaron en Chromium contra el backend real compilado, con los métodos de
Mongoose sustituidos por un almacén en memoria (no hubo conexión con Atlas):

- `/` sin sesión redirige a `/login` y no se llama a `/api/tasks` ni `/api/auth/me`.
- Registro con contraseña corta: se muestra el error de la API junto al campo.
- Registro válido: entra a la app con el nombre y el rol en el encabezado.
- `register` y `login` salen sin `Authorization`; `/me` y `/api/tasks` salen con `Bearer`.
- Crear, completar, editar, filtrar por estado y buscar por título.
- Paginación (12 tareas: 10 + 2).
- Rol `user`: sin botón Eliminar; `DELETE` directo a la API → 403.
- Tras volver a iniciar sesión como `admin`: aparece Eliminar y borra la tarea.
- La sesión sobrevive a una recarga; cerrar sesión borra el token y `/` vuelve a pedir login.
- Login incorrecto muestra el mensaje de la API; un token inválido guardado lleva a `/login` con aviso.
- Sin desbordamiento horizontal en 375 px.

## Pendiente de tu parte

- Repetir el flujo con tu clúster de Atlas y tu API desplegada, y tomar capturas.
- Para probar el rol admin: `pnpm role:set <correo> admin` en el backend y **volver a iniciar sesión**.
