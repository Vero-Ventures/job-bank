import { fetchJobPostList } from '../../libs/jobsiteAPIrequest';
import Loading from '../ui/Loading';
import JobListCard from './jobListCard';
import { useCallback, useEffect, useState, useRef } from 'react';

export default function JobLists({ onClickJob, page, sortByDate }) {
  const [list, setList] = useState([]); // jobPosts list that will be displayed
  const [isLoading, setIsLoading] = useState(true);
  const hasSetInitialJob = useRef(false);

  const JOBSITE_NAME = 'newcomers';

  /**
   * Fetch Jobposts list of page from database.
   */
  const getJobPostings = useCallback(async () => {
    setIsLoading(true);
    const jobpostings = await fetchJobPostList(JOBSITE_NAME, page, sortByDate);
    setList(prevList => {
      if (
        !hasSetInitialJob.current &&
        jobpostings.length !== 0 &&
        prevList.length === 0
      ) {
        onClickJob(jobpostings[0]._id);
        hasSetInitialJob.current = true;
      }
      return jobpostings;
    });
    setIsLoading(false);
  }, [onClickJob, page, sortByDate]);

  useEffect(() => {
    getJobPostings();
  }, [getJobPostings]);

  return (
    <div>
      {isLoading && <Loading colour="blue" />}
      <div className="space-y-8">
        {list.map(item => {
          return (
            <JobListCard
              key={item._id}
              item={item}
              onClick={onClickJob}></JobListCard>
          );
        })}
      </div>
    </div>
  );
}
