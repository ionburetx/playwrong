import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5174/');
  await page.locator('div:nth-child(2) > .relative > .absolute > .p-8 > .inline-block').click();
  await page.getByRole('link', { name: 'Logo' }).click();
  await page.getByRole('link', { name: 'Drama' }).click();
  await page.getByRole('link', { name: 'Logo' }).click();
  await page.getByRole('link', { name: 'Comedia' }).click();
  await page.getByRole('link', { name: 'Logo' }).click();
  await page.getByRole('link', { name: 'Ficción' }).click();
  await page.getByRole('link', { name: 'Logo' }).click();
  await page.locator('.absolute > .inline-block').first().click();
  await page.locator('section').filter({ hasText: 'DramaLos silenciososEn 2008,' }).getByRole('link').first().click();
await page.pause();
});