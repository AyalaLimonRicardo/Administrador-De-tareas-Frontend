# Administrador de tareas - Frontend

Aplicación desarrollada con React, TypeScript, Vite y PNPM.

## Alcance actual

La aplicación administra una colección local de tareas mediante
estado de React. Actualmente permite:

- Registrar tareas.
- Consultar la colección.
- Completar y reabrir tareas.
- Editar títulos.
- Cancelar una edición.
- Eliminar con confirmación.
- Eliminar todas las tareas completadas (desafío).
- Calcular el resumen automáticamente.
- Mostrar una colección vacía.

Los cambios permanecen en memoria y se reinician al recargar.

## Operaciones CRUD

- Create: registro mediante el formulario.
- Read: renderizado de la colección.
- Update: cambio de estado y edición.
- Delete: eliminación confirmada.

## Instalación y ejecución

```bash
pnpm install
pnpm dev
```

## Validación

```bash
pnpm lint
pnpm build
```

## Estructura principal

- components: componentes visuales.
- data: colección inicial de tareas.
- models: tipos e interfaces.
- styles: estilos globales.
- docs: preguntas de cierre.

## Flujo de datos

App es la fuente de verdad: guarda `tasks` con useState y envía
datos y funciones mediante props. Los componentes hijos notifican
las acciones y App actualiza el estado de forma inmutable.
