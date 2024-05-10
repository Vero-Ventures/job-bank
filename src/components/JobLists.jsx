/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HHxdFP9lbfv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from 'next/link';

export default function JobLists({ list }) {
  return (
    <div className="grid gap-6">
      {list.map(item => {
        const maxWage = item.maxCompValue ? `to $${item.maxCompValue}` : '';
        const postedDate = item.datePosted.split(' ').slice(2).join(' ');
        return (
          <div
            key={item._id}
            className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6">
            <Link
              href="/jobsite1/jobposting"
              as={`/jobsite1/jobposting/${item._id}`}>
              <h3 className="text-xl font-bold mb-2 titleCase">
                {item.jobTitle}
              </h3>
              <div className="flex justify-between">
                <div className="text-gray-500 dark:text-gray-400 mb-4">
                  {item.hiringOrganization}
                </div>
                <div className="text-gray-400 dark:text-gray-300 mb-4">
                  {postedDate}
                </div>
              </div>

              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {item.addressLocality}, {item.addressRegion}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Salary: {item.minCompValue} {maxWage} hourly
              </p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
