import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/adminNavbar";  // Import Sidebar component

const Profile = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || "/default-avatar.png");
  const [username] = useState("Admin User");
  const [email] = useState("admin2@tut.ac.za");

  useEffect(() => {
    console.log("Admin Profile Mounted");
  }, []);

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

  const handleLogout = () => {
    navigate("/adminlogin");
  };

  const handleDeleteAccount = () => {
    alert("Account deleted successfully!");
    navigate("/adminlogin");
  };

  return (
    <div className="flex h-screen bg-gray-100">
     
      <Sidebar />  {/* Imported Sidebar */}

      <main className="flex-grow flex flex-col items-center justify-start p-8">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Profile</h2>

          {/* Profile Picture Section */}
          <div className="relative w-48 h-48 mb-6">
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

          {/* Profile Info Section */}
          <div className="mt-6 bg-gray-200 p-6 rounded-lg shadow-lg">
            <p className="text-xl font-semibold text-gray-800">{username}</p>
            <p className="text-gray-600 text-lg">{email}</p>
          </div>

          {/* Delete Account Button */}
          <button
            className="mt-8 bg-red-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-red-700 transition shadow-lg"
            onClick={handleDeleteAccount}
          >
            🗑 Delete Account
          </button>

          {/* Logout Button */}
          <button
            className="mt-4 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-blue-700 transition shadow-lg"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </div>
      </main>
    </div>
  );
};

export default Profile;
