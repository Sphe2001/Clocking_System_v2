import React from 'react';
import SupervisorNavbar from '../../../components/supervisorNavbar';

const ViewAttendance = () => {
  // Sample data for the attendance (you can replace this with real data from your backend)
  const attendanceData = [
    { username: 'jdoe', name: 'John', surname: 'Doe', clockIn: '8:00 AM', clockOut: '4:00 PM' },
    { username: 'asmith', name: 'Alice', surname: 'Smith', clockIn: '9:00 AM', clockOut: '5:00 PM' },
    { username: 'mjones', name: 'Michael', surname: 'Jones', clockIn: '8:30 AM', clockOut: '4:30 PM' },
  ];

  return (
    <div className="min-h-screen flex flex-col p-10 bg-gradient-to-b from-green-200 to-blue-200 backdrop-blur-md rounded-lg shadow-lg">
      {/* Navbar */}
      <SupervisorNavbar />

      {/* Main Content Section */}
      <div className="overflow-x-auto mt-10">

        <h1 className="text-5xl font-semibold  p-5 pl-0 ">ATTENDANCE:</h1>
        <table className="min-w-full table-auto bg- border-collapse border border-none rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Username</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Surname</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Clock In Time</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Clock Out Time</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((entry, index) => (
              <tr key={index} className="hover:bg-red-100 ">
                <td className="px-6 py-3 text-sm text-gray-800 border-b">{entry.username}</td>
                <td className="px-6 py-3 text-sm text-gray-800 border-b">{entry.name}</td>
                <td className="px-6 py-3 text-sm text-gray-800 border-b">{entry.surname}</td>
                <td className="px-6 py-3 text-sm text-gray-800 border-b">{entry.clockIn}</td>
                <td className="px-6 py-3 text-sm text-gray-800 border-b ">{entry.clockOut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAttendance;
