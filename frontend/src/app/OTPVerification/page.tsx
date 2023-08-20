"use client";

import React, { useState } from "react";
import OTPVerification from "../components/OtpVerification";
import axios from "axios";

function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // State to track successful registration
  const [showOTPVerification, setShowOTPVerification] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://zkconnect-backend.vercel.app/auth/registerotp",
        { email }
      );
      if (response.status === 200) {
        setShowOTPVerification(true); // Show OTP verification component
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isRegistered ? (
        <div>
          <h2>Registration Successful</h2>
          <p>
            Your account has been registered. Please check your email for the
            OTP.
          </p>
        </div>
      ) : (
        <div>
          <h2>Registration Form</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>
        </div>
      )}

      {showOTPVerification && (
        <OTPVerification
          email={email}
          onComplete={() => setIsRegistered(true)}
        />
      )}
    </div>
  );
}

export default RegistrationForm;
