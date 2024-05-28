import { test, expect, APIRequestContext } from '@playwright/test';
import { config } from './config';

const baseURL = `${config.BASE_URL}/api/job-posting`;

// Function to validate job properties
const validateJobProperties = (job: any) => {
  expect(job).toHaveProperty('_id');
  // expect(job).toHaveProperty('jobTitle');
  // expect(job).toHaveProperty('datePosted');
  // expect(job).toHaveProperty('hiringOrganization');
  // expect(job).toHaveProperty('streetAddress');
  // expect(job).toHaveProperty('addressLocality');
  // expect(job).toHaveProperty('addressRegion');
  // expect(job).toHaveProperty('minCompValue');
  // expect(job).toHaveProperty('maxCompValue');
  // expect(job).toHaveProperty('compTimeUnit');
  // expect(job).toHaveProperty('workHours');
  // expect(job).toHaveProperty('specialCommitments');
  // expect(job).toHaveProperty('email');
  // expect(job).toHaveProperty('jobPageId');
  // expect(job).toHaveProperty('employmentType');
  // expect(job).toHaveProperty('employmentSubType');
  // expect(job).toHaveProperty('startTime');
  // expect(job).toHaveProperty('benefits');
  // expect(job).toHaveProperty('vacancies');
  // expect(job).toHaveProperty('verified');
  // expect(job).toHaveProperty('validThrough');
  // expect(job).toHaveProperty('description');
  // expect(job).toHaveProperty('site1');
  // expect(job).toHaveProperty('site2');
  // expect(job).toHaveProperty('site3');
  // expect(job).toHaveProperty('site4');
  // expect(job).toHaveProperty('__v');
  // expect(job).toHaveProperty('sent');
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

// Test for each endpoint and sort order
test.describe('API Job Postings', () => {
  let context: APIRequestContext;

  test.beforeAll(async ({ playwright }) => {
    context = await playwright.request.newContext();
  });

  test.afterAll(async () => {
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
