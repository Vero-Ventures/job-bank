import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/libs/mongodb';
import posting from '@/app/api/posting';
import mongoose from 'mongoose';
import {
  getEmailAddressesWithSentField,
  handleError,
} from '@/app/api/job-posting/siteRequestUtils';

export async function GET(req) {
  try {
    let emailAddresses = await getEmailAddressesWithSentField(
      req.nextUrl.searchParams
    );

    return NextResponse.json({ emailAddresses }, { status: 200 });
  } catch (error) {
    // Handle errors
    return handleError(error);
  }
}

export async function PATCH(req) {
  try {
    const { email, sent } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Bad Request - Email parameter is required' },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const Posting =
      mongoose.models.posting || mongoose.model('posting', posting);

    // Update documents that match the email criteria
    const updatedJobPostings = await Posting.updateMany(
      { email },
      { $set: { sent: sent !== undefined ? sent : true } } // Update "sent" to specified value or default to true
    );

    // Check if any documents were updated
    if (updatedJobPostings.nModified === 0) {
      return NextResponse.json(
        { message: 'No job postings were updated' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Job postings updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error updating job postings:', error);

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
        {
          message:
            'Not Found - No job postings were found for the provided email',
        },
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
