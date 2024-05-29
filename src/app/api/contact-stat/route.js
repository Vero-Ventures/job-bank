import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/libs/mongodb';
import contactStat from '@/app/api/contactStat';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectMongoDB();

    const ContactStat =
      mongoose.models['contact-stats'] ||
      mongoose.model('contact-stats', contactStat);

    const contactStats = await ContactStat.find().sort({ _id: -1 });

    return NextResponse.json({ contactStats }, { status: 200 });
  } catch (error) {
    console.error('Error fetching contact stats:', error);
    return NextResponse.json(
      { message: 'Failed to fetch contact stats' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const emailAddresses = await req.json();

    if (!Array.isArray(emailAddresses)) {
      return NextResponse.json(
        { message: 'Bad Request - Email addresses must be an array' },
        { status: 400 }
      );
    }

    let newEmailAddresses = [];

    //if emailAddresses is not empty, add non duplicate email addresses to the contactStat collection
    if (emailAddresses.length > 0) {
      await connectMongoDB();
      const ContactStat =
        mongoose.models['contact-stats'] ||
        mongoose.model('contact-stats', contactStat);

      // Get all email addresses from the contactStat collection
      const existingEmailAddresses = await ContactStat.find({}, { email: 1 });

      // Filter out email addresses that are not already in the contactStat collection
      newEmailAddresses = emailAddresses.filter(
        ({ email }) =>
          !existingEmailAddresses.some(
            existingEmail => existingEmail.email === email
          )
      );

      // Insert email addresses into the contactStat collection
      await ContactStat.insertMany(newEmailAddresses);
    }

    //return total number of email addresses added and status code 200
    return NextResponse.json(
      {
        message: `Added ${newEmailAddresses.length} new email addresses`,
        emailsAdded: newEmailAddresses.length,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error inserting contact stats:', error);
    return NextResponse.json(
      { message: 'Failed to insert contact stats' },
      { status: 500 }
    );
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

    const ContactStat =
      mongoose.models['contact-stats'] ||
      mongoose.model('contact-stats', contactStat);

    const updatedContactStat = await ContactStat.updateOne(
      { email },
      { $set: { sent: sent !== undefined ? sent : true } }
    );

    if (updatedContactStat.nModified === 0) {
      return NextResponse.json(
        { message: 'No contact stats were updated' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Contact stats updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating contact stats:', error);
    return NextResponse.json(
      { message: 'Failed to update contact stats' },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Bad Request - Email parameter is required' },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const ContactStat =
      mongoose.models['contact-stats'] ||
      mongoose.model('contact-stats', contactStat);

    const deletedContactStat = await ContactStat.deleteOne({ email });

    if (deletedContactStat.deletedCount === 0) {
      return NextResponse.json(
        { message: 'No contact stats were deleted' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Contact stats deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting contact stats:', error);
    return NextResponse.json(
      { message: 'Failed to delete contact stats' },
      { status: 500 }
    );
  }
}
