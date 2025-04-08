import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignUpPage() {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    studentNo: "",
    staffNo: "",
    email: "",
    surname: "",
    initials: "",
    contactNo: "",
    password: "",
    specialization: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint =
        role === "student"
          ? "/api/auth/register/student"
          : "/api/auth/register/supervisor";
      const payload = { ...formData };

      if (role === "student") {
        delete payload.staffNo;
      } else {
        delete payload.studentNo;
      }

      const res = await axios.post(`${domain}${endpoint}`, payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success(res.data?.message || "Registered successfully!");
      navigate(res.data?.redirectUrl || "/");
    } catch (error) {
      const errorMsg = error?.response?.data?.message || "Registration failed.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen  flex items-center justify-center ${
        role === "student"
          ? "bg-gradient-to-l from-blue-100 via-blue-300 to-blue-500"
          : "bg-gradient-to-r from-red-100 via-red-300 to-red-500"
      }`}
    >
      <Toaster />
      <div className="w-full h-auto max-w-md p-8 bg-white shadow-lg rounded-lg sm:max-w-lg md:max-w-xl ">
        <div className="flex justify-center mb-2">
          <label className="mr-4">
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === "student"}
              onChange={() => setRole("student")}
            />
            Student
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="supervisor"
              checked={role === "supervisor"}
              onChange={() => setRole("supervisor")}
            />
            Supervisor
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          {role === "student" && (
            <div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-900 text-left">
                  Student No:
                </label>
                <input
                  type="text"
                  name="studentNo"
                  placeholder="229797654"
                  value={formData.studentNo}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-300"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-900 text-left">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="229797654@tut4life.ac.za"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-300"
                  required
                />
              </div>
            </div>
          )}
          {role === "supervisor" && (
            <div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-900 text-left">
                  Staff No:
                </label>
                <input
                  type="text"
                  name="staffNo"
                  placeholder="210606"
                  value={formData.staffNo}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-300"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-900 text-left">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="doe@tut.ac.za"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-300"
                  required
                />
              </div>
            </div>
          )}

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-900 text-left">
              Surname:
            </label>
            <input
              type="text"
              name="surname"
              placeholder="Doe"
              value={formData.surname}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-300"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-900 text-left">
              Initials:
            </label>
            <input
              type="text"
              name="initials"
              placeholder="J"
              value={formData.initials}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-300"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-900 text-left">
              Contact No:
            </label>
            <input
              type="text"
              name="contactNo"
              placeholder="0784934554"
              value={formData.contactNo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-300"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-900 text-left">
              Password:
            </label>
            <input
              type="password"
              name="password"
              placeholder="****"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-300"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-900 text-left">
              Specialization:
            </label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-300"
              required
            >
              <option value="">Select Specialization</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Engineering">Engineering</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Biology">Biology</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded flex justify-center items-center"
          >
            {loading ? <span className="loader"></span> : "Sign Up"}
          </button>
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500 transition duration-300"
            >
              Sign-in here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
