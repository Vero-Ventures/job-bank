/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HHxdFP9lbfv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input"

export default function JobLists() {
  return (
      <div className="flex-1 p-6">
        <div className="mb-6">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <Input
              className="w-full px-10 py-3 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-950 dark:text-gray-50"
              placeholder="Search for jobs..."
              type="text"
            />
          </div>
        </div>
        <div className="grid gap-6">
          <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold mb-2">Software Engineer</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Acme Inc.</p>
            <p className="text-gray-500 dark:text-gray-400 mb-4">New York, NY</p>
            <p className="text-gray-500 dark:text-gray-400">
              We are looking for an experienced software engineer to join our growing team. You will be responsible for
              developing and maintaining our web application.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold mb-2">Marketing Coordinator</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Globex Corporation</p>
            <p className="text-gray-500 dark:text-gray-400 mb-4">San Francisco, CA</p>
            <p className="text-gray-500 dark:text-gray-400">
              We are seeking a detail-oriented marketing coordinator to join our team. You will be responsible for
              managing our social media channels and creating content for our website.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold mb-2">Data Analyst</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Stark Industries</p>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Remote</p>
            <p className="text-gray-500 dark:text-gray-400">
              We are looking for a skilled data analyst to join our team. You will be responsible for analyzing data and
              creating reports to help inform our business decisions.
            </p>
          </div>
        </div>
      </div>
  )
}

function SearchIcon(props) {
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
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}