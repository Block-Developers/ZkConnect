"use client";
import React, { useState } from "react";
import MainNav from "../components/mainNav";

const SkillButton = ({ skill, selected, onClick }) => (
  <button
    className={`rounded-[10px] border border-white md:px-5  md:py-3 px-2 py-1 md:text-[24px] md:leading-6 font-agrandir ${
      selected ? "bg-blue-500" : "bg-transparent"
    }`}
    onClick={onClick}
  >
    {skill}
  </button>
);

const TextInput = ({ label, value, onChange }) => (
  <div className="flex flex-col w-full mt-5">
    <div className="md:text-[24px] text-white leading-6 font-agrandir pb-3 cursor-pointer">
      {label}
    </div>
    <div>
      <input
        className="bg-transparent border rounded-xl placeholder:text-white placeholder:text-opacity-20 text-white active:text-white md:px-3 px-1 py-2 w-full"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

const CompanyPost = () => {
  const [roleName, setRoleName] = useState("");
  const [modeOfWork, setModeOfWork] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [stipendValue, setStipendValue] = useState("");
  const [aboutRole, setAboutRole] = useState("");
  const [numberOfOpening, setNumberOfOpening] = useState("");

  const skills = ["Full Stack", "Frontend", "Backend", "Designer"];

  const handleSkillSelect = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(
        selectedSkills.filter((selectedSkill) => selectedSkill !== skill)
      );
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const renderSkillsButtons = () => (
    <div className="flex flex-col mt-[50px]">
      <div className="text-[24px] leading-6 font-agrandir pb-3 cursor-pointer">
        Skills
      </div>
      <div className="flex flex-wrap pt-2 gap-3">
        {skills.map((skill, index) => (
          <SkillButton
            key={index}
            skill={skill}
            selected={selectedSkills.includes(skill)}
            onClick={() => handleSkillSelect(skill)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="hero2">
      <MainNav />
      <div className="mt-[100px] py-10 ">
        <center className="mt-[20px] md:text-[38px] text-[25px] pt-[10px] font-extrabold leading-6 font-agrandir  flex justify-center items-center text-white w-full">
          Create a Job Hiring Post
        </center>
        <div className="flex flex-col md:mx-[150px]  mt-10   border md:pl-[40px] pt-10 p-[30px] border-white rounded-2xl text-white text-[24px] leading-6 font-agrandir">
          <TextInput
            label="Role Name"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
          <TextInput
            label="Mode of Work"
            value={modeOfWork}
            onChange={(e) => setModeOfWork(e.target.value)}
          />
          <TextInput
            label="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <TextInput
            label="Stipend"
            value={stipendValue}
            onChange={(e) => setStipendValue(e.target.value)}
          />
          <TextInput
            label="About Role of Hiring"
            value={aboutRole}
            onChange={(e) => setAboutRole(e.target.value)}
          />
          {renderSkillsButtons()}
          <TextInput
            label="Number of Opening"
            value={numberOfOpening}
            onChange={(e) => setNumberOfOpening(e.target.value)}
          />

          <div className="flex justify-center items-center">
            <button className="bg-[#7D088F] rounded-[20px] px-4 py-4 text-[28px] font-bold my-[40px] w-fit">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPost;
