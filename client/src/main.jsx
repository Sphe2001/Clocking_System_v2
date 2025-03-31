import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ✅ Import Routes and Route
import './index.css';
import App from './App.jsx';
import AdminProfile from './pages/admin/profile/adminProfile.jsx';
import AdminReports from './pages/admin/reports/adminReports.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes> {/* ✅ Wrap routes inside <Routes> */}
        <Route path="/" element={<App />} />
        <Route path="/dashboard/admin/profile" element={<AdminProfile />} />
        <Route path="/dashboard/admin/reports" element={< AdminReports/>} />
        {/* Add more routes here */}
      </Routes>
      
    </BrowserRouter>
  </StrictMode>
);
