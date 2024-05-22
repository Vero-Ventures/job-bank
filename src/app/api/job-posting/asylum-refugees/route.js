import { NextResponse } from 'next/server';
import {
  getPaginationParams,
  fetchJobPostings,
  handleError,
  checkFieldExist,
  parseSortCriteria,
  parseFilterCriteria,
} from '../siteRequestUtils';

export async function GET(req) {
  try {
    //Todo: Update the site5 name to asylum-refugees
    const siteCriteria = { site5: true };

    // Extract pagination parameters
    const { skip, pageSize } = getPaginationParams(req);
    const sortBy = req.nextUrl.searchParams.get('sort');
    const etFilters = req.nextUrl.searchParams.getAll('et');
    const pFilters = req.nextUrl.searchParams.getAll('p');

    // Parse sort and filter criteria
    const sortCriteria = await parseSortCriteria(sortBy);
    // Parse filter criteria
    const filterCriteria = await parseFilterCriteria(etFilters, pFilters);

    // Check if the requested sort field exists
    if (sortCriteria != null && !(await checkFieldExist(sortCriteria))) {
      console.log('no field');
      return NextResponse.json(
        { message: 'Not Found - Requested sort field does not exist' },
        { status: 404 }
      );
    }

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
