import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/libs/mongodb';
import posting from '@/app/api/posting';
import mongoose from 'mongoose';
import { checkFieldExist } from '@/app/api/job-posting/siteRequestUtils';

export async function GET(req) {
  try {
    const email = req.nextUrl.searchParams.get('email');
    const sortBy = req.nextUrl.searchParams.get('sort');
    const sortCriteria = sortBy ? JSON.parse(sortBy) : null;

    if (!email) {
      return NextResponse.json(
        { message: 'Bad Request - Email parameter is required' },
        { status: 400 }
      );
    }

    // Check if the requested sort field exists
    if (sortCriteria != null && !(await checkFieldExist(sortCriteria))) {
      console.log('no field');
      return NextResponse.json(
        { message: 'Not Found - Requested sort field does not exist' },
        { status: 404 }
      );
    }

    await connectMongoDB();

    const Posting =
      mongoose.models.posting || mongoose.model('posting', posting);

    const jobPostings = await Posting.find({ email }).sort(sortCriteria);

    // Check if job postings were found
    if (jobPostings.length === 0) {
      return NextResponse.json(
        {
          message:
            'Not Found - No job postings were found associated with the provided email',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ jobPostings }, { status: 200 });
  } catch (error) {
    console.log('Error fetching job postings by email:', error);

    // Check error status and return appropriate response
    if (error instanceof SyntaxError || error instanceof TypeError) {
      // Malformed or invalid request
      return NextResponse.json(
        { message: 'Bad Request - The request is malformed or invalid' },
        { status: 400 }
      );
    } else if (error.name === 'UnauthorizedError') {
      // Unauthorized
      return NextResponse.json(
        {
          message:
            'Unauthorized - The client is not authorized to perform the operation',
        },
        { status: 401 }
      );
    } else if (error.name === 'NotFoundError') {
      // Not Found
      return NextResponse.json(
        { message: 'Not Found - The specified job email does not exist' },
        { status: 404 }
      );
    } else {
      // Other server error
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }
}
