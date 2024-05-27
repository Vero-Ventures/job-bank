import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/libs/mongodb';
import { isDynamicServerError } from 'next/dist/client/components/hooks-server-context';
import posting from '@/app/api/posting';
import mongoose from 'mongoose';

export async function GET(req) {
  try {
    const jobPostingId = req.nextUrl.searchParams.get('job-posting-id');

    if (!jobPostingId) {
      return NextResponse.json(
        { message: 'Bad Request - ID parameter is required' },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const Posting =
      mongoose.models.posting || mongoose.model('posting', posting);

    const jobPostings = await Posting.find({ _id: jobPostingId });

    // Check if job postings were found
    if (jobPostings.length < 1) {
      return new Response(null, {
        status: 204,
        statusText: 'No job postings were found',
      });
    }

    return NextResponse.json({ jobPostings }, { status: 200 });
  } catch (error) {
    // shouldn't catch nextjs errors
    if (isDynamicServerError(error)) {
      throw error;
    }

    console.log('Error fetching job postings by ID:', error);

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
    } else if (error.name === 'NotFoundError' || error.name === 'CastError') {
      // Not Found
      return NextResponse.json(
        { message: 'Not Found - The specified job ID does not exist' },
        { status: 404 }
      );
    } else {
      // Other server error
      return NextResponse.json(
        { message: 'Internal Server Error:' },
        { status: 500 }
      );
    }
  }
}
