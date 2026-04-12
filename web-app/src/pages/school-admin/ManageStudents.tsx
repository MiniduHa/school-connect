import { useState } from 'react';
import { Search, Plus, Mail, Phone, X, GraduationCap, CheckCircle, XCircle, Eye, User } from 'lucide-react';

// --- MOCK DATA ---
const initialStudents = [
  { id: 'STU-2024-001', name: "Kavindu Perera", grade: "Grade 10 - Science", parentEmail: "p.perera@email.com", parentPhone: "+94 77 111 2222", status: "Active" },
  { id: 'STU-2024-002', name: "Sanduni Silva", grade: "Grade 11 - Commerce", parentEmail: "silva.fam@email.com", parentPhone: "+94 77 222 3333", status: "Active" },
  { id: 'STU-2023-145', name: "Tharindu Fernando", grade: "Grade 12 - Physics", parentEmail: "tharindu.parent@email.com", parentPhone: "+94 77 333 4444", status: "Suspended" },
  { id: 'STU-2025-089', name: "Nethmi Jayasuriya", grade: "Grade 10 - Arts", parentEmail: "nethmi.mom@email.com", parentPhone: "+94 77 444 5555", status: "Active" },
  { id: 'STU-2022-302', name: "Dineth Rajapakse", grade: "Grade 13 - Mathematics", parentEmail: "rajapakse@email.com", parentPhone: "+94 77 555 6666", status: "Active" },
];

export default function ManageStudents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [students, setStudents] = useState(initialStudents);

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Filter Logic
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Simple filter logic: check if the grade string includes the filter number
    const matchesGrade = gradeFilter === 'all' || student.grade.includes(`Grade ${gradeFilter}`);
    
    return matchesSearch && matchesGrade;
  });

  const handleStatusToggle = (studentId: string, currentStatus: string) => {
    // Toggle between Active and Suspended
    const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    setStudents(students.map(s => s.id === studentId ? { ...s, status: newStatus } : s));
  };

  return (
    <div className="space-y-6 relative">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Manage Students</h1>
          <p className="text-sm text-slate-500 font-medium">View, search, and manage student enrollments and parent contacts.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Add Student
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by student name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm"
          />
        </div>
        <select 
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
          className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 text-slate-700 font-medium text-sm"
        >
          <option value="all">All Grades</option>
          <option value="10">Grade 10 (O/L)</option>
          <option value="11">Grade 11 (O/L)</option>
          <option value="12">Grade 12 (A/L)</option>
          <option value="13">Grade 13 (A/L)</option>
        </select>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                <th className="p-4 font-semibold">Student Profile</th>
                <th className="p-4 font-semibold">Parent / Guardian Contact</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm shrink-0">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{student.name}</p>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-0.5">
                          <GraduationCap size={12} className="text-blue-500" /> {student.grade} • {student.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                      <Mail size={14} className="text-slate-400" /> {student.parentEmail}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone size={14} className="text-slate-400" /> {student.parentPhone}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      student.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="View Profile">
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => handleStatusToggle(student.id, student.status)}
                        className={`p-1.5 rounded-md transition-colors ${
                          student.status === 'Active' ? 'text-red-600 hover:bg-red-50' : 'text-emerald-600 hover:bg-emerald-50'
                        }`}
                        title={student.status === 'Active' ? 'Suspend Student' : 'Reactivate Student'}
                      >
                        {student.status === 'Active' ? <XCircle size={18} /> : <CheckCircle size={18} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredStudents.length === 0 && (
            <div className="p-8 text-center text-slate-500 flex flex-col items-center gap-2">
              <User size={32} className="text-slate-300" />
              <p>No students found matching your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- ADD NEW STUDENT MODAL (UI Only) --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-100 p-5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><GraduationCap size={20} /></div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Enroll New Student</h2>
                  <p className="text-xs text-slate-500 font-medium">Add student and parent details</p>
                </div>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-2 rounded-full transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-500 text-center py-8">Student enrollment form will go here...</p>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-slate-600 text-sm font-medium hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">Save Student</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}