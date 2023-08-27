"use client";
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // Corrected the import path
import Image from "next/image";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import Logo from "../Images/logo.png";
import { getLocalStorageWithExpiry } from "../components/store";
import { handleLogout } from "../components/store"; // Import the handleLogout function
import { useRouter } from "next/navigation";

const DashNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userdata, setUserdata] = useState<{ username?: string } | null>(null);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [nav2, setNav2] = useState("");
  const [href3, setHref3] = useState("");
  const [nav3, setNav3] = useState("");
  const [job, setJobs] = useState("");
  const [showDropdown, setShowDropdown] = useState(false); // State to manage the dropdown
  const router = useRouter(); // Initialize the router
  useEffect(() => {
    const retrievedValue = getLocalStorageWithExpiry("userId");
    setUserdata(retrievedValue?.user);
    setToken(retrievedValue?.token);
    if (retrievedValue?.user?.role == "user") {
      setUser("/UserDashboard");
      setJobs("/jobs");
      setNav2("Jobs");
      setNav3("My Applications");
      setHref3("/MyApplications");
    } else if (retrievedValue?.user?.role == "company") {
      setUser("/CompanyDashboard");
      setJobs("/CompanyPost");
      setNav2("Create Post");
      setNav3("Past Post");
      setHref3("/Pastpost");
    } else {
      setUser("/");
      setJobs("/jobs");
      setNav2("Jobs");
      setNav3("How it works");
      setHref3("#works");
    }
  }, []);
  const logout = () => {
    handleLogout("userId"); // Remove the userId from localStorage
    setUserdata(null); // Update the component state

    setShowDropdown(false); // Close the dropdown
    router.push("/Login");
  };

  const username = userdata?.username;

  const navigation = [
    { name: "Home", href: user },
    { name: nav2, href: job },
    { name: nav3, href: href3 },
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
          <div className="hidden lg:flex lg:space-x-10 lg:flex-1 lg:justify-end">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <div className="text-lg font-semibold leading-6 pt-4 text-gray-100 flex">
                  {item.name}
                </div>
              </Link>
            ))}
            <div>
              {token ? (
                <>
                  <div className="relative  border  rounded-xl	hover:bg-[#640074] border-white pb-3 px-2 text-left">
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
                </>
              ) : (
                <>
                  <div className="py-6">
                    <Link
                      href="/Login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-800"
                    >
                      <button className="border  rounded-xl	 border-white p-3 ">
                        LOGIN/SIGN IN
                      </button>
                    </Link>
                  </div>
                </>
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
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 bg-black z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <div className="flex">
                  <Image className="h-16 w-auto" src={Logo} alt="" />
                  <p className="text-white text-xl font-bold p-4">ZKConnect</p>
                </div>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon
                  className="h-12 w-17 border rounded-xl p-2 border-white"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="mt-7 flow-root">
              <div className="-my-6 divide-y gray-100/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-800"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    href="/Login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-800"
                  >
                    <button className="border  rounded-xl	 border-white p-3 ">
                      LOGIN/SIGN IN
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
};

export default DashNav;
