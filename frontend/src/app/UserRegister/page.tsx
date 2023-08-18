"use client";
import React, { useState } from "react";
import { useStorageUpload } from "@thirdweb-dev/react";
import CustomFormComp from "../components/CustomFormComp";
import CustomTextBox from "../components/CustomTextBox";
import CustomNav from "../components/customNav";
import CustomFileUpload from "../components/CustomFileUpload";
import axios from "axios";
import {
  getLocalStorageWithExpiry,
  setLocalStorageWithExpiry,
} from "../components/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Starting(): JSX.Element {
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [resume, setResume] = useState(null); // Initialize the state variable for the resume file
  const [profileBio, setProfileBio] = useState(""); // Initialize the state variable for the text area

  const handleProfileBioChange = (event) => {
    const value = event.target.value;
    setProfileBio(value);
  };

  const handleResumeChange = (file) => {
    setResume(file);
  };

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

  const handleFormSubmit = async (): Promise<void> => {
    const formData = new FormData();
    formData.append("file", resume);
    const id = getLocalStorageWithExpiry("userId");
    console.log(id.token, "id");
    const token = id.token;

    const response = await axios.post(
      "https://zk-backend.vercel.app/auth/registerUser",
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        location: location,
        contactNumber: contactNumber,
        profileBio: profileBio,
        resume: resume.name, 
        selectedButton: selectedButton,
        selectedSkills: selectedSkills.join(", "),
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log("Response:", response.data);
    if (response.status === 200 || 201 || 202 || 203 || 204) {
      // Successful login

      const id = response?.data?.id;
      toast.success("User Registered Successfully!", { autoClose: 4000 });
      // Store the id value in localStorage
      setLocalStorageWithExpiry("userId", id, 30);
      const retrievedValue = getLocalStorageWithExpiry("userId"); // Retrieve the stored value (returns null if expired or not found)
      console.log(retrievedValue);

      window.location.href = "/Login";
    } else {
      // Error handling for unsuccessful login

      // Handle the response as needed
      console.log("Missing Values");
    }
  };

  return (
    <div className="hero2">
      <div>
        <CustomNav />
      </div>
      <div>
        <center className="mt-[80px] py-12 flex justify-center items-center text-white w-full">
          Hi there!👋 <br /> Let&apos;s get started
        </center>
        <div className="flex flex-col px-5 mx-6 md:m-[150px]  md:mt-[20px] border md:p-[100px] border-white rounded-2xl text-white md:text-[24px] leading-6 font-agrandir">
          <div className="flex flex-row gap-4">
            <CustomFormComp
              name="First Name"
              type="text"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
            <CustomFormComp
              name="Last Name"
              type="text"
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </div>
          <CustomFormComp
            name="Email - ID"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <CustomFormComp
            name="Location"
            type="text"
            value={location}
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          />
          <CustomFormComp
            name="Contact Number"
            type="number"
            value={contactNumber}
            onChange={(event) => {
              setContactNumber(event.target.value);
            }}
          />

          <CustomTextBox
            name="Profile Bio"
            placeholder="Tell us about you"
            value={profileBio}
            onChange={handleProfileBioChange}
          />

          <CustomFileUpload
            name="Resume"
            type="file"
            accepted="application/pdf"
            onChange={handleResumeChange}
          />

          <div className="flex flex-col mt-5 md:mt-[50px]">
            <div className="md:text-[24px] leading-6 font-agrandir pb-3 cursor-pointer">
              Type
            </div>
            <div className="flex pt-2 gap-3">
              <button
                className={`rounded-[10px] border border-white md:px-5 hover:bg-[#DB00FF] px-2 py-1 md:py-3 md:text-[24px] leading-6 font-agrandir ${
                  selectedButton === 1 ? "bg-blue-500" : "bg-transparent"
                }`}
                onClick={() => handleButtonClick(1)}
              >
                Student
              </button>
              <button
                className={`rounded-[10px] border border-white px-2 md:px-5 hover:bg-[#DB00FF] md:py-3 md:text-[24px] leading-6 font-agrandir ${
                  selectedButton === 2 ? "bg-blue-500" : "bg-transparent"
                }`}
                onClick={() => handleButtonClick(2)}
              >
                Fresher
              </button>
              <button
                className={`rounded-[10px] border border-white px-2 md:px-5 py-3 hover:bg-[#DB00FF] md:text-[24px] leading-6 font-agrandir ${
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
                className={`rounded-[10px] border border-white px-2 md:px-5 py-3 md:text-[24px] leading-6 font-agrandir ${
                  selectedSkills.includes(1) ? "bg-blue-500" : "bg-transparent"
                }`}
                onClick={() => handleSkillSelect(1)}
              >
                Full Stack
              </button>
              <button
                className={`rounded-[10px] border border-white px-2 md:px-5 py-3 md:text-[24px] leading-6 font-agrandir ${
                  selectedSkills.includes(2) ? "bg-blue-500" : "bg-transparent"
                }`}
                onClick={() => handleSkillSelect(2)}
              >
                Frontend
              </button>
              <button
                className={`rounded-[10px] border border-white px-2 md:px-5 py-3 md:text-[24px] leading-6 font-agrandir ${
                  selectedSkills.includes(3) ? "bg-blue-500" : "bg-transparent"
                }`}
                onClick={() => handleSkillSelect(3)}
              >
                Backend
              </button>
              <button
                className={`rounded-[10px] border border-white px-2 md:px-5 py-3 md:text-[24px] leading-6 font-agrandir ${
                  selectedSkills.includes(4) ? "bg-blue-500" : "bg-transparent"
                }`}
                onClick={() => handleSkillSelect(4)}
              >
                Designer
              </button>
              <button
                className={`rounded-[10px] border border-white px-2 md:px-5 py-3 md:text-[24px] leading-6 font-agrandir ${
                  selectedSkills.includes(5) ? "bg-blue-500" : "bg-transparent"
                }`}
                onClick={() => handleSkillSelect(5)}
              >
                Smart contract developer
              </button>
              <button
                className={`rounded-[10px] border border-white px-2 md:px-5 py-3 md:text-[24px] leading-6 font-agrandir ${
                  selectedSkills.includes(6) ? "bg-blue-500" : "bg-transparent"
                }`}
                onClick={() => handleSkillSelect(6)}
              >
                Social Media
              </button>
              <button
                className={`rounded-[10px] border border-white px-2 md:px-5 py-3 md:text-[24px] leading-6 font-agrandir ${
                  selectedSkills.includes(7) ? "bg-blue-500" : "bg-transparent"
                }`}
                onClick={() => handleSkillSelect(7)}
              >
                Content Writer
              </button>
            </div>
          </div>

          <button
            onClick={handleFormSubmit}
            className="flex justify-center rounded-lg items-center mt-5 mb-5 md:mt-[50px] cursor-pointer bg-[#DB00FF87] bg-opacity-[53%] py-5"
          >
            Continue ➡️
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
