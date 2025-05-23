import { test, expect } from '@playwright/test';
import { server } from '../src/mocks/server';

test.beforeAll(async () => {
  server.listen();
});

test.afterAll(async () => {
  server.close();
});

test.afterEach(() => {
  server.resetHandlers();
});

test.describe('API Endpoints', () => {
  test('debería filtrar películas por género', async ({ request }) => {
    const response = await request.get('https://api.themoviedb.org/3/discover/movie?with_genres=28');
    const data = await response.json();
    
    expect(response.ok()).toBeTruthy();
    expect(data.results).toBeDefined();
    expect(Array.isArray(data.results)).toBeTruthy();
    expect(data.results.every(movie => movie.genre_ids.includes(28))).toBeTruthy();
  });

  test('debería obtener detalles de una película por id', async ({ request }) => {
    const response = await request.get('https://api.themoviedb.org/3/movie/1');
    const data = await response.json();
    
    expect(response.ok()).toBeTruthy();
    expect(data).toBeDefined();
    expect(data.id).toBe(1);
    expect(data.title).toBe("Película de Acción");
  });

  test('debería retornar 404 para película inexistente', async ({ request }) => {
    const response = await request.get('https://api.themoviedb.org/3/movie/999999');
    
    expect(response.status()).toBe(404);
  });

  test('debería obtener lista de géneros', async ({ request }) => {
    const response = await request.get('https://api.themoviedb.org/3/genre/movie/list');
    const data = await response.json();
    
    expect(response.ok()).toBeTruthy();
    expect(data.genres).toBeDefined();
    expect(Array.isArray(data.genres)).toBeTruthy();
    expect(data.genres).toEqual([
      { id: 28, name: "Acción" },
      { id: 18, name: "Drama" },
      { id: 35, name: "Comedia" }
    ]);
  });

  test('debería obtener películas en tendencia', async ({ request }) => {
    const response = await request.get('https://api.themoviedb.org/3/trending/movie/day');
    const data = await response.json();
    
    expect(response.ok()).toBeTruthy();
    expect(data.results).toBeDefined();
    expect(Array.isArray(data.results)).toBeTruthy();
    expect(data.results.length).toBe(4); // Número de películas en nuestros datos de prueba
  });
});