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

        <button
          className="w-full cursor-pointer p-3 bg-transparent hover:bg-blue-600 text-blue-600 hover:text-white rounded transition-colors duration-300 mt-4"
          onClick={handleProfileModalToggle}
        >
          👤 Profile
        </button>
      </nav>

      <button
        className="w-full p-3 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
        onClick={handleLogout}
      >
        🚪 Logout
      </button>

      {isProfileOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
              Admin Profile
            </h2>

            <div className="flex justify-center mb-4">
              <label className="relative w-32 h-32 cursor-pointer">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border-4 border-blue-600 shadow-lg"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0"
                  onChange={handleProfileChange}
                />
              </label>
            </div>
            <p className="text-gray-600 text-sm text-center">
              Click to change profile picture
            </p>

            <div className="mt-6 bg-gray-200 p-6 rounded-lg shadow-lg">
              <p className="text-xl font-semibold text-black text-center">
                {username}
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg text-black"
                placeholder="Edit Email"
                disabled={!canEdit} // Disable input when not in edit mode
              />
            </div>

            <div className="flex justify-between mt-6">
              {canEdit ? (
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={handleSaveClick}
                >
                  💾 Save
                </button>
              ) : (
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={handleEditClick}
                >
                  🖊 Edit Email
                </button>
              )}
              <button
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
                onClick={handleProfileModalToggle}
              >
                ✖ Close
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
