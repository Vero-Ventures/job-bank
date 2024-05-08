import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { TrashIcon, PencilIcon } from '@/components/icons';
import { cn } from '@/libs/utils';

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
  <p
    ref={ref}
    className={cn('text-sm text-gray-500 dark:text-gray-400', className)}
    {...props}
  />
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
  (
    {
      title,
      organization,
      locality,
      region,
      validThrough,
      siteFlags,
      className,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50',
        className
      )}
      {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="flex space-x-2">
          <Button size="icon" variant="outline">
            <PencilIcon className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button size="icon" variant="outline">
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          {organization} - {locality}, {region}
        </p>
        <p className="text-sm text-gray-600">
          Expires: {new Date(validThrough).toLocaleDateString()}
        </p>
        <div className="mt-4">
          {siteFlags.map(({ id, checked, label }) => (
            <div key={id}>
              <Checkbox id={id} checked={checked} />
              <label className="ml-2 text-sm" htmlFor={id}>
                {label}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </div>
  )
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
