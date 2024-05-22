import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '../ui/button';
import ArrowDownIcon from '../icons/arrowDownIcon';
import { PROVINCES, JOBTYPES } from '@/libs/filterValues';
import React, { useState, useEffect } from 'react';

/**
 * Toggle filters when screen is small.
 */
const toggleFilters = () => {
  const filters = document.querySelector('.filters');
  filters.classList.toggle('hidden');
};

export default function Filter({ onChangeFilter }) {
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [jobTypes, setJobTypes] = useState(
    Object.keys(JOBTYPES).reduce((acc, province) => {
      acc[province] = false;
      return acc;
    }, {})
  );
  const [locations, setLocations] = useState(
    Object.keys(PROVINCES).reduce((acc, province) => {
      acc[province] = false;
      return acc;
    }, {})
  );

  const handleJobTypeChange = event => {
    const { id } = event.target;
    setJobTypes(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  const handleLocationChange = event => {
    const { id } = event.target;
    setLocations(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  const getCheckedValues = () => {
    const selectedJobTypes = Object.keys(jobTypes).filter(key => jobTypes[key]);
    const selectedLocations = Object.keys(locations).filter(
      key => locations[key]
    );
    const filterValues = {
      jobType: selectedJobTypes,
      locations: selectedLocations,
    };
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
            <Button onClick={getCheckedValues}>Confirm</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
