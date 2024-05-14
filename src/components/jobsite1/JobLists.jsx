import Axios from 'axios';
import Link from 'next/link';
import MapPinIcon from '../icons/mapPinIcon';
import MoneyIcon from '../icons/moneyIcon';
import Loading from '@/components/ui/Loading';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

export default function JobLists() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  const API_URL = '/api/job-posting/indigenous';

  const getData = () => {
    setIsLoading(true);
    console.log('Current Page ' + page);
    Axios.get(API_URL + '?page_num=' + page)
      .then(res => {
        console.log(res.data);
        const mergedData = list.concat(res.data.jobPostings);
        setList(mergedData);
      })
      .catch(error => {
        console.log(error.response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onClickLoadMore = () => {
    if (page < lastPage && !isLoading) {
      const newPage = page + 1;
      setPage(newPage);
    }
  };

  useEffect(() => {
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
    getData();
  }, [page]);

  return (
    <div className="grid gap-6 max-h-dvh overflow-y-auto">
      {list.map(item => {
        const maxWage = item.maxCompValue ? `to $${item.maxCompValue}` : '';
        const postedDate = item.datePosted.split(' ').slice(2).join(' ');
        return (
          <div
            key={item._id}
            className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6"
            id={item._id}>
            <Link
              href="/jobsite1/jobposting"
              as={`/jobsite1/jobposting/${item._id}`}>
              <h3 className="text-xl font-bold mb-2 titleCase">
                {item.jobTitle}
              </h3>
              <div className="flex justify-between">
                <div className="text-gray-500 dark:text-gray-400 mb-4">
                  {item.hiringOrganization}
                </div>
                <div className="text-gray-400 dark:text-gray-300 mb-4">
                  {postedDate}
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <MapPinIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">
                  {item.addressLocality}, {item.addressRegion}
                </p>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <MoneyIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">
                  ${item.minCompValue} {maxWage} hourly
                </p>
              </div>
            </Link>
          </div>
        );
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
