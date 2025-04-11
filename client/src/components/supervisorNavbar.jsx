import React, { useState, useEffect } from "react"; // ← added useEffect
import { useLocation, useNavigate } from "react-router-dom";
import {
  UserIcon,
  DeviceTabletIcon,
  PowerIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import toast from "react-hot-toast";

const SupervisorNavbar = () => {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const location = useLocation();
  const navigate = useNavigate();

  const [hasNewRequest, setHasNewRequest] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `${domain}/api/supervisor/students/requests`,
          {
            withCredentials: true,
          }
        );

        const anyUnviewed = res.data.some((r) => r.isViewed === false);
        setHasNewRequest(anyUnviewed);
      } catch (err) {
        console.error("Failed to fetch requests", err);
      }
    };

    fetchRequests();
  }, []);

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

  const handleProfileClick = () => {
    setActiveIcon("profile");
    navigate("/dashboard/supervisor/viewProfile");
  };

  const handleAttendanceClick = () => {
    setActiveIcon("attendance");
    navigate("/dashboard/supervisor/viewAttendance");
  };

  const handleDashboardClick = () => {
    setActiveIcon("dashboard");
    navigate("/dashboard/supervisor");
  };

  return (
    <nav className="bg-slate-900 p-5 mr-5 shadow-md w-full backdrop-blur-md rounded-lg">
      <div className="container mx-auto flex p-3 justify-between items-center">
        {/* Dashboard Title */}
        <h1
          className={`text-4xl font-bold text-white cursor-pointer font-serif hover:text-blue-400 ${
            activeIcon === "dashboard" ? "animate-bounce" : ""
          }`}
          onClick={handleDashboardClick}
        >
          Supervisor Dashboard
        </h1>

        {/* Navbar Links */}
        <div className="flex space-x-8">
          {/* Requests */}
          <div
            className={`relative flex items-center text-white cursor-pointer hover:text-blue-400 ${
              activeIcon === "request" ? "text-blue-400" : ""
            }`}
            onClick={() => {
              setActiveIcon("request");
              navigate("/dashboard/supervisor/requests");
            }}
          >
            <InboxIcon className="mx-1 h-6 w-6 stroke-current mr-2" />
            <span
              className={
                location.pathname === "/dashboard/supervisor/requests"
                  ? "text-blue-400"
                  : ""
              }
            >
              Requests
            </span>
            {hasNewRequest && (
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
            )}
          </div>

          {/* View Profile */}
          <div
            className={`flex items-center text-white cursor-pointer hover:text-blue-400 ${
              activeIcon === "profile" ? "animate-bounce" : ""
            }`}
            onClick={handleProfileClick}
          >
            <UserIcon className="mx-1 h-6 w-6 stroke-current mr-2" />
            <span
              className={
                location.pathname === "/pages/supervisor/viewProfile"
                  ? "text-red-400"
                  : ""
              }
            >
              View Profile
            </span>
          </div>

          {/* View Attendance */}
          <div
            className={`flex items-center text-white cursor-pointer hover:text-blue-400 ${
              activeIcon === "attendance" ? "animate-bounce" : ""
            }`}
            onClick={handleAttendanceClick}
          >
            <DeviceTabletIcon className="mx-1 h-6 w-6 stroke-current mr-2" />
            <span
              className={
                location.pathname === "/pages/supervisor/viewAttendance"
                  ? "text-red-400"
                  : ""
              }
            >
              View Attendance
            </span>
          </div>

          {/* Logout */}
          <div
            className={`flex items-center text-white cursor-pointer hover:text-red-400 ${
              activeIcon === "logout" ? "animate-bounce" : ""
            }`}
            onClick={handleLogout}
          >
            <PowerIcon className="mx-1 h-6 w-6 stroke-current mr-2" />
            <button className="bg-red-600 text-lg font-semibold rounded-lg px-3 py-1 hover:bg-red-400 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SupervisorNavbar;
