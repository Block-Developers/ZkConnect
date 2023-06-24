"use client";
import React, { useState } from "react";

import CustomFormComp from "../components/CustomFormComp";
import CustomTextBox from "../components/CustomTextBox";
import CustomNav from "../components/customNav";
import CustomFileUpload from "../components/CustomFileUpload";

export default function Starting(): JSX.Element {
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);

  const handleButtonClick = (buttonId: number): void => {
    setSelectedButton(buttonId);
  };

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
        <CustomNav />
      </div>
      <div>
        <center className="mt-[60px] py-12 flex justify-center items-center text-white w-full">
          Hi there!👋 <br /> Let's get started
        </center>
        <div className="flex flex-col m-[150px] mt-[20px] border p-[100px] border-white rounded-2xl text-white text-[24px] leading-6 font-agrandir">
          <div className="flex">
            <div className="flex flex-col w-1/2">
              <div className="text-[24px] leading-6 font-agrandir pb-3 cursor-pointer">
                First Name
              </div>
              <div>
                <input
                  className="bg-transparent border rounded-xl placeholder:text-white text-white active:text-white px-3 py-2"
                  type="text"
                  name=""
                  id=""
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-[24px] leading-6 font-agrandir pb-3 cursor-pointer">
                Last Name
              </div>
              <div>
                <input
                  className="bg-transparent border rounded-xl placeholder:text-white text-white active:text-white px-3 py-2"
                  type="text"
                  name=""
                  id=""
                />
              </div>
            </div>
          </div>
          <CustomFormComp name="Email - ID" type="email" />
          <CustomFormComp name="Location" type="text" />
          <CustomFormComp name="Contact Number" type="number" />

          <CustomTextBox name="Profile Bio" placeholder="Tell us about you" />

          <CustomFileUpload
            name="Resume"
            type="file"
            accepted="application/pdf"
          />

          <div className="flex flex-col mt-[50px]">
            <div className="text-[24px] leading-6 font-agrandir pb-3 cursor-pointer">
              Type
            </div>
            <div className="flex pt-2 gap-3">
              <button
                className={`rounded-[10px] border border-white px-5 py-3 text-[24px] leading-6 font-agrandir ${
                  selectedButton === 1 ? "bg-blue-500" : "bg-transparent"
                }`}
                onClick={() => handleButtonClick(1)}
              >
                Student
              </button>
              <button
                className={`rounded-[10px] border border-white px-5 py-3 text-[24px] leading-6 font-agrandir ${
                  selectedButton === 2 ? "bg-blue-500" : "bg-transparent"
                }`}
                onClick={() => handleButtonClick(2)}
              >
                Fresher
              </button>
              <button
                className={`rounded-[10px] border border-white px-5 py-3 text-[24px] leading-6 font-agrandir ${
                  selectedButton === 3 ? "bg-blue-500" : "bg-transparent"
                }`}
                onClick={() => handleButtonClick(3)}
              >
                Working Profession
              </button>
            </div>
          </div>
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

          <div className="flex justify-center items-center mt-[50px] cursor-pointer bg-[#DB00FF87] bg-opacity-[53%] py-5">
            Continue ➡️
          </div>
        </div>
      </div>
      <div className="invisible">dfdf</div>
    </div>
  );
}
