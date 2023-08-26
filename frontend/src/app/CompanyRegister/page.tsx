"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomFileUpload from "../components/CustomFileUpload";
import CustomFormComp from "../components/CustomFormComp";
import CustomTextBox from "../components/CustomTextBox";
import CustomNav from "../components/customNav";
import {
  getLocalStorageWithExpiry,
  setLocalStorageWithExpiry,
} from "../components/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation"; // Import the useRouter hook

export default function Starting(): JSX.Element {
  const router = useRouter(); // Initialize the router
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [CompanyLinkedIn, setCompanyLinkedIn] = useState("");
  const [CompanyLocation, setCompanyLocation] = useState("");
  const [Employees, setEmployees] = useState("");
  const [StartingYear, setStartingYear] = useState("");
  const [CompanyProfile, setCompanyProfile] = useState("");
  const [Logo, setLogo] = useState("");

  useEffect(() => {
    // Check if there is a token in localStorage
    const id = getLocalStorageWithExpiry("userId");
    if (!id || !id.token) {
      // If no token, redirect to the login page
      router.push("/Login");
    } else if (
      id.user.userregister.length !== 0 &&
      id.user.companyregister.length !== 0
    ) {
      router.push("/Login");
    } else {
      setLoading(false);
    }
  }, []);

  const handleFileChange = (file) => {
    console.log("file", file);
    setLogo(file); // Set the selected logo file object
  };

  // Inside your handleSubmit function

  const handleSubmit = async () => {
    try {
      const id = getLocalStorageWithExpiry("userId");
      const token = id.token;

      // Create a FormData object to hold the registration data
      const formData = new FormData();
      formData.append("CompanyLinkedIn", CompanyLinkedIn);
      formData.append("CompanyLocation", CompanyLocation);
      formData.append("Employees", Employees);
      formData.append("StartingYear", StartingYear);
      formData.append("CompanyProfile", CompanyProfile);
      formData.append("Logo", Logo); // Make sure Logo contains the file object

      const response = await axios.post(
        "https://zk-backend.vercel.app/auth/registercompany",
        formData, // Send the FormData object as the request body
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data", // Set the appropriate content type
          },
        }
      );

      console.log("Data sent successfully:", response.data);
      if (response.status === 201) {
        // Successful registration
        toast.success("Company Registered Successfully!", { autoClose: 4000 });
        window.location.href = "/CompanyDashboard";
      } else {
        // Error handling for unsuccessful registration
        console.log("Missing Values");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="hero2">
      {loading ? ( // Use loading state to conditionally render content
        <div>Loading...</div> // Display loading message or spinner
      ) : (
        <>
          <div>
            <CustomNav />
          </div>
          <div className="pb-20">
            <center className="mt-[80px] py-12  flex justify-center items-center text-white w-full ">
              Hi there!👋 <br /> Let&apos;s get started
            </center>
            <div className="flex flex-col mx-6  md:mx-[150px]   md:mt-[20px] border px-6 md:p-[100px] border-white rounded-2xl text-white md:text-[20px] leading-6 font-agrandir">
              <CustomFormComp
                name="Company LinkedIn"
                type="url"
                value={CompanyLinkedIn}
                onChange={(event) => {
                  setCompanyLinkedIn(event.target.value);
                }}
              />
              <CustomFormComp
                name="Company Location"
                type="text"
                value={CompanyLocation}
                onChange={(event) => {
                  setCompanyLocation(event.target.value);
                }}
              />
              <CustomFormComp
                name="Employees"
                type="number"
                value={Employees}
                onChange={(event) => {
                  setEmployees(event.target.value);
                }}
              />
              <CustomFormComp
                name="Starting Year"
                type="number"
                value={StartingYear}
                onChange={(event) => {
                  setStartingYear(event.target.value);
                }}
              />
              <CustomTextBox
                name="Company Profile"
                placeholder="Tell us about your company"
                value={CompanyProfile}
                onChange={(event) => {
                  setCompanyProfile(event.target.value);
                }}
              />

              {/* Rest of the CustomFormComp components */}
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
              <ToastContainer />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
