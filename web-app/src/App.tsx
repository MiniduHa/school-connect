import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- BASE PAGES ---
import AdminLogin from './pages/AdminLogin';
import SchoolRegistration from './pages/SchoolRegistration';

// --- SUPER ADMIN IMPORTS ---
import SuperAdminLayout from './pages/super-admin/SuperAdminLayout';
import SuperAdminDashboard from './pages/super-admin/SuperAdminDashboard';
import ManageSchools from './pages/super-admin/ManageSchools';
import PlatformSettings from './pages/super-admin/PlatformSettings';

// --- SCHOOL ADMIN IMPORTS ---
import SchoolAdminLayout from './pages/school-admin/SchoolAdminLayout';
import SchoolAdminDashboard from './pages/school-admin/SchoolAdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* --- AUTH & REGISTRATION ROUTES --- */}
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/register" element={<SchoolRegistration />} />

        {/* --- SUPER ADMIN ROUTES --- */}
        <Route path="/super-admin" element={<SuperAdminLayout />}>
          <Route index element={<SuperAdminDashboard />} />
          <Route path="schools" element={<ManageSchools />} />
          <Route path="settings" element={<PlatformSettings />} />
        </Route>

        {/* --- SCHOOL ADMIN ROUTES --- */}
        <Route path="/school-admin" element={<SchoolAdminLayout />}>
          <Route index element={<SchoolAdminDashboard />} />
          {/* Temporary placeholders for the sidebar links so they don't break */}
          <Route path="teachers" element={<div className="p-8 text-xl font-bold text-slate-800">Manage Teachers (Coming Soon)</div>} />
          <Route path="students" element={<div className="p-8 text-xl font-bold text-slate-800">Manage Students (Coming Soon)</div>} />
          <Route path="classes" element={<div className="p-8 text-xl font-bold text-slate-800">Manage Classes (Coming Soon)</div>} />
          <Route path="calendar" element={<div className="p-8 text-xl font-bold text-slate-800">School Calendar (Coming Soon)</div>} />
          <Route path="notices" element={<div className="p-8 text-xl font-bold text-slate-800">Notices & Announcements (Coming Soon)</div>} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;