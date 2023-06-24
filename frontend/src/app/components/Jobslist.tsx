import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BiSearchAlt2 } from "react-icons/bi";

function Jobslist() {
  return (
    <div>
      <div className="block rounded-xl text-white bg-[#202020] dark:bg-dark-700 p-6 cursor-pointer border border-transparent hover:border-light-400 hover:dark:border-dark-100 w-full">
        <div className="flex gap-6 justify-between items-center flex-col md:flex-row w-full">
          <div className="flex gap-6 items-center w-full">
            <div className="w-full">
              <div className="flex flex-col gap-2">
                <div className="text-xl text-white font-bold line-clamp-1">
                  FrontEnd Developer
                </div>
                <div className="text-light-300 text-lg font-medium line-clamp-1">
                  Questbook • On-site
                </div>
                <div className="flex flex-row gap-4 overflow-x-auto w-job-card md:w-full">
                  <BiSearchAlt2 className="mt-1" />
                  Chennai
                </div>
                <div className="flex flex-row space-x-4">
                  <div>
                    <p className="text-[#7A7A7A]">Duration</p>
                    <p className="text-sm">2 Months</p>
                  </div>
                  <div>
                    <p className="text-[#7A7A7A]">Stipend</p>
                    <p className="text-sm">2,000 /month</p>
                  </div>
                </div>
                <div>
                  <Link className="text-[#09F]" href="jobs">
                    View More -&gt;
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-fit flex justify-between items-center md:justify-end md:flex-col md:items-end text-white gap-2">
            <div className="whitespace-nowrap text-md text-dark-300 dark:text-light-300  ">
              <div className="w-fit">
                <div className="rounded-lg border border-light-400 dark:border-dark-100 flex items-center justify-center h-32 w-32">
                  <Image
                    src=""
                    height={250}
                    width={250}
                    alt="Job Logo"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobslist;
