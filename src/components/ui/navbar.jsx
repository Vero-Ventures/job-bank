import React from 'react';
import Link from 'next/link';

function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link href="#" passHref>
        <a className="flex items-center justify-center">
          <BriefcaseIcon className="h-6 w-6" />
          <span className="sr-only">Job Posting Site</span>
        </a>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <NavLink href="#">Pricing</NavLink>
        <NavLink href="#">About</NavLink>
        <NavLink href="#">Contact</NavLink>
      </nav>
    </header>
  );
}

function NavLink({ href, children }) {
  return (
    <Link href={href} passHref>
      <a className="text-sm font-medium hover:underline underline-offset-4">
        {children}
      </a>
    </Link>
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
