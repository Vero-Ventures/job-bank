import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between border-b-2 border-gray-200 py-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Input
            className="pl-4 pr-10 py-2 border rounded-md leading-5"
            placeholder="Search my job postings..."
          />
        </div>
        <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
          <Button
            className="whitespace-nowrap text-base leading-6 font-medium"
            variant="secondary">
            Scrape New Listings
          </Button>
        </div>
      </div>
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mt-8 mb-4">
        My Job Postings
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Software Engineer</CardTitle>
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
              Acme Inc. - San Francisco, CA
            </p>
            <p className="text-sm text-gray-600">Expires: June 30, 2023</p>
            <div className="mt-4">
              <Checkbox id="site1-software" />
              <label className="ml-2 text-sm" htmlFor="site1-software">
                Display on Site 1
              </label>
            </div>
            <div>
              <Checkbox id="site2-software" />
              <label className="ml-2 text-sm" htmlFor="site2-software">
                Display on Site 2
              </label>
            </div>
            <div>
              <Checkbox id="site3-software" />
              <label className="ml-2 text-sm" htmlFor="site3-software">
                Display on Site 3
              </label>
            </div>
            <div>
              <Checkbox id="site4-software" />
              <label className="ml-2 text-sm" htmlFor="site4-software">
                Display on Site 4
              </label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PencilIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
