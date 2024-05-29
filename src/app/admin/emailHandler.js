const CONTACT_STAT_API_URL = process.env.NEXT_PUBLIC_CONTACT_STAT_API_URL;
const SEND_EMAIL_API_URL = process.env.NEXT_PUBLIC_SEND_EMAIL_API_URL;

const getContactStat = async () => {
  try {
    const response = await fetch(CONTACT_STAT_API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data.contactStats;
  } catch (error) {
    console.error('Error fetching contact stats:', error);
    return [];
  }
};

// Function to send emails
const sendEmail = async recipient => {
  try {
    console.log(`Sending email to ${recipient}`);
    const apiUrl = SEND_EMAIL_API_URL;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: recipient,
        subject: 'Expand Your Hiring Reach with [Job Panel]!',
        html: `
          <p>Hello from our team at [Job Panel],</p>
          <p>We are here to revolutionize your hiring process and help you reach a diverse pool of talent. Our web app offers a seamless solution to distribute your job postings to multiple platforms, including newcomers, indigenous communities, students, asylum-seekers, and individuals with disabilities.</p>
          <p>Here's what makes our job panel stand out:</p>
          <ul>
            <li><strong>Reach:</strong> Expand your reach and connect with a diverse range of candidates from various backgrounds and skillsets.</li>
            <li><strong>Simplicity:</strong> Easily distribute your job postings to multiple platforms with just a few clicks, saving you time and effort.</li>
            <li><strong>Diversity:</strong> Embrace diversity and inclusivity by reaching out to candidates from underrepresented communities.</li>
            <li><strong>Payment Plans:</strong> Choose from flexible payment plans that suit your budget and hiring needs.</li>
          </ul>
          <p>Ready to take your hiring to the next level? Sign up now via the link below and start reaching the talent you've been looking for!</p>
          <p><a href=${process.env.JOB_BANK_API_URL} style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Sign Up Now</a></p>
          <p>Don't miss out on the opportunity to find your next great hire effortlessly. Join us today and experience the power of our job panel!</p>
          <p>Best regards,</p>
         <p>The [Job Panel] Team</p>`,
      }),
    });
    if (response.ok) {
      // Update the status of the email in the contactStat collection
      await updateSentStatus(recipient, true);
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const updateSentStatus = async (email, sent) => {
  try {
    const response = await fetch(CONTACT_STAT_API_URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, sent }),
    });

    if (!response.ok) {
      throw new Error('Failed to update sent status');
    }
  } catch (error) {
    console.error('Error updating sent status:', error);
  }
};

// Function to add email objects to the contactStat collection, take an array of email objects with email and sent properties
const addEmailObjects = async emailObjects => {
  try {
    const response = await fetch(CONTACT_STAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailObjects),
    });

    if (!response.ok) {
      throw new Error('Failed to add email objects');
    }

    const responseBody = await response.json();
    const { emailsAdded } = responseBody;
    return emailsAdded;
  } catch (error) {
    console.error('Error adding email objects:', error);
  }
};

const deleteEmail = async email => {
  try {
    const response = await fetch(CONTACT_STAT_API_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete email');
    }
  } catch (error) {
    console.error('Error deleting email:', error);
  }
};

const emailHandler = {
  getContactStat,
  sendEmail,
  updateSentStatus,
  addEmailObjects,
  deleteEmail,
};

export default emailHandler;
