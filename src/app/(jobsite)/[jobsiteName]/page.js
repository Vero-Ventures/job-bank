'use client';

import { fetchTotalPages } from '@/libs/jobsiteAPIrequest';
import JobDetail from '@/components/jobsite/jobdetail';
import SearchBar from '@/components/jobsite/searchBar';
import JobLists from '@/components/jobsite/joblists';
import Pagination from '@/components/ui/pagination';
import ErrorNoJobLists from '@/components/jobsite/errorNoJobLists';
import { JOBSITE_INFO } from '@/libs/jobsiteConstants';
import { useEffect, useState } from 'react';

export default function Home({ params }) {
  const JOBSITE_NAME = JOBSITE_INFO[params.jobsiteName].jobsiteName;
  const JOBSITE_PATH = params.jobsiteName;
  const COLOUR_THEME = JOBSITE_INFO[params.jobsiteName].colours;

  const [postingID, setPostingID] = useState(null); //jobposting id that will be displayed
  const [page, setPage] = useState(1); // current page
  const [totalPage, setTotalPage] = useState(-1); // total number of pages
  const [sortByDate, setSortByDate] = useState(false);
  const [filterValues, setFilterValues] = useState({});

  /**
   * Scroll to top.
   */
  const scrollToTop = id => {
    document.getElementById(id).scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /**
   * Set filter values, set page to 1, and scroll to top when filter value is changed.
   *  @param {object} values - selected options as an object, keys as categories, values as selected options
   */
  const onChangeFilter = values => {
    setFilterValues(values);
    setPage(1);
    scrollToTop('joblists');
  };

  /**
   * Set page number, and scroll to top when page is changed.
   *  @param {int} pageNum - selected page number
   */
  const onClickPage = pageNum => {
    setPage(pageNum);
    scrollToTop('joblists');
  };

  useEffect(() => {
    fetchTotalPages(setTotalPage, JOBSITE_NAME, filterValues);
  }, [filterValues]);

  return (
    <div
      className={`flex flex-col gap-8 p-4 md:p-8 ${COLOUR_THEME.background} dark:${COLOUR_THEME.backgroundDark}`}>
      <SearchBar
        colourTheme={COLOUR_THEME}
        onChangeFilter={onChangeFilter}></SearchBar>
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
                  jobSiteName={JOBSITE_NAME}
                  jobSitePath={JOBSITE_PATH}
                  colourTheme={COLOUR_THEME}
                  onClickJob={setPostingID}
                  page={page}
                  sortByDate={sortByDate}
                  filterValues={filterValues}></JobLists>
                <Pagination
                  colourTheme={COLOUR_THEME}
                  onClickPageNum={onClickPage}
                  totalPage={totalPage}
                  page={page}
                  sortByDate={sortByDate}></Pagination>
              </>
            )}
          </div>
        </div>
        <div className="hidden sm:block sm:w-8/12">
          {totalPage > 0 && (
            <JobDetail
              colourTheme={COLOUR_THEME}
              postingID={postingID}
              path={JOBSITE_PATH}
              jobSiteName={JOBSITE_NAME}></JobDetail>
          )}
        </div>
      </div>
      {totalPage == 0 && <ErrorNoJobLists colourTheme={COLOUR_THEME} />}
    </div>
  );
}
