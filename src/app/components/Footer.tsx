'use client';

import Link from 'next/link';

export const Footer = () => {
  return (
    <nav className="flex flex-col gap-6 bg-custom-gradient p-12 text-sm md:flex-row">
      {/* As a user, I want to be able to find quicklinks at the bottom of the page so that I can access relevant information.
        - Multiple links which leads to the corresponding pages */}

      <Link href="/privacy" className="text-white hover:bg-transparent hover:text-blue-700">
        Privacy statement
      </Link>

      <Link href="/terms" className="text-white hover:bg-transparent hover:text-blue-700">
        Terms and conditions
      </Link>
    </nav>
  );
};
