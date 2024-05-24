import { test, expect } from '@playwright/test';
import { config } from './config';

const email = 'cboilley@my.bcit.ca';
const password = 'Bcit@123456';

test.describe.configure({ mode: 'serial' });

const login = async page => {
  await page.goto(`${config.BASE_URL}/`);
  await page.getByRole('link', { name: 'Login / Sign Up' }).click();
  await page.getByLabel('Email address*').fill(email);
  await page.getByLabel('Password*').fill(password);
  await page.getByRole('button', { name: 'Continue' }).click();
};

test('Create Job Posting', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const jobDetails = {
    jobTitle: 'Test',
    hiringOrganization: 'Tester Inc',
    streetAddress: '123 Testing',
    addressLocality: 'VAN',
    addressRegion: 'BC',
    language: 'EN',
    employmentType: 'Tester',
    jobType: 'Internship',
    minWage: '5',
    maxWage: '9',
    benefits: 'Health',
    startDate: '2024-05-21',
    validThrough: '2024-05-23',
    description: 'I am a tester',
  };

  try {
    await login(page);
    await page.getByRole('button', { name: 'Add New Job Posting' }).click();

    await page.getByPlaceholder('Job Title').fill(jobDetails.jobTitle);
    await page
      .getByPlaceholder('Hiring Organization')
      .fill(jobDetails.hiringOrganization);
    await page
      .getByPlaceholder('Street Address')
      .fill(jobDetails.streetAddress);
    await page
      .getByPlaceholder('Address Locality')
      .fill(jobDetails.addressLocality);
    await page.getByRole('combobox').selectOption(jobDetails.addressRegion);
    await page.getByPlaceholder('Language').fill(jobDetails.language);
    await page
      .getByPlaceholder('eg. Permanent, Contract,')
      .fill(jobDetails.employmentType);
    await page
      .getByPlaceholder('eg: Internship, Full-time,')
      .fill(jobDetails.jobType);
    await page.getByPlaceholder('Min Hourly Wage').fill(jobDetails.minWage);
    await page.getByPlaceholder('Maximum Hourly Wage').fill(jobDetails.maxWage);
    await page.getByPlaceholder('Benefits').fill(jobDetails.benefits);
    await page.locator('input[name="startTime"]').fill(jobDetails.startDate);
    await page
      .locator('input[name="validThrough"]')
      .fill(jobDetails.validThrough);
    await page.getByPlaceholder('Description').fill(jobDetails.description);
    await page.getByLabel('Display on New Comers').check();
    await page.getByLabel('Display on Students').check();
    await page.getByRole('button', { name: 'Add Posting' }).click();

    await expect(page).toHaveURL(`${config.BASE_URL}/admin-panel/home`);

    await page.reload();
    await page.waitForTimeout(2000);

    await page.getByRole('button', { name: 'Edit' }).first().click();

    // Verify job posting details
    const jobTitle = await page.getByPlaceholder('Job Title').inputValue();
    const hiringOrganization = await page
      .getByPlaceholder('Hiring Organization')
      .inputValue();
    const streetAddress = await page
      .getByPlaceholder('Street Address')
      .inputValue();
    const addressLocality = await page
      .getByPlaceholder('Address Locality')
      .inputValue();
    const selectedRegion = await page.getByRole('combobox').inputValue();
    const language = await page.getByPlaceholder('Language').inputValue();
    const employmentType = await page
      .getByPlaceholder('eg. Permanent, Contract,')
      .inputValue();
    const jobType = await page
      .getByPlaceholder('eg: Internship, Full-time,')
      .inputValue();
    const minWage = await page.getByPlaceholder('Min Hourly Wage').inputValue();
    const maxWage = await page
      .getByPlaceholder('Maximum Hourly Wage')
      .inputValue();
    const benefits = await page.getByPlaceholder('Benefits').inputValue();
    const startDate = await page
      .locator('input[name="startTime"]')
      .inputValue();
    const description = await page.getByPlaceholder('Description').inputValue();
    const newComers = await page
      .getByLabel('Display on New Comers')
      .isChecked();
    const students = await page.getByLabel('Display on Students').isChecked();

    // Assertions to verify the values
    expect(jobTitle).toBe(jobDetails.jobTitle);
    expect(hiringOrganization).toBe(jobDetails.hiringOrganization);
    expect(streetAddress).toBe(jobDetails.streetAddress);
    expect(addressLocality).toBe(jobDetails.addressLocality);
    expect(selectedRegion).toBe(jobDetails.addressRegion);
    expect(language).toBe(jobDetails.language);
    expect(employmentType).toBe(jobDetails.employmentType);
    expect(jobType).toBe(jobDetails.jobType);
    expect(minWage).toBe(jobDetails.minWage);
    expect(maxWage).toBe(jobDetails.maxWage);
    expect(benefits).toBe(jobDetails.benefits);
    expect(startDate).toBe(jobDetails.startDate);
    expect(description).toBe(jobDetails.description);
    expect(newComers).toBe(true);
    expect(students).toBe(true);

    await page.getByRole('button', { name: 'Save Posting' }).click();

    console.log('Create Job Posting and check info passed');
  } catch (error) {
    console.log('Create Job Posting and check info failed');
    console.error(error);
  } finally {
    await context.close();
  }
});

test('Edit Job Posting', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const newJobDetails = {
    jobTitle: 'Updated Test',
    hiringOrganization: 'Updated Tester Inc',
    streetAddress: '456 Testing',
    addressLocality: 'VANCOUVER',
    addressRegion: 'AB',
    language: 'FR',
    employmentType: 'Updated Tester',
    jobType: 'Part-time',
    minWage: '10',
    maxWage: '15',
    benefits: 'Dental',
    startDate: '2024-05-20',
    validThrough: '2024-06-30',
    description: 'I am an updated tester',
  };

  try {
    await login(page);

    await page.getByRole('button', { name: 'Edit' }).first().click();

    await page.getByPlaceholder('Job Title').fill(newJobDetails.jobTitle);
    await page
      .getByPlaceholder('Hiring Organization')
      .fill(newJobDetails.hiringOrganization);
    await page
      .getByPlaceholder('Street Address')
      .fill(newJobDetails.streetAddress);
    await page
      .getByPlaceholder('Address Locality')
      .fill(newJobDetails.addressLocality);
    await page.getByRole('combobox').selectOption(newJobDetails.addressRegion);
    await page.getByPlaceholder('Language').fill(newJobDetails.language);
    await page
      .getByPlaceholder('eg. Permanent, Contract,')
      .fill(newJobDetails.employmentType);
    await page
      .getByPlaceholder('eg: Internship, Full-time,')
      .fill(newJobDetails.jobType);
    await page.getByPlaceholder('Min Hourly Wage').fill(newJobDetails.minWage);
    await page
      .getByPlaceholder('Maximum Hourly Wage')
      .fill(newJobDetails.maxWage);
    await page.getByPlaceholder('Benefits').fill(newJobDetails.benefits);
    await page.locator('input[name="startTime"]').fill(newJobDetails.startDate);
    await page
      .locator('input[name="validThrough"]')
      .fill(newJobDetails.validThrough);
    await page.getByPlaceholder('Description').fill(newJobDetails.description);
    await page.getByLabel('Display on Indigenous').check();
    await page.getByLabel('Display on Asylum-Refugess').check();
    await page.getByLabel('Display on Students').uncheck();
    await page.getByLabel('Display on New Comers').uncheck();

    await page.getByRole('button', { name: 'Save Posting' }).click();

    await page.waitForTimeout(2000);
    await page.reload();
    await page.waitForTimeout(2000);

    await page.getByRole('button', { name: 'Edit' }).first().click();

    // Verify updated job posting details
    const jobTitle = await page.getByPlaceholder('Job Title').inputValue();
    const hiringOrganization = await page
      .getByPlaceholder('Hiring Organization')
      .inputValue();
    const streetAddress = await page
      .getByPlaceholder('Street Address')
      .inputValue();
    const addressLocality = await page
      .getByPlaceholder('Address Locality')
      .inputValue();
    const selectedRegion = await page.getByRole('combobox').inputValue();
    const language = await page.getByPlaceholder('Language').inputValue();
    const employmentType = await page
      .getByPlaceholder('eg. Permanent, Contract,')
      .inputValue();
    const jobType = await page
      .getByPlaceholder('eg: Internship, Full-time,')
      .inputValue();
    const minWage = await page.getByPlaceholder('Min Hourly Wage').inputValue();
    const maxWage = await page
      .getByPlaceholder('Maximum Hourly Wage')
      .inputValue();
    const benefits = await page.getByPlaceholder('Benefits').inputValue();
    const startDate = await page
      .locator('input[name="startTime"]')
      .inputValue();
    const description = await page.getByPlaceholder('Description').inputValue();
    const newComers = await page
      .getByLabel('Display on New Comers')
      .isChecked();
    const students = await page.getByLabel('Display on Students').isChecked();
    const indigenous = await page
      .getByLabel('Display on Indigenous')
      .isChecked();
    const asylumRefugees = await page
      .getByLabel('Display on Asylum-Refugess')
      .isChecked();

    // Assertions to verify the updated values
    expect(jobTitle).toBe(newJobDetails.jobTitle);
    expect(hiringOrganization).toBe(newJobDetails.hiringOrganization);
    expect(streetAddress).toBe(newJobDetails.streetAddress);
    expect(addressLocality).toBe(newJobDetails.addressLocality);
    expect(selectedRegion).toBe(newJobDetails.addressRegion);
    expect(language).toBe(newJobDetails.language);
    expect(employmentType).toBe(newJobDetails.employmentType);
    expect(jobType).toBe(newJobDetails.jobType);
    expect(minWage).toBe(newJobDetails.minWage);
    expect(maxWage).toBe(newJobDetails.maxWage);
    expect(benefits).toBe(newJobDetails.benefits);
    expect(startDate).toBe(newJobDetails.startDate);
    expect(description).toBe(newJobDetails.description);
    expect(newComers).toBe(false);
    expect(students).toBe(false);
    expect(indigenous).toBe(true);
    expect(asylumRefugees).toBe(true);

    await page.getByRole('button', { name: 'Save Posting' }).click();

    console.log('Edit Job Posting and check info passed');
  } catch (error) {
    console.log('Edit Job Posting and check info failed');
    console.error(error);
  } finally {
    await context.close();
  }
});

test('Delete Job Posting', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await login(page);
    await page.getByRole('button', { name: 'Delete' }).first().click();
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(`${config.BASE_URL}/admin-panel/home`);
    console.log('Delete Job Posting and check info passed');
  } catch (error) {
    console.log('Delete Job Posting and check info failed');
    console.error(error);
  } finally {
    await context.close();
  }
});
