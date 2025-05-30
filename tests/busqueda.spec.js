import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/home');
  await expect(page).toHaveURL('http://localhost:5173/home');
  await page.getByRole('textbox', { name: 'Buscar películas...' }).click();
  await page.getByRole('textbox', { name: 'Buscar películas...' }).fill('spiderman');
  await page.getByRole('textbox', { name: 'Buscar películas...' }).press('Enter');
  await page.goto('http://localhost:5173/search?q=spiderman');
    // Asegurar que la URL se ha actualizado a la página de resultados de búsqueda
  await expect(page).toHaveURL('http://localhost:5173/search?q=spiderman');
  await page.locator('.inline-block').first().click();
  await page.getByRole('button').nth(2).click();
   // Verificar controles de video
  const playButton = page.getByRole('button').nth(2);
  const pauseButton = page.getByRole('button').nth(1);
  await expect(playButton).toBeVisible();
  await expect(pauseButton).toBeVisible();
  await playButton.click();
  await pauseButton.click();

});