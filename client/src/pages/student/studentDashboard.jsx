import React, { useState } from "react";
import StudentNavbar from "../../components/studentNavbar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const StudentDashboard = () => {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const [loading, setLoading] = useState(false);
  const [hasSignedAttendance, setHasSignedAttendance] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [reason, setReason] = useState("");

  // handle form submission
  const handleRequestLeave = async () => {
    if (!reason.trim()) {
      toast.error("Please enter a reason.");
      return;
    }

    try {
      await axios.post(
        `${domain}/api/student/request-leave`,
        { reason },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Leave requested successfully!");
      setShowLeaveModal(false);
      setReason("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to request leave.");
    }
  };

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
      setHasSignedAttendance(false); // optional: reset if session ends
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

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown open/close
  };

  return (
    <div className="min-h-screen flex flex-col p-10 bg-gray-100">
      <Toaster />
      <StudentNavbar />

      <div className="flex flex-col items-center justify-center flex-grow pt-20 text-black px-6 sm:px-8 md:px-12">
        <div className="relative z-10 max-w-lg w-full text-center space-y-6 p-8 bg-gradient-to-b from-blue-100 to-white rounded-lg shadow-lg">
          <h1 className="text-6xl font-extrabold font-serif text-blue-900">
            Welcome, Student!
          </h1>
          <p className="text-lg sm:text-xl text-gray-700">
            Click below to sign your attendance or end the session.
          </p>

          {/* Sign Attendance Button */}
          <input
            type="button"
            className="w-full max-w-xs p-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md disabled:opacity-50 cursor-pointer"
            onClick={handleClockin}
            value={loading ? "Signing..." : "Sign Attendance"}
            disabled={loading}
          />

          {/* End Session Button */}
          <input
            type="button"
            className={`w-full max-w-xs p-4 text-white text-lg font-semibold rounded-lg transition-all shadow-md disabled:opacity-50 cursor-pointer ${
              hasSignedAttendance
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleClockout}
            value={loading ? "Ending..." : "End Session"}
            disabled={loading || !hasSignedAttendance}
          />

          {/* Requests Dropdown Button */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-full max-w-xs p-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md cursor-pointer"
            >
              Requests
            </button>

            {/* Dropdown Options */}
            {isDropdownOpen && (
              <div className="absolute left-1/2 transform -translate-x-1/2 w-48 mt-2 bg-white rounded-md shadow-lg z-10">
                <button
                  className="w-full text-center px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold cursor-pointer"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setShowLeaveModal(true);
                  }}
                >
                  Request Leave
                </button>

                <button
                  className="w-full text-center px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold cursor-pointer"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setShowStatusModal(true);
                  }}
                >
                  Request Status
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Request Leave Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white w-11/12 max-w-md rounded-lg p-6 text-center shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Request Leave</h2>
            <label className="block text-lg font-semibold mb-2 text-center">
              Reason
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              rows="4"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md cursor-pointer font-semibold"
                onClick={() => setShowLeaveModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer font-semibold"
                onClick={handleRequestLeave}
              >
                Request
              </button>
            </div>
          </div>
        </div>
      )}
      {showStatusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white w-11/12 max-w-md rounded-lg p-6 text-center shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Status</h2>
            <p className="mb-4 text-gray-800 text-lg">
              <strong>Reason:</strong> I’m not feeling well and need to rest.
            </p>
            <p className="mb-6 text-gray-800 text-lg">
              <strong>Status:</strong> Pending
            </p>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 cursor-pointer font-semibold"
              onClick={() => setShowStatusModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
