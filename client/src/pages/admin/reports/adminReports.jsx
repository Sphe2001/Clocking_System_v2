import React from "react";
import Sidebar from "../../../components/adminNavbar";

const attendanceData = [
  { name: "John Doe", role: "Supervisor", monday: "✔", tuesday: "✔", wednesday: "✔", thursday: "✘", friday: "✔" },
  { name: "Jane Smith", role: "Student", monday: "✔", tuesday: "✘", wednesday: "✔", thursday: "✔", friday: "✔" },
  { name: "Alice Brown", role: "Supervisor", monday: "✔", tuesday: "✔", wednesday: "✘", thursday: "✔", friday: "✔" },
  { name: "Bob Johnson", role: "Student", monday: "✔", tuesday: "✔", wednesday: "✔", thursday: "✔", friday: "✘" },
];

const AttendanceTable = ({ title, data, isProfileOpen }) => (
  <div className="table-container mb-8">
    <h3 className="table-title text-lg font-bold mb-3">{title}</h3>
    <div className="overflow-y-auto shadow-lg rounded-xl bg-white">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className={`bg-blue-600 text-white  top-0 ${isProfileOpen ? "hidden" : ""}`}>
          <tr className="text-sm text-gray-100">
            <th className="p-4 border-b text-left">Name</th>
            <th className="p-4 border-b text-center">Monday</th>
            <th className="p-4 border-b text-center">Tuesday</th>
            <th className="p-4 border-b text-center">Wednesday</th>
            <th className="p-4 border-b text-center">Thursday</th>
            <th className="p-4 border-b text-center">Friday</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person, index) => (
            <tr key={index} className="text-sm text-gray-700">
              <td className="p-4 border-b">{person.name}</td>
              <td className="p-4 border-b text-center">{person.monday}</td>
              <td className="p-4 border-b text-center">{person.tuesday}</td>
              <td className="p-4 border-b text-center">{person.wednesday}</td>
              <td className="p-4 border-b text-center">{person.thursday}</td>
              <td className="p-4 border-b text-center">{person.friday}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Reports = ({ isProfileOpen }) => (
  <div className="d-flex vh-100">
    <Sidebar setProfileModalState={() => {}} />
    <main className="reports-main flex-1 p-10 bg-white shadow-xl">
      <h2 className="report-heading text-3xl mb-10 text-blue font-extrabold text-center">Weekly Attendance Report</h2>
      
      <div className="tables-wrapper">
        <AttendanceTable title="Supervisors" data={attendanceData.filter(p => p.role === "Supervisor")} isProfileOpen={isProfileOpen} />
        <AttendanceTable title="Students" data={attendanceData.filter(p => p.role === "Student")} isProfileOpen={isProfileOpen} />
      </div>
    </main>
  </div>
);

export default Reports;
