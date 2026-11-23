// El token vive en localStorage para que la sesión sobreviva a una recarga.
// Si el navegador bloquea el almacenamiento (modo privado, política del sitio), la sesión
// solo dura mientras la pestaña esté abierta: por eso hay un respaldo en memoria.
const TOKEN_KEY = 'task-manager.access-token';

let memoryToken: string | null = null;

export const getToken = (): string | null => {
  try {
    return window.localStorage.getItem(TOKEN_KEY) ?? memoryToken;
  } catch {
    return memoryToken;
  }
};

export const setToken = (token: string): void => {
  memoryToken = token;
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // Se conserva solo en memoria.
  }
};

export const clearToken = (): void => {
  memoryToken = null;
  try {
    window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Nada más que limpiar.
  }
};
