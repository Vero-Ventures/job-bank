/**
 * v0 by Vercel.
 * @see https://v0.dev/t/fqAzrUdiAN9
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';

import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

export default function Component() {
  const links = [
    { text: 'Home', url: '/' },
    { text: 'Pricing', url: '/pricing' },
    { text: 'About', url: '/wip' },
    { text: 'Login / Signup', url: '/api/auth/login' },
  ];
  return (
    <div>
      <Navbar links={links} />
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-gray-100">
        <WrenchIcon className="h-12 w-12 text-gray-500" />
        <h1 className="text-2xl font-bold text-gray-800">
          Page Under Construction
        </h1>
        <p className="max-w-md text-center text-gray-500">
          This page is currently being worked on and will be available soon.
          Please check back later.
        </p>
      </div>
      <Footer />
    </div>
  );
}

function WrenchIcon(props) {
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
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}
