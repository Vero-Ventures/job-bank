// import { config } from './config';
// import { test, chromium } from '@playwright/test';

// test('Signup with existing email', async () => {
//   const browser = await chromium.launch();
//   const page = await browser.newPage();

//   try {
//     await page.goto(`${config.BASE_URL}/auth`);

//     await page.getByLabel('Email address*').click();
//     await page.getByLabel('Email address*').fill('cboilley@my.bcit.ca');

//     await page.getByLabel('Password*').click();
//     await page.getByLabel('Password*').fill('Bcit@123456');

//     const signupButton = await page.$('button:has-text("Signup")');
//     await signupButton?.click();
//     await page.waitForSelector('text="User already registered"', {
//       state: 'visible',
//     });
//     console.error('Signup test with existing email passed');
//   } catch (error) {
//     console.log('Signup test with existing email failed');
//     throw error;
//   } finally {
//     await browser.close();
//   }
// });
