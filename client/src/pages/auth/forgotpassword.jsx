import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN; 
  const navigate = useNavigate(); 

  const [user, setUser] = useState({
    email: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setButtonDisabled(!(user.email));
  }, [user]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post(
        `${domain}/api/auth/request/passwordreset`,
        user,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      toast.success(response.data?.message);
  
      
      navigate(response.data?.redirectUrl);
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.error || error.response?.data?.message || "Request not sent";
        
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-500">
      <Toaster /> 
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg sm:max-w-lg md:max-w-xl">
        <div className="flex flex-col items-center">
          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
            Forgot Password
          </h2>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-6">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-900 text-left">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={user.email} 
              onChange={(e) => setUser({ ...user, email: e.target.value })} 
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-300"
            />
          </div>

          <button
            type="submit"
            disabled={buttonDisabled || loading}
            className={`w-full flex justify-center rounded-md px-4 py-2 text-white font-semibold shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"}`}
          >
            {loading ? "Sending..." : "Send Request"}
          </button>
        </form>

        
      </div>
    </div>
  );
}
