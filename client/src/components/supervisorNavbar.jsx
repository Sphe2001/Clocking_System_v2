import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  UserIcon,
  DeviceTabletIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const SupervisorNavbar = () => {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const location = useLocation();
  const navigate = useNavigate();

  // State to track which icon was clicked for animation
  const [activeIcon, setActiveIcon] = useState(null);

  // Logout Function (Replace with actual logic)
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${domain}/api/auth/logout`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success(response.data?.message || "Logged out successfully");
      navigate(response.data?.redirectUrl || "/login"); // fallback to login if redirectUrl is missing
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Logout failed";

      toast.error(errorMessage);
    }
  };

  // Function to handle View Profile navigation
  const handleProfileClick = () => {
    setActiveIcon("profile"); // Set active state for profile
    navigate("/dashboard/supervisor/viewProfile");
  };

  // Function to handle View Attendance navigation
  const handleAttendanceClick = () => {
    setActiveIcon("attendance"); // Set active state for attendance
    navigate("/dashboard/supervisor/viewAttendance");
  };

  // Function to handle Supervisor Dashboard navigation
  const handleDashboardClick = () => {
    setActiveIcon("dashboard"); // Set active state for dashboard
    navigate("/dashboard/supervisor");
  };

  return (
    <nav className="bg-gradient-to-b from-blue-100 to-green-500 p-5 mr-5 shadow-md w-full backdrop-blur-md rounded-lg">
      <div className="container mx-auto flex p-3 justify-between items-center">
        {/* Dashboard Title */}
        <h1
          className={`text-4xl font-bold cursor-pointer font-serif hover:text-blue-500 ${
            activeIcon === "dashboard" ? "animate-bounce" : ""
          }`}
          onClick={handleDashboardClick}
        >
          Supervisor Dashboard
        </h1>

        {/* Navbar Links */}
        <div className="flex space-x-8">
          {/* View Profile */}
          <div
            className={`flex items-center cursor-pointer ${
              activeIcon === "profile" ? "animate-bounce" : ""
            }`}
            onClick={handleProfileClick}
          >
            <UserIcon className="mx-1 h-6 w-6 stroke-blue-800 mr-3" />
            <span
              className={
                location.pathname === "/pages/supervisor/viewProfile"
                  ? "text-red-300"
                  : ""
              }
            >
              View Profile
            </span>
          </div>

          {/* View Attendance */}
          <div
            className={`flex items-center cursor-pointer ${
              activeIcon === "attendance" ? "animate-bounce" : ""
            }`}
            onClick={handleAttendanceClick}
          >
            <DeviceTabletIcon className="mx-1 h-6 w-6 stroke-blue-800 mr-3" />
            <span
              className={
                location.pathname === "/pages/supervisor/viewAttendance"
                  ? "text-red-300"
                  : ""
              }
            >
              View Attendance
            </span>
          </div>

          {/* Logout Button */}
          <div
            className={`flex items-center text-white cursor-pointer ${
              activeIcon === "logout" ? "animate-bounce" : ""
            }`}
            onClick={handleLogout}
          >
            <PowerIcon className="mx-1 h-6 w-6 stroke-blue-800 mr-3" />
            <button className="bg-red-600 text-lg font-semibold rounded-lg p-1 hover:bg-red-300">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SupervisorNavbar;
