import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation to detect the active route

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location (path)

  return (
    <aside className="w-64 bg-blue-800 text-white p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-center">ADMIN PANEL</h1>
      <nav className="space-y-4 flex-grow">
        <div
          className={`p-3 cursor-pointer hover:bg-blue-600 rounded transition ${
            location.pathname === "/dashboard/admin" ? "bg-blue-700" : ""
          }`}
          onClick={() => navigate("/dashboard/admin")}
        >
          🏠 Dashboard
        </div>
        <div
          className={`p-3 cursor-pointer hover:bg-blue-600 rounded transition ${
            location.pathname === "/dashboard/admin/users" ? "bg-blue-700" : ""
          }`}
          onClick={() => navigate("/dashboard/admin/users")}
        >
          👥 Users
        </div>
        <div
          className={`p-3 cursor-pointer hover:bg-blue-600 rounded transition ${
            location.pathname === "/dashboard/admin/reports" ? "bg-blue-700" : ""
          }`}
          onClick={() => navigate("/dashboard/admin/reports")}
        >
          📊 Reports
        </div>
        <div
          className={`p-3 cursor-pointer hover:bg-blue-600 rounded transition ${
            location.pathname === "/dashboard/admin/profile" ? "bg-blue-700" : ""
          }`}
          onClick={() => navigate("/dashboard/admin/profile")}
        >
          👤 Profile
        </div>
      </nav>
      <div className="mt-auto">
        <button
          className="w-full p-3 bg-red-600 rounded hover:bg-red-700 transition"
          onClick={() => navigate("/adminlogin")}
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
