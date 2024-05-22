import { JOBTYPES, PROVINCES } from './filterValues';
const API_URL = '/api/job-posting/';
const TOTAL_POSTINGS_PER_PAGE = 25;

/**
 * Set Parameters for fetching data
 * @param {string} jobsiteName - name of jobsite
 * @param {int} page - page number
 * @param {boolean} sortByDate - wether sort by date or not
 * @param {object} filterValues - filter values as dictionary, keys as filter catogories, values as options user selected
 * @return params as a string that will be sent to API call
 */
const setParams = (jobsiteName, page, sortByDate, filterValues) => {
  const pageParam = `page_num=${page}`;
  const sortParam = sortByDate ? '&sort=d' : '';
  let filterEParam = '';
  let filterPParam = '';
  if (filterValues.jobType && filterValues.jobType.length > 0) {
    for (let i = 0; i < filterValues.jobType.length; i++) {
      filterEParam += '&';
      filterEParam += `et=${JOBTYPES[filterValues.jobType[i]]}`;
    }
  }
  if (filterValues.locations && filterValues.locations.length > 0) {
    for (let i = 0; i < filterValues.locations.length; i++) {
      filterPParam += '&';
      filterPParam += `p=${PROVINCES[filterValues.locations[i]]}`;
    }
  }

  return `${pageParam}${sortParam}${filterEParam}${filterPParam}`;
};

/**
 * Fetch total number of pages for pagination.
 * @param {object} setTotalPage - function object to setPage
 * @param {string} jobsiteName - name of jobsite
 */
export const fetchTotalPages = async (setTotalPage, jobsiteName) => {
  try {
    const response = await fetch(`${API_URL}${jobsiteName}/total-posts`);
    if (!response.ok) {
      throw new Error('Fail to fetch total number of postings.');
    }
    const res = await response.json();
    setTotalPage(Math.ceil(res.jobPostings / TOTAL_POSTINGS_PER_PAGE));
  } catch (error) {
    console.error('Error fetching number of postings:', error);
    throw new Error('Failed to fetch total number of postings');
  }
};

/**
 * Fetch job postings from database.
 * @param {string} jobsiteName - name of jobsite
 * @param {string} page - page number to fetch
 * @returns jobpostings as a list
 */
export const fetchJobPostList = async (
  jobsiteName,
  page,
  sortByDate,
  filterValues
) => {
  const newParams = setParams(jobsiteName, page, sortByDate, filterValues);
  console.log(`${API_URL}${jobsiteName}?${newParams}`);

  try {
    const response = await fetch(`${API_URL}${jobsiteName}?${newParams}`);
    if (!response.ok) {
      throw new Error('Fail to fetch postings');
    }
    const res = await response.json();

    return res.jobPostings;
  } catch (error) {
    console.error('Error fetching job postings:', error);
    throw new Error('Failed to fetch job postings');
  }
};

/**
 * Fetch job postings from database.
 * @param {string} jobsiteName - name of jobsite
 * @param {string} page - page number to fetch
 * @returns jobpostings as a list
 */
export const fetchJobDetail = async postID => {
  try {
    const response = await fetch(`${API_URL}by-id?job-posting-id=${postID}`);
    if (!response.ok) {
      if (response.status === 404) {
        return { error: 'Job detail not found (404)', status: 404 };
      }
      return {
        error: `Failed to fetch job detail (status: ${response.status})`,
      };
    }
    const res = await response.json();
    return res.jobPostings[0];
  } catch (error) {
    return { error: 'Failed to fetch job detail', details: error.message };
  }
};
