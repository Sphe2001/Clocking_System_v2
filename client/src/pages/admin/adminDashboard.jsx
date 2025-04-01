import React, { useState } from "react";
import Sidebar from "../../components/adminNavbar";

function AdminDashboard() {
  const [filter, setFilter] = useState("All");

  const dummyData = [
    { username: "john_doe", surname: "Doe", role: "Student", clockIn: "08:00 AM", clockOut: "04:00 PM" },
    { username: "jane_smith", surname: "Smith", role: "Supervisor", clockIn: "09:00 AM", clockOut: "05:00 PM" },
    { username: "alex_jones", surname: "Jones", role: "Student", clockIn: "08:30 AM", clockOut: "04:30 PM" },
    { username: "mary_jane", surname: "Jane", role: "Supervisor", clockIn: "09:30 AM", clockOut: "05:30 PM" },
    { username: "sam_williams", surname: "Williams", role: "Student", clockIn: "08:00 AM", clockOut: "03:00 PM" },
  ];

  const filteredData = filter === "All" ? dummyData : dummyData.filter(user => user.role === filter);

  const totalStudents = dummyData.filter(user => user.role === "Student").length;
  const totalSupervisors = dummyData.filter(user => user.role === "Supervisor").length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
    

      <main className="flex-1 p-10 bg-white shadow-xl">
        <h1 className="text-3xl mb-10 text-blue font-extrabold text-center">Admin Panel</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md border border-gray-300">
            <h3 className="text-lg font-semibold text-center mb-2">Total Students vs Supervisors</h3>
            <div className="flex justify-between text-lg font-semibold text-gray-800">
              <span>Students: {totalStudents}</span>
              <span>Supervisors: {totalSupervisors}</span>
            </div>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg shadow-md border border-gray-300">
            <h3 className="text-lg font-semibold text-center mb-2">Total Attendance (Students vs Supervisors) - Today</h3>
            <div className="flex justify-between text-lg font-semibold text-gray-800">
              <span>Students: {totalStudents}</span>
              <span>Supervisors: {totalSupervisors}</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="font-semibold mr-2">Filter by role:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded">
            <option value="All">All</option>
            <option value="Student">Students</option>
            <option value="Supervisor">Supervisors</option>
          </select>
        </div>

            <div className="overflow-y-auto max-h-60 shadow-lg rounded-xl bg-white">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-blue-100 sticky top-0">
          <tr className="text-sm text-gray-700">
            <th className="p-4 border-b">Username</th>
            <th className="p-4 border-b">Surname</th>
            <th className="p-4 border-b">Role</th>
            <th className="p-4 border-b">Clock In</th>
            <th className="p-4 border-b">Clock Out</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user, index) => (
            <tr key={index} className="text-sm text-gray-700">
              <td className="p-4 border-b">{user.username}</td>
              <td className="p-4 border-b">{user.surname}</td>
              <td className="p-4 border-b">{user.role}</td>
              <td className="p-4 border-b">{user.clockIn}</td>
              <td className="p-4 border-b">{user.clockOut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
