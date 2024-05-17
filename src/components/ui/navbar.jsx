import React from 'react';
import { Link } from 'react-router-dom'; // assuming you're using React Router for navigation

function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" to="/">
        <BriefcaseIcon className="h-6 w-6" />
        <span className="sr-only">Job Posting Site</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          to="/pricing">
          Pricing
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          to="/about">
          About
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          to="/contact">
          Contact
        </Link>
      </nav>
    </header>
  );
}

function BriefcaseIcon(props) {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

export default Navbar;
