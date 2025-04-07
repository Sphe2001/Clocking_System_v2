import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../components/adminNavbar";

function AdminDashboard() {
  const [filter, setFilter] = useState("All");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentCount, setStudentCount] = useState(0);
  const [supervisorCount, setSupervisorCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await fetch("http://localhost:3001/api/admin/fetchAllStudentUsers/users");
        const supervisorsResponse = await fetch("http://localhost:3001/api/admin/fetchAllSupervisorUsers/supervisorUsers");

        const studentsData = await studentsResponse.json();
        const supervisorsData = await supervisorsResponse.json();

        const formattedStudents = studentsData.map(student => ({
          studentNo: student.studentNo,
          surname: student.surname,
          role: "Student",
          clockIn: student.clock_in_time || "N/A",
          clockOut: student.clock_out_time || "N/A"
        }));

        const formattedSupervisors = supervisorsData.map(supervisor => ({
          staffNo: supervisor.staffNo,
          surname: supervisor.surname,
          role: "Supervisor",
          clockIn: supervisor.clock_in_time || "N/A",
          clockOut: supervisor.clock_out_time || "N/A"
        }));

        // Combine both student and supervisor data
        const allUsers = [...formattedStudents, ...formattedSupervisors];

        // Sort users by clockIn time (latest clock-in first)
        allUsers.sort((a, b) => {
          const clockInA = a.clockIn === "N/A" ? null : new Date(a.clockIn);
          const clockInB = b.clockIn === "N/A" ? null : new Date(b.clockIn);
          
          // If clockIn time is missing (N/A), place that entry at the bottom
          if (!clockInA && !clockInB) return 0;
          if (!clockInA) return 1;
          if (!clockInB) return -1;

          return clockInB - clockInA; // Sort in descending order (latest first)
        });

        // Update the state with users and counts
        setUsers(allUsers.slice(0, 10)); // Limit to 10 records
        setStudentCount(formattedStudents.length); // Total students
        setSupervisorCount(formattedSupervisors.length); // Total supervisors
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = filter === "All" ? users : users.filter(user => user.role === filter);

  // Function to get current date
  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString(); // Formats as MM/DD/YYYY or similar
  };

  // Function to determine status and return icon and tooltip
  const getStatus = (clockIn) => {
    if (clockIn === "N/A") {
      return { status: "Absent", icon: "❌", tooltip: "User is absent" };
    }

    const clockInTime = new Date(`1970-01-01T${clockIn}:00Z`); // Convert clockIn to Date object
    const comparisonTime = new Date("1970-01-01T08:10:00Z"); // 08:10 AM in UTC

    if (clockInTime > comparisonTime) {
      return { status: "Late", icon: "⏰", tooltip: "User is late" };
    } else {
      return { status: "On Time", icon: "✅", tooltip: "User is on time" };
    }
  };

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

        {/* Stats Section */}
        <div className="mb-4 flex justify-between w-full">
          <p>Total Students: {studentCount}</p>
          <p>Total Supervisors: {supervisorCount}</p>
        </div>

        <div className="mb-4">
          <label className="font-semibold mr-2">Filter by role:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded">
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
                  <th className="p-6 border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((user, index) => {
                  const statusData = getStatus(user.clockIn);
                  return (
                    <motion.tr
                      key={index}
                      className="text-sm text-gray-700 group hover:bg-gray-100"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.9, delay: index * 0.1 }}
                    >
                      <td className="p-6 border-b text-center">{user.role === "Student" ? user.studentNo : user.staffNo}</td>
                      <td className="p-6 border-b text-center">{user.surname}</td>
                      <td className="p-6 border-b text-center">{user.role}</td>
                      <td className="p-6 border-b text-center">{user.clockIn}</td>
                      <td className="p-6 border-b text-center">{user.clockOut}</td>
                      <td className="p-6 border-b text-center">
                        <div className="relative group">
                          <span className="text-xl">{statusData.icon}</span>
                          <div className="absolute opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 bottom-6 left-1/2 transform -translate-x-1/2">
                            {statusData.tooltip}
                          </div>
                        </div>
                      </td>
                      <td className="p-6 border-b text-center">{getCurrentDate()}</td>
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
