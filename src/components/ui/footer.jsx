import React from 'react';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-gray-900 p-6 md:py-12 w-full text-gray-50">
      <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
        <div className="grid gap-1">
          <h3 className="font-semibold">Company</h3>
          <Link href="#">About Us</Link>
          <Link href="#">Our Team</Link>
          <Link href="#">Careers</Link>
          <Link href="#">News</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Job Sites</h3>
          <Link href="#">Indigenous Persons</Link>
          <Link href="#">Newcomers</Link>
          <Link href="#">Persons with Disabilities</Link>
          <Link href="#">Vulnerable Youth</Link>
          <Link href="#">Asylum-Refugees</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Legal</h3>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
          <Link href="#">Cookie Policy</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Contact</h3>
          <Link href="#">Support</Link>
          <Link href="#">Sales</Link>
          <Link href="#">Partnerships</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
