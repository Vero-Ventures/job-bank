'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { TrashIcon } from '@/components/icons';
import { DELETE } from '@/app/api/job-posting/route';

function TrashButton({ jobPostingId }) {
  const handleDelete = async () => {
    try {
      const apiURL = `http://localhost:3000/api/job-posting?job-posting-id=${jobPostingId}`;
      const response = await DELETE({ nextUrl: new URL(apiURL) });
      if (response.status === 200) {
        alert('Job posting deleted successfully');
      }
    } catch (error) {
      alert('An error occurred while deleting the job posting');
    }
  };

  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={handleDelete}
      aria-label="Delete job posting">
      <TrashIcon className="h-4 w-4" />
      <span className="sr-only">Delete</span>
    </Button>
  );
}

TrashButton.displayName = 'TrashButton';

export default TrashButton; // Correct export statement
