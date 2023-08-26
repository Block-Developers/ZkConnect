"use client";
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/outline"; // Corrected the import path
import Image from "next/image";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import Logo from "../Images/logo.png";
import { getLocalStorageWithExpiry } from "../components/store";
import { handleLogout } from "../components/store"; // Import the handleLogout function
import { useRouter } from "next/router"; // Import the useRouter from the correct path

const DashNav: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userdata, setUserdata] = useState<{ username?: string } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false); // State to manage the dropdown
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const retrievedValue = getLocalStorageWithExpiry("userId");
    setUserdata(retrievedValue?.user);
  }, []);

  const logout = () => {
    handleLogout("userId"); // Remove the userId from localStorage
    setUserdata(null); // Update the component state
    setShowDropdown(false); // Close the dropdown
    router.push("/Login");
  };

  const username = userdata?.username;

  const navigation = [
    { name: "Home", href: "#" },
    { name: "Jobs", href: "#about" },
    { name: "My Applications", href: "#works" },
  ];

  return (
    <div className="z-[23432423423]">
      <header className="absolute inset-x-0 top-0 z-50">
        {/* Header Content */}
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link href="#">
              <div className="flex">
                <Image src={Logo} alt="Logo" className="h-16 w-auto" />
                <p className="text-white text-2xl font-bold p-4">ZKConnect</p>
              </div>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-16 lg:flex-1 lg:justify-end">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <div className="text-lg font-semibold leading-6 pt-4 text-gray-100 flex">
                  {item.name}
                </div>
              </Link>
            ))}
            <div className="relative inline-block border  rounded-xl	hover:bg-[#640074] border-white pb-3 px-2 text-left">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-lg font-semibold leading-6 pt-4 text-gray-100 flex"
              >
                <FiUser className="h-6 w-6 mr-2" />
                {username}
              </button>
              {showDropdown && (
                <div className="origin-top-right absolute right-0  w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1 flex flex-col"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <Link href="/EditProfile">
                      <button
                        className="block px-5 py-2  text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Edit Profile
                      </button>
                    </Link>
                    <button
                      onClick={logout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          {/* ...dialog content */}
        </Dialog>
      </header>
    </div>
  );
};

export default DashNav;
