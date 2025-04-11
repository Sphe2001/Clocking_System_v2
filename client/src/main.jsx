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
import VerifyStudentEmail from './pages/auth/verifyStudentEmail.jsx';
import VerifySupervisorEmail from './pages/auth/verifySupervisorEmail.jsx';
import SupervisorDashboard from './pages/supervisor/supervisorDashboard.jsx';
import ViewSupervisorProfile from './pages/supervisor/viewProfile/viewSupervisorProfile.jsx'
import ViewAttendance from './pages/supervisor/viewAttendance/viewAttendance.jsx';
import ForgotPasswordPage from './pages/auth/forgotpassword.jsx';
import VerifyResetPasswordOTPPage from './pages/auth/verifyResetPasswordOTP.jsx';
import ResetPasswordPage from './pages/auth/ResetPassword.jsx';
import StudentsPage from './pages/admin/users/students.jsx';
import SupervisorsPage from './pages/admin/users/supervisors.jsx';
import StudentReportsPage from './pages/admin/reports/studentReports.jsx';
import SupervisorReportsPage from './pages/admin/reports/supervisorReports.jsx';
import RegisterStudentPage from './pages/admin/users/registerStudent.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AnimatePresence mode="wait"> {/* Animate presence ensures smooth transitions */}
        <Routes> 
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/verifyemail/student" element={<VerifyStudentEmail/>} />
          <Route path="/verifyemail/supervisor" element={<VerifySupervisorEmail/>} />
          <Route path="/forgotpassword" element={<ForgotPasswordPage/>} />
          <Route path="/verify/resetpasswordotp" element={<VerifyResetPasswordOTPPage/>} />
          <Route path="/resetpassword" element={<ResetPasswordPage/>} />
          <Route path="/dashboard/admin/profile" element={<AdminProfile />} />
          <Route path="/dashboard/admin/reports" element={<AdminReports />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/users/studentspage" element={<StudentsPage />} />
          <Route path="/dashboard/admin/users/supervisorspage" element={<SupervisorsPage/>} />
          <Route path="/dashboard/admin/reports/studentreportspage" element={<StudentReportsPage/>} />
          <Route path="/dashboard/admin/reports/supervisorreportspage" element={<SupervisorReportsPage/>} />
          <Route path="/dashboard/admin/reports/registerstudentpage" element={<RegisterStudentPage/>} />
          <Route path="/dashboard/admin/users" element={<AdminUsers />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/student/viewProfile" element={<ViewProfile />} />
          <Route path="/dashboard/supervisor" element={<SupervisorDashboard />} />
          <Route path="/dashboard/supervisor/viewProfile" element={<ViewSupervisorProfile />}/>
          <Route path="/dashboard/supervisor/viewAttendance" element={<ViewAttendance />} />
       
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  </StrictMode>
);
