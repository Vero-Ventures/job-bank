'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { Suspense } from 'react';
import Link from 'next/link';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function Cart() {
  const [user, setUser] = useState(null);
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);

  const links = [
    { text: 'Home', url: '/' },
    { text: 'About', url: '/wip' },
    { text: 'Logout', url: '/api/auth/logout' },
  ];

  const JOB_POSTING_API_URL = process.env.NEXT_PUBLIC_JOB_POSTING_API_URL;

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        console.error('Failed to fetch user:', response.statusText);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      //redirect to login page
      window.location.href = '/';
    }
  }, []);

  // Function to fetch job postings from the API
  const fetchJobPostings = useCallback(async () => {
    try {
      setLoading(true);
      const sortCriteria = JSON.stringify({ _id: -1 });
      const apiURL = `${JOB_POSTING_API_URL}?email=${user.email}&sort=${sortCriteria}`;
      const response = await fetch(apiURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const res = await response.json();
        const unpaidPostings = res.jobPostings.filter(posting => !posting.paid);
        setJobPostings(unpaidPostings);

        if (paymentStatus === 'true') {
          const promises = unpaidPostings.map(async posting => {
            const validThrough = new Date();
            validThrough.setMonth(validThrough.getMonth() + 6);

            const patchData = {
              paid: true,
              validThrough: validThrough.toISOString(),
            };

            const patchResponse = await fetch(
              `/api/job-posting?job-posting-id=${posting._id}`,
              {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(patchData),
              }
            );

            if (patchResponse.ok) {
              console.log(`Job posting ${posting._id} updated successfully`);
            } else {
              console.error(
                `Failed to update job posting ${posting._id}:`,
                patchResponse.statusText
              );
            }
          });
          await Promise.all(promises);
        }
      } else {
        console.error('Failed to fetch job postings:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching job postings:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUser();
  }, []); // Fetch job postings when the component mounts

  useEffect(() => {
    if (user) {
      fetchJobPostings();
    }
  }, [user]);

  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get('paymentStatus');

  function CircleCheckIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  if (paymentStatus && paymentStatus === 'true') {
    const links = [
      { text: 'Home', url: '/admin-panel/home' },
      { text: 'About', url: '/wip' },
      { text: 'Logout', url: '/api/auth/logout' },
    ];
    return (
      <div className="w-full h-full">
        <Navbar links={links} />
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
          <div className="max-w-md space-y-4 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <div className="flex flex-col items-center justify-center space-y-2">
              <CircleCheckIcon className="h-16 w-16 text-green-500" />
              <h2 className="text-2xl font-bold">Payment Successful</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Your payment was processed successfully.
              </p>
            </div>
            <Link
              className="inline-flex h-10 w-full items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="/admin-panel/home">
              Return to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // const increaseQuantity = () => {
  //   setQuantity(quantity + 1);
  // };

  // const decreaseQuantity = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1);
  //   }
  // };

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
                  {/* <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={decreaseQuantity}>
                    -
                  </button> */}
                  <div>{loading ? 'Loading...' : jobPostings.length}</div>
                  {/* <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={increaseQuantity}>
                    +
                  </button> */}
                </div>
              </div>
              <div className="text-right font-medium">$10</div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-500">Subtotal</div>
            <div className="font-medium">
              {loading ? 'Loading...' : `$${jobPostings.length * 10}`}
            </div>
          </div>
          <div className="flex justify-end mt-6">
            {/* <button className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors">
            Proceed to Checkout
          </button> */}
            <form action="/api/stripe" method="POST">
              <input type="hidden" name="amount" value={jobPostings.length} />
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

export default function PreviewPage() {
  return (
    <Suspense>
      <Cart />
    </Suspense>
  );
}
