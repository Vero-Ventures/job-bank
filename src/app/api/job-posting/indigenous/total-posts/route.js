import { NextResponse } from 'next/server';
import { getTotalNumberOfPostings, handleError } from '../../siteRequestUtils';

export async function GET() {
  try {
    const siteCriteria = { site1: true };

    let jobPostings = await getTotalNumberOfPostings(siteCriteria);

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
