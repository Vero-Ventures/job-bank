'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { redirect } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

export default function PreviewPage() {
  const { user, error } = useUser();
  const [quantity, setQuantity] = useState(1);
  const searchParams = useSearchParams();

  if (!user) {
    redirect('/admin-panel/home');
  }

  if (error) return <div>{error.message}</div>;

  const links = [
    { text: 'Home', url: '/' },
    { text: 'About', url: '/wip' },
    { text: 'Logout', url: '/api/auth/logout' },
  ];

  const paymentStatus = searchParams.get('paymentStatus');

  if (paymentStatus) {
    return (
      <>
        <h1>Payment Status</h1>
        <p>Payment was successful: {paymentStatus}</p>
      </>
    );
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <section className="flex flex-col min-h-screen">
      <Navbar links={links} />
      <div className="flex-grow container mx-auto py-8 px-4 md:px-6">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            <div className="text-gray-500">1 item</div>
          </div>
          <div className="border-b border-gray-200 pb-4 mb-4">
            <div className="grid grid-cols-5 gap-4 items-center">
              <div className="col-span-3 flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-md" />
                <div>
                  <h3 className="text-lg font-medium">Job Posting</h3>
                  <p className="text-gray-500">
                    6 Months, Cross-posting enabled
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2">
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={decreaseQuantity}>
                    -
                  </button>
                  <div>{quantity}</div>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={increaseQuantity}>
                    +
                  </button>
                </div>
              </div>
              <div className="text-right font-medium">$10</div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-500">Subtotal</div>
            <div className="font-medium">${quantity * 10}</div>
          </div>
          <div className="flex justify-end mt-6">
            {/* <button className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors">
            Proceed to Checkout
          </button> */}
            <form action="/api/stripe" method="POST">
              <section>
                <button type="submit" role="link">
                  Checkout
                </button>
              </section>
              <style jsx>
                {`
                  section {
                    background: #ffffff;
                    display: flex;
                    flex-direction: column;
                    width: 400px;
                    height: 112px;
                    border-radius: 6px;
                    justify-content: space-between;
                  }
                  button {
                    height: 36px;
                    background: #556cd6;
                    border-radius: 4px;
                    color: white;
                    border: 0;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
                  }
                  button:hover {
                    opacity: 0.8;
                  }
                `}
              </style>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
