import { NextResponse } from 'next/server';
import {
  getPaginationParams,
  fetchJobPostings,
  handleError,
  parseSortCriteria,
  parseFilterCriteria,
} from '../siteRequestUtils';

export async function GET(req) {
  try {
    //Todo: Update the site2 name to newcomers
    const siteCriteria = { site2: true };

    // Extract pagination parameters
    const { skip, pageSize } = getPaginationParams(req);
    const sortBy = req.nextUrl.searchParams.get('sort');
    const etFilters = req.nextUrl.searchParams.getAll('et');
    const pFilters = req.nextUrl.searchParams.getAll('p');

    // Parse sort and filter criteria
    const sortCriteria = await parseSortCriteria(sortBy);
    const filterCriteria = await parseFilterCriteria(etFilters, pFilters);

    // Query job postings with pagination and sort criteria if provided
    const jobPostings = await fetchJobPostings(
      siteCriteria,
      sortCriteria,
      filterCriteria,
      skip,
      pageSize
    );

    // Check if job postings were found
    if (jobPostings.length < 1) {
      return new Response(null, {
        status: 204,
        statusText: 'No job postings were found',
      });
    }

    // Return success response with the paginated job postings
    return NextResponse.json({ jobPostings }, { status: 200 });
  } catch (error) {
    // Handle errors
    return handleError(error);
  }
}
