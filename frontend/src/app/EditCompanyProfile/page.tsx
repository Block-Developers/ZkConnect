"use client";
import React, { useState } from "react";
import CustomFormComp from "../components/CustomFormComp";
import MainNav from "../components/mainNav";
import CustomTextBox from "../components/CustomTextBox";

export default function EditCompanyProfile() {
  const [formData, setFormData] = useState({
    CompanyName: "",
    CompanyEmail: "",
    CompanyTwitter: "",
    CompanyLinkedIn: "",
    CompanyDescription: "",
    CompanyStartedYear: "",
    NumberOfEmployees: "",
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
          Edit Your Company Profile
        </h1>
        <div className="md:px-[100px] px-[50px] md:py-[50px] py-[20px]">
          <form onSubmit={handleSubmit}>
            <CustomFormComp
              name="Company Name"
              type="text"
              value={formData.CompanyName}
              onChange={handleInputChange}
            />
            <CustomFormComp
              name="Company Email"
              type="email"
              value={formData.CompanyEmail}
              onChange={handleInputChange}
            />
            <CustomFormComp
              name="Company Twitter"
              type="text"
              value={formData.CompanyTwitter}
              onChange={handleInputChange}
            />
            <CustomFormComp
              name="Company LinkedIn"
              type="url"
              value={formData.CompanyLinkedIn}
              onChange={handleInputChange}
            />
            <CustomTextBox
              name="Company Description"
              placeholder="Enter company description..."
              value={formData.CompanyDescription}
              onChange={handleInputChange}
            />
            <CustomFormComp
              name="Company Started Year"
              type="number"
              value={formData.CompanyStartedYear}
              onChange={handleInputChange}
            />
            <CustomFormComp
              name="Number Of Employees"
              type="number"
              value={formData.NumberOfEmployees}
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
