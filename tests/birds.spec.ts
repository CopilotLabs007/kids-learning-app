import { expect, test } from '@playwright/test';

test('shows birds topic card on home page', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Birds' })).toBeVisible();
  await expect(page.getByTestId('favorite-birds')).toBeVisible();
  await expect(page.locator('[data-topic-name="birds"] a[href="/birds"]')).toHaveText('Start Learning');
});

test('loads birds learning page', async ({ page }) => {
  await page.goto('/birds');

  await expect(page).toHaveTitle(/Learn Birds/i);
  await expect(page.getByRole('heading', { name: 'Learn Birds' })).toBeVisible();
  await expect(page.locator('.animal-card')).toHaveCount(6);
  await expect(page.getByText('Parrot')).toBeVisible();
  await expect(page.getByText('Flamingo')).toBeVisible();
});
