// VITE_API_URL se resuelve al compilar. Sin diagonal final para poder concatenar rutas.
const rawApiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export const API_URL: string = rawApiUrl.replace(/\/+$/, '');
