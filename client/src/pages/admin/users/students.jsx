import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/adminNavbar";
import axios from "axios";

function StudentsPage() {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    surname: "",
    initials: "",
    specialization: ""
  });
  const [updateStatus, setUpdateStatus] = useState("");

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

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setFormData({
      surname: student.surname || "",
      initials: student.initials || "",
      specialization: student.specialization || ""
    });
    setShowEditModal(true);
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent) return;

    try {
      const response = await axios.post(
        `${domain}/api/admin/edit/studentProfile/${selectedStudent.studentNo}`,
        formData,
        { withCredentials: true }
      );

      setUpdateStatus(response.data.message || "Profile updated.");
      fetchStudents();
      setTimeout(() => setShowEditModal(false), 1500);
    } catch (error) {
      setUpdateStatus(error.response?.data?.message || "Update failed.");
    }
  };

  const handleDisableUser = async (studentNo) => {
    const confirmDisable = window.confirm("Are you sure you want to disable this user?");
    if (!confirmDisable) return;

    try {
      const response = await fetch(`${domain}/api/auth/disable/user/${studentNo}`, {
        method: "POST"
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

  const filteredStudents = students.filter((student) => {
    const searchText = searchQuery.toLowerCase();
    return (
      student.surname.toLowerCase().includes(searchText) ||
      student.studentNo.toString().includes(searchText)
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <motion.main className="flex-1 p-8 bg-white shadow-xl ml-[260px] w-full">
        {/* Header */}
        <motion.h1 className="text-4xl font-bold text-blue-700 text-center mb-8">All Students</motion.h1>

        {/* Add Student Button */}
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => navigate("/dashboard/admin/registerstudentpage")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow"
          >
            + Add Student
          </button>
        </div>

        {/* Search */}
        <div className="flex flex-col items-center mb-6">
          <label className="font-medium text-gray-700 mb-2">Search:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 p-2 rounded w-72 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Surname or Student Number"
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center text-blue-500 font-semibold h-32 flex items-center justify-center">Loading students...</div>
        ) : filteredStudents.length === 0 ? (
          <div className="text-center text-red-500 font-semibold h-32 flex items-center justify-center">No student records found.</div>
        ) : (
          <div className="overflow-x-auto max-w-6xl mx-auto rounded-xl shadow">
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
                  <tr key={index} className="text-sm text-gray-700">
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
                          onClick={() => handleEditClick(student)}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <h3 className="text-lg font-semibold text-center text-blue-600 mb-4">Edit Student Profile</h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleFormChange}
                  placeholder="Surname"
                  className="w-full border rounded p-2"
                  required
                />
                <input
                  type="text"
                  name="initials"
                  value={formData.initials}
                  onChange={handleFormChange}
                  placeholder="Initials"
                  className="w-full border rounded p-2"
                  required
                />
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleFormChange}
                  placeholder="Specialization"
                  className="w-full border rounded p-2"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded"
                >
                  Save Changes
                </button>
                {updateStatus && <p className="text-center text-sm text-gray-700">{updateStatus}</p>}
              </form>
              <button
                onClick={() => setShowEditModal(false)}
                className="mt-4 text-sm text-gray-500 hover:text-gray-800 block mx-auto"
              >
                Cancel
              </button>
            </motion.div>
          </div>
        )}
      </motion.main>
    </div>
  );
}

export default StudentsPage;
