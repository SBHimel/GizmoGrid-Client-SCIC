import { FiUsers, FiShield, FiAlertTriangle } from "react-icons/fi";

interface StatsProps {
  totalUsers: number;
}

export default function AdminStats({ totalUsers }: StatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
      {/* Users Count Card */}
      <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total System Nodes</p>
          <h3 className="text-2xl font-black text-white mt-1">{totalUsers} Users</h3>
        </div>
        <FiUsers className="text-3xl text-cyan-400" />
      </div>

      {/* Firewall Status Card */}
      <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Firewall Security</p>
          <h3 className="text-2xl font-black text-emerald-400 mt-1">Active</h3>
        </div>
        <FiShield className="text-3xl text-emerald-400" />
      </div>

      {/* Infractions Card */}
      <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">System Infractions</p>
          <h3 className="text-2xl font-black text-slate-400 mt-1">00 Detected</h3>
        </div>
        <FiAlertTriangle className="text-3xl text-amber-500" />
      </div>
    </div>
  );
}