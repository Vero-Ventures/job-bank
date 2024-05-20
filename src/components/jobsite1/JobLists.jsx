import Loading from '@/components/ui/Loading';
import JobListCard from './jobListCard';
import {
  fetchJobPostList,
  fetchTotalPages,
} from '../../libs/jobsiteAPIrequest';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

export default function JobLists({ sortByDate }) {
  const [list, setList] = useState([]); // jobPosts list that will be displayed
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0); // current page
  const [totalPage, setTotalPage] = useState(0); // total number of pages

  const JOBSITE_NAME = 'indigenous';

  /**
   * Get Jobposts list of page from database.
   */
  const getJobPostings = async () => {
    setIsLoading(true);
    const jobpostings = await fetchJobPostList(JOBSITE_NAME, page, sortByDate);
    setList(prevList =>
      page === 1 ? jobpostings : prevList.concat(jobpostings)
    );
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTotalPages(setTotalPage, JOBSITE_NAME);
  }, []);

  useEffect(() => {
    if (page != 0) {
      getJobPostings();
    }
  }, [page]);

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    } else {
      getJobPostings();
    }
  }, [sortByDate]);

  /**
   * Set new page number when user clicks load more button.
   */
  const onClickLoadMore = () => {
    if (page < totalPage && !isLoading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="grid gap-6 max-h-dvh overflow-y-auto">
      {list.map(item => (
        <JobListCard key={item._id} item={item} />
      ))}
      {isLoading && <Loading />}
      <Button
        className={`${isLoading ? 'hidden' : 'block'}`}
        onClick={onClickLoadMore}>
        Load More
      </Button>
    </div>
  );
}
