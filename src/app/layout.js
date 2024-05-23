// import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'JobPanel Home',
  description:
    'Portal for employers to post job listings and find the perfect candidate for their business.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body>{children}</body>
      </UserProvider>
    </html>
  );
}
