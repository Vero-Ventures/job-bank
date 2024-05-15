import Axios from 'axios';
import Loading from '@/components/ui/Loading';
import JobListCard from './jobListCard';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

export default function JobLists({ sortByDate }) {
  const [list, setList] = useState([]); // jobPosts list that will be displayed
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0); // current page
  const [lastPage, setLastPage] = useState(0); // total number of pages

  const API_URL = '/api/job-posting/indigenous';

  /**
   * Fetch Jobposts list of page from database.
   */
  const getData = () => {
    setIsLoading(true);
    console.log('Current Page ' + page);
    const page_param = '?page_num=' + page;
    const sort_param = sortByDate ? '&sort={"datePosted": -1}' : '';
    console.log(API_URL + page_param + sort_param);
    Axios.get(API_URL + page_param + sort_param)
      .then(res => {
        console.log(res.data);
        if (page == 1) {
          setList(res.data.jobPostings);
        } else {
          setList(list.concat(res.data.jobPostings));
        }
      })
      .catch(error => {
        console.log(error.response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  /**
   * Set new page number when user clicks load more button.
   */
  const onClickLoadMore = () => {
    if (page < lastPage && !isLoading) {
      const newPage = page + 1;
      setPage(newPage);
    }
  };

  useEffect(() => {
    /**
     * Fetch total number of pages for pagination.
     */
    const getTotalPages = () => {
      Axios.get(API_URL + '/total-posts')
        .then(res => {
          setLastPage(Math.ceil(res.data.jobPostings / 25));
        })
        .catch(error => {
          console.log(error.response);
        });
    };

    getTotalPages();
  }, []);

  useEffect(() => {
    if (page !== 0) {
      getData();
    }
  }, [page]);

  useEffect(() => {
    if (page == 1) {
      getData();
    } else {
      setPage(1);
    }
  }, [sortByDate]);

  return (
    <div className="grid gap-6 max-h-dvh overflow-y-auto">
      {list.map(item => {
        return <JobListCard key={item._id} item={item}></JobListCard>;
      })}
      {isLoading && <Loading />}
      <Button
        className={`${isLoading ? 'hidden' : 'block'}`}
        onClick={onClickLoadMore}>
        Load More
      </Button>
    </div>
  );
}
