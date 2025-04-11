import React, { useState } from "react";
import SupervisorNavbar from "../../components/supervisorNavbar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const SupervisorDashboard = () => {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const [loading, setLoading] = useState(false);
  const [hasSignedAttendance, setHasSignedAttendance] = useState(false);

  const handleClockin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${domain}/api/supervisor/clock_in`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data?.message || "Clock-in successful");
      setHasSignedAttendance(true); // ✅ Mark attendance as signed
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
    if (!hasSignedAttendance) {
      toast.error("You must sign attendance before ending the session.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${domain}/api/supervisor/clock_out`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data?.message || "Clock-out successful");
      setHasSignedAttendance(false); // Optional reset after ending session
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
    <div className="min-h-screen flex flex-col p-10 bg-gray-100">
      <Toaster />
      <SupervisorNavbar />

      <div className="flex flex-col items-center justify-center flex-grow pt-20 px-6 sm:px-8 md:px-12">
        <div className="relative z-10 max-w-lg w-full text-center space-y-6 p-8 bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-xl">
          <h1 className="text-5xl font-extrabold text-gray-900 font-serif">
            Welcome, Supervisor!
          </h1>
          <p className="text-lg sm:text-xl text-gray-700">
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
            className={`w-full max-w-xs p-4 text-white text-lg font-semibold rounded-lg transition-all shadow-md disabled:opacity-50 ${
              hasSignedAttendance
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleClockout}
            value={loading ? "Ending..." : "End Session"}
            disabled={loading || !hasSignedAttendance}
          />
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
