import Top from '@/components/Top';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Indigenous Job Site',
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
