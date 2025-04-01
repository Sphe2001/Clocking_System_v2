import React, { useState } from "react";
import Sidebar from "../../../components/adminNavbar";

function AllUsers() {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // New state for the search term

  const dummyData = [
    { username: "john_doe", surname: "Doe", role: "Student", email: "john_doe@tut4life.ac.za", contactNo: "2342565358", verified: "False" },
    { username: "jane_smith", surname: "Smith", role: "Supervisor", email: "jane_smith@tut.ac.za", contactNo: "0986712353", verified: "True" },
    { username: "alex_jones", surname: "Jones", role: "Student", email: "alex_jones@tut4life.ac.za", contactNo: "8575229076", verified: "False" },
    { username: "mary_jane", surname: "Jane", role: "Supervisor", email: "mary_jane@tut.ac.za", contactNo: "1290873465", verified: "True" },
    { username: "sam_williams", surname: "Williams", role: "Student", email: "sam_williams@tut4life.ac.za", contactNo: "9087245753", verified: "True" },
  ];

  // Filter data based on role and search term
  const filteredData = dummyData
    .filter(user => (filter === "All" ? true : user.role === filter)) // Role filter
    .filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase())); // Username search filter

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-10 bg-white shadow-xl w-full">
        <h1 className="text-3xl mb-10 text-blue font-extrabold text-center">All System Users</h1>

        <div className="mb-4">
          <label className="font-semibold mr-2">Filter by role:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded">
            <option value="All">All</option>
            <option value="Student">Students</option>
            <option value="Supervisor">Supervisors</option>
          </select>
        </div>

        {/* Username Search Input */}
        <div className="mb-4">
          <label className="font-semibold mr-2">Search by Username:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter username"
            className="border p-2 rounded"
          />
        </div>

        {/* Check if no records are found */}
        {filteredData.length === 0 ? (
          <div className="text-center text-red-500 font-semibold">
            No records found.
          </div>
        ) : (
          <div className="overflow-x-auto max-h-80 shadow-lg rounded-xl bg-white">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-blue-100  top-0">
                <tr className="text-sm text-gray-700">
                  <th className="p-4 border-b">Username</th>
                  <th className="p-4 border-b">Surname</th>
                  <th className="p-4 border-b">Role</th>
                  <th className="p-4 border-b">Email</th>
                  <th className="p-4 border-b">ContactNo</th>
                  <th className="p-4 border-b">Verified</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((user, index) => (
                  <tr key={index} className="text-sm text-gray-700">
                    <td className="p-4 border-b">{user.username}</td>
                    <td className="p-4 border-b">{user.surname}</td>
                    <td className="p-4 border-b">{user.role}</td>
                    <td className="p-4 border-b">{user.email}</td>
                    <td className="p-4 border-b">{user.contactNo}</td>
                    <td className="p-4 border-b">{user.verified}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default AllUsers;
