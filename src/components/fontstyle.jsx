import { Libre_Franklin, Cormorant_Garamond } from 'next/font/google';

export const libre_franklin = Libre_Franklin({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-libre_franklin',
});
export const cormorant_garamond = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant_garamond',
  weight: ['400', '500', '600'],
});
