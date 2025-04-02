import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import motion for transitions
import Sidebar from "../../../components/adminNavbar";

const AttendanceTable = ({ title, data, isProfileOpen }) => (
  <div className="table-container mb-8">
    <h3 className="table-title text-lg font-bold mb-3 text-center">{title}</h3>
    <div className="overflow-y-auto shadow-lg rounded-xl bg-white">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className={`bg-blue-600 text-white top-0 ${isProfileOpen ? "hidden" : ""}`}>
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
              <td className="p-4 border-b text-center">{person.monday || "-"}</td>
              <td className="p-4 border-b text-center">{person.tuesday || "-"}</td>
              <td className="p-4 border-b text-center">{person.wednesday || "-"}</td>
              <td className="p-4 border-b text-center">{person.thursday || "-"}</td>
              <td className="p-4 border-b text-center">{person.friday || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Reports = ({ isProfileOpen }) => {
  const [supervisors, setSupervisors] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [supervisorRes, studentRes] = await Promise.all([
          fetch("http://localhost:3001/api/admin/fetchAllSupervisorUsers"),
          fetch("http://localhost:3001/api/admin/fetchAllStudentUsers"),
        ]);

        if (!supervisorRes.ok || !studentRes.ok) {
          throw new Error("Failed to fetch attendance data");
        }

        const supervisorsData = await supervisorRes.json();
        const studentsData = await studentRes.json();

        setSupervisors(supervisorsData);
        setStudents(studentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
      className="flex min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Sidebar setProfileModalState={() => {}} />
      <main className="reports-main flex-1 p-10 bg-white shadow-xl mx-auto w-3/4 text-center">
        <h2 className="report-heading text-3xl mb-10 text-blue font-extrabold">Weekly Attendance Report</h2>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="tables-wrapper">
            <AttendanceTable title="Supervisors" data={supervisors} isProfileOpen={isProfileOpen} />
            <AttendanceTable title="Students" data={students} isProfileOpen={isProfileOpen} />
          </div>
        )}
      </main>
    </motion.div>
  );
};

export default Reports;