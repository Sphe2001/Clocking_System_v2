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
      
      await axios.post(endpoint, payload);
      alert("Registration successful! Check your email for verification.");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${role === "student" ? "bg-blue-500" : "bg-red-500"}`}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
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
            <input type="text" name="studentNo" placeholder="Student No" value={formData.studentNo} onChange={handleChange} className="w-full p-2 border rounded" required />
          )}
          {role === "supervisor" && (
            <input type="text" name="staffNo" placeholder="Staff No" value={formData.staffNo} onChange={handleChange} className="w-full p-2 border rounded" required />
          )}
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="surname" placeholder="Surname" value={formData.surname} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="initials" placeholder="Initials" value={formData.initials} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="contactNo" placeholder="Contact No" value={formData.contactNo} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="specialization" placeholder="Specialization" value={formData.specialization} onChange={handleChange} className="w-full p-2 border rounded" required />
          
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded flex justify-center items-center">
            {loading ? <span className="loader"></span> : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
