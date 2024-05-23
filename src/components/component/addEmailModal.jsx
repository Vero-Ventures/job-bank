import { useState, useEffect } from 'react';
import {
  DialogTitle,
  DialogContent,
  Dialog,
  DialogOverlay,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import emailHandler from '@/app/admin/emailHandler';

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

export function AddEmailModal({ open, onClose, updateEmails }) {
  const [email, setEmail] = useState('');
  const [emailsAdded, setEmailsAdded] = useState(1);

  // Reset email state when the modal is opened
  useEffect(() => {
    if (open) {
      setEmail('');
    }
  }, [open]);

  const validateEmail = email => {
    // Regular expression to validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleAddEmail = async () => {
    try {
      if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
      }
      // Call the addEmailObjects function with an array of length 1 containing the email object
      const emailsAdded = await emailHandler.addEmailObjects([
        { email, sent: false },
      ]);
      setEmailsAdded(emailsAdded);
      setEmail('');

      // Call the callback function to update the data state in AdminPage
      const isAdd = true;
      updateEmails({ email, sent: false }, isAdd);
    } catch (error) {
      console.error('Error adding email objects:', error);
    }
  };

  const handleAddAndSendEmail = async () => {
    try {
      if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
      }
      await emailHandler.addEmailObjects([{ email, sent: true }]);
      await emailHandler.sendEmail(email);
      alert('Email sent to ' + email);
      setEmail('');

      // Call the callback function to update the data state in AdminPage
      const isAdd = true;
      updateEmails({ email, sent: true }, isAdd);
    } catch (error) {
      console.error('Error adding email objects:', error);
    }
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
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              title="Please enter a valid email address"
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
          {/* Display warning/notification field if emailsAdded is less than 1 */}
          {emailsAdded < 1 && (
            <div className="text-yellow-500">
              Email address already exists on the contact list.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
