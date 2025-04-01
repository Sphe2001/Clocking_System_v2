import React, { useState } from 'react';

//It helps in handling API calls, sending JSON data, and managing responses efficiently.
import axios from 'axios';


const LoginSingupRegister=()=>{

    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        studentNo: '',
        email: '',
        surname: '',
        initials: '',
        contactNo: '',
        specialization: '',
        password: ''
    });

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAuth = async () => {
        if (Object.values(formData).some(value => value === '')) {
            alert('Please fill in all fields');
            return;
        }

        try {
            if (isSignUp) {
                const response = await axios.post('http://localhost:3001/api/auth/register/student', formData);
                alert('Sign-Up Successful! Please Login.');
                setIsSignUp(false);
            } else {
                alert('Login functionality needs backend authentication setup.');
            }
        } catch (error) {
            alert('Error: ' + error.response?.data?.message || 'Something went wrong!');
        }
    };

    return (
        <div className="flex flex-col items-center max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-xl font-semibold mb-4">{isSignUp ? 'Sign Up' : 'Login'}</h2>
            {isSignUp && (
                <>
                    <input type="text" name="studentNo" placeholder="Student No" value={formData.studentNo} onChange={handleChange} className="w-full p-2 mb-3 border border-gray-300 rounded-md" />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 mb-3 border border-gray-300 rounded-md" />
                    <input type="text" name="surname" placeholder="Surname" value={formData.surname} onChange={handleChange} className="w-full p-2 mb-3 border border-gray-300 rounded-md" />
                    <input type="text" name="initials" placeholder="Initials" value={formData.initials} onChange={handleChange} className="w-full p-2 mb-3 border border-gray-300 rounded-md" />
                    <input type="text" name="contactNo" placeholder="Contact No" value={formData.contactNo} onChange={handleChange} className="w-full p-2 mb-3 border border-gray-300 rounded-md" />
                    <input type="text" name="specialization" placeholder="Specialization" value={formData.specialization} onChange={handleChange} className="w-full p-2 mb-3 border border-gray-300 rounded-md" />
                </>
            )}
             <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full p-2 mb-3 border border-gray-300 rounded-md" />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 mb-3 border border-gray-300 rounded-md" />
            <button onClick={handleAuth} className="mt-3 text-blue-500 hover:shadow-xl active:scale-95">
                {isSignUp ? 'Sign Up' : 'Login'}
            </button>
            <button onClick={toggleForm} className="mt-3 text-blue-500 hover:underline">
                {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </button>
        </div>
    );

};

export default LoginSingupRegister;