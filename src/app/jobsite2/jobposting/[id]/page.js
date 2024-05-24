'use client';

import JobDetail from '@/components/jobsite/jobdetail';

export default function JobPosting({ params }) {
  const postingID = params.id;

  return (
    <main className="w-full max-w-5xl mx-auto px-4 md:px-6 py-7 md:py-4">
      <JobDetail postingID={postingID}></JobDetail>
    </main>
  );
}
