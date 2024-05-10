import Link from 'next/link';
import MapPinIcon from './icons/mapPinIcon';
import MoneyIcon from './icons/\bmoneyIcon';

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
              <div className="flex items-center gap-2 mb-4">
                <MapPinIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">
                  {item.addressLocality}, {item.addressRegion}
                </p>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <MoneyIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">
                  ${item.minCompValue} {maxWage} hourly
                </p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
