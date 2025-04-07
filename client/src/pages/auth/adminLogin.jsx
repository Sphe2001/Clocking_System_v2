import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { motion } from "framer-motion"; // Importing motion from framer-motion

export default function AdminLogin() {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${domain}/api/admin/login`,
        user,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Login successful");

      navigate("dashboard/admin");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.error || error.response?.data?.message || "Login failed";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const navigateToUserLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-500 relative">
      <Toaster />

      {/* User Login button in the top left corner */}
      <button
        onClick={navigateToUserLogin}
        className="absolute top-5 left-5 flex items-center p-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <FaUser className="mr-2" /> User Login
      </button>

      {/* Animated login card */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg sm:max-w-lg md:max-w-xl"
      >
        <div className="flex flex-col items-center">
          <img
            alt="Admin Logo"
            src="https://www.accord.org.za/wp-content/uploads/2016/09/TUT-Logo1.jpg"
            className="h-24 w-24 object-cover rounded-md mb-4"
          />
          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
            Admin Sign in
          </h2>
        </div>

        <form onSubmit={onLogin} className="mt-6 space-y-6">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-900 text-left">
              Admin Email address
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
              placeholder="email@tut.ac.za"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-900 text-left">
              Admin Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-300"
              placeholder="********"
            />
            <div className="mt-2 text-right">
              <a
                href="/forgotpassword"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition duration-300"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={buttonDisabled || loading}
            className={`w-full flex justify-center rounded-md px-4 py-2 text-white font-semibold shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"}`}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
