import { beforeEach, describe, expect, it } from 'vitest';
import {
  clearAccessToken,
  readAccessToken,
  saveAccessToken,
} from '../services/session.service';

describe('session.service', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('devuelve null cuando no existe token', () => {
    expect(readAccessToken()).toBeNull();
  });

  it('guarda lee y elimina el token', () => {
    saveAccessToken('token-de-prueba');
    expect(readAccessToken()).toBe('token-de-prueba');

    clearAccessToken();
    expect(readAccessToken()).toBeNull();
  });
});
