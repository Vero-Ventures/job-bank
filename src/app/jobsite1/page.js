'use client';
import Axios from 'axios';
import JobLists from '@/components/JobLists';
import Filter from '@/components/Filter';
import { Input } from '@/components/ui/input';
import Loading from '@/components/ui/Loading';
import { useEffect, useState } from 'react';

export default function Home() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const API_URL = '/api/job-posting/indigenous?page_num=';

  function getData() {
    setIsLoading(true);
    console.log('New Page ' + page);
    Axios.get(API_URL + page)
      .then(res => {
        console.log(res.data);
        const newPage = page + 1;
        const fetchedData = res.data.jobPostings;
        const mergedData = list.concat(fetchedData);
        setList(mergedData);
        setPage(newPage);
      })
      .catch(error => {
        console.log(error.response);
        //todo: handle error
      });

    setIsLoading(false);
  }

  // Set scroll event
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && isLoading === false) {
      // get new data when scroll gets to the end of page
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener('scroll', handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener('scroll', handleScroll);
    };
  });

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
        <JobLists list={list} />
        {isLoading && <Loading />}
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
