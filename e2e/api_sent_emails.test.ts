import { request, APIRequestContext } from '@playwright/test';
import { config } from './config';

const baseURL = `${config.BASE_URL}/api/job-posting`;

// Function to validate job properties
const validateJobProperties = (job: any) => {
  expect(job).toHaveProperty('_id');
  // Add other properties if needed
};

// Function to test the endpoints
const testEndpoint = async (context: APIRequestContext, endpoint: string) => {
  const response = await context.get(`${baseURL}/${endpoint}?et=pt&page_num=1`);
  expect(response.status()).toBe(200);
  const data = await response.json();

  for (const joblist in data) {
    for (const job of data[joblist]) {
      validateJobProperties(job);
    }
    expect(data[joblist].length).toBeGreaterThan(0);
  }
};

describe('API Job Postings', () => {
  let context: APIRequestContext;

  beforeAll(async () => {
    context = await request.newContext();
  });

  afterAll(async () => {
    await context.dispose();
  });

  const endpoints = [
    'newcomers',
    'disabled',
    'indigenous',
    'students',
    // 'asylum-refugees',
  ];

  endpoints.forEach(endpoint => {
    test(`API: ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} Postings`, async () => {
      await testEndpoint(context, endpoint);
    });
  });
});
