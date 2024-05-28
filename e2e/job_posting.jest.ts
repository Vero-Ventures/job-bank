// import puppeteer, { Browser, Page } from 'puppeteer';
// import { config } from './config';

// const BASE_URL = config.BASE_URL;
// const email = 'cboilley@my.bcit.ca';
// const password = 'Bcit@123456';

// let browser: Browser;
// let page: Page;

// beforeAll(async () => {
//   browser = await puppeteer.launch();
//   page = await browser.newPage();
// });

// afterAll(async () => {
//   await browser.close();
// });

// const login = async () => {
//   await page.goto(`${BASE_URL}/`);
//   await page.click('a[href="/api/auth/login"]');
//   await page.waitForSelector('input[name="username"]');
//   await page.type('input[name="username"]', email);

//   await page.type('input[id="password"]', password);
//   await page.click('button[name="action"]');
// };

// test('Create Job Posting', async () => {
//   let browserType;

//   try {
//     browserType = await browser.userAgent();

//     // Login
//     await login();

//     // Your test implementation here
//     // Example:
//     // Wait for the button to appear in the DOM
//     await page.waitForSelector(
//       'button[class="inline-flex items-center justify-center rounded-md ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-100 text-gray-900 hover:bg-gray-100/80 h-10 px-4 py-2 whitespace-nowrap text-base leading-6 font-medium"]'
//     );

//     // Click the button
//     await page.click(
//       'button[class="inline-flex items-center justify-center rounded-md ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-100 text-gray-900 hover:bg-gray-100/80 h-10 px-4 py-2 whitespace-nowrap text-base leading-6 font-medium"]'
//     );

//     await page.setDefaultTimeout(2000);

//     // Fill in job details
//     await page.click('input[placeholder="Job Title"]');
//     await page.type('input[placeholder="Job Title"]', `${browserType} Test`);
//     await page.type('input[name="hiringOrganization"]', 'Tester Inc');
//     await page.type('input[name="streetAddress"]', '123 Testing');
//     await page.type('input[name="addressLocality"]', 'VAN');
//     await page.select('select[name="addressRegion"]', 'BC');
//     await page.type('input[name="language"]', 'EN');
//     await page.type('input[name="employmentType"]', 'Tester');
//     await page.type('input[name="jobType"]', 'Internship');
//     await page.type('input[name="minWage"]', '5');
//     await page.type('input[name="maxWage"]', '9');
//     await page.type('textarea[name="benefits"]', 'Health');
//     await page.type('input[name="startDate"]', '2024-05-21');
//     await page.type('input[name="validThrough"]', '2024-05-31');
//     await page.type('textarea[name="description"]', 'I am a tester');
//     await page.click('label[for="displayOnNewcomers"]');
//     await page.click('input[name="displayOnVulnerableYouth"]');
//     await page.click('button[name="Add Posting"]');

//     // Assertions and further actions
//     expect(page.url()).toBe(`${BASE_URL}/admin-panel/home`);
//     console.log('Create Job Posting and check info passed');
//   } catch (error) {
//     console.log('Create Job Posting and check info failed');
//     console.error(error);
//   }
// });

// // Repeat similar structure for other tests: Edit Job Posting and Delete Job Posting
