'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Define your component
export default function Home() {
  // State to store the list of job postings
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch job postings from the API
  const fetchJobPostings = async () => {
    try {
      const email = 'rajpaldhillon46@outlook.com';
      const apiURL = `http://localhost:3000/api/job-posting?email=${email}`;
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
  };

  useEffect(() => {
    fetchJobPostings();
  }, []); // Fetch job postings when the component mounts

  // Function to handle deletion of job posting
  const handleDelete = async jobPostingId => {
    try {
      // Make API call to delete the job posting
      const apiUrl = `http://localhost:3000/api/job-posting/?job-posting-id=${jobPostingId}`;
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
      <div className="flex items-center justify-between border-b-2 border-gray-200 py-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mt-8 mb-4">
            My Job Postings
          </h2>
        </div>
        <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
          <Button
            className="whitespace-nowrap text-base leading-6 font-medium"
            variant="secondary">
            Add New Job Posting
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          <p>Loading...</p>
        ) : jobPostings.length > 0 ? (
          jobPostings.map(posting => (
            <div key={posting._id}>
              <Card
                jobPostingId={posting._id}
                title={posting.jobTitle}
                organization={posting.hiringOrganization}
                locality={posting.addressLocality}
                region={posting.addressRegion}
                validThrough={posting.validThrough}
                onDelete={handleDelete}
                siteFlags={Array.from({ length: 4 }, (_, i) => i + 1).map(
                  site => ({
                    id: `site${site}-software`,
                    checked: posting[`site${site}`],
                    label: `Display on Site ${site}`,
                  })
                )}
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
