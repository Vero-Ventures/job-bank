import { NextResponse } from 'next/server';
import { getTotalNumberOfPostings, handleError } from '../../siteRequestUtils';

export async function GET() {
  try {
    const siteCriteria = { site2: true };

    let jobPostings = await getTotalNumberOfPostings(siteCriteria);

    if (jobPostings < 1) {
      return NextResponse.json(
        { message: 'Not Found - No job postings found on this page' },
        { status: 404 }
      );
    }

    return NextResponse.json({ jobPostings }, { status: 200 });
  } catch (error) {
    // Handle errors
    return handleError(error);
  }
}
