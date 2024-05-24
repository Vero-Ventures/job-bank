import Top from '@/components/jobsite/Top';
import Footer from '@/components/jobsite/Footer';

export const metadata = {
  title: 'New Comers Job Site',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Top />
        {children}
        <Footer />
      </body>
    </html>
  );
}
