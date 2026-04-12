import { useState } from 'react';
import { Search, Plus, X, Megaphone, CalendarDays, Users, Edit2, Trash2, Eye, AlertCircle, CheckCircle2 } from 'lucide-react';

// --- MOCK DATA ---
const initialNotices = [
  { 
    id: 'NOT-001', title: "School Closed for Vesak Poya", date: "2026-04-12", 
    priority: "High", audience: "All Students & Parents", status: "Published", author: "Principal Perera" 
  },
  { 
    id: 'NOT-002', title: "Grade 10 Parent-Teacher Meeting", date: "2026-04-11", 
    priority: "Normal", audience: "Grade 10 Parents", status: "Published", author: "Admin Office" 
  },
  { 
    id: 'NOT-003', title: "Inter-House Sports Meet Registration", date: "2026-04-10", 
    priority: "Normal", audience: "Students", status: "Published", author: "Sports Dept" 
  },
  { 
    id: 'NOT-004', title: "Update on Term 1 Examination Timetable", date: "2026-04-09", 
    priority: "High", audience: "All Grades", status: "Draft", author: "Examination Unit" 
  },
  { 
    id: 'NOT-005', title: "New Library Opening Hours", date: "2026-04-05", 
    priority: "Low", audience: "All Students", status: "Published", author: "Library Dept" 
  },
];

export default function ManageNotices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [audienceFilter, setAudienceFilter] = useState('all');
  const [notices] = useState(initialNotices);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Filter Logic
  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAudience = audienceFilter === 'all' || notice.audience.toLowerCase().includes(audienceFilter.toLowerCase());
    return matchesSearch && matchesAudience;
  });

  return (
    <div className="space-y-6 relative">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Notices & Announcements</h1>
          <p className="text-sm text-slate-500 font-medium">Broadcast messages to students, parents, and teaching staff.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={18} />
          New Notice
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search notices by title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm"
          />
        </div>
        <select 
          value={audienceFilter}
          onChange={(e) => setAudienceFilter(e.target.value)}
          className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 text-slate-700 font-medium text-sm"
        >
          <option value="all">All Audiences</option>
          <option value="parents">Parents</option>
          <option value="students">Students</option>
          <option value="grade 10">Grade 10</option>
          <option value="staff">Staff</option>
        </select>
      </div>

      {/* Notices Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                <th className="p-4 font-semibold">Notice Title & Details</th>
                <th className="p-4 font-semibold">Target Audience</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotices.map((notice) => (
                <tr key={notice.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shrink-0">
                        <Megaphone size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 line-clamp-1">{notice.title}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-xs font-medium text-slate-500">
                          <span className="flex items-center gap-1"><CalendarDays size={12} className="text-slate-400" /> {notice.date}</span>
                          <span className="flex items-center gap-1"><Users size={12} className="text-slate-400" /> {notice.author}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-semibold text-slate-700">{notice.audience}</span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex flex-col items-center gap-1.5">
                      {/* Status Badge */}
                      {notice.status === 'Published' ? (
                        <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                          <CheckCircle2 size={10} /> Published
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                          Draft
                        </span>
                      )}
                      
                      {/* Priority Tag */}
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded w-max ${
                        notice.priority === 'High' ? 'text-red-600 bg-red-50' : 
                        notice.priority === 'Normal' ? 'text-blue-600 bg-blue-50' : 'text-slate-500 bg-slate-100'
                      }`}>
                        {notice.priority} Priority
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="View Notice">
                        <Eye size={18} />
                      </button>
                      <button className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md transition-colors" title="Edit Notice">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors" title="Delete Notice">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredNotices.length === 0 && (
            <div className="p-8 text-center text-slate-500 flex flex-col items-center gap-2">
              <Megaphone size={32} className="text-slate-300" />
              <p>No notices found matching your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- ADD NEW NOTICE MODAL (UI Only) --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-100 p-5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><Megaphone size={20} /></div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Draft New Notice</h2>
                  <p className="text-xs text-slate-500 font-medium">Broadcast an update to your institution</p>
                </div>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-2 rounded-full transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-4 text-center py-6 text-slate-500">
                <AlertCircle size={32} className="text-slate-300 mx-auto" />
                <p className="text-sm">Rich text editor and notice configuration will go here...</p>
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
              <button className="text-slate-500 text-sm font-semibold hover:text-slate-800 transition-colors">Save as Draft</button>
              <div className="flex gap-3">
                <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-slate-600 text-sm font-medium hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">Publish Notice</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}