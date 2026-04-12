import { useState } from 'react';
import { Search, Plus, X, CalendarDays, Clock, MapPin, Users, Edit2, Trash2, Calendar as CalendarIcon, Flag, BookOpen } from 'lucide-react';

// --- MOCK DATA ---
const initialEvents = [
  { 
    id: 'EVT-001', title: "First Term Examinations Begin", date: "2026-04-25", time: "08:00 AM", 
    location: "Main Examination Halls", type: "Exam", audience: "All Grades", status: "Upcoming" 
  },
  { 
    id: 'EVT-002', title: "School Closed for Vesak Poya", date: "2026-05-01", time: "All Day", 
    location: "N/A", type: "Holiday", audience: "All Students & Staff", status: "Upcoming" 
  },
  { 
    id: 'EVT-003', title: "Annual Inter-House Sports Meet", date: "2026-05-15", time: "07:30 AM", 
    location: "College Main Ground", type: "Activity", audience: "All Students", status: "Upcoming" 
  },
  { 
    id: 'EVT-004', title: "Grade 10 Parent-Teacher Meeting", date: "2026-05-20", time: "02:00 PM", 
    location: "Main Hall", type: "Academic", audience: "Grade 10 Parents", status: "Upcoming" 
  },
  { 
    id: 'EVT-005', title: "Science Fair 2026", date: "2026-06-10", time: "09:00 AM", 
    location: "Science Block", type: "Activity", audience: "Grades 10-13", status: "Draft" 
  },
];

export default function ManageCalendar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [events] = useState(initialEvents);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Filter Logic
  const filteredEvents = events.filter(evt => {
    const matchesSearch = evt.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || evt.type.toLowerCase() === typeFilter.toLowerCase();
    return matchesSearch && matchesType;
  });

  // Helper function to pick the right icon and color for event types
  const getEventTypeStyles = (type: string) => {
    switch(type) {
      case 'Exam': return { color: 'text-amber-600 bg-amber-50 border-amber-200', icon: BookOpen };
      case 'Holiday': return { color: 'text-rose-600 bg-rose-50 border-rose-200', icon: Flag };
      case 'Activity': return { color: 'text-emerald-600 bg-emerald-50 border-emerald-200', icon: Users };
      case 'Academic': return { color: 'text-blue-600 bg-blue-50 border-blue-200', icon: CalendarIcon };
      default: return { color: 'text-slate-600 bg-slate-50 border-slate-200', icon: CalendarDays };
    }
  };

  return (
    <div className="space-y-6 relative">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-800">School Calendar</h1>
          <p className="text-sm text-slate-500 font-medium">Manage academic events, holidays, exams, and activities.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Add Event
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search events by title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm"
          />
        </div>
        <select 
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 text-slate-700 font-medium text-sm"
        >
          <option value="all">All Event Types</option>
          <option value="academic">Academic</option>
          <option value="exam">Examinations</option>
          <option value="activity">Activities & Sports</option>
          <option value="holiday">Holidays</option>
        </select>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                <th className="p-4 font-semibold">Event Details</th>
                <th className="p-4 font-semibold">Date & Time</th>
                <th className="p-4 font-semibold">Location & Audience</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((evt) => {
                const { color, icon: TypeIcon } = getEventTypeStyles(evt.type);
                
                return (
                  <tr key={evt.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${color} shrink-0`}>
                          <TypeIcon size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{evt.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${color}`}>
                              {evt.type}
                            </span>
                            {evt.status === 'Draft' && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                                Draft
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1">
                        <CalendarDays size={14} className="text-blue-500" /> 
                        {new Date(evt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <Clock size={14} className="text-slate-400" /> {evt.time}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-slate-700 mb-1">
                        <MapPin size={14} className="text-slate-400" /> {evt.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <Users size={14} className="text-slate-400" /> {evt.audience}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit Event">
                          <Edit2 size={18} />
                        </button>
                        <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors" title="Delete Event">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredEvents.length === 0 && (
            <div className="p-8 text-center text-slate-500 flex flex-col items-center gap-2">
              <CalendarDays size={32} className="text-slate-300" />
              <p>No events found matching your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- ADD NEW EVENT MODAL (UI Only) --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-100 p-5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><CalendarDays size={20} /></div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Add Calendar Event</h2>
                  <p className="text-xs text-slate-500 font-medium">Schedule a new school activity</p>
                </div>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-2 rounded-full transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-500 text-center py-8">Event creation form will go here...</p>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-slate-600 text-sm font-medium hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">Save Event</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}