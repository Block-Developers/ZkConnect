"use client";

import React, { useEffect, useState } from "react";
import OTPVerification from "../components/OtpVerification";
import Logo from "../Images/logo.png";
import axios from "axios";
import {
  getLocalStorageWithExpiry,
  setLocalStorageWithExpiry,
} from "../components/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import Link from "next/link";
import CustomNav from "../components/customNav";
import Image from "next/image";

function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // State to track successful registration
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const router = useRouter(); // Initialize the router
  const [loading, setLoading] = useState(true); // Initialize loading state
  useEffect(() => {
    // Check if there is a token in localStorage
    const id = getLocalStorageWithExpiry("userId");
    console.log("id", id);
    if (!id || !id.token) {
      // If no token, redirect to the login page
      router.push("/Login");
    } else if (id.user.isVerified == true) {
      router.push("/Login");
    } else {
      setLoading(false);
    }
  }, []);
  const handleRegister = async () => {
    try {
      const id = getLocalStorageWithExpiry("userId");
      const token = id.token;
      const response = await axios.post(
        "https://zk-backend.vercel.app/auth/registerotp",
        {}, // Empty request body, if needed
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        setShowOTPVerification(true); // Show OTP verification component
        toast.success("OTP successfully sent your email!", { autoClose: 4000 });
      } else {
        console.log("Response status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {loading ? ( // Use loading state to conditionally render content
        <div>Loading...</div> // Display loading message or spinner
      ) : (
        <>
          <CustomNav />
          <div className="min-h-full flex flex-col justify-center py-10 md:py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <Image
                className="mx-auto mt-2 h-32 w-auto"
                src={Logo}
                alt="Workflow"
              />
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white mx-4 rounded-md py-6 px-4 shadow sm:rounded-lg sm:px-10">
                <div className="space-y-6">
                  {isRegistered ? (
                    <div>
                      <h2>Registration Successful</h2>
                      <p>Your verified please login again</p>
                    </div>
                  ) : (
                    <>
                      <div>
                        {!showOTPVerification && (
                          <>
                            <h2 className="py-10">
                              {" "}
                              Your account has been registered. Please Click on
                              the button to send OTP button.
                            </h2>
                            <button
                              onClick={handleRegister}
                              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Send OTP
                            </button>
                          </>
                        )}
                        {showOTPVerification && (
                          <OTPVerification
                            onComplete={() => setIsRegistered(true)}
                          />
                        )}
                      </div>
                    </>
                  )}
                </div>
                <ToastContainer />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default RegistrationForm;
