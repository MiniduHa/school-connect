import { useState } from 'react';
import { Search, Plus, MoreVertical, Building2, Mail, Phone } from 'lucide-react';

// Extended Mock Data to include a "Declined" school
const mockSchools = [
  { id: 'SCH-001', name: "S. Thomas' College", contact: "Principal Perera", email: "admin@stc.edu", phone: "+94 11 234 5678", status: "Active" },
  { id: 'SCH-002', name: "Royal College", contact: "Principal Silva", email: "info@royal.edu", phone: "+94 11 987 6543", status: "Active" },
  { id: 'SCH-003', name: "Gateway College", contact: "Admin Fernando", email: "hello@gateway.lk", phone: "+94 11 555 4444", status: "Pending" },
  { id: 'SCH-004', name: "Lyceum International", contact: "Mrs. Jayawardena", email: "admin@lyceum.lk", phone: "+94 11 222 3333", status: "Suspended" },
  { id: 'SCH-005', name: "Fake School Academy", contact: "John Doe", email: "scam@fake.com", phone: "+94 77 000 0000", status: "Declined" },
];

export default function ManageSchools() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter by both Search Text AND Dropdown Status
  const filteredSchools = mockSchools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) || school.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || school.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manage Schools</h1>
          <p className="text-slate-500">View, add, and manage school accounts on the platform.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm">
          <Plus size={18} />
          Add New School
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by school name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 text-slate-700 font-medium"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      {/* Schools Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                <th className="p-4 font-semibold">School Details</th>
                <th className="p-4 font-semibold">Contact Info</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchools.map((school) => (
                <tr key={school.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{school.name}</p>
                        <p className="text-xs font-medium text-slate-500">ID: {school.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-medium text-slate-700">{school.contact}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <Mail size={12} /> {school.email}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <Phone size={12} /> {school.phone}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      school.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                      school.status === 'Pending' ? 'bg-blue-100 text-blue-700' : 
                      school.status === 'Suspended' ? 'bg-amber-100 text-amber-700' : 
                      'bg-red-100 text-red-700' /* This catches Declined */
                    }`}>
                      {school.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredSchools.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No schools found matching your filters.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}