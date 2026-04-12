import { useState } from 'react';
import { Users, GraduationCap, BookOpen, Calendar as CalendarIcon, Megaphone, ChevronRight, ClipboardCheck, UserMinus, Clock, UserCheck, X, BarChart3 } from 'lucide-react';

// --- OVERALL DATA WITH ADVANCED BREAKDOWNS ---
const overallStats = [
  { 
    id: 'students',
    title: "Total Students", 
    value: "1,250", 
    icon: GraduationCap, 
    color: "bg-blue-500",
    breakdownTitle: "Student Population by Grade",
    breakdown: [
      { label: "Grade 10 (O/L)", count: 350, percentage: 28 },
      { label: "Grade 11 (O/L)", count: 320, percentage: 26 },
      { label: "Grade 12 (A/L)", count: 290, percentage: 23 },
      { label: "Grade 13 (A/L)", count: 290, percentage: 23 },
    ]
  },
  { 
    id: 'teachers',
    title: "Teaching Staff", 
    value: "84", 
    icon: Users, 
    color: "bg-cyan-500",
    breakdownTitle: "Staff by Department",
    breakdown: [
      { label: "Science & Mathematics", count: 28, percentage: 33 },
      { label: "Arts & Languages", count: 22, percentage: 26 },
      { label: "Commerce", count: 18, percentage: 22 },
      { label: "IT & Technology", count: 10, percentage: 12 },
      { label: "Physical Education", count: 6, percentage: 7 },
    ]
  },
  { 
    id: 'parents',
    title: "Registered Parents", 
    value: "1,120", 
    icon: UserCheck, 
    color: "bg-purple-500",
    breakdownTitle: "Parent App Onboarding Status",
    breakdown: [
      { label: "App Installed & Active", count: 950, percentage: 85 },
      { label: "Pending Registration", count: 170, percentage: 15 },
    ]
  },
  { 
    id: 'classes',
    title: "Active Classes", 
    value: "42", 
    icon: BookOpen, 
    color: "bg-amber-500",
    breakdownTitle: "Classrooms by Grade",
    breakdown: [
      { label: "Grade 10 Sections", count: 10, percentage: 24 },
      { label: "Grade 11 Sections", count: 10, percentage: 24 },
      { label: "Grade 12 Sections", count: 11, percentage: 26 },
      { label: "Grade 13 Sections", count: 11, percentage: 26 },
    ]
  },
];

// --- DAILY SNAPSHOT WITH ADVANCED BREAKDOWNS ---
const dailyStats = [
  { 
    id: 'student_attendance',
    title: "Student Attendance", 
    value: "94%", 
    subtext: "1,175 / 1,250 Present", 
    icon: ClipboardCheck, 
    color: "bg-emerald-500",
    breakdownTitle: "Today's Attendance by Grade",
    breakdown: [
      { label: "Grade 10 (O/L)", count: "330 / 350", percentage: 94 },
      { label: "Grade 11 (O/L)", count: "300 / 320", percentage: 93 },
      { label: "Grade 12 (A/L)", count: "275 / 290", percentage: 95 },
      { label: "Grade 13 (A/L)", count: "270 / 290", percentage: 93 },
    ]
  },
  { 
    id: 'teacher_attendance',
    title: "Teacher Attendance", 
    value: "96%", 
    subtext: "81 / 84 Present", 
    icon: Users, 
    color: "bg-teal-500",
    breakdownTitle: "Today's Attendance by Dept",
    breakdown: [
      { label: "Science & Mathematics", count: "28 / 28", percentage: 100 },
      { label: "Arts & Languages", count: "21 / 22", percentage: 95 },
      { label: "Commerce", count: "17 / 18", percentage: 94 },
      { label: "IT & Technology", count: "9 / 10", percentage: 90 },
      { label: "Physical Education", count: "6 / 6", percentage: 100 },
    ]
  },
  { 
    id: 'staff_leave',
    title: "Staff on Leave", 
    value: "3", 
    subtext: "Pending Requests: 1", 
    icon: UserMinus, 
    color: "bg-rose-500",
    breakdownTitle: "Daily Leave Status Breakdown",
    breakdown: [
      { label: "Approved Medical Leave", count: 2, percentage: 50 },
      { label: "Approved Casual Leave", count: 1, percentage: 25 },
      { label: "Pending Approval", count: 1, percentage: 25 },
    ]
  },
  { 
    id: 'today_events',
    title: "Today's Events", 
    value: "2", 
    subtext: "Next: Assembly @ 10:30 AM", 
    icon: Clock, 
    color: "bg-orange-500",
    breakdownTitle: "Event Schedule Status",
    breakdown: [
      { label: "Morning Assembly (Completed)", count: "08:00 AM", percentage: 100 },
      { label: "Staff Coordination Meeting", count: "02:30 PM", percentage: 0 },
    ]
  },
];

const recentNotices = [
  { id: 1, title: "School Closed for Vesak Poya", posted: "Today, 08:30 AM", priority: "High", audience: "All Students & Parents" },
  { id: 2, title: "Grade 10 Parent-Teacher Meeting", posted: "Yesterday, 02:15 PM", priority: "Normal", audience: "Grade 10 Parents" },
  { id: 3, title: "Inter-House Sports Meet Registration", posted: "Oct 10, 2026", priority: "Normal", audience: "Students" },
];

const upcomingEvents = [
  { id: 1, title: "First Term Examinations Begin", date: "Oct 25, 2026", daysLeft: 5 },
  { id: 2, title: "Annual Prize Giving Ceremony", date: "Nov 02, 2026", daysLeft: 13 },
  { id: 3, title: "Science Fair 2026", date: "Nov 15, 2026", daysLeft: 26 },
];

export default function SchoolAdminDashboard() {
  // Modal State
  const [selectedStatBreakdown, setSelectedStatBreakdown] = useState<any | null>(null);

  return (
    <div className="max-w-7xl mx-auto space-y-8 relative">
      
      {/* Welcome Section */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Welcome back, Principal!</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Here is what is happening at S. Thomas' College today.</p>
        </div>
        <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 text-sm font-bold text-slate-600">
          Sunday, April 12, 2026
        </div>
      </div>

      {/* --- GRID 1: OVERALL STATISTICS (CLICKABLE) --- */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-4 px-1">Platform Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overallStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                onClick={() => setSelectedStatBreakdown(stat)}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md hover:border-blue-200 hover:ring-2 hover:ring-blue-50 cursor-pointer transition-all group"
                title={`View ${stat.title} Breakdown`}
              >
                <div className="flex items-center gap-4">
                  <div className={`${stat.color} bg-opacity-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon size={24} className={`text-${stat.color.split('-')[1]}-600`} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.title}</p>
                    <h3 className="text-xl font-black text-slate-800">{stat.value}</h3>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
              </div>
            );
          })}
        </div>
      </div>

      {/* --- GRID 2: TODAY'S SNAPSHOT (CLICKABLE) --- */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-4 px-1">Today's Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dailyStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                onClick={() => setSelectedStatBreakdown(stat)}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-blue-200 hover:ring-2 hover:ring-blue-50 cursor-pointer transition-all group relative overflow-hidden"
                title={`View ${stat.title} Breakdown`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.title}</p>
                    <h3 className="text-3xl font-black text-slate-800 mt-1">{stat.value}</h3>
                  </div>
                  <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-inner group-hover:scale-110 transition-transform`}>
                    <Icon size={20} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-500 bg-slate-50 inline-block px-2.5 py-1 rounded-md border border-slate-100 w-max">
                    {stat.subtext}
                  </p>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LOWER GRIDS: NOTICES & EVENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* Recent Notices */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-2">
              <div className="bg-purple-100 p-1.5 rounded-lg text-purple-600"><Megaphone size={18} /></div>
              <h3 className="text-lg font-bold text-slate-800">Recent Notices</h3>
            </div>
            <button className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="p-5 flex-1 space-y-4">
            {recentNotices.map((notice) => (
              <div key={notice.id} className="p-4 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 transition-all group cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{notice.title}</h4>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    notice.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {notice.priority}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{notice.audience}</span>
                  <span className="text-xs font-medium text-slate-400">{notice.posted}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 p-1.5 rounded-lg text-blue-600"><CalendarIcon size={18} /></div>
              <h3 className="text-lg font-bold text-slate-800">Upcoming Events</h3>
            </div>
            <button className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center">
              Calendar <ChevronRight size={16} />
            </button>
          </div>
          <div className="p-5 flex-1">
            <div className="space-y-4">
              {upcomingEvents.map((evt) => (
                <div key={evt.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-100 flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">{evt.date.split(' ')[0]}</span>
                    <span className="text-lg font-black text-blue-700">{evt.date.split(' ')[1].replace(',', '')}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">{evt.title}</h4>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">{evt.date}</p>
                  </div>
                  <div className="text-right shrink-0 hidden sm:block">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                      In {evt.daysLeft} days
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- ADVANCED BREAKDOWN MODAL --- */}
      {selectedStatBreakdown && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-slate-50 border-b border-slate-100 p-5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`${selectedStatBreakdown.color} w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm`}>
                  <selectedStatBreakdown.icon size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">{selectedStatBreakdown.title} Breakdown</h2>
                  <p className="text-xs text-slate-500 font-medium">Metric Value: {selectedStatBreakdown.value}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStatBreakdown(null)}
                className="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body - Data Visualization */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6 text-slate-800 border-b border-slate-100 pb-3">
                <BarChart3 size={18} className="text-blue-500" />
                <h3 className="font-bold">{selectedStatBreakdown.breakdownTitle}</h3>
              </div>

              <div className="space-y-5">
                {selectedStatBreakdown.breakdown.map((item: any, idx: number) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                      <span className="text-sm font-bold text-slate-900">{item.count} <span className="text-slate-400 text-xs font-medium">({item.percentage}%)</span></span>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`${selectedStatBreakdown.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500 font-medium">
                Data is updated in real-time based on system registration.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}