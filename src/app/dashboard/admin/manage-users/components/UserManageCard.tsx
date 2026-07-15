"use client";

import { useState } from "react";
import { FiShield, FiUserCheck, FiCpu, FiMail } from "react-icons/fi";

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "seller" | "admin" | "manager";
  status?: "active" | "suspended";
}

interface CardProps {
  user: SystemUser;
  onRoleChange: (userId: string, newRole: string) => Promise<void>;
  onToggleStatus: (userId: string, currentStatus: string) => Promise<void>;
}

export default function UserManageCard({ user, onRoleChange, onToggleStatus }: CardProps) {
  const [loadingAction, setLoadingAction] = useState(false);

  const handleRoleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoadingAction(true);
    await onRoleChange(user.id, e.target.value);
    setLoadingAction(false);
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 backdrop-blur-md flex flex-col gap-4 relative overflow-hidden shadow-lg w-full">
      
      {/* বাম পাশের গ্লোয়িং বর্ডার ইন্ডিকেটর */}
      <div className={`absolute top-0 left-0 w-1.5 h-full ${user.status === 'active' ? 'bg-emerald-500/40' : 'bg-rose-500/40 animate-pulse'}`} />

      {/* ইউজার ইনফো সেকশন */}
      <div className="flex justify-between items-start pl-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-black text-white uppercase text-base flex items-center gap-1.5 tracking-wide truncate">
            <FiCpu className="text-cyan-400 text-sm flex-shrink-0" />
            {user.name}
          </h3>
          <p className="text-slate-400 font-mono text-xs flex items-center gap-1.5 mt-1 break-all">
            <FiMail className="text-slate-500 flex-shrink-0" />
            {user.email}
          </p>
        </div>
        
        {/* স্ট্যাটাস ব্যাজ */}
        <span
          className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded border flex-shrink-0 ml-2 ${
            user.status === "active"
              ? "bg-emerald-950/60 text-emerald-400 border-emerald-900/60"
              : "bg-rose-950/60 text-rose-400 border-rose-900/60"
          }`}
        >
          {user.status}
        </span>
      </div>

      <div className="w-full h-px bg-slate-800/60 my-1" />

      {/* অ্যাকশন কন্ট্রোল সেকশন */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pl-2">
        {/* রোল সিলেক্টর */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Security Clearance</span>
          <select
            value={user.role}
            disabled={loadingAction}
            onChange={handleRoleSelect}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-200 focus:outline-none focus:border-cyan-500 uppercase cursor-pointer"
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        {/* ব্যান / অ্যাক্টিভেট বাটন */}
        <div className="flex items-end mt-2 sm:mt-0">
          <button
            onClick={() => onToggleStatus(user.id, user.status || "active")}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              user.status === "active"
                ? "bg-slate-950 hover:bg-rose-950/40 text-rose-500 border-rose-900/40 hover:border-rose-700/60"
                : "bg-slate-950 hover:bg-emerald-950/40 text-emerald-400 border-emerald-900/40 hover:border-emerald-700/60"
            }`}
          >
            {user.status === "active" ? (
              <>
                <FiShield /> Purge Access
              </>
            ) : (
              <>
                <FiUserCheck /> Override Ban
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}