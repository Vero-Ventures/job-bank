import { GET } from '@/app/api/job-posting/route';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { connectMongoDB } from '@/libs/mongodb';

//initialize MongoDB connection
connectMongoDB();

// Define your component
export default async function Home() {
  try {
    // Define the API URL with the email parameter
    const email = 'transportdaewoo@gmail.com';
    const apiURL = `http://localhost:3000/api/job-posting?email=${email}`;

    // Fetch job postings from the API endpoint using the GET function
    const response = await GET({ nextUrl: new URL(apiURL) });

    // Check if the response is successful
    if (response.status === 200) {
      // Parse the JSON response
      const res = await response.json();
      const filteredJobPostings = res.jobPostings;

      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between border-b-2 border-gray-200 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mt-8 mb-4">
                My Job Postings
              </h2>
            </div>
            <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
              <Button
                className="whitespace-nowrap text-base leading-6 font-medium"
                variant="secondary">
                Add New Job Posting
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredJobPostings.length > 0 ? (
              filteredJobPostings.map((posting, index) => (
                <Card
                  key={index}
                  title={posting.jobTitle}
                  organization={posting.hiringOrganization}
                  locality={posting.addressLocality}
                  region={posting.addressRegion}
                  validThrough={posting.validThrough}
                  siteFlags={Array.from({ length: 4 }, (_, i) => i + 1).map(
                    site => ({
                      id: `site${site}-software`,
                      checked: posting[`site${site}`],
                      label: `Display on Site ${site}`,
                    })
                  )}
                />
              ))
            ) : (
              <p>No job postings found.</p>
            )}
          </div>
        </div>
      );
    } else {
      // If the response is not successful, log the error
      console.error('Failed to fetch job postings:', response.statusText);
    }
  } catch (error) {
    // If an error occurs during the fetch operation, log the error
    console.error('Error fetching job postings:', error);
  }

  // Return a placeholder JSX if the fetch operation fails or throws an error
  return <p>Error fetching job postings.</p>;
}
