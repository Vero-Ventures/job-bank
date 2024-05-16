// TrashButton.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { TrashIcon } from '@/components/icons';

const TrashButton = ({ jobPostingId, onDelete }) => {
  const handleDelete = () => {
    onDelete(jobPostingId); // Call onDelete function with jobPostingId as argument
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
};

TrashButton.displayName = 'TrashButton';

export default TrashButton;
