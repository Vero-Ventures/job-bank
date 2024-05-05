import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/libs/mongodb';
import posting from '@/app/api/posting';
import mongoose from 'mongoose';

export async function GET() {
    try {
        await connectMongoDB();

        const Posting = mongoose.models.posting || mongoose.model('posting', posting);

        const jobPostings = await Posting.find({ site4: true });

        await mongoose.connection.close();

        return NextResponse.json({ jobPostings }, { status: 200 });

    } catch (error) {

        console.log('Error fetching job postings by email:', error);

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
