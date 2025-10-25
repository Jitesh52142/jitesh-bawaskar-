import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Jitesh Bawaskar - AI & Automation Engineer",
  description: "Portfolio of Jitesh Bawaskar - AI & Automation Engineer specializing in Full Stack AI Solutions, Machine Learning, and Intelligent Automation",
  keywords: ["AI Engineer", "Automation", "Machine Learning", "Full Stack Developer", "Python", "Flask", "Next.js"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark-theme">
      <body className={`${inter.className} text-warm-white-500 min-h-screen bg-black-500`}>
        {children}
      </body>
    </html>
  );
}

