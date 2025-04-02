import { useState } from "react";
import axios from "axios";

export default function SignUpPage() {
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
      const endpoint = role === "student" ? "/api/register/student" : "/api/register/supervisor";
      const payload = role === "student" 
        ? { ...formData, staffNo: undefined }
        : { ...formData, studentNo: undefined };
      
      await axios.post(import.meta.env.VITE_REACT_APP_DOMAIN`${endpoint}`, payload);
      alert("Registration successful! Check your email for verification.");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen  flex items-center justify-center ${role === "student" ? "bg-gradient-to-l from-blue-100 via-blue-300 to-blue-500" : "bg-gradient-to-r from-red-100 via-red-300 to-red-500"}`}>
      <div className="bg-white p-8 rounded-lg max-w-md shadow-lg ">
        <div className="flex justify-center mb-4">
          <label className="mr-4">
            <input type="radio" name="role" value="student" checked={role === "student"} onChange={() => setRole("student")} />
            Student
          </label>
          <label>
            <input type="radio" name="role" value="supervisor" checked={role === "supervisor"} onChange={() => setRole("supervisor")} />
            Supervisor
          </label>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {role === "student" && (
            <div>
              <div className="flex items-center">
                <label className="w-32 text-right pr-2">Student No:</label>
                <input type="text" name="studentNo" placeholder="229797654" value={formData.studentNo} onChange={handleChange} className="w-full p-2 border rounded" required />
              </div>
              <div className="flex items-center mt-4">
                <label className="w-32 text-right pr-2">Email:</label>
                <input type="email" name="email" placeholder="229797654@tut4life.ac.za" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
              </div>
            </div>    
          )}
          {role === "supervisor" && (
            <div>
              <div className="flex items-center">
                <label className="w-32 text-right pr-2">Staff No:</label>
                <input type="text" name="staffNo" placeholder="210606" value={formData.staffNo} onChange={handleChange} className="w-full p-2 border rounded" required />
              </div>
              <div className="flex items-center mt-4">
                <label className="w-32 text-right pr-2">Email:</label>
                <input type="email" name="email" placeholder="doe@tut.ac.za" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
              </div>
            </div>   
          )}
          
          <div className="flex items-center">
            <label className="w-32 text-right pr-2">Surname:</label>
            <input type="text" name="surname" placeholder="Doe" value={formData.surname} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div className="flex items-center">
            <label className="w-32 text-right pr-2">Initials:</label>
            <input type="text" name="initials" placeholder="J" value={formData.initials} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div className="flex items-center">
            <label className="w-32 text-right pr-2">Contact No:</label>
            <input type="text" name="contactNo" placeholder="0784934554" value={formData.contactNo} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div className="flex items-center">
            <label className="w-32 text-right pr-2">Password:</label>
            <input type="password" name="password" placeholder="****" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div className="flex items-center">
            <label className="w-32 text-right pr-2">Specialization:</label>
            <select name="specialization" value={formData.specialization} onChange={handleChange} className="w-full p-2 border rounded" required>
              <option value="">Select Specialization</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Engineering">Engineering</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Biology">Biology</option>
            </select>
          </div>
          
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded flex justify-center items-center">
            {loading ? <span className="loader"></span> : "Sign Up"}
          </button>
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition duration-300">
              Sign-in here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
