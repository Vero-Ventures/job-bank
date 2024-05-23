import Link from 'next/link';

export default function JobListCard({ item, onClick }) {
  return (
    <div className="bg-white dark:bg-[#0f172a] rounded-lg shadow-lg p-4 space-y-3">
      <div>
        <h5 className="text-xl font-bold titleCase text-[#0b5394] dark:text-white">
          {item.jobTitle}
        </h5>
        <p className="pl-2 text-gray-500 dark:text-gray-400">
          {item.hiringOrganization}
        </p>
        <div className="pl-2 flex justify-between">
          <div className="text-gray-500 dark:text-gray-400">
            {item.addressLocality}, {item.addressRegion}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-300 mb-4">
            {item.datePosted.split(' ').slice(2).join(' ')}
          </div>
        </div>
        <div className="flex justify-between">
          <p className="pl-2 text-sm text-gray-500 dark:text-gray-400">
            ${item.minCompValue}{' '}
            {item.maxCompValue ? `to $${item.maxCompValue}` : ''} hourly
          </p>
          <button
            className="text-sm p-3 font-bold titleCase text-[#0b5394] hidden sm:block dark:text-white"
            onClick={() => onClick(item._id)}>
            View
          </button>
          <Link
            className="text-sm p-3 font-bold titleCase text-[#0b5394] block sm:hidden dark:text-white"
            href="/jobsite2/jobposting"
            as={`/jobsite2/jobposting/${item._id}`}>
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
