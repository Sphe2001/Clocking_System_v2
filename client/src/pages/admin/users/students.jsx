import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Step 1
import Sidebar from "../../../components/adminNavbar";

function StudentsPage() {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const navigate = useNavigate(); // Step 2

  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${domain}/api/admin/users/students`);
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    const searchText = searchQuery.toLowerCase();
    return (
      student.surname.toLowerCase().includes(searchText) ||
      student.studentNo.toString().includes(searchText)
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <motion.main
        className="flex-1 p-10 bg-white shadow-xl w-full flex flex-col items-center ml-64"
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "-100%" }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-3xl mb-10 text-blue font-extrabold text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          All Students
        </motion.h1>

        {/* ➕ Add Student Button */}
        <motion.button
          onClick={() => navigate("/dashboard/admin/registerstudentpage")} // Step 3
          className="mb-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          + Add New Student
        </motion.button>

        <motion.div
          className="flex flex-col gap-4 items-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="flex flex-col">
            <label className="font-semibold text-center mb-1">Search:</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 rounded text-center w-64"
              placeholder="Surname or Student Number"
            />
          </div>
        </motion.div>

        {loading ? (
          <motion.div
            className="text-center text-blue-500 font-semibold flex justify-center items-center h-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            Loading students...
          </motion.div>
        ) : filteredStudents.length === 0 ? (
          <motion.div
            className="text-center text-red-500 font-semibold flex justify-center items-center h-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            No student records found.
          </motion.div>
        ) : (
          <motion.div
            className="w-full flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <motion.div
              className="overflow-x-auto shadow-lg rounded-xl bg-white w-3/4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9 }}
            >
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
                  {filteredStudents.map((student, index) => (
                    <motion.tr
                      key={index}
                      className="text-sm text-gray-700"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.9, delay: index * 0.1 }}
                    >
                      <td className="p-4 border-b">{student.studentNo}</td>
                      <td className="p-4 border-b">{student.surname}</td>
                      <td className="p-4 border-b">{student.initials}</td>
                      <td className="p-4 border-b">{student.role}</td>
                      <td className="p-4 border-b">{student.email}</td>
                      <td className="p-4 border-b">{student.contactNo}</td>
                      <td className="p-4 border-b">{student.isVerified ? "True" : "False"}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        )}
      </motion.main>
    </div>
  );
}

export default StudentsPage;
