const JOB_POSTING_API_URL = process.env.NEXT_PUBLIC_JOB_POSTING_API_URL;

const saveJobPosting = async formData => {
  try {
    console.log('Form data:', formData);

    // Convert formData to JSON
    const jobPosting = formData;

    // Wrap the single job posting in an array
    const jobPostings = Array.isArray(jobPosting) ? jobPosting : [jobPosting];

    // Send the array of job postings to the backend API
    const addJobPosting = await fetch(JOB_POSTING_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobPostings),
    });

    if (!addJobPosting.ok) {
      throw new Error(
        `Failed to save job posting. Status: ${addJobPosting.status}`
      );
    }

    //added addJobPosting.createdJobPostingIds to jobPosting
    const response = await addJobPosting.json();

    // Update the job posting object with the ID of the newly created job posting
    jobPosting._id = response.createdJobPostingIds[0];

    return {
      success: true,
      jobPosting: jobPosting,
    };
  } catch (error) {
    console.error('Error saving form data:', error);
    throw new Error('Failed to save form data');
  }
};

const getJobPostingDetails = async jobId => {
  try {
    const response = await fetch(
      `${JOB_POSTING_API_URL}by-id?job-posting-id=${jobId}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch job posting details. Status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching job posting details:', error);
    throw new Error('Failed to fetch job posting details');
  }
};

//edit job posting with ID passed in and new data
const editJobPosting = async (jobPostingId, data) => {
  try {
    // Convert formData to JSON
    const jobPosting = data;

    // Send the job posting to the backend API
    const response = await fetch(
      `${JOB_POSTING_API_URL}?job-posting-id=${jobPostingId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobPosting),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to edit job posting. Status: ${response.status}`);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error editing job posting:', error);
    throw new Error('Failed to edit job posting');
  }
};

const jobPostingService = {
  saveJobPosting,
  getJobPostingDetails,
  editJobPosting,
};

export default jobPostingService;
