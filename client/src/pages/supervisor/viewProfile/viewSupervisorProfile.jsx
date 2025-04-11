import React, { useEffect, useState } from "react";
import SupervisorNavbar from "../../../components/supervisorNavbar";
import axios from "axios";

const ViewSupervisorProfile = () => {
  const [profile, setProfile] = useState(null);
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post(
          `${domain}/api/supervisor/profile/supervisor`,
          {},
          {
            withCredentials: true,
          }
        );
        setProfile(response.data.supervisor);
      } catch (error) {
        console.error("Failed to fetch supervisor profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-green-200 p-10 rounded-lg shadow-lg">
      {/* Navbar */}
      <SupervisorNavbar />

      {/* Title */}
      <div className="flex justify-center pt-5">
        <h1 className="text-5xl font-extrabold font-serif text-black pb-3 border-b-4 border-dotted border-blue-500 my-4">
          Your Profile
        </h1>
      </div>

      {/* Profile Content */}
      <div className="flex justify-center w-full p-10">
        <div className="max-w-lg w-full text-center space-y-4 p-10 bg-gradient-to-b from-white to-green-200 backdrop-blur-md rounded-lg shadow-lg">
          {profile ? (
            <>
              <h2 className="text-4xl font-bold text-blue-900">
                {profile.surname} {profile.initials}.
              </h2>
              <p className="text-lg text-black">Email: {profile.email}</p>
              <p className="text-lg text-black">Staff number: {profile.staffNo}</p>
              <p className="text-lg text-black">
                Specialization: {profile.specialization}
              </p>
            </>
          ) : (
            <p className="text-gray-600 text-xl">Loading profile...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewSupervisorProfile;
