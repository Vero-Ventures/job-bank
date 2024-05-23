import puppeteer from 'puppeteer';
import puppeteerExtraPluginStealth from 'puppeteer-extra-plugin-stealth';
import puppeteerExtraPluginUserAgentOverride from 'puppeteer-extra-plugin-stealth/evasions/user-agent-override/index.js';
import { PuppeteerExtra } from 'puppeteer-extra';
import { setTimeout } from 'node:timers/promises';

// TODO: change all the comments and identifiers in this file to refer to 'emails' not 'jobs' as the item we are scraping

const BASE_URL = `https://www.jobbank.gc.ca/jobsearch`;
const SELECTOR_TIMEOUT = 5000; // use for waiting for selectors
const PAGE_TIMEOUT = 60000; // use for page navigation
const JOB_POSTING_AGE_FILTER = 'fage=2'; // query parameter used to filter out postings older than 2 days
const JOB_POSTING_SORT = 'sort=D'; // query parameter used to sort by date posted
const JOB_POSTING_SOURCE_FILTER = 'fsrc=16'; // query parameter used to filter out non job bank canada internal postings ex. monster.com
const JOBS_PER_PAGE = 25; // appears to be 25 in testing but could change without notice in the future

const device = {
  userAgent: 'Mozilla/5.0 (Macintosh)', // set our fake user-agent
  viewport: {
    width: 1080,
    height: 4098,
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
    isLandscape: true,
  },
  locale: 'en-US,en;q=0.9',
  platform: 'Macintosh', // set our fake platform
};

function preload(device) {
  Object.defineProperty(navigator, 'platform', {
    value: device.platform,
    writable: true,
  });
  Object.defineProperty(navigator, 'userAgent', {
    value: device.userAgent,
    writable: true,
  });
  Object.defineProperty(screen, 'height', {
    value: device.viewport.height,
    writable: true,
  });
  Object.defineProperty(screen, 'width', {
    value: device.viewport.width,
    writable: true,
  });
  Object.defineProperty(window, 'devicePixelRatio', {
    value: device.viewport.deviceScaleFactor,
    writable: true,
  });
}

const retryablePageNavigation = async (page, url, attempts) => {
  try {
    await page.goto(url);
  } catch (err) {
    if (attempts > 0) {
      console.log(`navigation to ${url} failed due to: ${err}`);
      console.log(`retrying navigation to ${url} ${attempts} attempts left`);
      await retryablePageNavigation(page, url, attempts - 1);
    }
  }
};

/**
 * Checks the first page of the search results to see how many postings there are to scrape.
 *
 * @returns number of jobs to scrape
 */
const scrapeNumberOfJobIds = async browser => {
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(PAGE_TIMEOUT);
  await page.evaluateOnNewDocument(preload, device);

  // Navigate the page to a URL
  const url = `${BASE_URL}?${JOB_POSTING_AGE_FILTER}&page=1&${JOB_POSTING_SORT}&${JOB_POSTING_SOURCE_FILTER}`;

  await retryablePageNavigation(page, url, 5);

  // Wait and click on first result
  const searchResultSelector = await page.waitForSelector('.found', {
    timeout: SELECTOR_TIMEOUT,
  });
  const count = await searchResultSelector?.evaluate(el => el.textContent);

  return count.replace(/,/g, '');
};

/**
 * Scrapes and saves jobs to the database.
 * @returns number of jobs scraped
 */
const scrapeJobs = async browser => {
  const pages = Math.ceil(
    (await scrapeNumberOfJobIds(browser)) / JOBS_PER_PAGE
  );
  // const pages = 1; // REVERT BACK TO ABOVE. DO NOT COMMIT THIS.
  let jobs = 0;
  for (let i = 1; i <= pages; i++) {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(PAGE_TIMEOUT);
    await page.evaluateOnNewDocument(preload, device);

    // Navigate the page to a URL

    const url = `${BASE_URL}/jobsearch?${JOB_POSTING_AGE_FILTER}&page=${i}&${JOB_POSTING_SORT}&${JOB_POSTING_SOURCE_FILTER}`;
    await retryablePageNavigation(page, url, 5);

    // get all the job ids on this search result page
    const jobIdsThisPage = await page.evaluate(() => {
      const articles = [...document.querySelectorAll('article')];
      return articles.map(node => node.id.split('-')[1]);
    });
    console.log(jobIdsThisPage);
    let emailsThisPage = [];

    for (let j = 0; j < jobIdsThisPage.length; j++) {
      // Navigate the page to a URL
      const url = `${BASE_URL}/jobposting/${jobIdsThisPage[j]}?source=searchresults`;
      try {
        const httpRes = await page.goto(url);
        console.log(`${httpRes.status()} ${url}`);

        // skip if we get a non 2xx code for page navigation
        if (!httpRes.ok()) {
          throw new Error(httpRes.statusText());
        }

        await setTimeout(Math.floor(Math.random() * 8) + 1);

        const applyButtonSelector = '#applynowbutton';
        await page.waitForSelector(applyButtonSelector, {
          timeout: SELECTOR_TIMEOUT,
        });
        await page.click(applyButtonSelector);

        const emailSiblingSelector = await page.waitForSelector(
          '#tp_applyByEmailAddress',
          { timeout: SELECTOR_TIMEOUT } // using navigation timeout because the click triggers a post request that will take time
        );
        const email = await emailSiblingSelector?.evaluate(
          el => el.parentNode.childNodes[1].textContent
        );

        const emailObj = {
          email: email,
          sent: false,
        };

        emailsThisPage = [...emailsThisPage, emailObj];
        jobs++;
        console.log(emailObj);
      } catch (err) {
        console.log(`Skipping job at ${url} due to error: ${err}.`);
      }
    }
    console.log(emailsThisPage);
    // send jobs to job bank server
    await saveJobs(emailsThisPage);
  }

  await browser.close();
  return jobs;
};

/**
 * Saves jobs to posting.
 * @param {*} jobObjs
 * @returns number of successful posts
 */
const saveJobs = async jobObjs => {
  const res = await fetch(
    `${process.env.JOB_BANK_API_BASE_URL}/api/contact-stat`,
    {
      method: 'POST',
      body: JSON.stringify(jobObjs),
    }
  );

  const status = res.status;
  // TODO: should probably do some better error handling with retrying
  console.log(
    `Received code ${status} with response: ${(await res.json()).message}`
  );
};

(async () => {
  const pptr = new PuppeteerExtra(puppeteer);
  const pluginStealth = puppeteerExtraPluginStealth();
  pluginStealth.enabledEvasions.delete('user-agent-override'); // Remove this specific stealth plugin from the default set
  pptr.use(pluginStealth);

  const pluginUserAgentOverride = puppeteerExtraPluginUserAgentOverride({
    userAgent: device.userAgent,
    locale: device.locale,
    platform: device.platform,
  });
  pptr.use(pluginUserAgentOverride);

  const browser = await pptr.launch({
    args: [
      '--disable-features=site-per-process',
      `--window-size=${device.viewport.width},${device.viewport.height}`,
    ],
    headless: true,
    defaultViewport: device.viewport,
  });

  const start = new Date();

  const jobCount = await scrapeJobs(browser);

  const diff = new Date() - start;
  console.log(`Scraped ${jobCount} jobs in ${diff / 1000} seconds`);
  process.exit(0); // bit of a hack but not sure why the process doesn't exit after above print statement. Probably something up with Puppeteer.
})();
