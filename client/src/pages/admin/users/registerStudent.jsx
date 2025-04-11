import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/adminNavbar";
import { div } from "framer-motion/client";

const RegisterStudentPage = () => {
  const [formData, setFormData] = useState({
    studentNo: "",
    surname: "",
    initials: "",
    specialization: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${domain}/api/auth/register/student`,
        formData,
        { withCredentials: true }
      );
      toast.success(response.data.message || "Student registered!");
      navigate(response.data.redirectUrl || "/dashboard/admin");
    } catch (err) {
      console.error(err);
      const errorMsg =
        err.response?.data?.message || "Failed to register student.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Sidebar/>

    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
          <Toaster />
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
            Register New Student
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Student Number</label>
              <input
                type="text"
                name="studentNo"
                value={formData.studentNo}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="9-digit student number"
                required
                pattern="\d{9}"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Surname</label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
                minLength={2}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Initials</label>
              <input
                type="text"
                name="initials"
                value={formData.initials}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
                minLength={1}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Specialization</label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 transition duration-300"
            >
              {loading ? "Registering..." : "Register Student"}
            </button>
          </form>
        </div>

    </div>
    
  );
};

export default RegisterStudentPage;
