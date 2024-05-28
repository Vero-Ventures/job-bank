'use client';

import React, { useState, useEffect } from 'react';
import emailHandler from './emailHandler';
import { AdminPage } from '@/components/component/adminPage';
import Navbar from '@/components/ui/navbar';
import { useCallback } from 'react';

export default function Home() {
  const [emails, setEmails] = useState([]);
  const [user, setUser] = useState(null);

  const links = [{ text: 'Logout', url: '/api/auth/logout' }];

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        console.log('User:', userData);
        if (userData.data && userData.data.admin === true) {
          console.log('User is admin');
        } else {
          console.log('User is not admin');
          window.location.href = '/';
        }
      } else {
        console.error('Failed to fetch user:', response.statusText);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      //redirect to login page
      window.location.href = '/';
    }
  }, []);

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
    fetchUser();
  }, []);

  useEffect(() => {
    fetchEmails();
  }, [user]);

  const updateEmails = (emailObj, isAdd) => {
    if (isAdd) {
      // Add the email to the existing emails
      setEmails(prevEmails => [...prevEmails, emailObj]);
    } else if (!isAdd) {
      // Filter out the email to remove
      const updatedEmails = emails.filter(
        existingEmail => existingEmail.email !== emailObj.email
      );
      // Update the data state with the filtered emails
      setEmails(updatedEmails);
    }
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
      let emailSent = 0;
      // Loop through all emails and send email to each recipient
      for (const emailObj of emails) {
        // if email has not been sent, send email
        if (!emailObj.sent) {
          await sendEmail(emailObj.email);
          emailSent++;
        }
      }
      alert(`${emailSent} emails has been sent.`);
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  };

  return (
    <div>
      <Navbar links={links} />
      <AdminPage
        data={emails}
        sendEmail={sendEmail}
        massSendEmails={massSendEmails}
        updateEmails={updateEmails}
      />
    </div>
  );
}
