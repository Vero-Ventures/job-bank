'use client';

import { fetchTotalPages } from '@/components/jobsiteAPIrequest';
import JobDetail from '@/components/jobsite2/jobdetail';
import SearchBar from '@/components/jobsite2/searchBar';
import JobLists from '@/components/jobsite2/joblists';
import Pagination from '@/components/ui/pagination';
import { useEffect, useState } from 'react';

const JOBSITE_NAME = 'newcomers';

export default function Home() {
  const [postingID, setPostingID] = useState(null); //jobposting id that will be displayed
  const [page, setPage] = useState(1); // current page
  const [totalPage, setTotalPage] = useState(0); // total number of pages

  useEffect(() => {
    fetchTotalPages(setTotalPage, JOBSITE_NAME);
  }, []);

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 bg-[#f0f9ff] dark:bg-[#0a1929]">
      <SearchBar></SearchBar>
      <div className="flex flex-row flex-1 space-x-6">
        <div className="w-full sm:w-4/12">
          <JobLists onClickJob={setPostingID} page={page}></JobLists>
          <Pagination
            onClickPageNum={setPage}
            totalPage={totalPage}></Pagination>
        </div>

        <div className="hidden sm:block sm:w-8/12">
          <JobDetail postingID={postingID}></JobDetail>
        </div>
      </div>
    </div>
  );
}
