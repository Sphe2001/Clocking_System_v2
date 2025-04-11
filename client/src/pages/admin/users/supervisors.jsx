import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../../../components/adminNavbar";

function SupervisorsPage() {
  const navigate = useNavigate();
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const [searchQuery, setSearchQuery] = useState("");
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <motion.h1
          className="text-3xl font-bold text-blue-600 mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          All Supervisors
        </motion.h1>

        <motion.div
          className="mb-6 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button
            onClick={() => navigate("/dashboard/admin/registersupervisorpage")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow"
          >
            + Add Supervisor
          </button>
        </motion.div>

        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
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

        {loading ? (
          <motion.div
            className="text-blue-500 font-semibold text-center h-32 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            Loading supervisors...
          </motion.div>
        ) : filteredSupervisors.length === 0 ? (
          <motion.div
            className="text-red-500 font-semibold text-center h-32 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            No supervisor records found.
          </motion.div>
        ) : (
          <motion.div
            className="w-full flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
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
                      <td className="p-3 border-b">{supervisor.isVerified ? "True" : "False"}</td>
                      <td className="p-3 border-b">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() =>
                              navigate(`/dashboard/admin/editsupervisor/${supervisor.id}`)
                            }
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
      </motion.main>
    </div>
  );
}

export default SupervisorsPage;
