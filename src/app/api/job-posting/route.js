import { NextResponse, NextRequest } from 'next/server';
import { connectMongoDB } from '@/libs/mongodb';
import posting from '@/app/api/posting';
import mongoose from 'mongoose';

export async function GET(req) {
    try {
        const email = req.nextUrl.searchParams.get('email');

        if (!email) {
            return NextResponse.json({ message: 'Bad Request - Email parameter is required' }, { status: 400 });
        }

        await connectMongoDB();

        const Posting = mongoose.models.posting || mongoose.model('posting', posting);

        const jobPostings = await Posting.find({ email });

        await mongoose.connection.close();

        // Check if job postings were found
        if (jobPostings.length === 0) {
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

export async function POST(req) {
    try {
        const jobPosting = await req.json();

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

export async function DELETE(req) {
    try {
        const jobPostingId = req.nextUrl.searchParams.get('job-posting-id');

        if (!jobPostingId) {
            return NextResponse.json({ message: 'Bad Request - Job posting ID is required' }, { status: 400 });
        }

        await connectMongoDB();

        const Posting = mongoose.models.posting || mongoose.model('posting', posting);

        const deletePosting = await Posting.findOneAndDelete({ _id: jobPostingId });

        if (!deletePosting) {
            return NextResponse.json({ message: 'Not Found - Job posting with the specified ID does not exist' }, { status: 404 });
        }

        await mongoose.connection.close();

        return NextResponse.json({ message: 'Job postings deleted successfully' }, { status: 200 });

    } catch (error) {
        console.log('Error deleting job postings', error);

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