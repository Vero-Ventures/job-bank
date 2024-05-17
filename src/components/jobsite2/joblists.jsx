import { fetchJobPostList } from '../jobsiteAPIrequest';
import Loading from '../ui/Loading';
import JobListCard from './jobListCard';
import { useEffect, useState } from 'react';

export default function JobLists({ onClickJob, page }) {
  const [list, setList] = useState([]); // jobPosts list that will be displayed
  const [isLoading, setIsLoading] = useState(true);

  const JOBSITE_NAME = 'newcomers';

  /**
   * Fetch Jobposts list of page from database.
   */
  const getJobPostings = async () => {
    setIsLoading(true);
    const jobpostings = await fetchJobPostList(JOBSITE_NAME, page);
    if (jobpostings.length != 0 && list.length == 0) {
      onClickJob(jobpostings[0]._id);
    }
    setList(jobpostings);
    setIsLoading(false);
  };

  useEffect(() => {
    getJobPostings();
  }, [page]);

  return (
    <div className="max-h-dvh overflow-y-auto">
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
