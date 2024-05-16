import { Libre_Franklin } from 'next/font/google';

const libre_franklin = Libre_Franklin({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-libre_franklin',
});

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={libre_franklin.variable}>{children}</body>
    </html>
  );
}
