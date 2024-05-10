/**
 * v0 by Vercel.
 * @see https://v0.dev/t/G7GnkkOhIjv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from 'next/link';

export default function Top() {
  return (
    <header className="flex h-16 items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        <Link className="flex items-center" href="/">
          <img
            alt="Logo"
            className="h-12 w-12"
            height={32}
            src="/placeholder-circle.png"
            style={{
              aspectRatio: '32/32',
              objectFit: 'cover',
              marginRight: '20px',
            }}
            width={32}
          />
          <span className="text-lg font-bold">JOB SITE#1</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link
          className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="#">
          Log in
        </Link>
        <Link
          className="inline-flex h-9 items-center justify-center rounded-md border border-black px-4 py-2 text-sm font-medium text-black shadow transition-colors hover:bg-gray-900 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="#">
          Sign Up
        </Link>
      </div>
    </header>
  );
}
