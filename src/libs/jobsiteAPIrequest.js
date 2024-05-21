const API_URL = '/api/job-posting/';
const TOTAL_POSTINGS_PER_PAGE = 25;
const PROVINCES_SHORT = {
  Alberta: 'AB',
  'British Columbia': 'BC',
  Manitoba: 'MB',
  'New Brunswick': 'NB',
  'Newfoundland and Labrador': 'NL',
  'Northwest Territories': 'NT',
  'Nova Scotia': 'NS',
  Nunavut: 'NU',
  Ontario: 'ON',
  'Prince Edward Island': 'PE',
  Québec: 'QC',
  Saskatchewan: 'SK',
  Yukon: 'YT',
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
  const pageParam = `page_num=${page}`;
  const sortParam = sortByDate ? '&sort=d' : '';
  let filterEParam = '';
  let filterPParam = '';
  if (filterValues.jobType && filterValues.jobType.length > 0) {
    for (let i = 0; i < filterValues.jobType.length; i++) {
      filterEParam += '&';
      filterEParam += `e=${filterValues.jobType[i]}`;
    }
  }
  if (filterValues.locations && filterValues.locations.length > 0) {
    for (let i = 0; i < filterValues.locations.length; i++) {
      filterPParam += '&';
      filterPParam += `p=${PROVINCES_SHORT[filterValues.locations[i]]}`;
    }
  }

  console.log(
    `${API_URL}${jobsiteName}?${pageParam}${sortParam}${filterEParam}${filterPParam}`
  );

  try {
    const response = await fetch(
      `${API_URL}${jobsiteName}?${pageParam}${sortParam}${filterEParam}${filterPParam}`
    );
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
      throw new Error('Fail to fetch job detail');
    }
    const res = await response.json();

    return res.jobPostings[0];
  } catch (error) {
    console.error('Error fetching job detail:', error);
    throw new Error('Failed to fetch job detail');
  }
};
