"use client";
import CustomFileUpload from "../components/CustomFileUpload";
import CustomFormComp from "../components/CustomFormComp";
import CustomTextBox from "../components/CustomTextBox";
import CustomNav from "../components/customNav";

export default function CompanyLogin() {
  return (
    <div className="hero2">
      <div>
        <CustomNav />
      </div>
      <center className="mt-[80px] py-12 flex justify-center items-center text-white w-full">
        Hi there! <br /> Let's get started
      </center>
      <div className="flex flex-col m-[150px] mt-[20px] border p-[100px] border-white rounded-2xl text-white text-[24px] leading-6 font-agrandir">
        <CustomFormComp name="Company Name" type="text" />
        <CustomFormComp name="Company Email-ID" type="email" />
        <CustomFormComp name="Company Number" type="number" />
        <CustomFormComp name="Company LinkedIn Link" type="url" />
        <CustomFormComp name="Company Location" type="text" />
        <CustomFormComp name="No of Employees" type="number" />
        <CustomFormComp name="Starting Year" type="number" />
        <CustomTextBox
          name="Company's Profile"
          placeholder="Tell us about your company"
        />
        <CustomFileUpload
          name="Provide your logo"
          type="file"
          accepted="image/*"
        />
        <div className="flex justify-center items-center mt-[50px] cursor-pointer bg-[#DB00FF87] bg-opacity-[53%] py-5">
          Continue ➡️
        </div>
      </div>
      <div className="invisible">dfdf</div>
    </div>
  );
}
