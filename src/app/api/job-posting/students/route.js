import { NextResponse } from 'next/server';
import {
  getPaginationParams,
  fetchJobPostings,
  handleError,
} from '../siteRequestUtils';

export async function GET(req) {
  try {
    //Todo: Update the site4 name to students
    const siteCriteria = { site4: true };

    // Extract pagination parameters
    const { skip, pageSize } = getPaginationParams(req);

    // Query job postings with pagination
    const jobPostings = await fetchJobPostings(siteCriteria, skip, pageSize);

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
