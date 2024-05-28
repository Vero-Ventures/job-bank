import { request, APIRequestContext } from '@playwright/test';
import { config } from './config';

const baseURL = `${config.BASE_URL}/api/job-posting`;

// Function to validate job properties
const validateJobProperties = (job: any) => {
  expect(job).toHaveProperty('_id');
  // Add other properties if needed
};

// Function to test the endpoints
const testEndpoint = async (
  context: APIRequestContext,
  endpoint: string,
  sortOrder: string
) => {
  const response = await context.get(
    `${baseURL}/${endpoint}?sort=${sortOrder}&page_num=1`
  );
  expect(response.status()).toBe(200);

  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error(
      `Error parsing JSON response for ${endpoint} with sort ${sortOrder}: ${error}`
    );
  }

  if (typeof data !== 'object' || Array.isArray(data)) {
    throw new Error(
      `Unexpected response format for ${endpoint} with sort ${sortOrder}`
    );
  }
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
    // 'newcomers',
    // 'disabled',
    // 'indigenous',
    // 'students',
    'asylum-refugees',
  ];

  const sortOrders = [
    'a', // ascending
    'd', // descending
  ];

  endpoints.forEach(endpoint => {
    sortOrders.forEach(sortOrder => {
      test(`API: ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} Postings sorted ${sortOrder === 'a' ? 'ascending' : 'descending'}`, async () => {
        await testEndpoint(context, endpoint, sortOrder);
      });
    });
  });
});
