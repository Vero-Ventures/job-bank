'use client';

import { fetchTotalPages } from '@/libs/jobsiteAPIrequest';
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
  const [sortByDate, setSortByDate] = useState(false);

  const onClickPage = pageNum => {
    setPage(pageNum);
    document.getElementById('joblists').scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    fetchTotalPages(setTotalPage, JOBSITE_NAME);
  }, []);

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 bg-[#f0f9ff] dark:bg-[#0a1929]">
      <SearchBar></SearchBar>
      <div className="flex flex-row justify-center flex-1 space-x-6 sm:ml-10 sm:mr-10">
        <div className="w-full sm:w-4/12">
          <div id="joblists" className="max-h-dvh overflow-y-auto">
            <div className="flex ml-auto mb-2 justify-end">
              <button
                onClick={() => {
                  sortByDate ? setSortByDate(false) : setSortByDate(true);
                  setPage(1);
                }}
                className={`px-4 text-sm ${sortByDate ? 'font-semibold' : 'font-normals'}`}>
                Sort by date
              </button>
            </div>
            <JobLists
              onClickJob={setPostingID}
              page={page}
              sortByDate={sortByDate}></JobLists>
            <Pagination
              onClickPageNum={onClickPage}
              totalPage={totalPage}
              page={page}
              sortByDate={sortByDate}></Pagination>
          </div>
        </div>

        <div className="hidden sm:block sm:w-8/12">
          <JobDetail postingID={postingID}></JobDetail>
        </div>
      </div>
    </div>
  );
}
