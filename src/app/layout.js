import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata = {
  title: "IT Nesto | Premium Digital Technology Agency",
  description: "Building Powerful Digital Experiences That Grow Your Business. Premium digital agency specializing in Web, Mobile, and SEO.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${manrope.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-on-surface font-body-md overflow-x-hidden leading-relaxed min-h-[max(884px,100dvh)]">
        {children}
      </body>
    </html>
  );
}
