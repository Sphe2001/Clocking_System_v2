import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../../components/adminNavbar";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

// Convert backend data to displayable format
const transformWeeklyStudentData = (attendanceMap) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const result = [];

  for (const studentEmail in attendanceMap) {
    const student = attendanceMap[studentEmail];
    const weeklyAttendance = {
      surname: student.name,
      studentNo: student.studentNo,
    };

    daysOfWeek.forEach((day) => {
      const entry = Object.values(student.attendance).find(
        (a) => a.dayOfWeek === day
      );
      weeklyAttendance[day.toLowerCase()] = entry?.status === "Attended";
    });

    result.push(weeklyAttendance);
  }

  return result;
};

const AttendanceTable = ({ title, data }) => (
  <div className="table-container mb-8">
    <h3 className="text-lg font-bold mb-3 text-center">{title}</h3>
    <div className="overflow-y-auto shadow-lg rounded-xl bg-white">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-blue-600 text-white">
          <tr className="text-sm text-gray-100">
            <th className="p-4 border-b text-left">Surname</th>
            <th className="p-4 border-b text-left">Student Number</th>
            <th className="p-4 border-b text-center">Monday</th>
            <th className="p-4 border-b text-center">Tuesday</th>
            <th className="p-4 border-b text-center">Wednesday</th>
            <th className="p-4 border-b text-center">Thursday</th>
            <th className="p-4 border-b text-center">Friday</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student, index) => (
            <tr key={index} className="text-sm text-gray-700">
              <td className="p-4 border-b">{student.surname}</td>
              <td className="p-4 border-b">{student.studentNo}</td>
              <td className="p-4 border-b text-center">
                {student.monday ? "Present" : "Absent"}
              </td>
              <td className="p-4 border-b text-center">
                {student.tuesday ? "Present" : "Absent"}
              </td>
              <td className="p-4 border-b text-center">
                {student.wednesday ? "Present" : "Absent"}
              </td>
              <td className="p-4 border-b text-center">
                {student.thursday ? "Present" : "Absent"}
              </td>
              <td className="p-4 border-b text-center">
                {student.friday ? "Present" : "Absent"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const StudentReportsPage = () => {
    const domain = import.meta.env.VITE_REACT_APP_DOMAIN; 
  const [studentWeeklyAttendance, setStudentWeeklyAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeeklyAttendance = async () => {
      try {
        const res = await fetch(
          `${domain}/api/admin/student/weekreport`
        );
        if (!res.ok) throw new Error("Failed to fetch student attendance.");
        const data = await res.json();
        const transformed = transformWeeklyStudentData(data);
        setStudentWeeklyAttendance(transformed);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyAttendance();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar setProfileModalState={() => {}} />
      <motion.main
        className="flex-1 p-10 bg-white shadow-xl mx-auto w-3/4 text-center ml-64 flex flex-col items-center justify-center"
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "-100%" }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-3xl mb-6 text-blue font-extrabold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Student Weekly Attendance Report
        </motion.h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <AttendanceTable title="Students" data={studentWeeklyAttendance} />
        )}
      </motion.main>
    </div>
  );
};

export default StudentReportsPage;
