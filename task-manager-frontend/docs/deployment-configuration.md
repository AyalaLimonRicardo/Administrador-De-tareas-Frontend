# Configuración de despliegue EC3 F3 A12 (Vercel)

## Frontend
- Repositorio: URL_FRONTEND
- Rama de producción: main
- Proyecto en Vercel: NOMBRE
- URL: https://FRONTEND.vercel.app
- Framework: Vite (detectado) · Build: `pnpm verify` · Salida: `dist`
- Variable `VITE_API_URL`: https://BACKEND.vercel.app/api (Production y Preview)
- Rewrite: `/(.*)` hacia `/index.html` (definido en `vercel.json`)

## Backend relacionado
- Repositorio: URL_BACKEND
- URL: https://BACKEND.vercel.app
- `CORS_ORIGIN`: https://FRONTEND.vercel.app (dominio de producción, sin ruta ni diagonal final)
- Salud: `/health` · Salud de Atlas: `/health/database` · Documentación: `/api-docs`

No copies MONGODB_URI, JWT_SECRET, tokens ni contraseñas.
