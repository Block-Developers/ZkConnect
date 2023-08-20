"use client";
import { useEffect, useState } from "react";
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

export default function CompanyLogin() {
  const router = useRouter(); // Initialize the router
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [formData, setFormData] = useState({
    CompanyNumber: "",
    CompanyLinkedIn: "",
    CompanyLocation: "",
    Employees: "0",
    StartingYear: "0",
    CompanyProfile: "",
    Logo: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  useEffect(() => {
    // Check if there is a token in localStorage
    const id = getLocalStorageWithExpiry("userId");
    if (!id || !id.token) {
      // If no token, redirect to the login page
      router.push("/Login");
    } else {
      setLoading(false);
    }
  }, []);

  const handleFileChange = (file) => {
    console.log("file", file);
    setFormData((prevFormData) => ({
      ...prevFormData,
      Logo: file,
    }));
  };

  const handleSubmit = async () => {
    try {
      const id = getLocalStorageWithExpiry("userId");
      console.log(id.token, "id");
      const token = id.token;
      const formDataToSend = new FormData();
      formDataToSend.append("CompanyNumber", formData.CompanyNumber);
      formDataToSend.append("CompanyLinkedIn", formData.CompanyLinkedIn);
      formDataToSend.append("CompanyLocation", formData.CompanyLocation);
      formDataToSend.append("Employees", formData.Employees);
      formDataToSend.append("StartingYear", formData.StartingYear);
      formDataToSend.append("CompanyProfile", formData.CompanyProfile);
      formDataToSend.append("Logo", formData.Logo);

      const response = await axios.post(
        "https://zk-backend.vercel.app/auth/registercompany",
        formDataToSend,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("Data sent successfully:", response.data);
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 202 ||
        response.status === 203 ||
        response.status === 204
      ) {
        // Successful login

        toast.success("Company Registered Successfully!", { autoClose: 4000 });

        window.location.href = "/CompanyDashboard";
      } else {
        // Error handling for unsuccessful login
        // Handle the response as needed
        console.log("Missing Values");
      }
      // Reset form after successful submission if needed
      setFormData({
        CompanyNumber: "",
        CompanyLinkedIn: "",
        CompanyLocation: "",
        Employees: "0",
        StartingYear: "0",
        CompanyProfile: "",
        Logo: "",
      });
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
