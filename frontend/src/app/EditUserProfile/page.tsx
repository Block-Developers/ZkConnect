"use client";
import React, { useState } from "react";
import CustomFormComp from "../components/CustomFormComp";
import MainNav from "../components/mainNav";
import CustomTextBox from "../components/CustomTextBox";

export default function EditUserProfile() {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    PersonalBio: "",
    GithubLink: "",
    TwitterLink: "",
    LinkedInLink: "",
    AddSkills: "",
    Experience: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data, such as sending it to an API or displaying it
    console.log(formData);
  };

  return (
    <section className="hero2 md:py-6 py-5   ">
      <div>
        <MainNav />
      </div>
      <div className="md:mt-[120px] mt-[120px] bg-transparent">
        <h1 className="text-center text-white text-3xl font-agrandir font-extrabold">
          Edit Your Profile
        </h1>
        <div className="md:px-[100px] px-[50px] md:py-[50px] py-[20px]">
          <form onSubmit={handleSubmit}>
            <CustomFormComp
              name="Name"
              type="text"
              value={formData.Name}
              onChange={handleInputChange}
            />
            <CustomFormComp
              name="Email"
              type="email"
              value={formData.Email}
              onChange={handleInputChange}
            />
            <CustomTextBox
              name="Personal Bio"
              placeholder="....................."
              value={formData.PersonalBio}
              onChange={handleInputChange}
            />
            <CustomFormComp
              name="Github Link"
              type="url"
              value={formData.GithubLink}
              onChange={handleInputChange}
            />
            <CustomFormComp
              name="Twitter Link"
              type="url"
              value={formData.TwitterLink}
              onChange={handleInputChange}
            />
            <CustomFormComp
              name="LinkedInLink"
              type="url"
              value={formData.LinkedInLink}
              onChange={handleInputChange}
            />
            <CustomFormComp
              name="Add Skills"
              type="text"
              value={formData.AddSkills}
              onChange={handleInputChange}
            />
            <CustomTextBox
              name="Experience"
              placeholder="Enter your Experience"
              value={formData.Experience}
              onChange={handleInputChange}
            />

            <button
              type="submit"
              className="mt-[30px] py-3 px-5 bg-[#DB00FF87] bg-opacity-50 w-full md:text-[24px] font-agrandir font-extrabold leading-6 text-white"
            >
              Make Changes
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
