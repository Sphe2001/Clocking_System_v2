import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../../components/adminNavbar";

function AllUsers() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/admin/fetchAllStudentUsers");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/admin/fetchAllSupervisorUsers");
        const data = await response.json();
        setSupervisors(data);
      } catch (error) {
        console.error("Error fetching supervisors:", error);
      }
    };
    fetchSupervisors();
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
    <motion.div className="flex min-h-screen bg-gray-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <Sidebar />
      <main className="flex-1 p-10 bg-white shadow-xl w-full flex flex-col items-center">
        <h1 className="text-3xl mb-10 text-blue font-extrabold text-center">All System Users</h1>

        <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
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
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border p-2 rounded text-center w-64" placeholder="Surname or Student/Staff Number" />
          </div>
        </div>

        {loading ? (
          <div className="text-center text-blue-500 font-semibold flex justify-center items-center h-32">Loading users...</div>
        ) : filteredUsers.length === 0 && filteredSupervisors.length === 0 ? (
          <div className="text-center text-red-500 font-semibold flex justify-center items-center h-32">No records found.</div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <h2 className="text-xl mb-4 text-center">Students</h2>
            <div className="overflow-x-auto shadow-lg rounded-xl bg-white w-3/4">
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
                    <tr key={index} className="text-sm text-gray-700">
                      <td className="p-4 border-b">{user.studentNo}</td>
                      <td className="p-4 border-b">{user.surname}</td>
                      <td className="p-4 border-b">{user.initials}</td>
                      <td className="p-4 border-b">{user.role}</td>
                      <td className="p-4 border-b">{user.email}</td>
                      <td className="p-4 border-b">{user.contactNo}</td>
                      <td className="p-4 border-b">{user.verified ? "True" : "False"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </motion.div>
  );
}

export default AllUsers;