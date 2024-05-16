import sgMail from '@sendgrid/mail';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { to, subject, text, html } = await req.json();

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to,
      from: 'videre_financiers_13@outlook.com',
      subject,
      text,
      html,
    };

    await sgMail.send(msg);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
