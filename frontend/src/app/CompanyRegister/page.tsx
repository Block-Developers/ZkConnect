import { useState } from "react";
import axios from "axios";
import CustomFileUpload from "../components/CustomFileUpload";
import CustomFormComp from "../components/CustomFormComp";
import CustomTextBox from "../components/CustomTextBox";
import CustomNav from "../components/customNav";

export default function CompanyLogin() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    companyNumber: "",
    companyLinkedIn: "",
    companyLocation: "",
    employees: 0,
    startingYear: 0,
    companyProfile: "",
    logo: null,
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
        "http://localhost:3005/company-login",
        formData
      );
      console.log("Data sent successfully:", response.data);
      // Reset form after successful submission if needed
      setFormData({
        companyName: "",
        companyEmail: "",
        companyNumber: "",
        companyLinkedIn: "",
        companyLocation: "",
        employees: 0,
        startingYear: 0,
        companyProfile: "",
        logo: null,
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
          value={formData.companyName}
          onChange={handleChange}
        />
        <CustomFormComp
          name="Company Email-ID"
          type="email"
          value={formData.companyEmail}
          onChange={handleChange}
        />
        <CustomFormComp
          name="Company Number"
          type="number"
          value={formData.companyNumber}
          onChange={handleChange}
        />
        <CustomFormComp
          name="Company LinkedIn Link"
          type="url"
          value={formData.companyLinkedIn}
          onChange={handleChange}
        />
        <CustomFormComp
          name="Company Location"
          type="text"
          value={formData.companyLocation}
          onChange={handleChange}
        />
        <CustomFormComp
          name="No of Employees"
          type="number"
          value={formData.employees}
          onChange={handleChange}
        />
        <CustomFormComp
          name="Starting Year"
          type="number"
          value={formData.startingYear}
          onChange={handleChange}
        />
        <CustomTextBox
          name="Company's Profile"
          placeholder="Tell us about your company"
          value={formData.companyProfile}
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
