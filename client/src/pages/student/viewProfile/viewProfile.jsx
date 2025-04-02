// ViewProfile.jsx
import React from 'react';
import StudentNavbar from '../../../components/studentNavbar';

const ViewProfile = () => {
  return (
    <div className="min-h-screen flex flex-col p-10  bg-gradient-to-b from-blue-200 to-blue-400 backdrop-blur-md rounded-lg shadow-lg">
      {/* Navbar */}
      <StudentNavbar />
      {/* profile */}
      <div className="flex flex-col items-center flex-grow pt-5  text-white  ">

      <h1 className="text-5xl  font-extrabold font-serif text-black pb-3 border-b-5 border-dotted border-blue-500 my-4 w-full">Your Profile</h1>

      </div>

      {/* Profile Content */}
      <div className="flex flex-col items-center w-full h-full p-10 flex-grow pb-10 text-white px-6 sm:px-8 md:px-12 ">
        <div className="relative z-10 max-w-lg w-full text-center space-y-6 p-20 bg-gradient-to-b from-white to-blue-400 bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg">
         
          {/* Profile Picture */}
          <img 
            src="https://via.placeholder.com/150" 
            alt="Profile " 
            className="w-50 h-50 rounded-full mx-auto text-black border-4 border-green-600 shadow-md"
          />
          
          <h2 className="text-7xl  font-extrabold  text-black">John Doe</h2>
          <p className="text-lg sm:text-xl text-black">Email: johndoe@example.com</p>
          <p className="text-lg sm:text-xl text-black">Student ID: 123456</p>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;