'use client';

import JobLists from '@/components/jobsite1/JobLists';
import Filter from '@/components/jobsite1/Filter';
import SearchIcon from '@/components/icons/searcIcon';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Home() {
  const [sortByDate, setSortByDate] = useState(false);
  const [filterValues, setFilterValues] = useState({});
  const onChangeFilter = values => {
    setFilterValues(values);
  };
  return (
    <div className="flex flex-col lg:flex-row">
      <Filter onChangeFilter={onChangeFilter} />
      <div className="flex-1 p-6 flex flex-col">
        <div className="mb-1 relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <Input
            className="w-full px-10 py-3 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-950 dark:text-gray-50"
            placeholder="Search for jobs..."
            type="text"
          />
        </div>
        <div className="ml-auto mb-3">
          <button
            onClick={() => {
              sortByDate ? setSortByDate(false) : setSortByDate(true);
            }}
            className={`px-4 text-sm ${sortByDate ? 'font-semibold' : 'font-normals'}`}>
            Sort by date
          </button>
        </div>
        <JobLists sortByDate={sortByDate} filterValues={filterValues} />
      </div>
    </div>
  );
}
