import { useState, useEffect } from 'react';
import { Search, Plus, Building2, Mail, Phone, X, LayoutGrid, Users, User, Lock, Eye, EyeOff, CheckCircle, XCircle, UserCheck, Calendar as CalendarIcon, Trash2, AlertTriangle } from 'lucide-react';

export default function ManageSchools() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [schools, setSchools] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<any | null>(null); 
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState<any | null>(null);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [formData, setFormData] = useState({
    schoolName: '', adminName: '', email: '', phone: '', schoolCategory: '', schoolGender: '', password: '', confirmPassword: ''
  });

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/superadmin/schools');
      const data = await response.json();
      if (response.ok) setSchools(data);
    } catch (error) {
      console.error("Failed to fetch schools:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name?.toLowerCase().includes(searchTerm.toLowerCase()) || school.id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || school.status?.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusToggle = async (schoolId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Declined' : 'Active';
    try {
      const response = await fetch(`http://localhost:5000/api/superadmin/schools/${schoolId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) fetchSchools();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const triggerDeleteModal = (school: any) => {
    setSchoolToDelete(school);
    setDeleteConfirmationText('');
    setDeletePassword('');
    setDeleteError('');
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSubmit = async () => {
    if (deleteConfirmationText !== 'DELETE') {
      setDeleteError("You must type DELETE exactly to confirm.");
      return;
    }
    if (!deletePassword) {
      setDeleteError("Super Admin password is required.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/superadmin/schools/${schoolToDelete.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: deletePassword }),
      });
      const data = await response.json();

      if (response.ok) {
        setIsDeleteModalOpen(false);
        setSchoolToDelete(null);
        fetchSchools();
      } else {
        setDeleteError(data.error || "Failed to delete school.");
      }
    } catch (error) {
      setDeleteError("Server error. Please try again.");
    }
  };

  const handleAddSchoolSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError('');

    try {
      const response = await fetch('http://localhost:5000/api/superadmin/schools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setIsAddModalOpen(false);
        setFormData({ schoolName: '', adminName: '', email: '', phone: '', schoolCategory: '', schoolGender: '', password: '', confirmPassword: '' });
        fetchSchools();
      } else {
        setPasswordError(data.error || "Failed to add school.");
      }
    } catch (error) {
      setPasswordError("Server error. Please try again.");
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manage Schools</h1>
          <p className="text-slate-500">View, add, and manage school accounts on the platform.</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm">
          <Plus size={18} /> Add New School
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search by school name or ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 text-slate-700 font-medium">
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                <th className="p-4 font-semibold">School Details</th>
                <th className="p-4 font-semibold">Contact Info</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 font-semibold text-center">Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading schools...</td></tr>
              ) : filteredSchools.length > 0 ? (
                filteredSchools.map((school) => (
                  <tr key={school.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"><Building2 size={20} /></div>
                        <div><p className="font-bold text-slate-800">{school.name}</p><p className="text-xs font-medium text-slate-500">ID: {school.id}</p></div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium text-slate-700">{school.admin_name}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-500"><Mail size={12} /> {school.email}</div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-500"><Phone size={12} /> {school.phone}</div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${school.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : school.status === 'Pending' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>{school.status}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button onClick={() => setSelectedSchool(school)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="View Profile"><Eye size={18} /></button>
                        <button onClick={() => window.location.href = `mailto:${school.email}`} className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-md transition-colors" title="Email Admin"><Mail size={18} /></button>
                        <button onClick={() => handleStatusToggle(school.id, school.status)} className={`p-1.5 rounded-md transition-colors ${school.status === 'Active' ? 'text-amber-600 hover:bg-amber-50' : 'text-emerald-600 hover:bg-emerald-50'}`} title={school.status === 'Active' ? 'Decline School' : 'Activate School'}>
                          {school.status === 'Active' ? <XCircle size={18} /> : <CheckCircle size={18} />}
                        </button>
                        <button onClick={() => triggerDeleteModal(school)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors" title="Delete School"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (<tr><td colSpan={4} className="p-8 text-center text-slate-500">No schools found matching your filters.</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Verification Modal */}
      {isDeleteModalOpen && schoolToDelete && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border-2 border-red-100">
            <div className="bg-red-50 p-6 flex flex-col items-center text-center border-b border-red-100">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4"><AlertTriangle size={32} /></div>
              <h2 className="text-xl font-bold text-red-700">Delete School Permanently?</h2>
              <p className="text-sm text-red-600 mt-2 font-medium">You are about to delete <span className="font-bold">"{schoolToDelete.name}"</span>. This action cannot be undone.</p>
            </div>
            <div className="p-6 space-y-5">
              {deleteError && <div className="bg-red-50 text-red-600 text-sm font-medium p-3 rounded-lg border border-red-200 text-center">{deleteError}</div>}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Type <span className="text-red-600 select-none">DELETE</span> to confirm</label>
                <input type="text" placeholder="DELETE" value={deleteConfirmationText} onChange={(e) => setDeleteConfirmationText(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500 transition-all font-mono" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Super Admin Password</label>
                <div className="flex items-center bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-500 transition-all">
                  <Lock size={18} className="text-slate-400 mr-2 shrink-0" />
                  <input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={deletePassword} onChange={(e) => setDeletePassword(e.target.value)} className="bg-transparent border-none outline-none w-full text-slate-800" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-slate-600 ml-2">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleDeleteSubmit} disabled={deleteConfirmationText !== 'DELETE' || !deletePassword} className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg font-bold transition-colors shadow-sm flex items-center gap-2"><Trash2 size={18} /> Permanently Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add New School Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><Building2 size={20} /></div>
                <div><h2 className="text-xl font-bold text-slate-800">Add New School</h2><p className="text-xs text-slate-500 font-medium">Manually onboard an institution</p></div>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-2 rounded-full transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6 overflow-y-auto">
              {passwordError && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm border border-red-200 text-center font-medium">{passwordError}</div>}
              <form id="add-school-form" onSubmit={handleAddSchoolSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-600">Institution Name</label>
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    <Building2 size={18} className="text-slate-400 mr-3 shrink-0" /><input type="text" required placeholder="e.g. S. Thomas' College" value={formData.schoolName} onChange={(e) => setFormData({...formData, schoolName: e.target.value})} className="bg-transparent border-none outline-none w-full text-slate-800" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-600">School Category</label>
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                      <LayoutGrid size={18} className="text-slate-400 mr-3 shrink-0" />
                      <select required value={formData.schoolCategory} onChange={(e) => setFormData({...formData, schoolCategory: e.target.value})} className="bg-transparent border-none outline-none w-full text-slate-800 cursor-pointer"><option value="" disabled>Select Type...</option><option value="Government">Government</option><option value="Semi-Government">Semi-Government</option><option value="Private">Private</option></select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-600">Student Type</label>
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                      <Users size={18} className="text-slate-400 mr-3 shrink-0" />
                      <select required value={formData.schoolGender} onChange={(e) => setFormData({...formData, schoolGender: e.target.value})} className="bg-transparent border-none outline-none w-full text-slate-800 cursor-pointer"><option value="" disabled>Select Type...</option><option value="Boys">Boys School</option><option value="Girls">Girls School</option><option value="Mixed">Mixed School</option></select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-600">Principal / Admin Name</label>
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    <User size={18} className="text-slate-400 mr-3 shrink-0" /><input type="text" required placeholder="e.g. Principal Perera" value={formData.adminName} onChange={(e) => setFormData({...formData, adminName: e.target.value})} className="bg-transparent border-none outline-none w-full text-slate-800" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-600">Official Email</label>
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    <Mail size={18} className="text-slate-400 mr-3 shrink-0" /><input type="email" required placeholder="admin@school.edu" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-transparent border-none outline-none w-full text-slate-800" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-600">Contact Number</label>
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    <Phone size={18} className="text-slate-400 mr-3 shrink-0" /><input type="tel" required placeholder="+94 11 234 5678" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="bg-transparent border-none outline-none w-full text-slate-800" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-600">Create Password</label>
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                      <Lock size={18} className="text-slate-400 mr-3 shrink-0" /><input type={showPassword ? "text" : "password"} required placeholder="••••••••" minLength={8} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="bg-transparent border-none outline-none w-full text-slate-800" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-slate-600 ml-2">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-600">Confirm Password</label>
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                      <Lock size={18} className="text-slate-400 mr-3 shrink-0" /><input type={showConfirmPassword ? "text" : "password"} required placeholder="••••••••" minLength={8} value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} className="bg-transparent border-none outline-none w-full text-slate-800" /><button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-slate-400 hover:text-slate-600 ml-2">{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0 flex justify-end gap-3">
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
              <button type="submit" form="add-school-form" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm">Add School</button>
            </div>
          </div>
        </div>
      )}

      {/* View School Details Modal */}
      {selectedSchool && !isDeleteModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-slate-50 border-b border-slate-100 p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center"><Building2 size={24} /></div>
                <div><h2 className="text-xl font-bold text-slate-800">{selectedSchool.name}</h2><p className="text-sm text-slate-500 font-medium">System ID: {selectedSchool.id}</p></div>
              </div>
              <button onClick={() => setSelectedSchool(null)} className="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedSchool.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : selectedSchool.status === 'Pending' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>{selectedSchool.status}</span>
                </div>
                <div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Students</p><p className="text-lg font-bold text-slate-800">{selectedSchool.student_count || 0}</p></div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-4">
                <h3 className="font-semibold text-slate-800 border-b border-slate-200 pb-2 mb-3">Primary Contact Details</h3>
                <div className="flex items-center gap-3"><UserCheck size={18} className="text-slate-400" /><div><p className="text-xs text-slate-500">Admin Name</p><p className="font-medium text-slate-800">{selectedSchool.admin_name}</p></div></div>
                <div className="flex items-center gap-3"><Mail size={18} className="text-slate-400" /><div><p className="text-xs text-slate-500">Official Email</p><p className="font-medium text-slate-800">{selectedSchool.email}</p></div></div>
                <div className="flex items-center gap-3"><Phone size={18} className="text-slate-400" /><div><p className="text-xs text-slate-500">Contact Number</p><p className="font-medium text-slate-800">{selectedSchool.phone}</p></div></div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 pb-2"><CalendarIcon size={16} /><span>Onboarded on the platform: <span className="font-semibold">{new Date(selectedSchool.created_at).toLocaleDateString()}</span></span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}