'use client';
import Axios from 'axios';
import JobLists from '@/components/JobLists';
import Filter from '@/components/Filter';
import { Input } from '@/components/ui/input';
import Loading from '@/components/Loading';
import { useEffect, useState } from 'react';

export default function Home() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Todo: Add URL to get jobposting list
  const API_URL =
    'http://localhost:3001/api/job-posting/indigenous?page_num=' ||
    process.env.JOB_POSTING_API;

  function getData() {
    Axios.get(API_URL + page)
      .then(res => {
        console.log(res.data);
        setList(res.data.jobPostings);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error.response);
        //todo: handle error
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <Filter />
      <div className="flex-1 p-6">
        <div className="mb-6 relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <Input
            className="w-full px-10 py-3 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-950 dark:text-gray-50"
            placeholder="Search for jobs..."
            type="text"
          />
        </div>
        {isLoading && <Loading />}
        {!isLoading && <JobLists list={list} />}
      </div>
    </div>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
