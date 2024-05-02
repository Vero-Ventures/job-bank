import puppeteer from 'puppeteer';
import posting from '../posting.js';
import mongoose from 'mongoose';

const BASE_URL = `https://www.jobbank.gc.ca/jobsearch`;
const LONG_TIMEOUT = 5000; // use for first time page loads
const MED_TIMEOUT = 1000; // use waiting for a browser action ex. clicking the how to apply button
const SHORT_TIMEOUT = 200; // use for subsequent selector queries
const JOB_POSTING_AGE_FILTER = 'fage=2'; // query parameter used to filter out postings older than 2 days
const JOB_POSTING_SORT = 'sort=D'; // query parameter used to sort by date posted
const JOB_POSTING_SOURCE_FILTER = 'fsrc=16'; // query parameter used to filter out non job bank canada internal postings ex. monster.com
const JOBS_PER_PAGE = 25; // appears to be 25 in testing but could change without notice in the future
const JOB_DETAIL_DIRECT_PROPERTIES = {
    jobTitle: 'title',
    datePosted: 'datePosted',
    hiringOrganization: 'hiringOrganization',
    streetAddress: 'streetAddress', 
    addressLocality: 'addressLocality', 
    addressRegion: 'addressRegion',
    minCompValue: 'minValue',
    maxCompValue: 'maxCompValue',
    compTimeUnit: 'unitText',
    workHours: 'workHours',
    specialCommitments: 'specialCommitments',
    validThrough: 'validThrough'
}

/**
 * Checks the first page of the search results to see how many postings there are to scrape.
 * 
 * @returns number of jobs to scrape
 */
const scrapeNumberOfJobIds = async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    // Set screen size
    await page.setViewport({width: 1080, height: 4098});

    // Navigate the page to a URL
    const url = `${BASE_URL}?${JOB_POSTING_AGE_FILTER}&page=1&${JOB_POSTING_SORT}&${JOB_POSTING_SOURCE_FILTER}`
    await page.goto(url);

    // Wait and click on first result
    const searchResultSelector = await page.waitForSelector('.found', {timeout: LONG_TIMEOUT});
    const count = await searchResultSelector?.evaluate(el => el.textContent);
    
    await browser.close();

    return count.replace(/,/g, '')
}

/**
 * Gets the job details from the page that are easy to get. These are defined in JOB_DETAIL_DIRECT_PROPERTIES.
 * If a detail can't be found it is set to null in the return object.
 * 
 * @param {Page} page 
 * @returns object containing the details
 */
const getJobDetailsDirect = async (page) => {

    const getJobDetailDirect = async(property) => {
        const selector =  `[property="${property}"]`;
        try {
            const elementHandle = await page.waitForSelector(selector, {timeout: SHORT_TIMEOUT});
            const value = await elementHandle?.evaluate(el => el.textContent.trim());
            return value;
        } catch(err) {
            console.log(`Skipping ${property} due to error: ${err}.`);
            return null;
        }
    }

    const keys = Object.keys(JOB_DETAIL_DIRECT_PROPERTIES);

    const values = await Promise.all(keys.map(key => getJobDetailDirect(JOB_DETAIL_DIRECT_PROPERTIES[key])));

    const retObj = {};
    for (let i = 0; i < keys.length; i++) {
        retObj[keys[i]] = values[i];
    }

    return retObj;
}

/**
 * Scrapes and saves jobs to the database.
 * @param {*} postingModel mongoose model to use to save jobs
 * @returns number of jobs scraped
 */
const scrapeJobs = async (postingModel) => {
    const pages = Math.ceil(await scrapeNumberOfJobIds() / JOBS_PER_PAGE);

    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    let jobs = 0;
    for(let i = 1; i <= pages; i++) {
        const page = await browser.newPage();
        
        // Set screen size
        await page.setViewport({width: 1080, height: 4098});

        // Navigate the page to a URL
        await page.goto(`${BASE_URL}/jobsearch?${JOB_POSTING_AGE_FILTER}&page=${i}&${JOB_POSTING_SORT}&${JOB_POSTING_SOURCE_FILTER}`);

        // get all the job ids on this search result page
        const jobIdsThisPage = await page.evaluate(() => {
            const articles = [...document.querySelectorAll('article')]
            return articles.map(node => node.id.split('-')[1])
        })
        console.log(jobIdsThisPage)
        let jobsThisPage = []

        for (let j = 0; j < jobIdsThisPage.length; j++) {

            // skip job posting if we have it already
            const dbResult = await postingModel.findOne({jobPageId: jobIdsThisPage[j]}).exec();
            if (!dbResult) {
                // Navigate the page to a URL
                const url = `${BASE_URL}/jobposting/${jobIdsThisPage[j]}?source=searchresults`;
                try {
                    const httpRes = await page.goto(url);
                    console.log(`${httpRes.status()} ${url}`);
     
                    const applyButtonSelector = '#applynowbutton';
                    await page.waitForSelector(applyButtonSelector, {timeout: LONG_TIMEOUT});
                    await page.click(applyButtonSelector);
                
                    const emailSiblingSelector = await page.waitForSelector('#tp_applyByEmailAddress', {timeout: MED_TIMEOUT});
                    const email = await emailSiblingSelector?.evaluate(el => el.parentNode.childNodes[1].textContent);
                    
                    const directJobDetails = await getJobDetailsDirect(page);
    
                    directJobDetails['email'] = email;
    
                    directJobDetails['jobPageId'] = jobIdsThisPage[j];
    
                    try {
                        const employmentTypeSelector = await page.waitForSelector('[property="employmentType"]', {timeout: SHORT_TIMEOUT});
                        const employmentTypeValue = await employmentTypeSelector?.evaluate(el => el.childNodes[0].textContent)
                        const employmentSubTypeValue = await employmentTypeSelector?.evaluate(el => el.childNodes[1].textContent)
                        directJobDetails['employmentType'] = employmentTypeValue;   
                        directJobDetails['employmentSubType'] = employmentSubTypeValue;
                    } catch(err) {
                        console.log(`Skipping employmentType and employmentSubType due to error: ${err}.`);
                        directJobDetails['employmentType'] = null;   
                        directJobDetails['employmentSubType'] = null;
                    }
    
                    try {
                        const startTimeSelector = await page.waitForSelector('#tp_startDateId', {timeout: SHORT_TIMEOUT});
                        const startTime = await startTimeSelector?.evaluate(el => el.parentNode.childNodes[4].textContent);
                        directJobDetails['startTime'] = startTime;
                    } catch(err) {
                        console.log(`Skipping startTime due to error: ${err}.`);
                        directJobDetails['startTime'] = null;
                    }
                    
                    try {
                        const benefitsSelector = await page.waitForSelector('.fa-gift', {timeout: SHORT_TIMEOUT});
                        const benefits = await benefitsSelector?.evaluate(el => el.textContent);
                        const trimmedBenefits = benefits.trim();
                        directJobDetails['benefits'] = trimmedBenefits === '' ? null : trimmedBenefits;
                    } catch(err) {
                           console.log(`Skipping benefits due to error: ${err}.`);
                           directJobDetails['benefits'] = null;
                    }
    
                    try {
                        const vacanciesSelector = await page.waitForSelector('#tp_vacancyNumber', {timeout: SHORT_TIMEOUT});
                        const vacancies = await vacanciesSelector?.evaluate(el => el.parentNode.childNodes[4].textContent);
                        directJobDetails['vacancies'] = vacancies ? vacancies.split(' ')[0] : null;
                    } catch(err) {
                        console.log(`Skipping vacancies due to error: ${err}.`);
                        directJobDetails['vacancies'] = null;
                    }
    
                    try {
                        const verifiedSelector = await page.waitForSelector('.job-marker', {timeout: SHORT_TIMEOUT});
                        const verified = await verifiedSelector?.evaluate(el => el.textContent.trim().toLowerCase() === 'verified');
                        directJobDetails['verified'] = verified;    
                    } catch(err) {
                        console.log(`Skipping verified due to error: ${err}.`);
                        directJobDetails['verified'] = null;
                    }
    
                    try {
                        const descriptionSelector = await page.waitForSelector('.job-posting-detail-requirements', {timeout: SHORT_TIMEOUT});
                        const description = await descriptionSelector?.evaluate(el => el.innerHTML);
                        directJobDetails['description'] = description;
                    } catch(err) {
                        console.log(`Skipping description due to error: ${err}.`);
                        directJobDetails['description'] = null;
                    }
    
                    directJobDetails['site1'] = true;
                    directJobDetails['site2'] = true;
                    directJobDetails['site3'] = true;
                    directJobDetails['site4'] = true;
    
                    jobsThisPage = [...jobsThisPage, directJobDetails];
                    jobs++;
                    console.log(directJobDetails)
                } catch(err) {
                    console.log(`Skipping job at ${url} due to error: ${err}.`)
                }
            } else {
                console.log(`Skipping job with id ${jobIdsThisPage[j]} due to duplicate id.`)
            }
        }
        // save jobs in database
        await saveJobs(jobsThisPage, postingModel);
    }

    await browser.close();
    return jobs;
}

/**
 * Saves jobs to posting. Passed objects are expected to adhere to Posting schema.
 * @param {*} jobObjs 
 * @param {PostingModel} postingModel mongoose model to use to save jobs
 * @returns number of successful inserts
 */
const saveJobs = async(jobObjs, postingModel) => {
    const Posting = postingModel;
    let successes = 0;
    for (const job of jobObjs) {
        const jobPosting = new Posting(job);
        try {
            await jobPosting.save();
            successes++;
        } catch (err) {
            console.log(`skipping job with id ${job.jobPageId} due to error: ${err}`);
        }
    }
    return successes;
}

(async () => {
    const start = new Date();

    await mongoose.connect(process.env.MONGO_CONNECT);

    const Posting = new mongoose.model('Posting', posting);

    const jobCount = await scrapeJobs(Posting);

    const diff = new Date() - start;
    console.log(`Scraped ${jobCount} jobs in ${diff / 1000} seconds`);
    process.exit(0); // bit of a hack but not sure why the process doesn't exit after above print statement. Probably something up with Puppeteer.
})();