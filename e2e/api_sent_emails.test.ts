import { test, expect } from '@playwright/test';
import { config } from './config';

test('API: Email Sent', async ({ request }) => {
  const response = await request.get(
    `${config.BASE_URL}/api/job-posting/email-sent?sort=-1`
  );
  expect(response.status()).toBe(200);
});
