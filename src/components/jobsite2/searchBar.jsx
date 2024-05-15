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

export default function SearchBar() {
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
            defaultValue="location">
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new-york">New York</SelectItem>
              <SelectItem value="san-francisco">San Francisco</SelectItem>
              <SelectItem value="london">London</SelectItem>
            </SelectContent>
          </Select>
          <Select
            className="bg-[#f0f9ff] dark:bg-[#0f172a] dark:text-white"
            defaultValue="job-type">
            <SelectTrigger>
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-Time</SelectItem>
              <SelectItem value="part-time">Part-Time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
            </SelectContent>
          </Select>
          <Select
            className="bg-[#f0f9ff] dark:bg-[#0f172a] dark:text-white"
            defaultValue="salary-range">
            <SelectTrigger>
              <SelectValue placeholder="Salary Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-50k">$0 - $50,000</SelectItem>
              <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
              <SelectItem value="100k-plus">$100,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
