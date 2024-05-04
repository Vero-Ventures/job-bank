import { Libre_Franklin, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Top from "@/components/Top";
import Footer from "@/components/Footer";

const libre_franklin = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre_franklin",
});
const cormorant_garamond = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant_garamond",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Todo: Change metadata
export const metadata = {
  title: "Job Site #1",
  description: "Generate Job listings",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={libre_franklin.variable + " " + cormorant_garamond.variable}
      >
        <Top />
        {children}
        <Footer />
      </body>
    </html>
  );
}
