import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/libs/mongodb';
import posting from '@/app/api/posting';
import mongoose from 'mongoose';

// Function to extract pagination parameters
export function getPaginationParams(req) {
  const pageSize = 25;
  const pageNum = parseInt(req.nextUrl.searchParams.get('page_num'));
  const skip = isNaN(pageNum) || pageNum < 1 ? 0 : (pageNum - 1) * pageSize;
  return { skip, pageSize };
}

// Function to fetch job postings with pagination
export async function fetchJobPostings(siteCriteria, skip, pageSize) {
  // Connect to MongoDB
  await connectMongoDB();

  const Posting = mongoose.models.posting || mongoose.model('posting', posting);

  // Query job postings with pagination
  const jobPostings = await Posting.find(siteCriteria)
    .skip(skip)
    .limit(pageSize);

  return jobPostings;
}

// Function to handle errors
export function handleError(error) {
  console.error('Error fetching job postings:', error);

  // Check error status and return appropriate response
  if (error instanceof SyntaxError || error instanceof TypeError) {
    // Malformed or invalid request
    return NextResponse.json(
      { message: 'Bad Request - The request is malformed or invalid' },
      { status: 400 }
    );
  } else {
    // Other server error
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
