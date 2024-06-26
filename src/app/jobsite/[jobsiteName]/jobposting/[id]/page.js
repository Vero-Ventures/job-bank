'use client';

import JobDetail from '@/components/jobsite/jobdetail';
import { JOBSITE_INFO } from '@/libs/jobsiteConstants';

export default function JobPosting({ params }) {
  const postingID = params.id;
  const COLOUR_THEME = JOBSITE_INFO[params.jobsiteName].colours;

  return (
    <main className="w-full max-w-5xl mx-auto px-4 md:px-6 py-7 md:py-4">
      <JobDetail
        colourTheme={COLOUR_THEME}
        postingID={postingID}
        showJobPageBtn={false}></JobDetail>
    </main>
  );
}
