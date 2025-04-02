import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../components/adminNavbar";

function AdminDashboard() {
  const [filter, setFilter] = useState("All");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await fetch("http://localhost:3001/api/admin/fetchAllStudentUsers");
        const supervisorsResponse = await fetch("http://localhost:3001/api/admin/fetchAllSupervisorUsers");

        const studentsData = await studentsResponse.json();
        const supervisorsData = await supervisorsResponse.json();

        const formattedStudents = studentsData.map(student => ({
          username: student.username,
          surname: student.surname,
          role: "Student",
          clockIn: student.clock_in_time || "N/A",
          clockOut: student.clock_out_time || "N/A"
        }));

        const formattedSupervisors = supervisorsData.map(supervisor => ({
          username: supervisor.username,
          surname: supervisor.surname,
          role: "Supervisor",
          clockIn: supervisor.clock_in_time || "N/A",
          clockOut: supervisor.clock_out_time || "N/A"
        }));

        setUsers([...formattedStudents, ...formattedSupervisors]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = filter === "All" ? users : users.filter(user => user.role === filter);
  const totalStudents = users.filter(user => user.role === "Student").length;
  const totalSupervisors = users.filter(user => user.role === "Supervisor").length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <motion.main 
        className="flex-1 p-10 bg-white shadow-xl ml-64 flex flex-col items-center justify-center"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl mb-10 text-blue-800 font-extrabold text-center">Admin Panel</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div 
            className="bg-yellow-100 p-4 rounded-lg shadow-md border border-gray-300"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-center mb-2">Total Students vs Supervisors</h3>
            <div className="flex justify-between text-lg font-semibold text-gray-800">
              <span>Students: {totalStudents}</span>
              <span>Supervisors: {totalSupervisors}</span>
            </div>
          </motion.div>

          <motion.div 
            className="bg-blue-100 p-4 rounded-lg shadow-md border border-gray-300"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-center mb-2">Total Attendance - Today</h3>
            <div className="flex justify-between text-lg font-semibold text-gray-800">
              <span>Students: {totalStudents}</span>
              <span>Supervisors: {totalSupervisors}</span>
            </div>
          </motion.div>
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
            transition={{ duration: 0.6 }}
          >
            Loading...
          </motion.p>
        ) : (
          <motion.div 
            className="overflow-x-auto max-h-96 shadow-lg rounded-xl bg-white w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-blue-100 top-0">
                <tr className="text-sm text-gray-700">
                  <th className="p-6 border-b">Username</th>
                  <th className="p-6 border-b">Surname</th>
                  <th className="p-6 border-b">Role</th>
                  <th className="p-6 border-b">Clock In</th>
                  <th className="p-6 border-b">Clock Out</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((user, index) => (
                  <motion.tr 
                    key={index}
                    className="text-sm text-gray-700"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <td className="p-6 border-b text-center">{user.username}</td>
                    <td className="p-6 border-b text-center">{user.surname}</td>
                    <td className="p-6 border-b text-center">{user.role}</td>
                    <td className="p-6 border-b text-center">{user.clockIn}</td>
                    <td className="p-6 border-b text-center">{user.clockOut}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </motion.main>
    </div>
  );
}

export default AdminDashboard;
