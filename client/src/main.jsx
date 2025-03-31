import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ✅ Import Routes and Route
import './index.css';
import App from './App.jsx';
import AdminProfile from './pages/admin/profile/adminProfile.jsx';
import AdminReports from './pages/admin/reports/adminReports.jsx';
import AdminDashboard from './pages/admin/adminDashboard.jsx'; // ✅ Import AdminDashboard

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes> {/* ✅ Wrap routes inside <Routes> */}
        <Route path="/" element={<App />} />
        <Route path="/dashboard/admin/profile" element={<AdminProfile />} />
        <Route path="/dashboard/admin/reports" element={< AdminReports/>} />
        <Route path="/pages/admin" element={<AdminDashboard />} />
        {/* Add more routes here */}
      </Routes>
      
    </BrowserRouter>
  </StrictMode>
);