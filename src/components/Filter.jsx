/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HHxdFP9lbfv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import React, { useState, useEffect } from 'react';

function toggleFilters() {
  const filters = document.querySelector('.filters');
  filters.classList.toggle('hidden');
}

export default function Filter() {
  const [isLargeScreen, setIsLargeScreen] = useState(true);

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
            <img src="/arrowdown.png" alt="logo" style={{ width: '30px' }} />
          </button>
        </div>

        <div className={`space-y-6 filters ${isLargeScreen ? '' : 'hidden'}`}>
          <div>
            <h3 className="text-lg font-semibold mb-2">Job Type</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox id="full-time" />
                <Label className="font-medium" htmlFor="full-time">
                  Full-Time
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="part-time" />
                <Label className="font-medium" htmlFor="part-time">
                  Part-Time
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="contract" />
                <Label className="font-medium" htmlFor="contract">
                  Contract
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="internship" />
                <Label className="font-medium" htmlFor="internship">
                  Internship
                </Label>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Salary Range</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox id="salary-range-1" />
                <Label className="font-medium" htmlFor="salary-range-1">
                  $50,000 - $75,000
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="salary-range-2" />
                <Label className="font-medium" htmlFor="salary-range-2">
                  $75,000 - $100,000
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="salary-range-3" />
                <Label className="font-medium" htmlFor="salary-range-3">
                  $100,000 - $125,000
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="salary-range-4" />
                <Label className="font-medium" htmlFor="salary-range-4">
                  $125,000+
                </Label>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox id="location-1" />
                <Label className="font-medium" htmlFor="location-1">
                  BC
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="location-2" />
                <Label className="font-medium" htmlFor="location-2">
                  AB
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="location-3" />
                <Label className="font-medium" htmlFor="location-3">
                  ON
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="location-4" />
                <Label className="font-medium" htmlFor="location-4">
                  Remote
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
