import { NextResponse } from 'next/server';
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
