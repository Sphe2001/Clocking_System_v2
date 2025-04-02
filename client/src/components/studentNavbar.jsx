import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserIcon, DeviceTabletIcon,PowerIcon } from "@heroicons/react/24/outline";

const StudentNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-b from-blue-100 to-blue-500 text-white p-5 mr-5 shadow-md w-full backdrop-blur-md rounded-lg shadow-lg">
      <div className="container mx-auto flex p-3 justify-between items-center">
        {/* Dashboard Title */}
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/pages/student')}>
          Student Dashboard
        </h1>

        {/* Navbar Links */}
        <div className="flex space-x-8">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/pages/student/viewProfile')}>
            <UserIcon className="mx-1 h-6 w-6 stroke-green-400" />
            <span className={location.pathname === '/pages/student/viewProfile' ? 'text-red-300' : ''}>View Profile</span>
          </div>
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/pages/student/viewAttendanceHistory')}>
            <DeviceTabletIcon className="mx-1 h-6 w-6 stroke-green-400" />
            <span className={location.pathname === '/pages/student/viewAttendanceHistory' ? 'text-gray-300' : ''}>View Attendance History</span>
          </div>
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/pages/student/viewAttendanceHistory')}>
            <PowerIcon className="mx-1 h-6 w-6 stroke-green-400" />
            <span className={location.pathname === '/pages/student/viewAttendanceHistory' ? 'text-gray-300' : ''}>
            <button className="bg-red-600 text-lg font-semibold rounded-lg p-1 hover:bg-red-300 ">Logout</button> 
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
