import { useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  Dialog,
  DialogOverlay,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// CloseButton component for the close button
const CloseButton = ({ onClick }) => (
  <button className="text-gray-500 hover:text-gray-600" onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
);

export function AddEmailModal({ open, onClose }) {
  const [email, setEmail] = useState('');

  const handleAddEmail = () => {
    // Add logic to handle adding email
    console.log('Email added:', email);
    onClose(); // Close the modal
  };

  const handleAddAndSendEmail = () => {
    // Add logic to handle adding and sending email
    console.log('Email added and sent:', email);
    onClose(); // Close the modal
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogOverlay />
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex items-center justify-between border-b pb-4">
          <DialogTitle>Add Email</DialogTitle>
          {/* Use CloseButton component for the close button */}
          <CloseButton onClick={onClose} />
        </div>
        <div className="space-y-4 py-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="Enter email address"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddEmail}>Add Email</Button>
            <Button variant="outline" onClick={handleAddAndSendEmail}>
              Add and Send Email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
