import Loading from '@/components/ui/Loading';
import JobListCard from './jobListCard';
import {
  fetchJobPostList,
  fetchTotalPages,
} from '../../libs/jobsiteAPIrequest';
import ErrorNoJobLists from '../errorNoJobLists';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

export default function JobLists({ page, setPage, sortByDate, filterValues }) {
  const [list, setList] = useState([]); // jobPosts list that will be displayed
  const [isLoading, setIsLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0); // total number of pages

  const JOBSITE_NAME = 'indigenous';

  /**
   * Get Jobposts list of page from database.
   */
  const getJobPostings = async () => {
    setIsLoading(true);
    const jobpostings = await fetchJobPostList(
      JOBSITE_NAME,
      page,
      sortByDate,
      filterValues
    );
    setList(prevList =>
      page === 1 ? jobpostings : prevList.concat(jobpostings)
    );
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTotalPages(setTotalPage, JOBSITE_NAME, filterValues);
  }, [filterValues]);

  useEffect(() => {
    if (page != 0) {
      getJobPostings();
    }
  }, [page]);

  useEffect(() => {
    document
      .getElementById('joblists')
      .scrollTo({ top: 0, behavior: 'smooth' });
    if (page !== 1) {
      setPage(1);
    } else {
      getJobPostings();
    }
  }, [sortByDate, filterValues]);

  /**
   * Set new page number when user clicks load more button.
   */
  const onClickLoadMore = () => {
    if (page < totalPage && !isLoading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div id="joblists" className="grid gap-6 max-h-dvh overflow-y-auto">
      {list.map(item => (
        <JobListCard key={item._id} item={item} />
      ))}
      {isLoading && <Loading />}
      {page < totalPage && !isLoading && (
        <Button
          className={`${isLoading ? 'hidden' : 'block'}`}
          onClick={onClickLoadMore}>
          Load More
        </Button>
      )}
      {totalPage == 0 && <ErrorNoJobLists colourTheme={'gray'} />}
    </div>
  );
}
