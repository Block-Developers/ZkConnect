import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-[#0F0F0F] opacity-4">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 text-black">
              image
            </Link>
            <div className="ml-4">
              <h1 className="text-base font-medium text-black">URBANA</h1>
            </div>
            <div className="ml-2">
              <h1 className="text-sm text-black"> Harmony. Community. Home</h1>
            </div>
          </div>
          <div className="flex">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-700 hover:text-white"
            >
              About
            </Link>
            <Link
              href="/features"
              className="px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Features
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
