'use client';

import Axios from 'axios';
import MapPinIcon from '@/components/icons/mapPinIcon';
import ClockIcon from '@/components/icons/clockIcon';
import BriefcaseIcon from '@/components/icons/briefCaseIcon';
import MoneyIcon from '@/components/icons/moneyIcon';
import CalendarIcon from '@/components/icons/calendarIcon';
import UserIcon from '@/components/icons/userIcon';
import EmailIcon from '@/components/icons/emailIcon';
import Loading from '@/components/ui/Loading';
import { useEffect, useState } from 'react';

export default function JobPosting({ params }) {
  const postID = params.id;
  const [jobDetail, setJobDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [maxWage, setMaxWage] = useState('');
  const [streetAddress, setStreetAddress] = useState('');

  const API_URL = '/api/job-posting/by-id?job-posting-id=';

  function getDetailData() {
    setIsLoading(true);

    Axios.get(API_URL + postID)
      .then(res => {
        console.log(res.data.jobPostings);
        setJobDetail(res.data.jobPostings[0]);
        res.data.jobPostings[0].maxCompValue
          ? setMaxWage(`to $${res.data.jobPostings[0].maxCompValue}`)
          : '';
        res.data.jobPostings[0].streetAddress
          ? setStreetAddress(`${res.data.jobPostings[0].streetAddress}, `)
          : '';
      })
      .catch(error => {
        console.log(error.response);
        //todo: handle error
      });
    setIsLoading(false);
  }

  useEffect(() => {
    getDetailData();
  }, []);

  //Todo: getting job post detail from database
  return (
    <main className="w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="grid gap-8">
          <div>
            <h1 className="text-3xl font-bold titleCase">
              {jobDetail.jobTitle}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {jobDetail.hiringOrganization}
            </p>
            <div className="text-right text-gray-500 dark:text-gray-400 mt-1 lg:mt-0">
              {jobDetail.datePosted}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400 titleCase">
                  {jobDetail.employmentSubType}, {jobDetail.employmentType}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">
                  {streetAddress}
                  {jobDetail.addressLocality}, {jobDetail.addressRegion}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MoneyIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">
                  ${jobDetail.minCompValue} {maxWage} hourly
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">
                  {jobDetail.workHours}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">
                  {jobDetail.startTime}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">
                  {jobDetail.vacancies} vacancy
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">About the Role</h2>
            <p className="text-gray-500 dark:text-gray-400">## TO BE UPDATED</p>
            <h2 className="text-2xl font-bold">Responsibilities</h2>
            <ul className="space-y-2 text-gray-500 dark:text-gray-400 list-disc pl-6">
              <li>## TO BE UPDATED</li>
            </ul>
            <h2 className="text-2xl font-bold">Benefits</h2>
            <ul className="space-y-2 text-gray-500 dark:text-gray-400 list-disc pl-6">
              {jobDetail.benefits}
              <li>## TO BE UPDATED</li>
            </ul>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Apply by email</h2>
              <div className="flex items-center gap-2">
                <EmailIcon />
                <a
                  href={`mailto:${jobDetail.email}`}
                  className="text-blue-900 underline">
                  {jobDetail.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
