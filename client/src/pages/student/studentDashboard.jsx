import React from 'react';
import StudentNavbar from '../../components/studentNavbar';

const StudentDashboard = () => {
  return (

    
    <div className="min-h-screen flex flex-col  bg-gradient-to-b from-blue-200 to-blue-400 backdrop-blur-md  shadow-lg">
      
      
      {/* Main Content Section (includes Navbar) */}
      <div className="flex flex-col items-center justify-center  flex-grow text-white px-6 sm:px-8 md:px-12">
       
       {/*LOGO */}
      <div className="flex flex-col  pr-160 text-9xl text-blue-500  font-extrabold  ">
      <h1 classsName="text-blue-500  ">CLOCK IT</h1>
      </div>
      
       <div className="w-300  bg-blue-800 text-center rounded-lg shadow-lg p-10 space-y-8">
          
          {/* Navbar */}
          <StudentNavbar />

          <h1 className="text-6xl font-extrabold font-serif text-white">Welcome, Student!</h1>
          <p className="text-lg sm:text-xl text-white font-bold">
            Click below to sign your attendance or end the session.
          </p>

          {/* Button Section */}
          <div className="flex flex-col items-center space-y-4">
            {/* Sign Attendance Button */}
            <input
              type="button"
              value="Sign Attendance"
              className="w-40 p-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md"
            />

            {/* End Session Button */}
            <input
              type="button"
              value="End Session"
              className="w-40 p-4 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-400 transition-all shadow-md"
            />
          </div>

          {/* Sign-in/Sign-out Time */}
          <div className="mt-4 text-white space-y-1">
            <p className="text-lg">You signed in at: 8:00</p>
            <p className="text-lg">You signed out at: 16:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
