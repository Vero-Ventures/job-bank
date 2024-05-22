// to run this file, copy the content to index.mjs at root level and use the command: node index.mjs in the terminal
//To send out marketing email, update the schedule for the cron job by uncommenting line 6, 122 to 124 and commenting out line 127 to 130
import cron from 'node-cron';
import fetch from 'node-fetch';

// const JOB_POSTING_API_URL = 'http://localhost:3000/api/job-posting/';
const SEND_EMAIL_API_URL = 'http://localhost:3000/api/send-email/';
const CONTACT_STAT_API_URL = 'http://localhost:3000/api/contact-stat/';
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
        <p><a href="https://job-bank-mu.vercel.app/" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Sign Up Now</a></p>
        <p>Don't miss out on the opportunity to find your next great hire effortlessly. Join us today and experience the power of our job panel!</p>
        <p>Best regards,</p>
        <p>The [Job Panel] Team</p>`,
      }),
    });

    if (response.ok) {
      console.log(`Email sent to ${recipient}`);
      // Update the status of the email in the contactStat collection
      await updateSentStatus(recipient, true);
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

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

const addEmailObjects = async emailObjects => {
  try {
    const response = await fetch(CONTACT_STAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailObjects),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
    } else {
      throw new Error('Failed to update contact stats');
    }
  } catch (error) {
    console.error('Error updating contact stats:', error);
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

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
    } else {
      throw new Error('Failed to update sent status');
    }
  } catch (error) {
    console.error('Error updating sent status:', error);
  }
};

// Define the cron job schedule (runs every 5s for testing)
cron.schedule('*/5 * * * * *', async () => {
  // // Define the cron job schedule (runs every day at 8:00 AM),
  // in the future, we can adjust the timing and adding interval to avoid being blocked
  // cron.schedule('0 8 * * *', async () => {
  try {
    // const response = await fetch(`${JOB_POSTING_API_URL}/email-sent?sort=-1`);
    // const data = await response.json();
    // const emailAddresses = data.emailAddresses;

    //mock data
    const emailAddresses = [
      { email: 'vhmai3007@gmail.com', sent: true },
      { email: 'hvu28@mybcit.ca', sent: false },
    ];

    //call the updateContactStat function to update the contactStat collection
    await addEmailObjects(emailAddresses);

    // fetch contactStat data
    const emailData = await getContactStat();

    // // Filter out emails that have not been sent yet - be careful with this line during testing
    const unsentEmails = emailData.filter(emailObj => !emailObj.sent);

    // Send emails
    for (const { email } of unsentEmails) {
      await sendEmail(email);
    }
  } catch (error) {
    console.error('Error fetching or sending emails:', error);
  }
});
