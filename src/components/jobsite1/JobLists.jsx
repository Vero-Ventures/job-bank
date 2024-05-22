import Loading from '@/components/ui/Loading';
import JobListCard from './jobListCard';
import {
  fetchJobPostList,
  fetchTotalPages,
} from '../../libs/jobsiteAPIrequest';
import { Button } from '../ui/button';
import { useCallback, useEffect, useState } from 'react';

export default function JobLists() {
  const [list, setList] = useState([]); // jobPosts list that will be displayed
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1); // current page
  const [totalPage, setTotalPage] = useState(0); // total number of pages

  const JOBSITE_NAME = 'indigenous';

  /**
   * Get Jobposts list of page from database.
   */
  const getJobPostings = useCallback(async () => {
    setIsLoading(true);
    const jobpostings = await fetchJobPostList(JOBSITE_NAME, page);
    setList(prevList => prevList.concat(jobpostings));
    setIsLoading(false);
  }, [page]);

  /**
   * Set new page number when user clicks load more button.
   */
  const onClickLoadMore = () => {
    if (page < totalPage && !isLoading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchTotalPages(setTotalPage, JOBSITE_NAME);
  }, []);

  useEffect(() => {
    getJobPostings();
  }, [getJobPostings]);

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
