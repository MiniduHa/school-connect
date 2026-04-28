import { Shield, Bell, Database, Save } from 'lucide-react';

export default function PlatformSettings() {
  return (
    <div className="max-w-4xl space-y-6">
      
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Platform Settings</h1>
        <p className="text-slate-500">Manage global configurations for the SisuLink ecosystem.</p>
      </div>

      {/* Security Settings */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
            <Shield size={20} />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Security & Authentication</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-800">Require Two-Factor Authentication</p>
              <p className="text-sm text-slate-500">Force all School Admins to use 2FA when logging in.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <hr className="border-slate-100" />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-800">Session Timeout</p>
              <p className="text-sm text-slate-500">Automatically log out inactive admin users.</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-100">
              <option>15 Minutes</option>
              <option>30 Minutes</option>
              <option>1 Hour</option>
              <option>Never</option>
            </select>
          </div>
        </div>
      </div>

      {/* NEW: Notification Preferences (This uses the Bell icon!) */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
            <Bell size={20} />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Notification Preferences</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-800">New School Registration Alerts</p>
              <p className="text-sm text-slate-500">Receive an email when a new school requests to join the platform.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* System Maintenance */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="bg-amber-50 p-2 rounded-lg text-amber-600">
            <Database size={20} />
          </div>
          <h2 className="text-lg font-bold text-slate-800">System Maintenance</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-800">Maintenance Mode</p>
              <p className="text-sm text-slate-500">Lock out all non-Super Admin users. Displays a "Down for maintenance" screen.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm">
          <Save size={18} />
          Save Changes
        </button>
      </div>

    </div>
  );
}