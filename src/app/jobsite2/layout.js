import Top2 from '@/components/jobsite2/Top2';
import Footer from '@/components/Footer';
import { JOBSITE2 } from '@/libs/jobsiteConstants';

export const metadata = {
  title: 'New Comers Job Site',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Top2 jobsiteName={'NewComers'} colourTheme={JOBSITE2.colours} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
