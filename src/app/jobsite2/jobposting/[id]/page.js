'use client';

import JobDetail from '@/components/jobsite/jobdetail';
import { JOBSITE2 } from '@/libs/jobsiteConstants';

const COLOUR_THEME = JOBSITE2.colours;
const JOBSITE_ENDPOINT = JOBSITE2.endpoint;

export default function JobPosting({ params }) {
  const postingID = params.id;

  return (
    <main className="w-full max-w-5xl mx-auto px-4 md:px-6 py-7 md:py-4">
      <JobDetail
        colourTheme={COLOUR_THEME}
        postingID={postingID}
        endpoint={JOBSITE_ENDPOINT}></JobDetail>
    </main>
  );
}
