// to run this file, copy the content to index.mjs at root level and use the command: node index.mjs in the terminal
//To send out marketing email, update the schedule for the cron job by uncommenting line 55 & 67 and uncommenting line 51
import cron from 'node-cron';
import fetch from 'node-fetch';

const JOB_POSTING_API_URL = 'http://localhost:3000/api/job-posting/';
const SEND_EMAIL_API_URL = 'http://localhost:3000/api/send-email/';
// Function to send emails
const sendEmail = async recipient => {
  try {
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
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Define the cron job schedule (runs every 5s for testing)
cron.schedule('*/5 * * * * *', async () => {
  // // Define the cron job schedule (runs every day at 8:00 AM),
  // in the future, we can adjust the timing and adding interval to avoid being blocked
  // cron.schedule('0 8 * * *', async () => {
  try {
    const response = await fetch(`${JOB_POSTING_API_URL}/email-sent?sort=-1`);
    const data = await response.json();

    // //mock data
    // const emailData = [
    //   { email: 'vhmai3007@gmail.com', sent: false },
    //   { email: 'hvu28@mybcit.ca', sent: false },
    // ];

    // Extract email addresses from data - be careful with this line during testing
    const emailData = data.emailAddresses.map(emailObj => ({
      email: emailObj.email,
      sent: emailObj.sent,
    }));

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
