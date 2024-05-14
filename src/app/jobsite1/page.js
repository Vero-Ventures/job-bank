'use client';

import JobLists from '@/components/jobsite1/JobLists';
import Filter from '@/components/jobsite1/Filter';
import { Input } from '@/components/ui/input';
import SearchIcon from '@/components/icons/searcIcon';

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row">
      <Filter />
      <div className="flex-1 p-6">
        <div className="mb-6 relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <Input
            className="w-full px-10 py-3 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-950 dark:text-gray-50"
            placeholder="Search for jobs..."
            type="text"
          />
        </div>
        <JobLists />
      </div>
    </div>
  );
}
