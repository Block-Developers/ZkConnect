"use client";

import CustomFormComp from "../components/CustomFormComp";
import CustomTextBox from "../components/CustomTextBox";
import MainNav from "../components/mainNav";
import React, { useState } from "react";

export default function CompanyPost() {
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);

  const handleSkillSelect = (buttonId: number): void => {
    if (selectedSkills.includes(buttonId)) {
      setSelectedSkills(selectedSkills.filter((id) => id !== buttonId));
    } else {
      setSelectedSkills([...selectedSkills, buttonId]);
    }
  };
  return (
    <div className="hero2">
      <div>
        <MainNav />
      </div>
      <div className="mt-[100px] ">
        <center className="mt-[80px] text-[38px] pt-[50px] font-extrabold leading-6 font-agrandir py-12 flex justify-center items-center text-white w-full">
          Create a Job Hiring Post
        </center>
        <div className="flex flex-col m-[150px] mt-[20px] border p-[100px] border-white rounded-2xl text-white text-[24px] leading-6 font-agrandir">
          <CustomFormComp name="Role Name" type="text" />
          <CustomFormComp name="Mode of Work" type="text" />
          <CustomFormComp name="Duration" type="text" />
          <CustomFormComp name="Stipend" type="text" />
          <CustomTextBox name="About Role of Hiring" placeholder=" " />

          <div className="flex flex-col mt-[50px]">
            <div className="text-[24px] leading-6 font-agrandir pb-3 cursor-pointer">
              Skills
            </div>
            <div className="flex flex-wrap pt-2 gap-3">
              <button
                className={`rounded-[10px] border border-white px-5 py-3 text-[24px] leading-6 font-agrandir ${
                  selectedSkills.includes(1) ? "bg-blue-500" : "bg-transparent"
                }`}
                onClick={() => handleSkillSelect(1)}
              >
                Full Stack
              </button>
              <button
                className={`rounded-[10px] border border-white px-5 py-3 text-[24px] leading-6 font-agrandir ${
                  selectedSkills.includes(2) ? "bg-blue-500" : "bg-transparent"
                }`}
                onClick={() => handleSkillSelect(2)}
              >
                Frontend
              </button>
              <button
                className={`rounded-[10px] border border-white px-5 py-3 text-[24px] leading-6 font-agrandir ${
                  selectedSkills.includes(3) ? "bg-blue-500" : "bg-transparent"
                }`}
                onClick={() => handleSkillSelect(3)}
              >
                Backend
              </button>
              <button
                className={`rounded-[10px] border border-white px-5 py-3 text-[24px] leading-6 font-agrandir ${
                  selectedSkills.includes(4) ? "bg-blue-500" : "bg-transparent"
                }`}
                onClick={() => handleSkillSelect(4)}
              >
                Designer
              </button>
              <button
                className={`rounded-[10px] border border-white px-5 py-3 text-[24px] leading-6 font-agrandir ${
                  selectedSkills.includes(5) ? "bg-blue-500" : "bg-transparent"
                }`}
                onClick={() => handleSkillSelect(5)}
              >
                Smart contract developer
              </button>
              <button
                className={`rounded-[10px] border border-white px-5 py-3 text-[24px] leading-6 font-agrandir ${
                  selectedSkills.includes(6) ? "bg-blue-500" : "bg-transparent"
                }`}
                onClick={() => handleSkillSelect(6)}
              >
                Social Media
              </button>
              <button
                className={`rounded-[10px] border border-white px-5 py-3 text-[24px] leading-6 font-agrandir ${
                  selectedSkills.includes(7) ? "bg-blue-500" : "bg-transparent"
                }`}
                onClick={() => handleSkillSelect(7)}
              >
                Content Writer
              </button>
            </div>
          </div>
          <CustomFormComp name="Number of Opening" type="number" />
          <div className="flex justify-center items-center">
            <button className="bg-[#7D088F] rounded-[20px] px-4 py-4 text-[28px] font-bold my-[40px] w-fit">
              Post
            </button>
          </div>
        </div>
      </div>
      <div className="invisible">dfdf</div>
      <div className="invisible">dfdf</div>
      <div className="invisible">dfdf</div>{" "}
    </div>
  );
}
