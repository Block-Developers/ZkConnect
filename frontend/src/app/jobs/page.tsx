"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import filter from "../../Assets/Vector.png";
import CustomFormComp from "../components/CustomFormComp";
import Jobslist from "../components/Jobslist";
import DashNav from "../components/DashNav";

export default function JobsForUsers() {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]); // Replace 'any' with your data type

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://zk-backend.vercel.app/jobPosts/all"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData.jobPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value, checked } = event.target;
    setCheckedValues((prevState) =>
      checked
        ? [...prevState, value]
        : prevState.filter((item) => item !== value)
    );
  };
  return (
    <div className="hero2">
      <div>
        <DashNav />
      </div>
      <div className="py-32">
        <div className="flex justify-center items-center  md:text-[40px] font-agrandir font-extrabold leading-6 text-white pt-[80px]">
          {" "}
          <span className="underline">Explore Jobs</span>{" "}
          <span className="no-underline">🚀</span>
        </div>
        <div className="flex px-20 justify-center space-x-8 mt-5">
          <div className="w-1/4 border border-white rounded-[15px] flex  px-6 pt-5 pb-2 h-[490px]  flex-col ">
            <div className="flex justify-center items-center p-6 gap-3">
              <Image src={filter} alt="filter" width="20" height="20" />
              <h2 className="text-[18px] leading-6 font-extrabold font-agrandir text-white">
                Filter
              </h2>
            </div>
            <CustomFormComp name="Profile" type="text" value="" onChange="" />
            <CustomFormComp
              name="Keyword Search"
              type="text"
              value=""
              onChange=""
            />
            <div className="flex flex-col gap-2 mt-4 " suppressHydrationWarning>
              <label className="text-white  text-[18px] font-agrandir leading-6">
                <input
                  type="checkbox"
                  value="part-time"
                  checked={checkedValues.includes("part-time")}
                  onChange={handleCheckboxChange}
                  className="h-[20px] w-[20px] rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 mr-5"
                />
                Part Time
              </label>
              <label className="text-white  text-[18px] font-agrandir leading-6">
                <input
                  type="checkbox"
                  value="full-time"
                  checked={checkedValues.includes("full-time")}
                  onChange={handleCheckboxChange}
                  className="h-[20px] w-[20px] rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 mr-5"
                />
                Full Time
              </label>

              <label className="text-white  text-[18px] font-agrandir leading-6">
                <input
                  type="checkbox"
                  value="internship"
                  checked={checkedValues.includes("internship")}
                  onChange={handleCheckboxChange}
                  className="h-[20px] w-[20px] rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 mr-5 "
                />
                Internship
              </label>

              <button className="bg-[#7C078E] border rounded-[10px] px-[20px] py-2.5 text-white text-[24px] leading-6 ">
                Filter
              </button>
            </div>
          </div>
          <div className="w-3/4 space-y-5">
            {data.map((item, index) => (
              <Jobslist
                key={item._id}
                id={item._id}
                title={item.roleName}
                company={item.company?.companyName}
                location={item.company?.companyregister[0]?.CompanyLocation}
                city={item.modeOfWork}
                duration={item.duration}
                stipend={item.stipendValue}
                logo={item.company?.companyregister[0]?.Logo}
              />
            ))}
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
