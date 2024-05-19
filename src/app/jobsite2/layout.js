import Top2 from '@/components/jobsite2/Top2';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'New Comers Job Site',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Top2 />
        {children}
        <Footer />
      </body>
    </html>
  );
}
