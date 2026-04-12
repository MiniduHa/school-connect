import { useState } from 'react';
import { Search, Plus, Mail, Phone, X, Users, BookOpen, CheckCircle, XCircle, Eye } from 'lucide-react';

const initialTeachers = [
  { id: 'TCH-001', name: "Anura Fernando", department: "Science", email: "anura.f@school.edu", phone: "+94 77 123 4567", status: "Active", joined: "Jan 10, 2024" },
  { id: 'TCH-002', name: "Kumari Perera", department: "Mathematics", email: "kumari.p@school.edu", phone: "+94 77 234 5678", status: "Active", joined: "Feb 15, 2024" },
  { id: 'TCH-003', name: "Dinesh Silva", department: "Languages", email: "dinesh.s@school.edu", phone: "+94 77 345 6789", status: "On Leave", joined: "Mar 01, 2024" },
  { id: 'TCH-004', name: "Malini Jayawardena", department: "Commerce", email: "malini.j@school.edu", phone: "+94 77 456 7890", status: "Active", joined: "Aug 20, 2025" },
];

export default function ManageTeachers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [teachers, setTeachers] = useState(initialTeachers);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Filter Logic
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || teacher.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'all' || teacher.department.toLowerCase() === deptFilter.toLowerCase();
    return matchesSearch && matchesDept;
  });

  const handleStatusToggle = (teacherId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    setTeachers(teachers.map(t => t.id === teacherId ? { ...t, status: newStatus } : t));
  };

  return (
    <div className="space-y-6 relative">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Manage Teaching Staff</h1>
          <p className="text-sm text-slate-500 font-medium">Add, update, and manage teacher profiles and access.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Add Teacher
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by teacher name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm"
          />
        </div>
        <select 
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 text-slate-700 font-medium text-sm"
        >
          <option value="all">All Departments</option>
          <option value="science">Science</option>
          <option value="mathematics">Mathematics</option>
          <option value="languages">Languages</option>
          <option value="commerce">Commerce</option>
        </select>
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                <th className="p-4 font-semibold">Teacher Profile</th>
                <th className="p-4 font-semibold">Contact Details</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border-2 border-white shadow-sm shrink-0">
                        {teacher.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{teacher.name}</p>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-0.5">
                          <BookOpen size={12} className="text-blue-500" /> {teacher.department} • {teacher.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                      <Mail size={14} className="text-slate-400" /> {teacher.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone size={14} className="text-slate-400" /> {teacher.phone}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      teacher.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                      teacher.status === 'On Leave' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {teacher.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="View Profile">
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => handleStatusToggle(teacher.id, teacher.status)}
                        className={`p-1.5 rounded-md transition-colors ${
                          teacher.status === 'Active' ? 'text-red-600 hover:bg-red-50' : 'text-emerald-600 hover:bg-emerald-50'
                        }`}
                        title={teacher.status === 'Active' ? 'Deactivate Teacher' : 'Activate Teacher'}
                      >
                        {teacher.status === 'Active' ? <XCircle size={18} /> : <CheckCircle size={18} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTeachers.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No teachers found matching your filters.
            </div>
          )}
        </div>
      </div>

      {/* --- ADD NEW TEACHER MODAL (UI Only) --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-100 p-5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><Users size={20} /></div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Add New Teacher</h2>
                  <p className="text-xs text-slate-500 font-medium">Create a new staff account</p>
                </div>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-2 rounded-full transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-500 text-center py-8">Teacher registration form will go here...</p>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-slate-600 text-sm font-medium hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">Save Teacher</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}