'use client';

import JobDetail from '@/components/jobsite2/jobdetail';
import SearchBar from '@/components/jobsite2/searchBar';
import JobLists from '@/components/jobsite2/joblists';
import { useState } from 'react';

export default function Home() {
  const [postingID, setPostingID] = useState(null);

  const onClickJobPosting = itemId => {
    setPostingID(itemId);
  };

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 bg-[#f0f9ff] dark:bg-[#0a1929]">
      <SearchBar></SearchBar>
      <div className="flex flex-row flex-1 space-x-6">
        <JobLists onClickJob={onClickJobPosting}></JobLists>
        <JobDetail postingID={postingID}></JobDetail>
      </div>
    </div>
  );
}
