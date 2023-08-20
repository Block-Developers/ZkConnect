import React, { useState } from "react";
import axios from "axios";
import {
  getLocalStorageWithExpiry,
  setLocalStorageWithExpiry,
} from "../components/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OTPVerification({ onComplete }) {
  const [otp, setOTP] = useState("");

  const handleVerify = async () => {
    try {
      const id = getLocalStorageWithExpiry("userId");
      console.log(id.token, "id");
      const token = id.token;
      const response = await axios.post(
        "https://zk-backend.vercel.app/auth/verify",
        { otp },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        onComplete(); // Call the onComplete callback to indicate verification is done
        toast.success("Verification successful!", { autoClose: 4000 });

        if (id.user.role === "user") {
          window.location.href = "/UserRegister";
        } else {
          window.location.href = "/CompanyRegister";
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="py-2">Verify Your Email</h2>
      <p className="py-2">
        An OTP has been sent to your email. Please enter the OTP below to verify
        your account.
      </p>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
        className="appearance-none block w-full mb-5 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <button
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        onClick={handleVerify}
      >
        Verify
      </button>
      <ToastContainer />
    </div>
  );
}

export default OTPVerification;
