// ViewProfile.jsx
import React from 'react';
import StudentNavbar from '../../../components/studentNavbar';

const ViewProfile = () => {
  return (
    <div className="min-h-screen flex flex-col p-10 bg-gradient-to-b from-blue-200 to-blue-400 backdrop-blur-md rounded-lg shadow-lg">
      {/* Navbar */}
      <StudentNavbar />

      {/* Profile Content */}
      <div className="flex flex-col items-center justify-center flex-grow pt-20 text-white px-6 sm:px-8 md:px-12">
        <div className="relative z-10 max-w-lg w-full text-center space-y-6 p-8 bg-gradient-to-b from-white to-blue-400 bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-black">Your Profile</h1>
          <p className="text-lg sm:text-xl text-black">Name: mark Doe</p>
          <p className="text-lg sm:text-xl text-black">Email: johndoe@example.com</p>
          <p className="text-lg sm:text-xl text-black">Student ID: 123456</p>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
