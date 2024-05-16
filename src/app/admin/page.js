'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Admin() {
  const [emails, setEmails] = useState([]);

  // Function to fetch emails from an API endpoint
  // const fetchEmails = async () => {
  //   try {
  //     const response = await fetch('YOUR_API_ENDPOINT'); // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
  //     const data = await response.json();
  //     return data.emails; // Assuming the API response contains an array of emails
  //   } catch (error) {
  //     console.error('Error fetching emails:', error);
  //     return [];
  //   }
  // };

  // Fetch emails when component mounts
  useEffect(() => {
    const getEmails = async () => {
      const fetchedEmails = ['vhmai3007@gmail.com'];
      setEmails(fetchedEmails);
    };
    getEmails();
  }, []);

  const sendEmail = async recipient => {
    try {
      const apiUrl = `http://localhost:3000/api/send-email`;
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
        const data = await response.json();
        console.log(data.message);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Emails</h1>
      <ul className="grid gap-4">
        {emails.map((email, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded-md shadow">
            <div className="text-lg font-semibold">{email}</div>
            <Button
              className="mt-2"
              variant="secondary"
              onClick={() => sendEmail(email)}>
              Send Email
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
