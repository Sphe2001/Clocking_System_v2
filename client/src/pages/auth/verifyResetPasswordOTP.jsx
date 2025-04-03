import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyResetPasswordOTPPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const navigate = useNavigate(); 

  
  const handleChange = (e) => {
    const value = e.target.value;
    setOtp(value);
    setButtonDisabled(value.trim().length !== 4); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${domain}/api/auth/verify/password/resetotp`,
        { otp },
        { withCredentials: true }
      );
      
      toast.success("OTP successfully verified!");
      navigate(response.data?.redirectUrl);

    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
        const response = await axios.post(
          `${domain}/api/auth/resendotp/student`,
          { otp },
          { withCredentials: true }
        );
        toast.success(response.data?.message || "OTP Sent to email");
  
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.response?.data?.message || "Failed to send OTP");
      } 
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-500">
      <Toaster />
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Verify Your OTP</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="flex flex-col">
            <label htmlFor="otp" className="text-sm font-medium text-gray-700 text-left">Enter OTP</label>
            <input
              id="otp"
              type="text"
              maxLength="6"
              required
              value={otp}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-300"
              placeholder="4-digit OTP"
            />
          </div>
          <button
            type="submit"
            disabled={buttonDisabled || loading}
            className={`w-full flex justify-center rounded-md px-4 py-2 text-white font-semibold shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"}`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Didn't receive the OTP?{" "}
          <button
            className="text-indigo-600 hover:text-indigo-500 transition duration-300"
            onClick={handleResendOTP}
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
};
