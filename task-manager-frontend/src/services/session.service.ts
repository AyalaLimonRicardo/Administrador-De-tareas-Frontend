const ACCESS_TOKEN_KEY = 'task-manager.access-token';

// Solo se guarda el accessToken. Nunca contraseñas ni el objeto usuario.
export function readAccessToken(): string | null {
  try {
    return window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function saveAccessToken(token: string): void {
  try {
    window.sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  } catch {
    // Almacenamiento no disponible: la sesión vive solo en memoria.
  }
}

export function clearAccessToken(): void {
  try {
    window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  } catch {
    // Sin acción posible.
  }
}
