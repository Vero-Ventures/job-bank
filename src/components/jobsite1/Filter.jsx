import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '../ui/button';
import ArrowDownIcon from '../icons/arrowDownIcon';
import { PROVINCES, JOBTYPES } from '@/libs/jobsiteConstants';
import React, { useState, useEffect } from 'react';

/**
 * Toggle filters when screen is small.
 */
const toggleFilters = () => {
  const filters = document.querySelector('.filters');
  filters.classList.toggle('hidden');
};

export default function Filter({ onChangeFilter, setPage }) {
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  // State for managing the selected jobtypes. The initial state sets all jobtyps to false.
  const [jobTypes, setJobTypes] = useState(
    Object.keys(JOBTYPES).reduce((acc, province) => {
      acc[province] = false;
      return acc;
    }, {})
  );
  // State for managing the selected locations. The initial state sets all locations to false.
  const [locations, setLocations] = useState(
    Object.keys(PROVINCES).reduce((acc, province) => {
      acc[province] = false;
      return acc;
    }, {})
  );

  /**
   * Handle changes to the job type selection.
   * This function toggles the boolean value of a job type in the state.
   *
   * @param {Object} event - The event object from the change event.
   * @param {Object} event.target - The target element that triggered the event.
   */
  const handleJobTypeChange = event => {
    const { id } = event.target;
    setJobTypes(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  /**
   * Handle changes to the location selection.
   * This function toggles the boolean value of a location in the state.
   *
   * @param {Object} event - The event object from the change event.
   * @param {Object} event.target - The target element that triggered the event.
   */
  const handleLocationChange = event => {
    const { id } = event.target;
    setLocations(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  /**
   * Retrieve selected job types and locations, then triggers filter change.
   */
  const onClickConfirmFilter = () => {
    const selectedJobTypes = Object.keys(jobTypes).filter(key => jobTypes[key]);
    const selectedLocations = Object.keys(locations).filter(
      key => locations[key]
    );
    const filterValues = {
      jobType: selectedJobTypes,
      locations: selectedLocations,
    };
    setPage(1);
    onChangeFilter(filterValues);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="bg-gray-100 dark:bg-gray-800 p-6 pb-3 lg:w-[280px] lg:border-r">
        <div className="flex item-center">
          <h2 className="text-2xl font-bold mb-6 pr-4">Filters</h2>
          <button onClick={() => toggleFilters()} className="mb-6 lg:hidden">
            <ArrowDownIcon />
          </button>
        </div>

        <div className={`space-y-6 filters ${isLargeScreen ? '' : 'hidden'}`}>
          <div>
            <h3 className="text-lg font-semibold mb-2">Job Type</h3>
            <div className="space-y-2">
              {Object.keys(jobTypes).map(jobType => (
                <div key={jobType} className="flex items-center gap-2">
                  <Checkbox id={jobType} onClick={handleJobTypeChange} />
                  <Label className="font-medium" htmlFor={jobType}>
                    {jobType}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <div className="space-y-2">
              {Object.keys(locations).map(location => (
                <div key={location} className="flex items-center gap-2">
                  <Checkbox id={location} onClick={handleLocationChange} />
                  <Label className="font-medium" htmlFor={location}>
                    {location}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={onClickConfirmFilter}>Confirm</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
