import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserIcon, DeviceTabletIcon, PowerIcon } from "@heroicons/react/24/outline";

const StudentNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State to track which icon was clicked for animation
  const [activeIcon, setActiveIcon] = useState(null);

  // Handle navigation
  const handleProfileClick = () => {
    setActiveIcon('profile');
    navigate('/pages/student/viewProfile');
  };

  const handleAttendanceClick = () => {
    setActiveIcon('attendance');
    navigate('/pages/student/viewAttendanceHistory');
  };

  const handleLogout = () => {
    setActiveIcon('logout');
    navigate('/'); // Redirect to home/login
  };

  const handleDashboardClick = () => {
    setActiveIcon('dashboard');
    navigate('/pages/student');
  };

  return (
    <nav className="bg-gradient-to-b from-blue-100 to-blue-500 text-white p-5 mr-5 shadow-md w-full backdrop-blur-md rounded-lg shadow-lg">
      <div className="container mx-auto flex p-3 justify-between items-center">
        {/* Dashboard Title */}
        <h1
          className={`text-4xl font-bold cursor-pointer font-serif hover:text-blue-500 ${activeIcon === 'dashboard' ? 'animate-bounce' : ''}`}
          onClick={handleDashboardClick}
        >
          Student Dashboard
        </h1>

        {/* Navbar Links */}
        <div className="flex space-x-8">
          {/* View Profile */}
          <div
            className={`flex items-center cursor-pointer ${activeIcon === 'profile' ? 'animate-bounce' : ''}`}
            onClick={handleProfileClick}
          >
            <UserIcon className="mx-1 h-6 w-6 stroke-green-400" />
            <span className={location.pathname === '/pages/student/viewProfile' ? 'text-red-300' : ''}>View Profile</span>
          </div>

          {/* View Attendance */}
          <div
            className={`flex items-center cursor-pointer ${activeIcon === 'attendance' ? 'animate-bounce' : ''}`}
            onClick={handleAttendanceClick}
          >
            <DeviceTabletIcon className="mx-1 h-6 w-6 stroke-green-400" />
            <span className={location.pathname === '/pages/student/viewProfile' ? 'text-gray-300' : ''}>View Attendance History</span>
          </div>

          {/* Logout Button */}
          <div
            className={`flex items-center cursor-pointer ${activeIcon === 'logout' ? 'animate-bounce' : ''}`}
            onClick={handleLogout}
          >
            <PowerIcon className="mx-1 h-6 w-6 stroke-green-400" />
            <button className="bg-red-600 text-lg font-semibold rounded-lg p-1 hover:bg-red-300">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
