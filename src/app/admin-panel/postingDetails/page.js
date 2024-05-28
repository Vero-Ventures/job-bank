'use client';
import React, { useState, useEffect } from 'react';
import jobPostingService from '../home/jobPostingService';
import CheckboxGroup from '@/components/ui/checkboxGroup';
import dynamic from 'next/dynamic';
const DynamicTextarea = dynamic(
  () => import('@/components/ui/dynamicTextArea'),
  {
    ssr: false,
  }
);

export default function DetailsPage() {
  const [jobPosting, setJobPosting] = useState({});
  const [jobPostingId, setJobPostingId] = useState(null);

  useEffect(() => {
    const fetchJobPosting = async () => {
      try {
        setJobPostingId(
          new URLSearchParams(window.location.search).get('job-posting-id')
        );
        const response =
          await jobPostingService.getJobPostingDetails(jobPostingId);
        setJobPosting(response.jobPostings[0]);
      } catch (error) {
        console.error('Error fetching job posting:', error);
      }
    };
    fetchJobPosting();
  }, [jobPostingId]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setJobPosting(prevJobPosting => ({
      ...prevJobPosting,
      [name]: newValue,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    // Check if any required fields are empty
    const requiredFields = [
      'jobTitle',
      'hiringOrganization',
      'streetAddress',
      'addressLocality',
      'addressRegion',
      'language',
      'employmentType',
      'employmentSubType',
      'minCompValue',
      'validThrough',
      'description',
    ];
    const isEmptyField = requiredFields.some(field => !jobPosting[field]);

    if (isEmptyField) {
      alert('Please fill in all required fields marked with (*).');
      return;
    }
    // Call the editJobPosting function from jobPostingService
    try {
      const response = await jobPostingService.editJobPosting(
        jobPostingId,
        jobPosting
      );

      if (response.success) {
        // If the job posting is successfully saved, redirect to the home page
        window.location.href = '/admin-panel/home';
      } else {
        console.error('Failed to save job posting:', response.statusText);
      }
    } catch (error) {
      // Handle the error
      console.error('Error saving form data:', error);
    }
  };

  return (
    <div className="isolate bg-white px-2 py-2 sm:py-2 lg:px-2">
      <form className="mx-auto mt-16 max-w-4xl sm:mt-2 ">
        <div className="flex items-center">
          <label className="text-sm font-semibold leading-6 text-gray-900 mr-2">
            Posting Status:
          </label>
          <span
            className={`text-sm font-semibold ${jobPosting.paid ? 'text-green-500' : 'text-yellow-500'}`}>
            {jobPosting.paid ? 'Active' : 'Pending'}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Job Title*
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="jobTitle"
                value={jobPosting.jobTitle || ''}
                onChange={handleChange}
                placeholder="Job Title"
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Hiring Organization*
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="hiringOrganization"
                value={jobPosting.hiringOrganization || ''}
                onChange={handleChange}
                placeholder="Hiring Organization"
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Street Address*
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="streetAddress"
                value={jobPosting.streetAddress || ''}
                onChange={handleChange}
                placeholder="Street Address"
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              City*
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="addressLocality"
                value={jobPosting.addressLocality || ''}
                onChange={handleChange}
                placeholder="Address Locality"
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Province*
            </label>
            <div className="mt-2.5">
              <select
                name="addressRegion"
                value={jobPosting.addressRegion || ''}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <option value="" disabled hidden>
                  Choose a province
                </option>
                <option value="AB">Alberta</option>
                <option value="BC">British Columbia</option>
                <option value="MB">Manitoba</option>
                <option value="NB">New Brunswick</option>
                <option value="NL">Newfoundland and Labrador</option>
                <option value="NS">Nova Scotia</option>
                <option value="ON">Ontario</option>
                <option value="PE">Prince Edward Island</option>
                <option value="QC">Quebec</option>
                <option value="SK">Saskatchewan</option>
                <option value="NT">Northwest Territories</option>
                <option value="NU">Nunavut</option>
                <option value="YT">Yukon</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Language*
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="language"
                value={jobPosting.language || ''}
                onChange={handleChange}
                placeholder="Language"
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Employment Type*
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="employmentType"
                value={jobPosting.employmentType || ''}
                onChange={handleChange}
                placeholder="eg. Permanent, Contract, Temporary, etc."
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Employment Category*
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="employmentSubType"
                value={jobPosting.employmentSubType || ''}
                onChange={handleChange}
                placeholder="eg: Internship, Full-time, Part-time, etc."
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Minimum Hourly Wage Offer*
            </label>
            <div className="mt-2.5">
              <input
                type="number"
                name="minCompValue"
                value={jobPosting.minCompValue || ''}
                onChange={handleChange}
                placeholder="Min Hourly Wage"
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Maximum Hourly Wage Offer
            </label>
            <div className="mt-2.5">
              <input
                type="number"
                name="maxCompValue"
                value={jobPosting.maxCompValue || ''}
                onChange={handleChange}
                placeholder="Maximum Hourly Wage"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Benefits*
            </label>
            <div className="mt-2.5">
              <DynamicTextarea
                name="benefits"
                value={jobPosting.benefits || ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label
              hmtlFor="startTime"
              className="block text-sm font-semibold leading-6 text-gray-900">
              Start Date*
            </label>
            <div className="mt-2.5">
              <input
                type="string"
                name="startTime"
                value={jobPosting.startTime || ''}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Posting is Valid Through*
            </label>
            <div className="mt-2.5">
              <input
                type="date"
                name="validThrough"
                value={jobPosting.validThrough || ''}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Description*
            </label>
            <div>
              <DynamicTextarea
                name="description"
                value={jobPosting.description || ''}
                onChange={handleChange}
                placeholder="Description"
                required
              />
            </div>
          </div>
        </div>
        <CheckboxGroup
          formData={{
            site1: jobPosting.site1,
            site2: jobPosting.site2,
            site3: jobPosting.site3,
            site4: jobPosting.site4,
            site5: jobPosting.site5,
          }}
          handleChange={handleChange}
          disabled={jobPosting.paid}
        />
        <div className="mt-10 flex space-x-4">
          <button
            type="button"
            onClick={() => (window.location.href = '/admin-panel/home')}
            className="block w-full rounded-md bg-gray-300 px-3.5 py-2.5 text-center text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400">
            Back to Home
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Save Posting
          </button>
        </div>
      </form>
    </div>
  );
}
