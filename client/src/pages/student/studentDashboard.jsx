import React, { useState } from "react";
import StudentNavbar from "../../components/studentNavbar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const StudentDashboard = () => {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const [loading, setLoading] = useState(false);

  const handleClockin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${domain}/api/student/clock-in`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data?.message || "Clock-in successful");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Clocking in failed";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClockout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${domain}/api/student/clock-out`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data?.message || "Clock-out successful");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Clocking out failed";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-10 bg-gradient-to-b from-blue-200 to-blue-400 backdrop-blur-md rounded-lg shadow-lg">
      <Toaster />
      {/* Navbar */}
      <StudentNavbar />

      {/* Main Content Section */}
      <div className="flex flex-col items-center justify-center flex-grow pt-20 text-white px-6 sm:px-8 md:px-12">
        <div className="relative z-10 max-w-lg w-full text-center space-y-6 p-8 bg-gradient-to-b from-blue-300 to-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg">
          <h1 className="text-6xl font-extrabold text-black font-serif">
            Welcome, Student!
          </h1>
          <p className="text-lg sm:text-xl text-black">
            Click below to sign your attendance or end the session.
          </p>

          {/* Sign Attendance Button */}
          <input
            type="button"
            className="w-full max-w-xs p-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md disabled:opacity-50"
            onClick={handleClockin}
            value={loading ? "Signing..." : "Sign Attendance"}
            disabled={loading}
          />
          {/* End Session Button */}
          <input
            type="button"
            className="w-full max-w-xs p-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md disabled:opacity-50"
            onClick={handleClockout}
            value={loading ? "Ending..." : "End Session"}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
