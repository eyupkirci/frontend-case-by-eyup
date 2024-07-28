'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <nav className="border-gray-200 bg-gray-400 bg-custom-gradient">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href="/">
          <Image
            width={253}
            height={39}
            className="w-auto p-4"
            alt="2digits Logo"
            src="https://2digits.nl/wp-content/uploads/2022/02/logo-tagline.svg"
          />
        </Link>

        <button
          onClick={handleToggle}
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg p-2 text-sm text-white hover:bg-blue-900 focus:outline-none md:hidden"
          aria-controls="navbar-default"
          aria-expanded={isOpen}>
          <span className="sr-only">Open main menu</span>

          <svg
            className="size-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className={`w-full md:block md:w-auto ${isOpen ? '' : 'hidden'}`} id="navbar-default">
          <ul className="mt-2 flex flex-col gap-6 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse">
            <li>
              <Link
                href="/"
                className="text-white hover:bg-transparent hover:text-blue-700"
                aria-current="page">
                Home
              </Link>
            </li>

            <li>
              <Link href="/blogs" className="text-white hover:bg-transparent hover:text-blue-700">
                Blogs
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
