import Axios from 'axios';
import { useEffect, useState } from 'react';

import Loading from '../ui/Loading';
import JobListCard from './jobListCard';

export default function JobLists({ onClickJob, page, sortByDate }) {
  const [list, setList] = useState([]); // jobPosts list that will be displayed
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = '/api/job-posting/newcomers';

  /**
   * Fetch Jobposts list of page from database.
   */
  const getData = () => {
    setIsLoading(true);
    const page_param = '?page_num=' + page;
    const sort_param = sortByDate ? '&sort={"datePosted": -1}' : '';

    Axios.get(API_URL + page_param + sort_param)
      .then(res => {
        if (res.data.jobPostings.length != 0 && list.length == 0) {
          onClick(res.data.jobPostings[0]._id);
        }
        setList(res.data.jobPostings);
      })
      .catch(error => {
        console.log(error.response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  /**
   * Pass postingId to Home to display selected post.
   * @param {string} postingId selected Posting Id.
   */
  const onClick = postingId => {
    onClickJob(postingId);
  };

  useEffect(() => {
    getData();
  }, [page, sortByDate]);

  return (
    <div>
      {isLoading && <Loading colour="blue" />}
      <div className="space-y-8">
        {list.map(item => {
          return (
            <JobListCard
              key={item._id}
              item={item}
              onClick={onClick}></JobListCard>
          );
        })}
      </div>
    </div>
  );
}
