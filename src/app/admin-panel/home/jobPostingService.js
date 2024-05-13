const saveJobPosting = async formData => {
  try {
    //TODO:  Send formData to your backend API for saving to MongoDB
    console.log('Form data:', formData);

    return { success: true }; // Example response
  } catch (error) {
    console.error('Error saving form data:', error);
    throw new Error('Failed to save form data');
  }
};

export default { saveJobPosting };
