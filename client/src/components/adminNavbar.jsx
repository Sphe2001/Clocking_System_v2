import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Sidebar = () => {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const navigate = useNavigate();
  const location = useLocation();


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

  return (
    <aside className="w-64 bg-blue-800 text-white h-screen p-6 fixed left-0 top-0 flex flex-col">
      <h1 className="text-2xl font-bold text-center mb-6">ADMIN PANEL</h1>

      <nav className="flex-grow">
        {/* Dashboard */}
        <div
          className={`p-3 cursor-pointer rounded transition-colors duration-300 ${
            location.pathname === "/dashboard/admin" ? "bg-blue-700" : "hover:bg-blue-600"
          }`}
          onClick={() => navigate("/dashboard/admin")}
        >
          🏠 Dashboard
        </div>

        {/* Users */}
        <div
          className={`p-3 cursor-pointer rounded transition-colors duration-300 ${
            location.pathname.startsWith("/dashboard/admin/users")
              ? "bg-blue-700"
              : "hover:bg-blue-600"
          }`}
        >
          👥 Users
        </div>
        <div
          className="ml-4 p-2 text-sm cursor-pointer hover:bg-blue-600 rounded"
          onClick={() => navigate("/dashboard/admin/users/studentspage")}
        >
          • Students
        </div>
        <div
          className="ml-4 p-2 text-sm cursor-pointer hover:bg-blue-600 rounded"
          onClick={() => navigate("/dashboard/admin/users/supervisorspage")}
        >
          • Supervisors
        </div>

        {/* Reports */}
        <div
          className={`p-3 cursor-pointer rounded transition-colors duration-300 ${
            location.pathname.startsWith("/dashboard/admin/reports")
              ? "bg-blue-700"
              : "hover:bg-blue-600"
          }`}
        >
          📊 Reports
        </div>
        <div
          className="ml-4 p-2 text-sm cursor-pointer hover:bg-blue-600 rounded"
          onClick={() => navigate("/dashboard/admin/reports/studentreportspage")}
        >
          • Students
        </div>
        <div
          className="ml-4 p-2 text-sm cursor-pointer hover:bg-blue-600 rounded"
          onClick={() => navigate("/dashboard/admin/reports/supervisorreportspage")}
        >
          • Supervisors
        </div>

        {/* Profile */}
        <div
          className={`p-3 cursor-pointer rounded transition-colors duration-300 ${
            location.pathname === "/dashboard/admin/profile" ? "bg-blue-700" : "hover:bg-blue-600"
          }`}
          onClick={() => navigate("/dashboard/admin/profile")}
        >
          👤 Profile
        </div>
      </nav>

      <button
        className="w-full p-3 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
        onClick={handleLogout}
      >
        🚪 Logout
      </button>
    </aside>
  );
};

export default Sidebar;
