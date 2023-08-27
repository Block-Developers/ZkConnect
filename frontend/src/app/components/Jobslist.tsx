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
      className=" rounded-xl  text-white bg-[#202020] dark:bg-dark-700 p-6  border border-white hover:border-yellow-400 hover:dark:border-dark-100 my-8"
    >
      <div className="flex gap-7 justify-between items-center flex-col md:flex-row w-full py-2 px-5">
        <div className="flex gap-6 items-center w-full">
          <div className="w-full">
            <div className="flex flex-col gap-2">
              <div className="text-xl text-white font-bold line-clamp-1">
                {title}
              </div>
              <div className="text-light-300 text-md font-medium line-clamp-1">
                {company} • {location}
              </div>
              <div className="flex flex-row  gap-4 overflow-x-auto w-full md:w-full">
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
              <div className="rounded-lg  dark:border-dark-100 flex items-center justify-center h-32 w-32">
                {logo ? (
                  <Image
                    src={`data:image/png;base64,${logo}`}
                    alt="Job Logo"
                    width={100}
                    height={100}
                  />
                ) : (
                  <p>No Logo Available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
