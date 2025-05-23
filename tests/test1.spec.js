import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('section').filter({ hasText: 'TRENDINGDrama IntensoUn drama' }).getByRole('link').nth(3).click();
  await page.getByRole('link', { name: 'Logo' }).click();
  await page.getByRole('link', { name: 'Drama' }).click();
  await page.getByRole('link', { name: 'Logo' }).click();
  await page.getByRole('link', { name: 'Comedia' }).click();
  await page.getByRole('link', { name: 'Logo' }).click();
  await page.getByRole('link', { name: 'Ficción' }).click();
  await page.getByRole('link', { name: 'Logo' }).click();
});