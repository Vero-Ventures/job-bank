import { fetchJobDetail } from '../jobsiteAPIrequest';
import { useCallback, useEffect, useState } from 'react';
import MapPinIcon from '@/components/icons/mapPinIcon';
import ClockIcon from '@/components/icons/clockIcon';
import BriefcaseIcon from '@/components/icons/briefCaseIcon';
import MoneyIcon from '@/components/icons/moneyIcon';
import CalendarIcon from '@/components/icons/calendarIcon';
import UserIcon from '@/components/icons/userIcon';
import EmailIcon from '@/components/icons/emailIcon';
import Loading from '@/components/ui/Loading';

export default function JobDetail(job) {
  const [jobDetail, setJobDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetch Jobpost detail from database.
   */
  const getDetailData = useCallback(async () => {
    if (job.postingID) {
      setIsLoading(true);
      setJobDetail(await fetchJobDetail(job.postingID));
      setIsLoading(false);
    }
  }, [job]);

  useEffect(() => {
    getDetailData();
  }, [getDetailData]);

  return (
    <div className="bg-white max-h-dvh overflow-y-auto dark:bg-[#0f172a] rounded-lg shadow-lg p-5 md:p-10 flex-1 space-y-4">
      {Object.keys(jobDetail).length !== 0 && (
        <div className="space-y-4">
          <div>
            <h4 className="text-2xl font-bold text-[#0b5394] titleCase dark:text-white">
              {jobDetail.jobTitle}
            </h4>
            <p className="text-gray-500 dark:text-gray-400">
              {jobDetail.hiringOrganization}
            </p>
            <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1 lg:mt-0">
              {jobDetail.datePosted}
            </div>
          </div>
          <div className="grid text-sm md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400 titleCase">
                  {jobDetail.employmentSubType}, {jobDetail.employmentType}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">
                  {jobDetail.streetAddress
                    ? `${jobDetail.streetAddress}, `
                    : ''}
                  {jobDetail.addressLocality}, {jobDetail.addressRegion}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MoneyIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">
                  ${jobDetail.minCompValue}{' '}
                  {jobDetail.maxCompValue
                    ? `to $${jobDetail.maxCompValue}`
                    : ''}{' '}
                  hourly
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">
                  {jobDetail.workHours}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">
                  {jobDetail.startTime}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">
                  {jobDetail.vacancies} vacancy
                </span>
              </div>
            </div>
          </div>
          <div>
            <h5 className="text-base font-bold text-[#0b5394] dark:text-white">
              Job Description
            </h5>
            <p className="text-gray-500 dark:text-gray-400">## TO BE UPDATED</p>
          </div>
          <div>
            <h5 className="text-base font-bold text-[#0b5394] dark:text-white">
              Requirements
            </h5>
            <ul className="list-disc pl-4 text-gray-500 dark:text-gray-400">
              <li>## TO BE UPDATED</li>
            </ul>
          </div>
          <div>
            <h5 className="text-base font-bold text-[#0b5394] dark:text-white">
              Benefits
            </h5>
            <ul className="list-disc pl-4 text-gray-500 dark:text-gray-400">
              {jobDetail.benefits}
              <li>## TO BE UPDATED</li>
            </ul>
          </div>
          <div>
            <h5 className="text-base font-bold mb-1 text-[#0b5394] dark:text-white">
              Apply by email
            </h5>
            <div className="flex items-center gap-3 text-sm">
              <EmailIcon />
              <a
                href={`mailto:${jobDetail.email}`}
                className="text-blue-900 underline">
                {jobDetail.email}
              </a>
            </div>
          </div>
        </div>
      )}
      {isLoading && <Loading colour="blue"></Loading>}
    </div>
  );
}
