import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../../components/adminNavbar";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

// Reusable Attendance Table Component
const AttendanceTable = ({ title, data, isProfileOpen }) => (
  <div className="table-container mb-8">
    <h3 className="table-title text-lg font-bold mb-3 text-center">{title}</h3>
    <div className="overflow-y-auto shadow-lg rounded-xl bg-white">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead
          className={`bg-blue-600 text-white top-0 ${
            isProfileOpen ? "hidden" : ""
          }`}
        >
          <tr className="text-sm text-gray-100">
            <th className="p-4 border-b text-left">Surname</th>
            <th className="p-4 border-b text-left">Staff/Student Number</th>
            <th className="p-4 border-b text-center">Monday</th>
            <th className="p-4 border-b text-center">Tuesday</th>
            <th className="p-4 border-b text-center">Wednesday</th>
            <th className="p-4 border-b text-center">Thursday</th>
            <th className="p-4 border-b text-center">Friday</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person, index) => {
            // Ensure both staffNo and studentNo are displayed dynamically
            const id = person.staffNo || person.studentNo || "-"; // Updated field names
            const surname = person.surname || person.name || "-"; // Assuming surname or name exists
            return (
              <tr key={index} className="text-sm text-gray-700">
                <td className="p-4 border-b">{surname}</td>
                <td className="p-4 border-b">{id}</td>
                <td className="p-4 border-b text-center">
                  {person.monday ? "Present" : "Absent"}
                </td>
                <td className="p-4 border-b text-center">
                  {person.tuesday ? "Present" : "Absent"}
                </td>
                <td className="p-4 border-b text-center">
                  {person.wednesday ? "Present" : "Absent"}
                </td>
                <td className="p-4 border-b text-center">
                  {person.thursday ? "Present" : "Absent"}
                </td>
                <td className="p-4 border-b text-center">
                  {person.friday ? "Present" : "Absent"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

// Main Reports Component
const Reports = ({ isProfileOpen }) => {
  const [supervisors, setSupervisors] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exportType, setExportType] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [supervisorRes, studentRes] = await Promise.all([
          fetch(
            "http://localhost:3001/api/admin/fetchAllSupervisorUsers/supervisorUsers"
          ),
          fetch("http://localhost:3001/api/admin/fetchAllStudentUsers/users"),
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

  const handleExport = () => {
    let title = "Attendance Report";
    let data = [];

    if (exportType === "supervisors") {
      title = "Supervisors Attendance Report";
      data = supervisors;
    } else if (exportType === "students") {
      title = "Students Attendance Report";
      data = students;
    } else {
      title = "All Attendance Report";
      data = [...supervisors, ...students];
    }

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: title, bold: true, size: 32 }),
                new TextRun("\n\n"),
              ],
            }),
            ...data.map(
              (person) =>
                new Paragraph(
                  `${person.surname || person.name || "-"} (${
                    person.studentNo || person.staffNo || "-"
                  }) - ` +
                    `Mon: ${person.monday ? "Present" : "Absent"}, ` +
                    `Tue: ${person.tuesday ? "Present" : "Absent"}, ` +
                    `Wed: ${person.wednesday ? "Present" : "Absent"}, ` +
                    `Thu: ${person.thursday ? "Present" : "Absent"}, ` +
                    `Fri: ${person.friday ? "Present" : "Absent"}`
                )
            ),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `${title.replace(/\s+/g, "_")}.docx`);
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar setProfileModalState={() => {}} />
      <motion.main
        className="reports-main flex-1 p-10 bg-white shadow-xl mx-auto w-3/4 text-center ml-64 flex flex-col items-center justify-center"
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "-100%" }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="report-heading text-3xl mb-6 text-blue font-extrabold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Weekly Attendance Report
        </motion.h2>

        <div className="mb-8 flex items-center justify-center gap-4">
          <select
            className="border border-gray-300 rounded-md px-4 py-2 text-sm"
            value={exportType}
            onChange={(e) => setExportType(e.target.value)}
          >
            <option value="all">Export All</option>
            <option value="students">Export Students Only</option>
            <option value="supervisors">Export Supervisors Only</option>
          </select>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            onClick={handleExport}
          >
            Export DOCX
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="tables-wrapper">
            {exportType === "all" && (
              <>
                <AttendanceTable
                  title="Supervisors"
                  data={supervisors}
                  isProfileOpen={isProfileOpen}
                />
                <AttendanceTable
                  title="Students"
                  data={students}
                  isProfileOpen={isProfileOpen}
                />
              </>
            )}
            {exportType === "students" && (
              <AttendanceTable
                title="Students"
                data={students}
                isProfileOpen={isProfileOpen}
              />
            )}
            {exportType === "supervisors" && (
              <AttendanceTable
                title="Supervisors"
                data={supervisors}
                isProfileOpen={isProfileOpen}
              />
            )}
          </div>
        )}
      </motion.main>
    </div>
  );
};

export default Reports;
