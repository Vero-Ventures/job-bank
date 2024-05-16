import { libre_franklin, cormorant_garamond } from '@/components/fontstyle';
import Top from '@/components/Top';
import Footer from '@/components/Footer';

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
