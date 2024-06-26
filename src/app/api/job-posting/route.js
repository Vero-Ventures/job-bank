import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/libs/mongodb';
import posting from '@/app/api/posting';
import mongoose from 'mongoose';
import {
  getPaginationParams,
  fetchJobPostings,
  parseSortCriteria,
  parseFilterCriteria,
} from '@/app/api/job-posting/siteRequestUtils';
import crypto from 'crypto';

export async function GET(req) {
  try {
    const { skip, pageSize } = getPaginationParams(req);
    const email = req.nextUrl.searchParams.get('email');
    const sortBy = req.nextUrl.searchParams.get('sort');
    const etFilters = req.nextUrl.searchParams.getAll('et');
    const pFilters = req.nextUrl.searchParams.getAll('p');

    // Parse sort and filter criteria
    const sortCriteria = await parseSortCriteria(sortBy);
    const filterCriteria = await parseFilterCriteria(etFilters, pFilters);

    if (!email) {
      return NextResponse.json(
        { message: 'Bad Request - Email parameter is required' },
        { status: 400 }
      );
    }

    const siteCriteria = { email };

    // Query job postings with pagination and sort criteria if provided
    const jobPostings = await fetchJobPostings(
      siteCriteria,
      sortCriteria,
      filterCriteria,
      skip,
      pageSize
    );

    // Check if job postings were found
    if (jobPostings.length < 1) {
      return new Response(null, {
        status: 204,
        statusText:
          'No job postings were found associated with the provided email',
      });
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
        { message: 'Not Found - The specified job ID does not exist' },
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

export async function POST(req) {
  try {
    const jobPosting = await req.json();

    await connectMongoDB();

    const Posting =
      mongoose.models.posting || mongoose.model('posting', posting);

    // Create an array to store the newly created job postings
    const createdJobPostings = [];

    // Iterate over each job posting object in the array and create it
    for (const jobPostingData of jobPosting) {
      //if jobPostingData.jobPageId is null or not provided, assign a random crypto.randomBytes(16).toString("hex") string
      if (!jobPostingData.jobPageId) {
        jobPostingData.jobPageId = crypto.randomBytes(16).toString('hex');
      }
      const newJobPosting = await Posting.create(jobPostingData);
      createdJobPostings.push(newJobPosting);
    }

    // Extract the IDs of the created job postings
    const createdJobPostingIds = createdJobPostings.map(posting => posting._id);

    return NextResponse.json(
      {
        message: 'Job postings created successfully',
        createdJobPostingIds: createdJobPostingIds,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error creating job postings', error);

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
        { message: 'Not Found - The specified job ID does not exist' },
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

export async function DELETE(req) {
  try {
    const jobPostingId = req.nextUrl.searchParams.get('job-posting-id');

    if (!jobPostingId) {
      return NextResponse.json(
        { message: 'Bad Request - Job posting ID is required' },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const Posting =
      mongoose.models.posting || mongoose.model('posting', posting);

    const deletePosting = await Posting.findOneAndDelete({ _id: jobPostingId });

    if (!deletePosting) {
      return NextResponse.json(
        {
          message:
            'Not Found - Job posting with the specified ID does not exist',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Job postings deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error deleting job postings', error);

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
        { message: 'Not Found - The specified job ID does not exist' },
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

export async function PATCH(req) {
  try {
    const jobPostingId = req.nextUrl.searchParams.get('job-posting-id');

    if (!jobPostingId) {
      return NextResponse.json(
        { message: 'Bad Request - Job posting ID and field are required' },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const Posting =
      mongoose.models.posting || mongoose.model('posting', posting);

    const existingPosting = await Posting.findById(jobPostingId);

    if (!existingPosting) {
      return NextResponse.json(
        { message: 'Not Found - The specified job ID does not exist' },
        { status: 404 }
      );
    }

    const fieldsToUpdate = await req.json();

    if (!fieldsToUpdate || typeof fieldsToUpdate !== 'object') {
      return NextResponse.json(
        { message: 'Bad Request - Invalid fields to update' },
        { status: 400 }
      );
    }

    Object.assign(existingPosting, fieldsToUpdate);
    await existingPosting.save();

    return NextResponse.json(
      { message: 'Job posting updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error updating job posting:', error);

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
        { message: 'Not Found - The specified job ID does not exist' },
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
