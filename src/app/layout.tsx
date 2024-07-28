import type { Metadata } from 'next';
import { Barlow } from 'next/font/google';

import './globals.css';

import { Footer } from '@/app/components/Footer';
import { Navbar } from '@/app/components/Navbar';

const barlow = Barlow({ subsets: ['latin'], weight: '500' });

export const metadata: Metadata = {
  title: 'Frontend case by Eyup',
  description: 'Homepage - Task Development',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={barlow.className}>
        {/* As a user, I want to be able to easily navigate through the website so that I can quickly find the right content.
          - Header with the 2DIGITS logo which leads to the homepage
          - Multiple links which leads to the corresponding pages */}
        <Navbar />

        {children}

        {/* As a user, I want to be able to find quicklinks at the bottom of the page so that I can access relevant information.
          - Multiple links which leads to the corresponding pages */}

        <Footer />
      </body>
    </html>
  );
}
