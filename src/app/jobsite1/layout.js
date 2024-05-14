import { Libre_Franklin, Cormorant_Garamond } from 'next/font/google';
import Top from '@/components/Top';
import Footer from '@/components/Footer';

const libre_franklin = Libre_Franklin({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-libre_franklin',
});
const cormorant_garamond = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant_garamond',
  weight: ['400', '500', '600'],
});

export const metadata = {
  title: 'Indigenous Job Site',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={libre_franklin.variable + ' ' + cormorant_garamond.variable}>
        <Top />
        {children}
        <Footer />
      </body>
    </html>
  );
}
