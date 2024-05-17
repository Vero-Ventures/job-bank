'use client';

import React, { useState, useEffect } from 'react';
import { AdminPage } from '@/components/component/adminPage';

export default function Home() {
  const JOB_POSTING_API_URL = process.env.NEXT_PUBLIC_JOB_POSTING_API_URL;
  const [emails, setEmails] = useState([]);

  // Function to fetch emails from an API endpoint
  const fetchEmails = async () => {
    try {
      const response = await fetch(`${JOB_POSTING_API_URL}email-sent?sort=-1`);
      const data = await response.json();
      setEmails(data.emailAddresses);
    } catch (error) {
      console.error('Error fetching emails:', error);
      return [];
    }
  };

  const updateSentStatus = async (email, sent) => {
    try {
      const apiUrl = `${JOB_POSTING_API_URL}/update-sent/`;
      const response = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, sent }),
      });

      if (response.ok) {
        // Update the status of the email in the data array
        setEmails(prevEmails =>
          prevEmails.map(emailObj =>
            emailObj.email === email ? { ...emailObj, sent } : emailObj
          )
        );

        const data = await response.json();
        console.log(data.message);
      } else {
        throw new Error('Failed to update sent status');
      }
    } catch (error) {
      console.error('Error updating sent status:', error);
    }
  };

  // Fetch emails when component mounts
  useEffect(() => {
    fetchEmails();
  }, []);

  const sendEmail = async recipient => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_SEND_EMAIL_API_URL;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: recipient,
          subject: 'Videre Financiers - Job Bank Platform',
          text: 'and easy to do anywhere, even with Node.js',
          html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }),
      });

      if (response.ok) {
        updateSentStatus(recipient, true);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return <AdminPage data={emails} sendEmail={sendEmail} />;
}
