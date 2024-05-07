import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/libs/mongodb';
import posting from '@/app/api/posting';
import mongoose from 'mongoose';

export async function GET(req) {
    try {
        const pageSize = 25;
        const pageNum = parseInt(req.nextUrl.searchParams.get('page_num'));
        const skip = (pageNum - 1) * pageSize;

        if (isNaN(pageNum) || pageNum < 1) {
            return NextResponse.json({ message: 'Bad Request - Invalid page number' }, { status: 400 });
        }

        await connectMongoDB();

        const Posting = mongoose.models.posting || mongoose.model('posting', posting);

        // Query job postings with pagination
        const jobPostings = await Posting.find({ site4: true }).skip(skip).limit(pageSize);

        await mongoose.connection.close();

        if (jobPostings.length === 0) {
            return NextResponse.json({ message: 'Not Found - No job postings found on this page' }, { status: 404 });
        }

        return NextResponse.json({ jobPostings }, { status: 200 });

    } catch (error) {

        console.log('Error fetching job postings:', error);

        await mongoose.connection.close();

        // Check error status and return appropriate response
        if (error instanceof SyntaxError || error instanceof TypeError) {
            // Malformed or invalid request
            return NextResponse.json({ message: 'Bad Request - The request is malformed or invalid' }, { status: 400 });

        } else {
            // Other server error
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }
    }
}
