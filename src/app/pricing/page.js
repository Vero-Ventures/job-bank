/**
 * v0 by Vercel.
 * @see https://v0.dev/t/XhNYwJIUqC2
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';

import Link from 'next/link';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

export default function Component() {
  const links = [
    { text: 'Home', url: '/' },
    { text: 'About', url: '/about' },
    { text: 'Login / Signup', url: '/api/auth/login' },
  ];

  return (
    <section className="w-full h-dvh">
      <Navbar links={links} />
      <div className="flex items-center justify-center h-5/6">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-md space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple Pricing
              </h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                No hassle. No hidden fees.
              </p>
            </div>
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">6 months</h3>
                  <p className="text-gray-500">
                    Advertise your opportunity across multiple sites
                  </p>
                </div>
                <div className="flex items-baseline justify-center space-x-2">
                  <span className="text-4xl font-bold">$10</span>
                  <span className="text-gray-500">/position</span>
                </div>
                <Link
                  href="/payment"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-gray-50 hover:bg-gray-900/90 h-10 px-4 py-2 w-full">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
