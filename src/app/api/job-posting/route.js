import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/libs/mongodb';
import posting from '@/app/api/posting';
import mongoose from 'mongoose';

export async function GET(req, res) {
    return NextResponse.json({ message: 'Hello World!' });
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