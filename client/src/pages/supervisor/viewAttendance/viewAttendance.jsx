import React, { useState, useEffect } from "react";
import axios from "axios";
import SupervisorNavbar from "../../../components/supervisorNavbar";
import toast from "react-hot-toast";

const ViewAttendance = () => {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${domain}/api/admin/attendance/students`, {
          withCredentials: true,
        });
        setAttendanceData(res.data);
      } catch (err) {
        toast.error("Failed to fetch attendance data");
        console.error("Error fetching attendance data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const getStatus = (clockInTime) => {
    if (!clockInTime) return { text: "Not in", color: "text-red-600" };
    const clockInDate = new Date(`1970-01-01T${clockInTime}:00`);
    const cutoffTime = new Date(`1970-01-01T08:10:00`);

    if (clockInDate < cutoffTime) {
      return { text: "On time", color: "text-green-600" };
    } else {
      return { text: "Late", color: "text-orange-600" };
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-10 bg-gradient-to-b from-blue-10 to-blue-10 backdrop-blur-md rounded-lg shadow-lg">
      {/* Navbar */}
      <SupervisorNavbar />

      {/* Main Content Section */}
      <div className="overflow-x-auto mt-10">
        <h1 className="text-5xl font-semibold p-5 pl-0">ATTENDANCE:</h1>
        {loading ? ( // Show loading state
          <p className="text-gray-700">Loading attendance data...</p>
        ) : (
          <table className="min-w-full table-auto border-collapse border border-none rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                  Student Number
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                  Clock In Time
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                  Clock Out Time
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                  Status
                </th>{" "}
                {/* New Status Column */}
              </tr>
            </thead>
            <tbody>
              {attendanceData.length === 0 ? ( // Check if data is empty
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-600">
                    No attendance records found.
                  </td>
                </tr>
              ) : (
                attendanceData.map((entry, index) => (
                  <tr key={index} className="hover:bg-red-100">
                    <td className="px-6 py-3 text-sm text-gray-800 border-b">
                      {entry.studentNo}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-800 border-b">
                      {entry.clock_in
                        ? new Date(entry.clock_in).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "--"}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-800 border-b">
                      {entry.clock_out
                        ? new Date(entry.clock_out).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "--"}
                    </td>
                    <td className="px-6 py-3 text-sm border-b">
                      <span className={getStatus(entry.clock_in).color}>
                        {getStatus(entry.clock_in).text}
                      </span>
                    </td>{" "}
                    {/* Status Display */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewAttendance;
