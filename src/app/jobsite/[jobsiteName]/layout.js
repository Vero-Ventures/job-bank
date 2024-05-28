import Top from '@/components/jobsite/Top';
import Footer from '@/components/jobsite/Footer';

export const metadata = {
  title: 'Job Site',
};

export default function RootLayout({ params, children }) {
  return (
    <html lang="en">
      <body>
        <Top name={params} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
