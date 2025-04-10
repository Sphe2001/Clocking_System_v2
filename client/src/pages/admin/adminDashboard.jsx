import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../components/adminNavbar";
import axios from "axios";

function AdminDashboard() {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;

  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const getStatus = (clockIn) => {
    if (!clockIn) return { icon: "❌", tooltip: "Absent" };
    const hour = new Date(clockIn).getHours();
    return hour <= 8
      ? { icon: "✅", tooltip: "On Time" }
      : { icon: "🕒", tooltip: "Late" };
  };

  useEffect(() => {
    const fetchTodayAttendance = async () => {
      try {
        const res = await axios.get(`${domain}/api/admin/todays/attendance`);

        const students = res.data.students.map((user) => ({
          ...user,
          role: "Student",
        }));

        const supervisors = res.data.supervisors.map((user) => ({
          ...user,
          role: "Supervisor",
        }));

        const combined = [...students, ...supervisors];
        setAttendanceData(combined);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch today's attendance:", error);
        setLoading(false);
      }
    };

    fetchTodayAttendance();
  }, [domain]);

  const filteredData = attendanceData.filter((user) => {
    if (filter === "All") return true;
    return user.role === filter;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <motion.main
        className="flex-1 p-10 bg-white shadow-xl ml-64 flex flex-col items-center justify-center"
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "-100%" }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-3xl mb-10 text-blue-800 font-extrabold text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Admin Panel
        </motion.h1>

        <div className="mb-4">
          <label className="font-semibold mr-2">Filter by role:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="All">All</option>
            <option value="Student">Students</option>
            <option value="Supervisor">Supervisors</option>
          </select>
        </div>

        {loading ? (
          <motion.p
            className="text-center text-lg font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.8 }}
          >
            Loading...
          </motion.p>
        ) : filteredData.length === 0 ? (
          <motion.p
            className="text-center text-lg font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.8 }}
          >
            No records found.
          </motion.p>
        ) : (
          <motion.div
            className="overflow-x-auto max-h-96 shadow-lg rounded-xl bg-white w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-blue-100 top-0">
                <tr className="text-sm text-gray-700">
                  <th className="p-6 border-b">Username</th>
                  <th className="p-6 border-b">Surname</th>
                  <th className="p-6 border-b">Role</th>
                  <th className="p-6 border-b">Clock In</th>
                  <th className="p-6 border-b">Clock Out</th>
                  <th className="p-6 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((user, index) => {
                  const statusData = getStatus(user.clock_in);
                  return (
                    <motion.tr
                      key={index}
                      className="text-sm text-gray-700 group hover:bg-gray-100"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.9, delay: index * 0.1 }}
                    >
                      <td className="p-6 border-b text-center">
                        {user.studentNo || user.staffNo || "N/A"}
                      </td>
                      <td className="p-6 border-b text-center">{user.surname}</td>
                      <td className="p-6 border-b text-center">{user.role}</td>
                      <td className="p-6 border-b text-center">{user.clock_in}</td>
                      <td className="p-6 border-b text-center">{user.clock_out}</td>
                      <td className="p-6 border-b text-center">
                        <div className="relative group">
                          <span className="text-xl">{statusData.icon}</span>
                          <div className="absolute opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 bottom-6 left-1/2 transform -translate-x-1/2">
                            {statusData.tooltip}
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        )}
      </motion.main>
    </div>
  );
}

export default AdminDashboard;
