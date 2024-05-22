'use client';

import { fetchTotalPages } from '@/libs/jobsiteAPIrequest';
import JobDetail from '@/components/jobsite2/jobdetail';
import SearchBar from '@/components/jobsite2/searchBar';
import JobLists from '@/components/jobsite2/joblists';
import Pagination from '@/components/ui/pagination';
import ErrorNoJobLists from '@/components/errorNoJobLists';
import { useEffect, useState } from 'react';

const JOBSITE_NAME = 'newcomers';

export default function Home() {
  const [postingID, setPostingID] = useState(null); //jobposting id that will be displayed
  const [page, setPage] = useState(1); // current page
  const [totalPage, setTotalPage] = useState(-1); // total number of pages
  const [sortByDate, setSortByDate] = useState(false);
  const [filterValues, setFilterValues] = useState({});

  const scrollToTop = id => {
    document.getElementById(id).scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const onChangeFilter = values => {
    setFilterValues(values);
    setPage(1);
    scrollToTop('joblists');
  };

  const onClickPage = pageNum => {
    setPage(pageNum);
    scrollToTop('joblists');
  };

  useEffect(() => {
    fetchTotalPages(setTotalPage, JOBSITE_NAME, filterValues);
  }, [filterValues]);

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 bg-[#f0f9ff] dark:bg-[#0a1929]">
      <SearchBar onChangeFilter={onChangeFilter}></SearchBar>
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
            {totalPage > 0 && (
              <>
                <JobLists
                  onClickJob={setPostingID}
                  page={page}
                  totalPage={totalPage}
                  sortByDate={sortByDate}
                  filterValues={filterValues}></JobLists>
                <Pagination
                  onClickPageNum={onClickPage}
                  totalPage={totalPage}
                  page={page}
                  sortByDate={sortByDate}></Pagination>
              </>
            )}
          </div>
        </div>
        <div className="hidden sm:block sm:w-8/12">
          {totalPage > 0 && <JobDetail postingID={postingID}></JobDetail>}
        </div>
      </div>
      {totalPage == 0 && <ErrorNoJobLists colourTheme={'blue'} />}
    </div>
  );
}
