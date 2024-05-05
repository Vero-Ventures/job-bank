import { NextResponse, NextRequest } from 'next/server';
import { connectMongoDB } from '@/libs/mongodb';
import posting from '@/app/api/posting';
import mongoose from 'mongoose';

export async function GET(req) {
    try {
        // Extract email parameter from the request query
        const email = req.nextUrl.searchParams.get('email');
        console.log(email)

        // Check if email parameter is provided
        if (!email) {
            return NextResponse.json({ message: 'Bad Request - Email parameter is required' }, { status: 400 });
        }

        await connectMongoDB();

        const Posting = mongoose.models.posting || mongoose.model('posting', posting);

        // Query the database to find job postings associated with the provided email
        const jobPostings = await Posting.find({ email });

        await mongoose.connection.close();

        // Check if job postings were found
        if (jobPostings.length === 0) {
            // No job postings were found associated with the provided email
            return NextResponse.json({ message: 'Not Found - No job postings were found associated with the provided email' }, { status: 404 });
        }

        return NextResponse.json({ jobPostings }, { status: 200 });

    } catch (error) {

        console.error('Error fetching job postings by email:', error);

        await mongoose.connection.close();

        // Check error status and return appropriate response
        if (error instanceof SyntaxError || error instanceof TypeError) {
            // Malformed or invalid request
            return NextResponse.json({ message: 'Bad Request - The request is malformed or invalid' }, { status: 400 });

        } else if (error.name === 'UnauthorizedError') {
            // Unauthorized
            return NextResponse.json({ message: 'Unauthorized - The client is not authorized to perform the operation' }, { status: 401 });

        } else if (error.name === 'NotFoundError') {
            // Not Found
            return NextResponse.json({ message: 'Not Found - The specified job ID does not exist' }, { status: 404 });

        } else {
            // Other server error
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }
    }
}

export async function POST(request) {
    try {
        const jobPosting = await request.json();

        await connectMongoDB();

        const Posting = mongoose.models.posting || mongoose.model('posting', posting);

        // Create an array to store the newly created job postings
        const createdJobPostings = [];

        // Iterate over each job posting object in the array and create it
        for (const jobPostingData of jobPosting) {
            const newJobPosting = await Posting.create(jobPostingData);
            createdJobPostings.push(newJobPosting);
        }

        await mongoose.connection.close();

        return NextResponse.json({ message: 'Job postings created successfully' }, { status: 200 });

    } catch (error) {
        console.log('Error creating job postings', error);

        await mongoose.connection.close();

        // Check error status and return appropriate response
        if (error instanceof SyntaxError || error instanceof TypeError) {
            // Malformed or invalid request
            return NextResponse.json({ message: 'Bad Request - The request is malformed or invalid' }, { status: 400 });

        } else if (error.name === 'UnauthorizedError') {
            // Unauthorized
            return NextResponse.json({ message: 'Unauthorized - The client is not authorized to perform the operation' }, { status: 401 });

        } else if (error.name === 'NotFoundError') {
            // Not Found
            return NextResponse.json({ message: 'Not Found - The specified job ID does not exist' }, { status: 404 });

        } else {
            // Other server error
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }
    }
}