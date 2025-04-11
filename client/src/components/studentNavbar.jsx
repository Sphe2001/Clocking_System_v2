import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  UserIcon,
  DeviceTabletIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import toast from "react-hot-toast";

const StudentNavbar = () => {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const location = useLocation();
  const navigate = useNavigate();

  const [activeIcon, setActiveIcon] = useState(null);

  const handleProfileClick = () => {
    setActiveIcon("profile");
    navigate("/dashboard/student/viewProfile");
  };

  const handleAttendanceClick = () => {
    setActiveIcon("attendance");
    navigate("/dashboard/student/viewAttendanceHistory");
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${domain}/api/auth/logout`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success(response.data?.message || "Logged out successfully");
      navigate(response.data?.redirectUrl || "/login");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Logout failed";

      toast.error(errorMessage);
    }
  };

  const handleDashboardClick = () => {
    setActiveIcon("dashboard");
    navigate("/dashboard/student");
  };

  return (
    <nav className="bg-white text-black p-5 shadow-md w-full border-b border-gray-200">
      <div className="container mx-auto flex p-3 justify-between items-center">
        <h1
          className={`text-3xl font-bold text-blue-900 cursor-pointer font-serif hover:text-blue-500 ${
            activeIcon === "dashboard" ? "animate-bounce" : ""
          }`}
          onClick={handleDashboardClick}
        >
          Student Dashboard
        </h1>

        <div className="flex space-x-8">
          <div
            className={`flex items-center cursor-pointer ${
              activeIcon === "profile" ? "animate-bounce" : ""
            }`}
            onClick={handleProfileClick}
          >
            <UserIcon className="mx-1 h-6 w-6 stroke-blue-500" />
            <span
              className={
                location.pathname === "/dashboard/student/viewProfile"
                  ? "text-blue-600 font-medium cursor-pointer"
                  : ""
              }
            >
              View Profile
            </span>
          </div>

          <div
            className={`flex items-center cursor-pointer ${
              activeIcon === "attendance" ? "animate-bounce" : ""
            }`}
            onClick={handleAttendanceClick}
          >
            <DeviceTabletIcon className="mx-1 h-6 w-6 stroke-blue-500" />
            <span
              className={
                location.pathname === "/dashboard/student/viewAttendanceHistory"
                  ? "text-blue-600 font-medium cursor-pointer"
                  : ""
              }
            >
              View Attendance History
            </span>
          </div>

          <div
            className={`flex items-center cursor-pointer ${
              activeIcon === "logout" ? "animate-bounce" : ""
            }`}
            onClick={handleLogout}
          >
            <PowerIcon className="mx-1 h-6 w-6 stroke-red-500" />
            <button className="bg-red-600 text-white text-sm font-semibold rounded-md px-3 py-1 hover:bg-red-500">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
