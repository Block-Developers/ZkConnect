import React, { useState } from "react";
import axios from "axios";

function OTPVerification({ email, onComplete }) {
  const [otp, setOTP] = useState("");

  const handleVerify = async () => {
    try {
      const response = await axios.post(
        "https://zkconnect-backend.vercel.app/auth/verify",
        { email, otp }
      );
      if (response.status === 200) {
        onComplete(); // Call the onComplete callback to indicate verification is done
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Verify Your Email</h2>
      <p>
        An OTP has been sent to your email. Please enter the OTP below to verify
        your account.
      </p>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
      />
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
}

export default OTPVerification;
