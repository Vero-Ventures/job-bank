import { test, expect, APIRequestContext } from '@playwright/test';
import { config } from './config';

const baseURL = `${config.BASE_URL}/api/job-posting`;

// Function to test the endpoints
const testEndpoint = async (context: APIRequestContext, endpoint: string) => {
  const response = await context.get(`${baseURL}/${endpoint}?page_num=200`);
  expect(response.status()).toBe(204);
};

// Test for each endpoint
test.describe('API Job Postings', () => {
  let context: APIRequestContext;

  test.beforeAll(async ({ playwright }) => {
    context = await playwright.request.newContext();
  });

  test.afterAll(async () => {
    await context.dispose();
  });

  const endpoints = [
    'newcomers',
    'disabled',
    'indigenous',
    'students',
    'asylum-refugees',
  ];

  endpoints.forEach(endpoint => {
    test(`API: ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} Postings`, async () => {
      await testEndpoint(context, endpoint);
    });
  });
});
