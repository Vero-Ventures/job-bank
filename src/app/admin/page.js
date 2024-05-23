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

  const updateEmails = email => {
    setEmails(prevEmails => [...prevEmails, email]);
  };

  const sendEmail = async recipient => {
    try {
      await emailHandler.sendEmail(recipient);
    } catch (error) {
      console.error('Error sending email:', error);
    }

    // Update the status of the email in the emails state
    setEmails(prevEmails =>
      prevEmails.map(emailObj =>
        emailObj.email === recipient ? { ...emailObj, sent: true } : emailObj
      )
    );
  };

  // Function to send emails to all recipients
  const massSendEmails = async () => {
    try {
      // Loop through all emails and send email to each recipient
      for (const { email } of emails) {
        // if email has not been sent, send email
        if (!email.sent) {
          await emailHandler.sendEmail(email);
        }
        // Update the status of the email in the emails state
        setEmails(prevEmails =>
          prevEmails.map(emailObj =>
            emailObj.email === email ? { ...emailObj, sent: true } : emailObj
          )
        );
      }
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  };

  return (
    <AdminPage
      data={emails}
      sendEmail={sendEmail}
      massSendEmails={massSendEmails}
      updateEmails={updateEmails}
    />
  );
}
