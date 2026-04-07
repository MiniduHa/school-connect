import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';

// Import Super Admin components
import SuperAdminLayout from './pages/super-admin/SuperAdminLayout';
import SuperAdminDashboard from './pages/super-admin/SuperAdminDashboard';
import ManageSchools from './pages/super-admin/ManageSchools';
import PlatformSettings from './pages/super-admin/PlatformSettings';

// Placeholder for School Admin
const SchoolAdminDashboard = () => <div className="p-8 text-2xl font-bold">School Admin Dashboard (Coming Soon)</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<AdminLogin />} />

        {/* --- SUPER ADMIN ROUTES --- */}
        <Route path="/super-admin" element={<SuperAdminLayout />}>
          <Route index element={<SuperAdminDashboard />} />
          {/* NEW ROUTES ADDED HERE */}
          <Route path="schools" element={<ManageSchools />} />
          <Route path="settings" element={<PlatformSettings />} />
        </Route>

        {/* --- SCHOOL ADMIN ROUTES --- */}
        <Route path="/school-admin/*" element={<SchoolAdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;