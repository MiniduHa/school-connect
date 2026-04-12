import { useState } from 'react';
import { Search, Plus, X, BookOpen, Users, GraduationCap, MapPin, Eye, Settings, UserCheck, Book } from 'lucide-react';

// --- MOCK DATA ---
const initialClasses = [
  { 
    id: 'CLS-10-SCA', name: "10 Science - A", grade: "Grade 10", studentCount: 45, room: "Lab 01", status: "Active",
    classTeacher: "Anura Fernando",
    subjectTeachers: [
      { subject: "Mathematics", teacher: "Kumari Perera" },
      { subject: "Science", teacher: "Anura Fernando" },
      { subject: "English", teacher: "Dinesh Silva" },
    ]
  },
  { 
    id: 'CLS-11-CMA', name: "11 Commerce - A", grade: "Grade 11", studentCount: 42, room: "Room 302", status: "Active",
    classTeacher: "Malini Jayawardena",
    subjectTeachers: [
      { subject: "Accounting", teacher: "Malini Jayawardena" },
      { subject: "Business Studies", teacher: "Saman Kumara" },
      { subject: "English", teacher: "Dinesh Silva" },
    ]
  },
  { 
    id: 'CLS-12-PHY', name: "12 Physics - Core", grade: "Grade 12", studentCount: 30, room: "Physics Lab", status: "Active",
    classTeacher: "Dr. Ruwanthi Peiris",
    subjectTeachers: [
      { subject: "Physics", teacher: "Dr. Ruwanthi Peiris" },
      { subject: "Combined Maths", teacher: "Kumari Perera" },
    ]
  },
];

export default function ManageClasses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [classes] = useState(initialClasses);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any | null>(null);
  
  // Filter Logic
  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) || cls.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === 'all' || cls.grade.includes(gradeFilter);
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="space-y-6 relative">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Manage Classes</h1>
          <p className="text-sm text-slate-500 font-medium">Create classes, assign class teachers, and manage subject allocations.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Create Class
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by class name or ID..." 
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

      {/* Classes Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                <th className="p-4 font-semibold">Class Details</th>
                <th className="p-4 font-semibold">Class Teacher & Capacity</th>
                <th className="p-4 font-semibold text-center">Room</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.map((cls) => (
                <tr key={cls.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border-2 border-white shadow-sm shrink-0">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{cls.name}</p>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-0.5">
                          <GraduationCap size={12} className="text-blue-500" /> {cls.grade} • {cls.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1">
                      <UserCheck size={14} className="text-slate-400" /> {cls.classTeacher}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <Users size={14} className="text-blue-500" /> {cls.studentCount} Students Enrolled
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold flex items-center justify-center gap-1 w-max mx-auto border border-slate-200">
                      <MapPin size={12} /> {cls.room}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => setSelectedClass(cls)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors" 
                        title="View Class Info & Subjects"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors" 
                        title="Edit Class Settings"
                      >
                        <Settings size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredClasses.length === 0 && (
            <div className="p-8 text-center text-slate-500 flex flex-col items-center gap-2">
              <BookOpen size={32} className="text-slate-300" />
              <p>No classes found matching your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- VIEW CLASS DETAILS MODAL --- */}
      {selectedClass && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="bg-slate-50 border-b border-slate-100 p-5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-600 p-2.5 rounded-lg"><BookOpen size={22} /></div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">{selectedClass.name}</h2>
                  <p className="text-xs text-slate-500 font-medium">{selectedClass.grade} • {selectedClass.id}</p>
                </div>
              </div>
              <button onClick={() => setSelectedClass(null)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-2 rounded-full transition-colors"><X size={20} /></button>
            </div>

            <div className="p-6 space-y-6">
              {/* Top Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex flex-col items-center justify-center text-center">
                  <UserCheck size={24} className="text-blue-500 mb-2" />
                  <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">Class Teacher</p>
                  <p className="font-bold text-blue-900">{selectedClass.classTeacher}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
                  <Users size={24} className="text-slate-400 mb-2" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Students</p>
                  <p className="font-bold text-slate-800">{selectedClass.studentCount}</p>
                </div>
              </div>

              {/* Subject Teachers List */}
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <Book size={16} className="text-slate-400" /> Assigned Subject Teachers
                </h3>
                <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
                  {selectedClass.subjectTeachers.map((subj: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                      <span className="font-bold text-slate-700 text-sm">{subj.subject}</span>
                      <span className="text-sm font-medium text-slate-500">{subj.teacher}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button className="text-blue-600 font-bold text-sm px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors">Manage Teachers</button>
              <button className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">View Student List</button>
            </div>
          </div>
        </div>
      )}

      {/* --- ADD NEW CLASS MODAL (UI Only) --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-100 p-5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><Plus size={20} /></div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Create New Class</h2>
                  <p className="text-xs text-slate-500 font-medium">Setup class details and assign a head teacher</p>
                </div>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-2 rounded-full transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-500 text-center py-8">Class creation form will go here...</p>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-slate-600 text-sm font-medium hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">Create Class</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}