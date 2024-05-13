'use client';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../ui/Loading';

export default function JobLists({ onClickJob }) {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page] = useState(1);
  const API_URL = '/api/job-posting/newcomers?page_num=';

  function getData() {
    setIsLoading(true);

    Axios.get(API_URL + page)
      .then(res => {
        console.log(res.data);
        if (res.data.jobPostings.length != 0 && list.length == 0) {
          onClick(res.data.jobPostings[0]._id);
        }
        setList(res.data.jobPostings);
      })
      .catch(error => {
        console.log(error.response);
      });

    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  const onClick = postingId => {
    onClickJob(postingId);
  };

  return (
    <div className="w-4/12 max-h-dvh overflow-y-auto">
      {isLoading && <Loading colour="blue" />}
      <div className="space-y-8">
        {list.map(item => {
          const maxWage = item.maxCompValue ? `to $${item.maxCompValue}` : '';
          const postedDate = item.datePosted.split(' ').slice(2).join(' ');
          return (
            <div
              key={item._id}
              className="bg-white dark:bg-[#0f172a] rounded-lg shadow-lg p-4 space-y-3">
              <div onClick={() => onClick(item._id)}>
                <h5 className="text-xl font-bold titleCase text-[#0b5394] dark:text-white">
                  {item.jobTitle}
                </h5>
                <p className="pl-2 text-gray-500 dark:text-gray-400">
                  {item.hiringOrganization}
                </p>
                <div className="pl-2 flex justify-between">
                  <div className="text-gray-500 dark:text-gray-400">
                    {item.addressLocality}, {item.addressRegion}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-300 mb-4">
                    {postedDate}
                  </div>
                </div>
                <div className="flex justify-between">
                  <p className="pl-2 text-sm text-gray-500 dark:text-gray-400">
                    ${item.minCompValue} {maxWage} hourly
                  </p>
                  <button
                    className="text-sm p-3 font-bold titleCase text-[#0b5394] dark:text-white"
                    onClick={() => onClick(item._id)}>
                    View
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
