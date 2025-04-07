import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../../components/adminNavbar";
import { fetchSupervisors, fetchStudents } from "../../../../../server/src/helpers/fetchUsers";

function AllUsers() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users and supervisors using the API service
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchStudents();
        setUsers(userData);
        const supervisorData = await fetchSupervisors();
        setSupervisors(supervisorData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredUsers = users.filter((user) => {
    const userRole = user.role?.trim().toLowerCase() || "";
    const searchText = searchQuery.toLowerCase();
    if (filter === "All") {
      return user.surname.toLowerCase().includes(searchText) || user.studentNo.toString().includes(searchText);
    }
    return userRole === filter.toLowerCase() && (user.surname.toLowerCase().includes(searchText) || user.studentNo.toString().includes(searchText));
  });

  const filteredSupervisors = supervisors.filter((supervisor) => {
    const supervisorRole = supervisor.role?.trim().toLowerCase() || "";
    const searchText = searchQuery.toLowerCase();
    if (filter === "All") {
      return supervisor.surname.toLowerCase().includes(searchText) || supervisor.staffNo.toString().includes(searchText);
    }
    return supervisorRole === filter.toLowerCase() && (supervisor.surname.toLowerCase().includes(searchText) || supervisor.staffNo.toString().includes(searchText));
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <motion.main
        className="flex-1 p-10 bg-white shadow-xl w-full flex flex-col items-center ml-64 flex flex-col items-center justify-center"
        initial={{ opacity: 0, x: "100%" }}  // Starts from the right
        animate={{ opacity: 1, x: 0 }}      // Moves to center
        exit={{ opacity: 0, x: "-100%" }}   // Moves to the left when exiting
        transition={{ duration: 0.8 }}      // Transition duration
      >
        <motion.h1
          className="text-3xl mb-10 text-blue font-extrabold text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}  // Content appears after main transition
        >
          All System Users
        </motion.h1>

        <motion.div
          className="flex flex-col md:flex-row gap-4 items-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}  // Filter appears after title
        >
          <div className="flex flex-col">
            <label className="font-semibold text-center mb-1">Filter by role:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded text-center">
              <option value="All">All</option>
              <option value="Student">Student</option>
              <option value="Supervisor">Supervisor</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-center mb-1">Search:</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 rounded text-center w-64"
              placeholder="Surname or Student/Staff Number"
            />
          </div>
        </motion.div>

        {loading ? (
          <motion.div
            className="text-center text-blue-500 font-semibold flex justify-center items-center h-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            Loading users...
          </motion.div>
        ) : filteredUsers.length === 0 && filteredSupervisors.length === 0 ? (
          <motion.div
            className="text-center text-red-500 font-semibold flex justify-center items-center h-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            No records found.
          </motion.div>
        ) : (
          <motion.div
            className="w-full flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            {/* Students Table */}
            <motion.h2
              className="text-xl mb-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}  // Content fades in after filters
            >
              Students
            </motion.h2>
            <motion.div
              className="overflow-x-auto shadow-lg rounded-xl bg-white w-3/4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9 }}
            >
              <table className="w-full border-collapse border border-gray-300 text-center">
                <thead className="bg-blue-100">
                  <tr className="text-sm text-gray-700">
                    <th className="p-4 border-b">Student Number</th>
                    <th className="p-4 border-b">Surname</th>
                    <th className="p-4 border-b">Initials</th>
                    <th className="p-4 border-b">Role</th>
                    <th className="p-4 border-b">Email</th>
                    <th className="p-4 border-b">Contact No</th>
                    <th className="p-4 border-b">Verified</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <motion.tr
                      key={index}
                      className="text-sm text-gray-700"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.9, delay: index * 0.1 }}
                    >
                      <td className="p-4 border-b">{user.studentNo}</td>
                      <td className="p-4 border-b">{user.surname}</td>
                      <td className="p-4 border-b">{user.initials}</td>
                      <td className="p-4 border-b">{user.role}</td>
                      <td className="p-4 border-b">{user.email}</td>
                      <td className="p-4 border-b">{user.contactNo}</td>
                      <td className="p-4 border-b">{user.verified ? "True" : "False"}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Supervisors Table */}
            <motion.h2
              className="text-xl mt-10 mb-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}  // Content fades in after students section
            >
              Supervisors
            </motion.h2>
            <motion.div
              className="overflow-x-auto shadow-lg rounded-xl bg-white w-3/4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9 }}
            >
              <table className="w-full border-collapse border border-gray-300 text-center">
                <thead className="bg-blue-100">
                  <tr className="text-sm text-gray-700">
                    <th className="p-4 border-b">Staff Number</th>
                    <th className="p-4 border-b">Surname</th>
                    <th className="p-4 border-b">Email</th>
                    <th className="p-4 border-b">Role</th>
                    <th className="p-4 border-b">Contact No</th>
                    <th className="p-4 border-b">Specialization</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSupervisors.map((supervisor, index) => (
                    <motion.tr
                      key={index}
                      className="text-sm text-gray-700"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.9, delay: index * 0.1 }}
                    >
                      <td className="p-4 border-b">{supervisor.staffNo}</td>
                      <td className="p-4 border-b">{supervisor.surname}</td>
                      <td className="p-4 border-b">{supervisor.email}</td>
                      <td className="p-4 border-b">{supervisor.role}</td>
                      <td className="p-4 border-b">{supervisor.contactNo}</td>
                      <td className="p-4 border-b">{supervisor.specialization}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        )}
      </motion.main>
    </div>
  );
}

export default AllUsers;
