'use client';

import React, { useState, useEffect, useCallback } from 'react';
import emailHandler from './emailHandler';
import { AdminPage } from '@/components/component/adminPage';
import Navbar from '@/components/ui/navbar';

export default function Home() {
  const [emails, setEmails] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  const links = [{ text: 'Logout', url: '/api/auth/logout' }];

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        if (userData.data && userData.data.admin === true) {
          setUser(userData);
          console.log('User is admin');
        } else {
          console.log('User is not admin');
          setUnauthorized(true);
          setTimeout(() => {
            window.location.href = '/';
          }, 3000); // Redirect after 3 seconds
        }
      } else {
        console.error('Failed to fetch user:', response.statusText);
        setUnauthorized(true);
        setTimeout(() => {
          window.location.href = '/';
        }, 3000); // Redirect after 3 seconds
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUnauthorized(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 3000); // Redirect after 3 seconds
    } finally {
      setLoading(false);
    }
  }, []);

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
  }, [fetchUser]);

  useEffect(() => {
    if (user) {
      fetchEmails();
    }
  }, [user]);

  const updateEmails = (emailObj, isAdd) => {
    if (isAdd) {
      setEmails(prevEmails => [...prevEmails, emailObj]);
    } else if (!isAdd) {
      const updatedEmails = emails.filter(
        existingEmail => existingEmail.email !== emailObj.email
      );
      setEmails(updatedEmails);
    }
  };

  const sendEmail = async recipient => {
    try {
      await emailHandler.sendEmail(recipient);
    } catch (error) {
      console.error('Error sending email:', error);
    }

    alert('Email sent to ' + recipient);

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
      alert(`${emailSent} emails have been sent.`);
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (unauthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">
          You do not have access to this page. Redirecting...
        </div>
      </div>
    );
  }

  return user ? (
    <div>
      <Navbar links={links} />
      <AdminPage
        data={emails}
        sendEmail={sendEmail}
        massSendEmails={massSendEmails}
        updateEmails={updateEmails}
      />
    </div>
  ) : null;
}
