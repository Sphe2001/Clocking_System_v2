import React from 'react';
import StudentNavbar from '../../components/studentNavbar';

const StudentDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col p-10 bg-gradient-to-b from-blue-200 to-blue-400 backdrop-blur-md rounded-lg shadow-lg">
      {/* Navbar */}
      <StudentNavbar />

      {/* Main Content Section */}
      <div className="flex flex-col items-center justify-center flex-grow pt-20 text-white px-6 sm:px-8 md:px-12">
        <div className="relative z-10 max-w-lg w-full text-center space-y-6 p-8 bg-gradient-to-b from-blue-300 to-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-black">Welcome, Student!</h1>
          <p className="text-lg sm:text-xl text-black">Click below to sign your attendance or end the session.</p>

          {/* Sign Attendance Button */}
          <input type="button" className="w-full max-w-xs p-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md" value="Sign Attendance" />

          <div className="mt-4 text-black">
            <p className="text-lg">You signed in at: 8:00 </p>
            <p className="text-lg">You signed out at: 16:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;