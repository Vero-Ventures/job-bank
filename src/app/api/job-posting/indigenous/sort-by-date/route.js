import { NextResponse } from 'next/server';
import {
  getPaginationParams,
  fetchSortedJobPostingsByDate,
  handleError,
} from '../../siteRequestUtils';

export async function GET(req) {
  try {
    //Todo: Update the site1 name to indigenous
    const siteCriteria = { site1: true };

    // Extract pagination parameters
    const { skip, pageSize } = getPaginationParams(req);

    // Query sorted job postings by posting date with pagination
    const jobPostings = await fetchSortedJobPostingsByDate(
      siteCriteria,
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
