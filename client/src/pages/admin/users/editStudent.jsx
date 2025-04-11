import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../../components/adminNavbar";
import { div } from "framer-motion/client";

const EditStudentProfile = ({ studentNo }) => {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const [formData, setFormData] = useState({
    surname: "",
    initials: "",
    specialization: ""
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // OPTIONAL: Fetch current profile info (if needed)
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`${domain}/api/auth/student/${studentNo}`);
        const student = response.data;
        setFormData({
          surname: student.surname || "",
          initials: student.initials || "",
          specialization: student.specialization || ""
        });
      } catch (error) {
        console.error("Error fetching student:", error);
        setStatusMessage("Failed to load profile.");
      }
    };

    if (studentNo) {
      fetchStudent();
    }
  }, [studentNo, domain]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    try {
      const response = await axios.post(
        `${domain}/api/admin/edit/studentProfile/${studentNo}`,
        formData,
        { withCredentials: true } // if using cookies
      );

      setStatusMessage(response.data.message || "Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      setStatusMessage(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <Sidebar />


        <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-700">Surname</label>
                <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                    required
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700">Initials</label>
                <input
                    type="text"
                    name="initials"
                    value={formData.initials}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                    required
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700">Specialization</label>
                <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                />
                </div>

                <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                {loading ? "Updating..." : "Update Profile"}
                </button>

                {statusMessage && (
                <p className="text-center mt-4 text-sm text-gray-700">{statusMessage}</p>
                )}
            </form>
            </div>

        </div>
    
  );
};

export default EditStudentProfile;
