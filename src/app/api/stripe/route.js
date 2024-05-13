import { NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const baseURL = req.headers.get('referer');

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: process.env.STRIPE_JOB_POSTING_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseURL}/?paymentStatus=true`,
      cancel_url: `${baseURL}/?paymentStatus=false`,
    });

    return NextResponse.json(
      { url: session.url },
      {
        status: 303,
        headers: {
          Location: session.url,
        },
      }
    );
  } catch (err) {
    return NextResponse.json(err.message, { status: err.statusCode || 500 });
  }
}