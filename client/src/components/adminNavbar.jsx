import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation to detect the active route

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location (path)

  // Profile State
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || "/default-avatar.png");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [username] = useState("Admin User");
  const [email, setEmail] = useState("admin2@tut.ac.za");

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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEditEmail = () => {
    alert("Email updated successfully!");
    setIsProfileOpen(false);
  };

  const handleProfileModalToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    // Show a confirmation dialog before logging out
    const isConfirmed = window.confirm("Are you sure you want to log out?");
    if (isConfirmed) {
      navigate("/adminlogin"); // Redirect to the login page
    }
  };

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
        {/* Profile Button */}
        <button
          className="w-full p-3 bg-transparent hover:bg-blue-600 text-blue-600 hover:text-white rounded transition"
          onClick={handleProfileModalToggle}
        >
          👤 Profile
        </button>
      </nav>

      <div className="mt-auto">
        <button
          className="w-full p-3 bg-gray-400 text-black rounded hover:bg-gray-500 transition"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>
      </div>

      {/* Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Admin Profile</h2>

            <div className="relative w-48 h-48 mb-6 mx-auto">
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-4 border-blue-600 shadow-lg"
              />
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleProfileChange}
              />
            </div>
            <p className="text-gray-600 text-sm text-center">Click to change profile picture</p>

            <div className="mt-6 bg-gray-200 p-6 rounded-lg shadow-lg">
              <p className="text-xl font-semibold text-gray-800">{username}</p>
              <div className="flex justify-between items-center">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                  placeholder="Edit Email"
                />
              </div>
            </div>

            <button
              className="mt-8 bg-black text-white px-8 py-4 rounded-lg text-lg hover:bg-gray-800 transition shadow-lg"
              onClick={handleEditEmail}
            >
              🖊 Edit Email
            </button>

            <button
              className="mt-4 bg-black text-white px-8 py-4 rounded-lg text-lg hover:bg-gray-800 transition shadow-lg"
              onClick={handleProfileModalToggle}
            >
              ✖ Close
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
