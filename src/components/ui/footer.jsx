import React from 'react';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-gray-900 p-6 md:py-12 w-full text-gray-50">
      <div className="container max-w-7xl grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-8 text-sm">
        <div className="grid gap-1">
          <h3 className="font-semibold">Company</h3>
          <Link href="/wip">About Us</Link>
          <Link href="/wip">Our Team</Link>
          <Link href="/wip">Careers</Link>
          <Link href="/wip">News</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Job Sites</h3>
          <Link href="https://job-bank-indigenous.vercel.app" target="_blank">
            Indigenous People
          </Link>
          <Link href="https://job-bank-newcomers.vercel.app" target="_blank">
            Newcomers
          </Link>
          <Link href="https://job-bank-disabled.vercel.app" target="_blank">
            Persons with Disabilities
          </Link>
          <Link href="https://job-bank-youth.vercel.app" target="_blank">
            Vulnerable Youth
          </Link>
          <Link href="https://job-bank-asylum.vercel.app" target="_blank">
            Asylum-Refugees
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Legal</h3>
          <Link href="/wip">Privacy Policy</Link>
          <Link href="/wip">Terms of Service</Link>
          <Link href="/wip">Cookie Policy</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Contact</h3>
          <Link href="/wip">Support</Link>
          <Link href="/wip">Sales</Link>
          <Link href="/wip">Partnerships</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
