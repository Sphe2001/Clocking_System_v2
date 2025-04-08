import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/adminNavbar";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;

  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profilePic") || "/default-avatar.png"
  );

  const [adminData, setAdminData] = useState({
    staffNo: "",
    surname: "",
    initials: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post(
          `${domain}/api/profile/admin`,
          {},
          {
            withCredentials: true,
          }
        );

        const admin = response.data?.admin;

        if (admin) {
          setAdminData({
            staffNo: admin.staffNo || "",
            surname: admin.surname || "",
            initials: admin.initials || "",
            email: admin.email || "",
          });
        } else {
          console.warn("No admin data received.");
        }
      } catch (error) {
        console.error("Error fetching admin profile:", error);
      }
    };

    fetchProfile();
  }, [domain]);

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
      <Sidebar />

      <main className="flex-grow flex flex-col items-center justify-start p-8">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Admin Profile
          </h2>

          {/* Profile Picture Section */}
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
            <p className="text-gray-600 text-sm text-center mt-2">
              Click to change profile picture
            </p>
          </div>

          {/* Profile Details */}
          <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow text-center space-y-2">
            <p className="text-xl font-semibold text-gray-800">
              {adminData.surname}{" "}
              {adminData.initials && `(${adminData.initials})`}
            </p>
            <p className="text-gray-600 text-lg">{adminData.email}</p>
            <p className="text-gray-600 text-md">
              Staff No: {adminData.staffNo}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
