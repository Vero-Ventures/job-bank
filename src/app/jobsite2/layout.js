import Top from '@/components/jobsite/Top';
import Footer from '@/components/jobsite/Footer';
import { JOBSITE2 } from '@/libs/jobsiteConstants';

export const metadata = {
  title: 'New Comers Job Site',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Top jobsiteName={'NewComers'} colourTheme={JOBSITE2.colours} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
