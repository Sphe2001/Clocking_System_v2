import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ✅ Import Routes and Route
import './index.css';
import App from './App.jsx';
import AdminProfile from './pages/admin/profile/adminProfile.jsx';
import AdminReports from './pages/admin/reports/adminReports.jsx';
import AdminDashboard from './pages/admin/adminDashboard.jsx'; // ✅ Import AdminDashboard
import AdminUsers from './pages/admin/users/adminUsers.jsx';
import StudentDashboard from './pages/student/studentDashboard.jsx'
import ViewProfile from './pages/student/viewProfile/viewProfile.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes> {/* ✅ Wrap routes inside <Routes> */}
        <Route path="/" element={<App />} />
        <Route path="/dashboard/admin/profile" element={<AdminProfile />} />
        <Route path="/dashboard/admin/reports" element={< AdminReports/>} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />

        <Route path="/dashboard/admin/users" element={<AdminUsers />} />
        <Route path="/pages/student" element={<StudentDashboard />} />
        <Route path="/pages/student/viewProfile" element={<ViewProfile />} />
        

        {/* Add more routes here */}
      </Routes>
      
    </BrowserRouter>
  </StrictMode>
);