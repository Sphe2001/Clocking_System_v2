import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/adminNavbar";

const Reports = () => {
  const navigate = useNavigate();

  // Static sample data
  const attendanceData = [
    { name: "John Doe", role: "Supervisor", monday: "✔", tuesday: "✔", wednesday: "✔", thursday: "✘", friday: "✔" },
    { name: "Jane Smith", role: "Student", monday: "✔", tuesday: "✘", wednesday: "✔", thursday: "✔", friday: "✔" },
    { name: "Alice Brown", role: "Supervisor", monday: "✔", tuesday: "✔", wednesday: "✘", thursday: "✔", friday: "✔" },
    { name: "Bob Johnson", role: "Student", monday: "✔", tuesday: "✔", wednesday: "✔", thursday: "✔", friday: "✘" },
  ];

  const supervisors = attendanceData.filter(person => person.role === "Supervisor");
  const students = attendanceData.filter(person => person.role === "Student");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Component */}
      <Sidebar />

      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Weekly Attendance Report</h2>

          {/* Supervisors Table */}
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Supervisors</h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4">Monday</th>
                  <th className="p-4">Tuesday</th>
                  <th className="p-4">Wednesday</th>
                  <th className="p-4">Thursday</th>
                  <th className="p-4">Friday</th>
                </tr>
              </thead>
              <tbody>
                {supervisors.map((person, index) => (
                  <tr key={index} className="border-b text-gray-700 hover:bg-gray-100">
                    <td className="p-4">{person.name}</td>
                    <td className="p-4 text-center">{person.monday}</td>
                    <td className="p-4 text-center">{person.tuesday}</td>
                    <td className="p-4 text-center">{person.wednesday}</td>
                    <td className="p-4 text-center">{person.thursday}</td>
                    <td className="p-4 text-center">{person.friday}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Students Table */}
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Students</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4">Monday</th>
                  <th className="p-4">Tuesday</th>
                  <th className="p-4">Wednesday</th>
                  <th className="p-4">Thursday</th>
                  <th className="p-4">Friday</th>
                </tr>
              </thead>
              <tbody>
                {students.map((person, index) => (
                  <tr key={index} className="border-b text-gray-700 hover:bg-gray-100">
                    <td className="p-4">{person.name}</td>
                    <td className="p-4 text-center">{person.monday}</td>
                    <td className="p-4 text-center">{person.tuesday}</td>
                    <td className="p-4 text-center">{person.wednesday}</td>
                    <td className="p-4 text-center">{person.thursday}</td>
                    <td className="p-4 text-center">{person.friday}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
