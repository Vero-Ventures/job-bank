import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FilterIcon from '../icons/filterIcon';
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from '@/components/ui/select';
import React, { useState, useEffect } from 'react';

export default function SearchBar({ onChangeFilter }) {
  const [selectedValue, setSelectedValue] = useState({});
  const PROVINCES = [
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Northwest Territories',
    'Nova Scotia',
    'Nunavut',
    'Ontario',
    'Prince Edward Island',
    'Québec',
    'Saskatchewan',
    'Yukon',
  ];
  const handleLocationChange = value => {
    setSelectedValue(prev => ({
      ...prev,
      locations: value === 'All' ? [] : [value],
    }));
    onChangeFilter(selectedValue);
  };

  const handleJobTypeChange = value => {
    setSelectedValue(prev => ({
      ...prev,
      jobType: value === 'All' ? [] : [value],
    }));
    onChangeFilter(selectedValue);
  };

  useEffect(() => {
    onChangeFilter(selectedValue);
  }, [onChangeFilter, selectedValue]);

  return (
    <div className="bg-white dark:bg-[#0f172a] rounded-lg shadow-lg p-4 md:p-6">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            className="w-full bg-[#f0f9ff] dark:bg-[#0f172a] dark:text-white"
            placeholder="Search jobs..."
          />
        </div>
        <Button
          className="bg-[#0b5394] hover:bg-[#0a4480] text-white"
          variant="primary">
          Search
        </Button>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-2">
          <FilterIcon className="w-5 h-5 text-[#0b5394]" />
          <span className="text-[#0b5394] font-medium">Filters</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <Select
            className="bg-[#f0f9ff] dark:bg-[#0f172a] dark:text-white"
            defaultValue="jobType"
            onValueChange={handleJobTypeChange}>
            <SelectTrigger>
              <SelectValue>
                {!selectedValue.jobType || selectedValue.jobType.length === 0
                  ? 'Choose job type'
                  : `${selectedValue.jobType[0]}`}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="fullTime">Full Time</SelectItem>
              <SelectItem value="partTime">Part Time</SelectItem>
            </SelectContent>
          </Select>
          <Select
            className="bg-[#f0f9ff] dark:bg-[#0f172a] dark:text-white"
            defaultValue="Loactions"
            onValueChange={handleLocationChange}>
            <SelectTrigger>
              <SelectValue>
                {!selectedValue.locations ||
                selectedValue.locations.length === 0
                  ? 'Choose location'
                  : `${selectedValue.locations[0]}`}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              {PROVINCES.map(province => (
                <SelectItem key={province} value={province}>
                  {province}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
