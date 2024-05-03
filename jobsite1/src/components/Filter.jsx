/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HHxdFP9lbfv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function Filter() {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="bg-gray-100 dark:bg-gray-800 p-6 lg:w-[280px] lg:border-r">
        <h2 className="text-2xl font-bold mb-6">Filters</h2>
        <div className="space-y-6">
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
                  New York, NY
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="location-2" />
                <Label className="font-medium" htmlFor="location-2">
                  San Francisco, CA
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="location-3" />
                <Label className="font-medium" htmlFor="location-3">
                  Chicago, IL
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
  )
}
