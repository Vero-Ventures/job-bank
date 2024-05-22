/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LtRZRMgmaMl
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';

import Link from 'next/link';
import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { redirect } from 'next/navigation';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

export default function Component() {
  const { user, error } = useUser();

  // Displaying a loading page is kind of unnecessary but if you want to do it, you can uncomment the code below and add "isLoading" to the const above.
  // if (isLoading) return (
  //   <div class="flex justify-center items-center h-screen">
  //     <div class="flex flex-col items-center">
  //       <h1 className="lg:leading-tighter text-3xl tracking-tighter sm:text-4xl md:text-5xl xl:text-[2rem] 2xl:text-[2rem]">Loading...</h1>
  //     </div>
  //   </div>
  // );
  if (error) return <div>{error.message}</div>;

  if (user) {
    redirect('/admin-panel/home');
  }

  const links = [
    { text: 'Pricing', url: '/pricing' },
    { text: 'About', url: '/wip' },
    { text: 'Login / Signup', url: '/api/auth/login' },
  ];

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar links={links} />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Find the perfect candidate for your business
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl mt-5">
                  Our job posting platform makes it easy to find and hire the
                  best talent for your team.
                </p>
                <div className="space-x-4 mt-6">
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                    href="/api/auth/login">
                    Login / Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center items-center bg-gray-100">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Streamline your hiring process
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers a suite of tools to help you find, manage,
                  and hire the best candidates for your team.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-2">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Easy Job Posting</h3>
                <p className="text-sm text-gray-500">
                  Create and publish job listings in minutes.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Flexibility</h3>
                <p className="text-sm text-gray-500">
                  Customize your job postings to attract the right candidates.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Simple Pricing</h3>
                <p className="text-sm text-gray-500">
                  No hassle. No hidden fees. Pay only for what you use.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Cross Posting</h3>
                <p className="text-sm text-gray-500">
                  Advertise your opportunity across multiple job boards.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
