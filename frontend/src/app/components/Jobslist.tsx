import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";

export default function Jobslist({
  id,
  title,
  company,
  location,
  city,
  duration,
  stipend,
  logo,
}) {
  return (
    <div
      key={id}
      className="block rounded-xl text-white bg-[#202020] dark:bg-dark-700 p-6 cursor-pointer border border-transparent hover:border-light-400 hover:dark:border-dark-100 w-[900px] mb-[70px]"
    >
      <div className="flex gap-7 justify-between items-center flex-col md:flex-row w-full  my-[50px]">
        <div className="flex gap-6 items-center w-full">
          <div className="w-full">
            <div className="flex flex-col gap-2">
              <div className="text-xl text-white font-bold line-clamp-1">
                {title}
              </div>
              <div className="text-light-300 text-lg font-medium line-clamp-1">
                {company} • {location}
              </div>
              <div className="flex flex-row gap-4 overflow-x-auto w-full md:w-full">
                <BiSearchAlt2 className="mt-1" />
                {city}
              </div>
              <div className="flex flex-row space-x-4">
                <div>
                  <p className="text-[#7A7A7A]">Duration</p>
                  <p className="text-sm">{duration}</p>
                </div>
                <div>
                  <p className="text-[#7A7A7A]">Stipend</p>
                  <p className="text-sm">{stipend}</p>
                </div>
              </div>
              <div>
                <Link className="text-[#09F]" href={`jobs/${id}`} passHref>
                  View More -&gt;
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-fit flex justify-between items-center md:justify-end md:flex-col md:items-end text-white gap-2">
          <div className="whitespace-nowrap text-md text-dark-300 dark:text-light-300">
            <div className="w-fit">
              <div className="rounded-lg border border-light-400 dark:border-dark-100 flex items-center justify-center h-32 w-32">
                <Image
                  src={logo}
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
  );
}
