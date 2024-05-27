import { NextResponse } from 'next/server';
import { JOBSITE_INFO } from './libs/jobsiteConstants';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};

export default async function middleware(req) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. job-bank-youth.vercel.app, job-bank-youth.localhost:3000)
  let hostname = req.headers.get('host');
  // .replace('.localhost:3000', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
  const domainParts = hostname.split('.');
  const subdomain = domainParts[0];

  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /pricing, /jobposting)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`;

  if (Object.keys(JOBSITE_INFO).includes(subdomain)) {
    return NextResponse.rewrite(
      new URL(`/jobsite/${subdomain}${path === '/' ? '' : path}`, req.url)
    );
  }

  // Other rewrites or logic can be added here
  return NextResponse.next(); // Continue to next middleware or to the requested route if no rewrites
}
