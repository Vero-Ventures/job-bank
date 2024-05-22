'use client';

import React, { useState, useEffect } from 'react';
import emailHandler from './emailHandler';
import { AdminPage } from '@/components/component/adminPage';

export default function Home() {
  const [emails, setEmails] = useState([]);

  // Function to fetch emails from an API endpoint
  const fetchEmails = async () => {
    try {
      const data = await emailHandler.getContactStat();
      setEmails(data);
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const sendEmail = async recipient => {
    try {
      await emailHandler.sendEmail(recipient);
    } catch (error) {
      console.error('Error sending email:', error);
    }

    const sent = true;
    // Update the status of the email in the emails state
    setEmails(prevEmails =>
      prevEmails.map(emailObj =>
        emailObj.email === recipient ? { ...emailObj, sent } : emailObj
      )
    );
  };

  return <AdminPage data={emails} sendEmail={sendEmail} />;
}
