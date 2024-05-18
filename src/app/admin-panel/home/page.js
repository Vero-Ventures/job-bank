'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AddJobPostingForm } from '@/components/ui/addJobPostingForm';
import jobPostingService from './jobPostingService';
import { useCallback } from 'react';
import Navbar from '@/components/ui/navbar';

// Define your component
export default function Home() {
  // State to store the list of job postings
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const links = [
    { text: 'Pricing', url: '/pricing' },
    { text: 'About', url: '/about' },
    { text: 'Logout', url: '/api/auth/logout' },
  ];

  const JOB_POSTING_API_URL = process.env.NEXT_PUBLIC_JOB_POSTING_API_URL;

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
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
  const [showForm, setShowForm] = useState(false);

  // Function to fetch job postings from the API
  const fetchJobPostings = useCallback(async () => {
    try {
      setLoading(true);
      const sortCriteria = JSON.stringify({ _id: -1 });
      const apiURL = `${JOB_POSTING_API_URL}?email=${user.email}&sort=${sortCriteria}`;
      const response = await fetch(apiURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const res = await response.json();
        setJobPostings(res.jobPostings);
      } else {
        console.error('Failed to fetch job postings:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching job postings:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUser();
  }, []); // Fetch job postings when the component mounts

  useEffect(() => {
    if (user) {
      fetchJobPostings();
    }
  }, [user]);

  // Function to handle deletion of job posting
  const handleDelete = async jobPostingId => {
    try {
      // Make API call to delete the job posting
      const apiUrl = `${JOB_POSTING_API_URL}?job-posting-id=${jobPostingId}`;
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // If deletion is successful, update the job postings state to remove the deleted job posting
        setJobPostings(prevJobPostings =>
          prevJobPostings.filter(posting => posting._id !== jobPostingId)
        );
      } else {
        throw new Error('Failed to delete job posting');
      }
    } catch (error) {
      console.error('Error deleting job posting:', error);
      alert('An error occurred while deleting the job posting');
    }
  };

  const handleFormSubmit = async formData => {
    try {
      // Call the service to save the job posting
      const response = await jobPostingService.saveJobPosting(formData);

      // Update the jobPostings state with the newly created job posting
      setJobPostings(prevJobPostings => [
        response.jobPosting,
        ...prevJobPostings,
      ]);

      // Close the form modal
      setShowForm(false);
    } catch (error) {
      console.error('Error saving form data:', error);
      // Handle error if form submission fails
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
      <Navbar links={links} />
      <div className="flex items-center justify-between border-b-2 border-gray-200 py-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mb-4">
            My Job Postings
          </h2>
          {/* Render user email if user data is available */}
        </div>
        <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
          <Button
            className="whitespace-nowrap text-base leading-6 font-medium"
            variant="secondary"
            onClick={() => setShowForm(true)}>
            Add New Job Posting
          </Button>
        </div>
      </div>
      {/* Render the form as a modal */}
      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg max-h-[80vh] overflow-y-auto">
            <AddJobPostingForm onSubmit={handleFormSubmit} email={user.email} />
            <button
              className="close-icon absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowForm(false)}></button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-5">
        {loading ? (
          <p>Loading...</p>
        ) : jobPostings.length > 0 ? (
          jobPostings.map(posting => (
            <div key={posting._id}>
              <Card
                jobPostingId={posting._id}
                posting={posting}
                onDelete={handleDelete}
              />
            </div>
          ))
        ) : (
          <p>No job postings found.</p>
        )}
      </div>
    </div>
  );
}
