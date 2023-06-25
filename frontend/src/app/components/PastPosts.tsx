import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import PastPost from "../PastPost/page";

export default function PastPost({
  id,
  title,
  company,
  location,
  city,
  duration,
  stipend,
  logo,
  applicants,
}) {
  return (
    <div
      key={id}
      className=" rounded-xl  text-white bg-[#202020] dark:bg-dark-700 md:p-6 p-2 cursor-pointer border border-white hover:border-yellow-400 hover:dark:border-dark-100 my-8"
    >
      <div className="flex gap-7 justify-between items-center  md:flex-row w-full py-2 md:px-5 px-2">
        <div className="flex gap-6 items-center w-full">
          <div className="md:w-full w-fit">
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
                <p className="text-[#09f] text-[16px] font-agrandir leading-6 font-bold">
                  {applicants} Applications
                </p>
              </div>
              <div>
                <button className="text-white bg-[#7D088F] rounded-[20px] md:px-4 md:py-4 px-2 py-1 text-[15px] md:text-[20px] leading-6 font-agrandir">
                  End Recruting
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-fit flex justify-between items-center md:justify-end md:flex-col md:items-end text-white gap-2">
          <div className="whitespace-nowrap text-md text-dark-300 dark:text-light-300">
            <div className="w-fit">
              <div className="rounded-lg  dark:border-dark-100 flex items-center justify-center h-32 w-32 ">
                <Image
                  src={logo}
                  alt="Job Logo"
                  className="rounded-lg"
                  width={100}
                  height={100}
                  style={{ width: "90%", height: "90%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
