const saveJobPosting = async formData => {
  try {
    console.log('Form data:', formData);

    // Convert formData to JSON
    const jobPosting = formData;

    // Wrap the single job posting in an array
    const jobPostings = Array.isArray(jobPosting) ? jobPosting : [jobPosting];

    // Send the array of job postings to the backend API
    const addJobPosting = await fetch('http://localhost:3000/api/job-posting', {
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

    return { success: true }; // Example response
  } catch (error) {
    console.error('Error saving form data:', error);
    throw new Error('Failed to save form data');
  }
};
export default { saveJobPosting };
