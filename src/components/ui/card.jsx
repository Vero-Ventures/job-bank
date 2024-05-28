import * as React from 'react';
import { Button } from '@/components/ui/button';
import TrashButton from '@/components/ui/trashbutton';
import CheckboxGroup from '@/components/ui/checkboxGroup';
import { PencilIcon } from '@/components/icons';
import { cn } from '@/libs/utils';
import jobPostingService from '@/app/admin-panel/home/jobPostingService';

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-gray-500', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

const Card = React.forwardRef(
  ({ jobPostingId, posting, className, onDelete, ...props }, ref) => {
    const [checkboxState, setCheckboxState] = React.useState({
      site1: posting.site1,
      site2: posting.site2,
      site3: posting.site3,
      site4: posting.site4,
      site5: posting.site5,
    });

    const handleChange = async e => {
      const site = e.target.name;
      const value = e.target.checked;

      try {
        const response = await jobPostingService.editJobPosting(jobPostingId, {
          [site]: value,
        });
        // update the UI after successful API call
        if (response.success) {
          setCheckboxState({
            ...checkboxState,
            [site]: value,
          });
        }
      } catch (error) {
        console.error('Error updating job posting:', error);
        // Handle error
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm',
          className
        )}
        {...props}>
        <CardHeader>
          <div className="flex flex-col items-end">
            <div className="flex items-center space-x-1">
              {posting.paid ? (
                <>
                  <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                  <span className="text-green-500">Active</span>
                </>
              ) : (
                <>
                  <span className="h-2 w-2 bg-yellow-500 rounded-full"></span>
                  <span className="text-yellow-500">Pending</span>
                </>
              )}
            </div>
          </div>
          <CardTitle className="title-case">{posting.jobTitle}</CardTitle>
          <div className="flex space-x-2">
            <a
              href={`/admin-panel/postingDetails?job-posting-id=${jobPostingId}`}
              key={jobPostingId}>
              <Button size="icon" variant="outline">
                <PencilIcon className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
            </a>
            <TrashButton jobPostingId={jobPostingId} onDelete={onDelete} />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            {posting.hiringOrganization} - {posting.addressLocality},{' '}
            {posting.addressRegion}
          </p>
          <p className="text-sm text-gray-600">
            Expires: {new Date(posting.validThrough).toLocaleDateString()}
          </p>
          <div className="mt-3 text-gray-900">
            <CheckboxGroup
              formData={checkboxState}
              handleChange={handleChange}
              disabled={posting.paid}
            />
          </div>
        </CardContent>
      </div>
    );
  }
);
Card.displayName = 'Card';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
