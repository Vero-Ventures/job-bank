'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { TrashIcon } from '@/components/icons';

function TrashButton({ jobPostingId }) {
  const handleDelete = async () => {
    try {
      const apiUrl = `http://localhost:3000/api/job-posting/?job-posting-id=${jobPostingId}`;
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Job posting deleted successfully');
      } else {
        throw new Error('Failed to delete job posting');
      }
    } catch (error) {
      console.error('Error deleting job posting:', error);
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

export default TrashButton;
