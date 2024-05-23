import { NextResponse } from 'next/server';
import {
  getTotalNumberOfPostings,
  parseFilterCriteria,
  handleError,
} from '../../siteRequestUtils';

export async function GET(req) {
  try {
    const siteCriteria = { site1: true };
    const etFilters = req.nextUrl.searchParams.getAll('et');
    const pFilters = req.nextUrl.searchParams.getAll('p');

    // Parse filter criteria
    const filterCriteria = await parseFilterCriteria(etFilters, pFilters);

    let jobPostings = await getTotalNumberOfPostings(
      siteCriteria,
      filterCriteria
    );

    // Check if job postings were found
    if (jobPostings < 1) {
      return new Response(null, {
        status: 204,
        statusText: 'No job postings were found',
      });
    }

    return NextResponse.json({ jobPostings }, { status: 200 });
  } catch (error) {
    // Handle errors
    return handleError(error);
  }
}
