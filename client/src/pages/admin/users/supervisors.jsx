import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Sidebar from "../../../components/adminNavbar";

function SupervisorsPage() {
  const navigate = useNavigate();
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;

  const [searchQuery, setSearchQuery] = useState("");
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [formData, setFormData] = useState({
    surname: "",
    initials: "",
    specialization: "",
  });
  const [updateStatus, setUpdateStatus] = useState("");

  const fetchSupervisors = async () => {
    try {
      const response = await fetch(`${domain}/api/admin/users/supervisors`);
      const data = await response.json();
      setSupervisors(data);
    } catch (error) {
      console.error("Error fetching supervisor:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupervisors();
  }, []);

  const handleEditClick = (supervisor) => {
    setSelectedSupervisor(supervisor); // FIXED here
    setFormData({
      surname: supervisor.surname || "",
      initials: supervisor.initials || "",
      specialization: supervisor.specialization || "",
    });
    setShowEditModal(true);
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSupervisor) return;

    try {
      const response = await axios.post(
        `${domain}/api/admin/edit/supervisorProfile/${selectedSupervisor.staffNo}`,
        formData,
        { withCredentials: true }
      );

      setUpdateStatus(response.data.message || "Profile updated.");
      fetchSupervisors();
      setTimeout(() => setShowEditModal(false), 1500);
    } catch (error) {
      setUpdateStatus(error.response?.data?.message || "Update failed.");
    }
  };

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
        fetchSupervisors();
      } else {
        alert(result.message || "Failed to disable user.");
      }
    } catch (error) {
      console.error("Error disabling user:", error);
      alert("Something went wrong.");
    }
  };

  const filteredSupervisors = supervisors.filter((supervisor) => {
    const searchText = searchQuery.toLowerCase();
    return (
      supervisor.surname.toLowerCase().includes(searchText) ||
      supervisor.staffNo.toString().includes(searchText)
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <motion.main
        className="flex-1 p-8 bg-white shadow-xl ml-64"
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "-100%" }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.h1
          className="text-3xl font-bold text-blue-600 mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          All Supervisors
        </motion.h1>

        {/* Add Supervisor Button */}
        <motion.div className="mb-6 flex justify-center">
          <button
            onClick={() => navigate("/dashboard/admin/registersupervisorpage")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow"
          >
            + Add Supervisor
          </button>
        </motion.div>

        {/* Search Input */}
        <motion.div className="flex justify-center mb-6">
          <div className="flex flex-col items-center">
            <label className="font-semibold mb-1">Search:</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 p-2 rounded-md text-center w-72"
              placeholder="Search by surname or staff number"
            />
          </div>
        </motion.div>

        {/* Loading / Empty / Table */}
        {loading ? (
          <motion.div className="text-blue-500 font-semibold text-center h-32 flex items-center justify-center">
            Loading supervisors...
          </motion.div>
        ) : filteredSupervisors.length === 0 ? (
          <motion.div className="text-red-500 font-semibold text-center h-32 flex items-center justify-center">
            No supervisor records found.
          </motion.div>
        ) : (
          <motion.div className="w-full flex justify-center">
            <div className="overflow-x-auto shadow-xl rounded-xl w-full max-w-6xl">
              <table className="min-w-full table-auto border border-gray-300 text-sm text-gray-700 text-center">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="p-3 border-b">Staff Number</th>
                    <th className="p-3 border-b">Surname</th>
                    <th className="p-3 border-b">Initials</th>
                    <th className="p-3 border-b">Role</th>
                    <th className="p-3 border-b">Email</th>
                    <th className="p-3 border-b">Contact No</th>
                    <th className="p-3 border-b">Verified</th>
                    <th className="p-3 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSupervisors.map((supervisor, index) => (
                    <motion.tr
                      key={index}
                      className="hover:bg-gray-50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                    >
                      <td className="p-3 border-b">{supervisor.staffNo}</td>
                      <td className="p-3 border-b">{supervisor.surname}</td>
                      <td className="p-3 border-b">{supervisor.initials}</td>
                      <td className="p-3 border-b">{supervisor.role}</td>
                      <td className="p-3 border-b">{supervisor.email}</td>
                      <td className="p-3 border-b">{supervisor.contactNo}</td>
                      <td className="p-3 border-b">
                        {supervisor.isVerified ? "True" : "False"}
                      </td>
                      <td className="p-3 border-b">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEditClick(supervisor)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDisableUser(supervisor.staffNo)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
                          >
                            Disable
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <h3 className="text-lg font-semibold text-center text-blue-600 mb-4">Edit Supervisor Profile</h3>
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

export default SupervisorsPage;
