import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/adminNavbar";

function StudentsPage() {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    const searchText = searchQuery.toLowerCase();
    return (
      student.surname.toLowerCase().includes(searchText) ||
      student.studentNo.toString().includes(searchText)
    );
  });

  const handleDisableUser = async (id) => {
    const confirmDisable = window.confirm("Are you sure you want to disable this user?");
    if (!confirmDisable) return;

    try {
      const response = await fetch(`${domain}/api/auth/disable/user/${id}`, {
        method: "POST",
      });

      const result = await response.json();

      if (response.ok) {
        alert("User disabled successfully.");
        fetchStudents();
      } else {
        alert(result.message || "Failed to disable user.");
      }
    } catch (error) {
      console.error("Error disabling user:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <motion.main
        className="flex-1 p-8 bg-white shadow-xl ml-[260px] w-full"
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "-100%" }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl font-bold text-blue-700 text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          All Students
        </motion.h1>

        <motion.button
          onClick={() => navigate("/dashboard/admin/registerstudentpage")}
          className="mb-6 px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition duration-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          + Add New Student
        </motion.button>

        <motion.div
          className="flex flex-col items-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <label className="font-medium text-gray-700 mb-2">Search:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 p-2 rounded w-72 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Surname or Student Number"
          />
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
            className="w-full overflow-x-auto max-w-6xl mx-auto rounded-xl shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <table className="min-w-full table-auto border-collapse border border-gray-300 text-center bg-white">
              <thead className="bg-blue-100 text-gray-800 text-sm">
                <tr>
                  <th className="p-4 border-b">Student Number</th>
                  <th className="p-4 border-b">Surname</th>
                  <th className="p-4 border-b">Initials</th>
                  <th className="p-4 border-b">Role</th>
                  <th className="p-4 border-b">Email</th>
                  <th className="p-4 border-b">Contact No</th>
                  <th className="p-4 border-b">Verified</th>
                  <th className="p-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <motion.tr
                    key={index}
                    className="text-sm text-gray-700"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <td className="p-4 border-b">{student.studentNo}</td>
                    <td className="p-4 border-b">{student.surname}</td>
                    <td className="p-4 border-b">{student.initials}</td>
                    <td className="p-4 border-b">{student.role}</td>
                    <td className="p-4 border-b">{student.email}</td>
                    <td className="p-4 border-b">{student.contactNo}</td>
                    <td className="p-4 border-b">{student.isVerified ? "True" : "False"}</td>
                    <td className="p-4 border-b">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => navigate(`/dashboard/admin/editstudent/${student.id}`)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm shadow"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDisableUser(student.studentNo)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm shadow"
                        >
                          Disable
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </motion.main>
    </div>
  );
}

export default StudentsPage;
