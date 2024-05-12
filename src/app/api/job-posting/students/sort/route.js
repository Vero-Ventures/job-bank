import { NextResponse } from 'next/server';
import {
  getPaginationParams,
  fetchSortedJobPostings,
  checkSortFieldExist,
  handleError,
} from '../../siteRequestUtils';

export async function GET(req) {
  try {
    //Todo: Update the site4 name to students
    const siteCriteria = { site4: true };
    const sortCriteria = JSON.parse(req.nextUrl.searchParams.get('sort_by'));

    // Check if the requested sort field exists
    if (!(await checkSortFieldExist(sortCriteria))) {
      console.log('no field');
      return NextResponse.json(
        { message: 'Not Found - Requested sort field does not exist' },
        { status: 404 }
      );
    }

    // Extract pagination parameters
    const { skip, pageSize } = getPaginationParams(req);

    // Query sorted job postings by posting date with pagination
    const jobPostings = await fetchSortedJobPostings(
      siteCriteria,
      sortCriteria,
      skip,
      pageSize
    );

    if (jobPostings.length < 1) {
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
