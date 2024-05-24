import { test, expect } from '@playwright/test';
import { config } from './config';

test('Login with registered email and correct password', async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`${config.BASE_URL}/`);

    await page.getByRole('link', { name: 'Login / Sign Up' }).click();
    await page.getByLabel('Email address*').click();
    await page.getByLabel('Email address*').fill('cboilley@my.bcit.ca');

    await page.getByLabel('Password*').click();
    await page.getByLabel('Password*').fill('Bcit@123456');

    await page.getByRole('button', { name: 'Continue' }).click();

    await page.waitForURL('**/admin-panel/home');
    await expect(page).toHaveURL(`${config.BASE_URL}/admin-panel/home`);

    console.log('Login with registered email and correct password passed');
  } catch (error) {
    console.log('Login with registered email and correct password failed');
  } finally {
    await browser.close();
  }
});

test('Login with registered email and incorrect password', async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`${config.BASE_URL}/`);

    await page.getByRole('link', { name: 'Login / Sign Up' }).click();
    await page.getByLabel('Email address*').click();
    await page.getByLabel('Email address*').fill('cboilley@my.bcit.ca');

    await page.getByLabel('Password*').click();
    await page.getByLabel('Password*').fill('Bcit@12');

    // Attempt to log in
    await page.getByRole('button', { name: 'Continue' }).click();

    // Check for the error message
    const errorMessage = await page.getByText('Wrong email or password');
    await expect(errorMessage).toBeVisible();

    console.log('Login with registered email and incorrect password passed');
  } catch (error) {
    console.log('Login with registered email and incorrect password failed');
  } finally {
    await browser.close();
  }
});

test('Login with unregistered email', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`${config.BASE_URL}/`);

    await page.getByRole('link', { name: 'Login / Sign Up' }).click();
    await page.getByLabel('Email address*').click();
    await page.getByLabel('Email address*').fill('c@my.bcit.ca');

    await page.getByLabel('Password*').click();
    await page.getByLabel('Password*').fill('Bcit@123456');

    // Attempt to log in
    await page.getByRole('button', { name: 'Continue' }).click();

    // Check for the error message
    const errorMessage = await page.getByText('Wrong email or password');
    await expect(errorMessage).toBeVisible();

    console.log('Login with unregistered email passed');
  } catch (error) {
    console.log('Login with unregistered email failed');
    console.error(error);
  } finally {
    await browser.close();
  }
});
