import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/adminNavbar";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;


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
          `${domain}/api/admin/profile/admin`,
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



  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-grow flex flex-col items-center justify-start p-8">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Admin Profile
          </h2>

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
