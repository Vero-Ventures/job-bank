import { libre_franklin, cormorant_garamond } from '@/components/fontstyle';
import Top2 from '@/components/jobsite2/Top2';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'New Comers Job Site',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={libre_franklin.variable + ' ' + cormorant_garamond.variable}>
        <Top2 />
        {children}
        <Footer />
      </body>
    </html>
  );
}
