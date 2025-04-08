import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Sidebar = ({ setProfileModalState }) => {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const navigate = useNavigate();
  const location = useLocation();

  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profilePic") || "/default-avatar.png"
  );
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [username] = useState("Admin User");
  const [email, setEmail] = useState("admin2@tut.ac.za");
  const [canEdit, setCanEdit] = useState(false); // State to control email editing

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileModalToggle = () => {
    const newState = !isProfileOpen;
    setIsProfileOpen(newState);
    if (setProfileModalState) setProfileModalState(newState);
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

  const handleEditClick = () => {
    setCanEdit(true); // Allow email field to be editable
  };

  const handleSaveClick = () => {
    alert("Email updated successfully!");
    setCanEdit(false); // Disable email editing after saving
  };

  return (
    <aside className="w-64 bg-blue-800 text-white h-screen p-6 fixed left-0 top-0 flex flex-col">
      <h1 className="text-2xl font-bold text-center mb-6">ADMIN PANEL</h1>

      <nav className="flex-grow">
        {[
          { path: "/dashboard/admin", label: "🏠 Dashboard" },
          { path: "/dashboard/admin/users", label: "👥 Users" },
          { path: "/dashboard/admin/reports", label: "📊 Reports" },
          { path: "/dashboard/admin/profile", label: " profile" },
        ].map(({ path, label }) => (
          <div
            key={path}
            className={`p-3 cursor-pointer rounded transition-colors duration-300 ${
              location.pathname === path ? "bg-blue-700" : "hover:bg-blue-600"
            }`}
            onClick={() => navigate(path)}
          >
            {label}
          </div>
        ))}
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
