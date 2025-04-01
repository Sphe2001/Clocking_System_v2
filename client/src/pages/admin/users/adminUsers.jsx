import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/adminNavbar";

function AllUsers() {
  const [filter, setFilter] = useState("All"); // State for the role filter
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [users, setUsers] = useState([]); // State for users data
  const [supervisors, setSupervisors] = useState([]); // State for supervisor data
  const [loading, setLoading] = useState(true); // State to manage loading

  // Fetch users data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/admin/users");
        const data = await response.json();
        setUsers(data); // Store users data in state
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch supervisors data when the component mounts
  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/admin/supervisorUsers");
        const data = await response.json();
        setSupervisors(data); // Set supervisors data to state
      } catch (error) {
        console.error("Error fetching supervisors:", error);
      }
    };
    fetchSupervisors();
  }, []);

  // Filter users based on selected role and search query
  const filteredUsers = users.filter((user) => {
    const userRole = user.role ? user.role.trim().toLowerCase() : "";
    const selectedRole = filter.toLowerCase();
    const searchText = searchQuery.toLowerCase();
    
    if (filter === "All") {
      return (
        user.surname.toLowerCase().includes(searchText) || 
        user.studentNo.toString().includes(searchText)
      ); // Show all users with search filter
    }
    return (
      userRole === selectedRole &&
      (user.surname.toLowerCase().includes(searchText) || 
      user.studentNo.toString().includes(searchText))
    ); // Filter based on role and search query
  });

  // Filter supervisors based on selected role and search query
  const filteredSupervisors = supervisors.filter((supervisor) => {
    const supervisorRole = supervisor.role ? supervisor.role.trim().toLowerCase() : "";
    const selectedRole = filter.toLowerCase();
    const searchText = searchQuery.toLowerCase();

    if (filter === "All") {
      return (
        supervisor.surname.toLowerCase().includes(searchText) || 
        supervisor.staffNo.toString().includes(searchText)
      ); // Show all supervisors with search filter
    }
    return (
      supervisorRole === selectedRole &&
      (supervisor.surname.toLowerCase().includes(searchText) || 
      supervisor.staffNo.toString().includes(searchText))
    ); // Filter based on role and search query
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-10 bg-white shadow-xl w-full ml-40">
        <h1 className="text-3xl mb-10 text-blue font-extrabold text-center">All System Users</h1>

        {/* Role Filter Dropdown */}
        <div className="mb-4">
          <label className="font-semibold mr-2">Filter by role:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)} // Update filter state on change
            className="border p-2 rounded"
          >
            <option value="All">All</option>
            <option value="Student">student</option>
            <option value="Supervisor">Supervisors</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <label className="font-semibold mr-2">Search by surname or Student/Staff number:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
            className="border p-2 rounded w-1/4"
            placeholder="Enter surname or student/staff number"
          />
        </div>

        {/* Check if data is loading */}
        {loading ? (
          <div className="text-center text-blue-500 font-semibold">Loading users...</div>
        ) : (
          <div>
            {/* Check if no records are found */}
            {filteredUsers.length === 0 && filteredSupervisors.length === 0 ? (
              <div className="text-center text-red-500 font-semibold">
                No records found.
              </div>
            ) : (
              <div>
                {/* Users Table */}
                <h2 className="text-xl mb-4">Students</h2>
                <div className="overflow-x-auto max-h-80 shadow-lg rounded-xl bg-white mb-6">
                  <table className="w-full table-auto border-collapse border border-gray-300">
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

                {/* Supervisors Table */}
                <h2 className="text-xl mb-4">Supervisors</h2>
                <div className="overflow-x-auto max-h-80 shadow-lg rounded-xl bg-white">
                  <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead className="bg-blue-100">
                      <tr className="text-sm text-gray-700">
                        <th className="p-4 border-b">Staff Number</th>
                        <th className="p-4 border-b">Surname</th>
                        <th className="p-4 border-b">Initials</th>
                        <th className="p-4 border-b">Role</th>
                        <th className="p-4 border-b">Email</th>
                        <th className="p-4 border-b">Contact No</th>
                        <th className="p-4 border-b">Verified</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSupervisors.map((supervisor, index) => (
                        <tr key={index} className="text-sm text-gray-700">
                          <td className="p-4 border-b">{supervisor.staffNo}</td>
                          <td className="p-4 border-b">{supervisor.surname}</td>
                          <td className="p-4 border-b">{supervisor.initials}</td>
                          <td className="p-4 border-b">{supervisor.role}</td>
                          <td className="p-4 border-b">{supervisor.email}</td>
                          <td className="p-4 border-b">{supervisor.contactNo}</td>
                          <td className="p-4 border-b">{supervisor.verified ? "True" : "False"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default AllUsers;
