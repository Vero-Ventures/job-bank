import { test, expect } from '@playwright/test';
import { config } from './config';

test('Logout after login', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`${config.BASE_URL}/`);

    await page.getByRole('link', { name: 'Login / Sign Up' }).click();

    await page.getByLabel('Email address*').fill('cboilley@my.bcit.ca');
    await page.getByLabel('Password*').fill('Bcit@123456');

    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page).toHaveURL(`${config.BASE_URL}`);
    console.log('Logout passed');
  } catch (error) {
    console.log('Logout failed');
    console.error(error);
  } finally {
    await context.close();
  }
});
