import puppeteer from 'puppeteer';
import puppeteerExtraPluginStealth from 'puppeteer-extra-plugin-stealth';
import puppeteerExtraPluginUserAgentOverride from 'puppeteer-extra-plugin-stealth/evasions/user-agent-override/index.js';
import { PuppeteerExtra } from 'puppeteer-extra';
import { setTimeout } from 'node:timers/promises';

const BASE_URL = `https://www.newcomersjobcentre.ca/`;
const SELECTOR_TIMEOUT = 5000; // use for waiting for selectors
const PAGE_TIMEOUT = 60000; // use for page navigation
const PAGES_TO_SCRAPE = 5; // Don't need that much data. Just scrape the most recent few pages of jobs

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
 * Scrapes and saves jobs to the database.
 * @returns number of jobs scraped
 */
const scrapeJobs = async browser => {
  let jobs = 0;
  const jobIds = new Set();
  // start on page 2 because page 1 particularily tricky
  for (let i = 2; i < PAGES_TO_SCRAPE + 2; i++) {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(PAGE_TIMEOUT);
    await page.evaluateOnNewDocument(preload, device);

    // Navigate the page to a URL
    const url = `${BASE_URL}/page/${i}`;
    await retryablePageNavigation(page, url, 5);

    // get all the job ids on this search result page
    const jobIdsArr = await page.evaluate(() => {
      return [...document.querySelectorAll('.job')].map(
        node => node.querySelector('a').href.split('/')[4]
      );
    });

    // add to set to prevent duplicates
    for (const jobId of jobIdsArr) {
      jobIds.add(jobId);
    }
  }

  let jobObjs = [];
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(PAGE_TIMEOUT);
  await page.evaluateOnNewDocument(preload, device);
  for (const jobId of jobIds) {
    //  Navigate the page to a URL
    const url = `${BASE_URL}/jobs/${jobId}`;
    try {
      const httpRes = await page.goto(url);
      console.log(`${httpRes.status()} ${url}`);

      // skip if we get a non 2xx code for page navigation
      if (!httpRes.ok()) {
        throw new Error(httpRes.statusText());
      }

      await setTimeout(Math.floor(Math.random() * 8) + 1);

      const sectionHeaderSelector = '.section_header';
      const sectionHeaderElement = await page.waitForSelector(
        sectionHeaderSelector,
        {
          timeout: SELECTOR_TIMEOUT,
        }
      );

      const jobDetailsObj = await sectionHeaderElement?.evaluate(node => {
        const addressRegionMap = {
          Alberta: 'AB',
          'British Columbia': 'BC',
          Ontario: 'ON',
          Manitoba: 'MB',
          'New Brunswick': 'NB',
          'Nova Scotia': 'NS',
          Saskatchewan: 'SK',
          Yukon: 'YT',
          'Northwest Territories': 'NT',
          Nunavut: 'NU',
          Quebec: 'QC',
          'Prince Edward Island': 'PE',
          'Newfoundland and Labrador': 'NL',
        };

        const compTimeUnitMap = {
          Hourly: 'HOUR',
          Yearly: 'YEAR',
          Monthly: 'MONTH',
        };

        const jobTitle = node.querySelector('h1').textContent.trim();
        const jobDetailsNode = node.querySelector('.personal_care');
        console.log(node);
        const details = [...jobDetailsNode.querySelectorAll('span')].map(
          span => span.textContent
        );
        const hiringOrganization = details[0].split(' – Posted by ')[0].trim();
        const addressSplit = details[1].trim().split(',');
        const addressLocality = addressSplit[0].trim();
        const addressRegion = addressRegionMap[addressSplit[1].trim()];
        const employmentSubType = details[6];
        const paySplit = details[7].split(' : ')[1].split(' ');
        const minCompValue =
          paySplit[0][1] === '$'
            ? paySplit[0].substring(2)
            : paySplit[0].substring(1);
        const compTimeUnit = compTimeUnitMap[paySplit[1]];
        const datePosted = new Date(
          details[9].split(':')[1].trim()
        ).toISOString();
        const validThrough = new Date(
          details[10].split(':')[1].trim()
        ).toISOString();
        return {
          jobTitle: jobTitle,
          hiringOrganization: hiringOrganization,
          addressLocality: addressLocality,
          addressRegion: addressRegion,
          employmentSubType: employmentSubType,
          minCompValue: minCompValue,
          compTimeUnit: compTimeUnit,
          language: 'English',
          datePosted: datePosted,
          validThrough: validThrough,
          paid: true,
          site1: true,
          site2: true,
          site3: true,
          site4: true,
          site5: true,
        };
      });

      jobDetailsObj['jobPageId'] = jobId;

      const sectionContentSelector = '.section_content';
      const sectionContentElement = await page.waitForSelector(
        sectionContentSelector,
        {
          timeout: SELECTOR_TIMEOUT,
        }
      );

      const description = await sectionContentElement?.evaluate(node => {
        const textContent = node.textContent.trim();

        return textContent;
      });

      jobDetailsObj['description'] = description;

      const email = await sectionContentElement?.evaluate(node => {
        const textContent = node.textContent.split('@');

        // count character backward from where the split occured until we hit whitespace
        let i = 0;
        while (
          !/\s/.test(textContent[0].substring(textContent[0].length - 1 - i))
        ) {
          i++;
        }
        const emailUser = textContent[0].substring(textContent[0].length - i);

        // count character forward from where the split occured until we hit whitespace
        let j = 0;
        while (!/\s/.test(textContent[1].substring(0, j + 1))) {
          j++;
        }
        const emailDomain = textContent[1].substring(0, j);

        return `${emailUser}@${emailDomain}`;
      });

      // double check email
      const regex =
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
      if (!regex.test(email)) {
        throw new Error(`Could not correctly scrape email. Got: ${email}`);
      }

      jobDetailsObj['email'] = email;

      jobObjs.push(jobDetailsObj);
      jobs++;
      console.log(jobDetailsObj);
    } catch (err) {
      console.log(`Skipping job at ${url} due to error: ${err}.`);
    }
  }
  await saveJobs(jobObjs);
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
    `${process.env.JOB_BANK_API_BASE_URL}/api/job-posting`,
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
