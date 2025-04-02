import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import './index.css';
import App from './App.jsx';
import AdminProfile from './pages/admin/profile/adminProfile.jsx';
import AdminReports from './pages/admin/reports/adminReports.jsx';
import AdminDashboard from './pages/admin/adminDashboard.jsx'; 
import AdminUsers from './pages/admin/users/adminUsers.jsx';
import StudentDashboard from './pages/student/studentDashboard.jsx'
import ViewProfile from './pages/student/viewProfile/viewProfile.jsx';
import LoginPage from './pages/auth/login.jsx';
import SignUpPage from './pages/auth/signUp.jsx';
import SupervisorDashboard from './pages/supervisor/supervisorDashboard.jsx';
import ViewSupervisorProfile from './pages/supervisor/viewProfile/viewSupervisorProfile.jsx'
import ViewAttendance from './pages/supervisor/viewAttendance/viewAttendance.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AnimatePresence mode="wait"> {/* Animate presence ensures smooth transitions */}
        <Routes> 
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard/admin/profile" element={<AdminProfile />} />
          <Route path="/dashboard/admin/reports" element={<AdminReports />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/users" element={<AdminUsers />} />
          <Route path="/pages/student" element={<StudentDashboard />} />
          <Route path="/pages/student/viewProfile" element={<ViewProfile />} />
          <Route path="/pages/supervisor" element={<SupervisorDashboard />} />
          <Route path="/pages/supervisor/viewProfile" element={<ViewSupervisorProfile />}/>
          <Route path="/pages/supervisor/viewAttendance" element={<ViewAttendance />} />
       
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  </StrictMode>
);
