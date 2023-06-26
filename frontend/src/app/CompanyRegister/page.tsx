"use client";
import { useState } from "react";
import axios from "axios";
import CustomFileUpload from "../components/CustomFileUpload";
import CustomFormComp from "../components/CustomFormComp";
import CustomTextBox from "../components/CustomTextBox";
import CustomNav from "../components/customNav";

export default function CompanyLogin() {
  const [formData, setFormData] = useState({
    CompanyName: "",
    CompanyEmail: "",
    CompanyNumber: "",
    CompanyLinkedIn: "",
    CompanyLocation: "",
    Employees: "0",
    StartingYear: "0",
    CompanyProfile: "",
    Logo: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      logo: file,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://zk-connect-api.vercel.app/Rec_Profile_data/",
        formData
      );
      console.log("Data sent successfully:", response.data);
      // Reset form after successful submission if needed
      setFormData({
        CompanyName: "",
        CompanyEmail: "",
        CompanyNumber: "",
        CompanyLinkedIn: "",
        CompanyLocation: "",
        Employees: "0",
        StartingYear: "0",
        CompanyProfile: "",
        Logo: null,
      });
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="hero2">
      <div>
        <CustomNav />
      </div>
      <center className="mt-[60px] py-12 flex justify-center items-center text-white w-full">
        Hi there!👋 <br /> Let&apos;s get started
      </center>
      <div className="flex flex-col mx-6 md:m-[150px]  md:mt-[20px] border px-6 md:p-[100px] border-white rounded-2xl text-white md:text-[24px] leading-6 font-agrandir">
        <CustomFormComp
          name="Company Name"
          type="text"
          value={formData.CompanyName}
          onChange={handleChange}
        />
        <CustomFormComp
          name="Company Email"
          type="email"
          value={formData.CompanyEmail}
          onChange={handleChange}
        />
        <CustomFormComp
          name="Company Number"
          type="number"
          value={formData.CompanyNumber}
          onChange={handleChange}
        />
        <CustomFormComp
          name="Company LinkedIn"
          type="url"
          value={formData.CompanyLinkedIn}
          onChange={handleChange}
        />
        <CustomFormComp
          name="Company Location"
          type="text"
          value={formData.CompanyLocation}
          onChange={handleChange}
        />
        <CustomFormComp
          name="Employees"
          type="number"
          value={formData.Employees}
          onChange={handleChange}
        />
        <CustomFormComp
          name="Starting Year"
          type="number"
          value={formData.StartingYear}
          onChange={handleChange}
        />
        <CustomTextBox
          name="Company Profile"
          placeholder="Tell us about your company"
          value={formData.CompanyProfile}
          onChange={handleChange}
        />
        <CustomFileUpload
          name="Provide your logo"
          type="file"
          accepted="image/*"
          onChange={handleFileChange}
        />
        <div
          className="flex justify-center items-center mt-5 rounded-lg mb-5 md:mt-[50px] cursor-pointer bg-[#DB00FF87] bg-opacity-[53%] py-5"
          onClick={handleSubmit}
        >
          Continue ➡️
        </div>
      </div>
      <div className="invisible">dfdf</div>
    </div>
  );
}
