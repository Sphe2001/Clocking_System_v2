import React from "react";
import Sidebar from "../../../components/adminNavbar";

const attendanceData = [
  { name: "John Doe", role: "Supervisor", monday: "✔", tuesday: "✔", wednesday: "✔", thursday: "✘", friday: "✔" },
  { name: "Jane Smith", role: "Student", monday: "✔", tuesday: "✘", wednesday: "✔", thursday: "✔", friday: "✔" },
  { name: "Alice Brown", role: "Supervisor", monday: "✔", tuesday: "✔", wednesday: "✘", thursday: "✔", friday: "✔" },
  { name: "Bob Johnson", role: "Student", monday: "✔", tuesday: "✔", wednesday: "✔", thursday: "✔", friday: "✘" },
];

const AttendanceTable = ({ title, data }) => (
  <div className="table-container">
    <h3 className="table-title text-lg font-bold mb-3 w-100">{title}</h3>
    <table className="attendance-table table-bordered w-100">
      <thead>
        <tr>
          <th>Name</th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
        </tr>
      </thead>
      <tbody>
        {data.map((person, index) => (
          <tr key={index}>
            <td>{person.name}</td>
            <td>{person.monday}</td>
            <td>{person.tuesday}</td>
            <td>{person.wednesday}</td>
            <td>{person.thursday}</td>
            <td>{person.friday}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Reports = () => (
  <div className="d-flex vh-100">
    <Sidebar />
    <main className="reports-main">
      <h2 className="report-heading">Weekly Attendance Report</h2>
      
      <div className="tables-wrapper">
        <AttendanceTable title="Supervisors" data={attendanceData.filter(p => p.role === "Supervisor")} />
        <AttendanceTable title="Students" data={attendanceData.filter(p => p.role === "Student")} />
      </div>
    </main>
  </div>
);

export default Reports;
