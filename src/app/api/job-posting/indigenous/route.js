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
    //Todo: Update the site1 name to indigenous
    const siteCriteria = { site1: true };

    // Extract pagination parameters
    const { skip, pageSize } = getPaginationParams(req);
    const sortBy = req.nextUrl.searchParams.get('sort');
    const filterBy = req.nextUrl.searchParams.get('filter');

    // Parse sort and filter criteria
    const sortCriteria = await parseSortCriteria(sortBy);
    const filterCriteria = await parseFilterCriteria(filterBy);

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

    if (jobPostings.length === 0) {
      return NextResponse.json(
        { message: 'Not Found - No job postings found on this page' },
        { status: 404 }
      );
    }

    // Return success response with the paginated job postings
    return NextResponse.json({ jobPostings }, { status: 200 });
  } catch (error) {
    // Handle errors
    return handleError(error);
  }
}
