'use client';

import Axios from 'axios';
import JobDetail from '@/components/jobsite2/jobdetail';
import SearchBar from '@/components/jobsite2/searchBar';
import JobLists from '@/components/jobsite2/joblists';
import Pagination from '@/components/ui/pagination';
import { useEffect, useState } from 'react';

const API_URL = '/api/job-posting/newcomers/total-posts';

export default function Home() {
  const [postingID, setPostingID] = useState(null); //displayed jobposting id
  const [page, setPage] = useState(1); // current page
  const [maxPage, setMaxPage] = useState(0); // total number of Pages
  const [sortByDate, setSortByDate] = useState(false);

  /**
   * Set jobposting id to display
   */
  const onClickJobPosting = itemId => {
    setPostingID(itemId);
  };

  /**
   * Set page number to populate selected page's jobpostings
   */
  const onClickPage = pageNum => {
    setPage(pageNum);
    document.getElementById('joblists').scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    Axios.get(API_URL)
      .then(res => {
        const lastPage = Math.ceil(res.data.jobPostings / 25);
        setMaxPage(lastPage);
      })
      .catch(error => console.log(error.response));
  }, []);

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 bg-[#f0f9ff] dark:bg-[#0a1929]">
      <SearchBar></SearchBar>
      <div className="flex flex-row flex-1 space-x-6">
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
              onClickJob={onClickJobPosting}
              page={page}
              sortByDate={sortByDate}></JobLists>
            <Pagination
              onClickPageNum={onClickPage}
              maxPage={maxPage}
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
