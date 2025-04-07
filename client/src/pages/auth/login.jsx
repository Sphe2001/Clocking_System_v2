import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion"; // Import motion for animations

export default function LoginPage() {
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
        `${domain}/api/auth/login`,
        user,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Login successful");
      navigate(response.data?.redirectUrl);
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.error || error.response?.data?.message || "Login failed";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const goToAdminLogin = () => {
    navigate("/dashboard/admin/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-500 relative">
      <Toaster />

      {/* Admin Login and User Icon in the top right */}
      <div className="absolute top-4 right-8 flex items-center space-x-4">
        <motion.a
          href="/dashboard/admin/login"
          className="text-lg font-semibold text-indigo-600 hover:text-indigo-500 transition duration-300"
        >
          Admin Login
        </motion.a>
        <motion.div
          className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-sm font-bold">U</span>
        </motion.div>
      </div>

      {/* Animated Login Form (Slide from Bottom) */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg sm:max-w-lg md:max-w-xl z-10"
      >
        <div className="flex flex-col items-center">
          <img
            alt="TUT Logo"
            src="https://www.accord.org.za/wp-content/uploads/2016/09/TUT-Logo1.jpg"
            className="h-24 w-24 object-cover rounded-md mb-4"
          />
          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form onSubmit={onLogin} className="mt-6 space-y-6">
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

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-900 text-left">
              Password
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
            />
            <div className="mt-2 text-right">
              <a href="/forgotpassword" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition duration-300">
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

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500 transition duration-300">
            Sign-up here
          </a>
        </p>
      </motion.div>
    </div>
  );
}
