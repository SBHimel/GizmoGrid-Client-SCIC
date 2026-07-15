"use client";

import { useState } from "react";
import { FiShield, FiUserCheck, FiCpu } from "react-icons/fi";

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "seller" | "admin" | "manager";
  status?: "active" | "suspended";
}

interface RowProps {
  user: SystemUser;
  onRoleChange: (userId: string, newRole: string) => Promise<void>;
  onToggleStatus: (userId: string, currentStatus: string) => Promise<void>;
}

export default function UserManageRow({ user, onRoleChange, onToggleStatus }: RowProps) {
  const [loadingAction, setLoadingAction] = useState(false);

  const handleRoleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoadingAction(true);
    await onRoleChange(user.id, e.target.value);
    setLoadingAction(false);
  };

  return (
    // ⚠️ ফিক্সড: এখানে অবশ্যই <tr> রিটার্ন করতে হবে, কোনো <div> ব্যবহার করা যাবে না
    <tr className="hover:bg-slate-900/40 transition-all duration-200">
      
      {/* Operator Alias */}
      <td className="p-5 pl-8 font-extrabold text-white tracking-wide uppercase flex items-center gap-2">
        <FiCpu className="text-cyan-500/70" />
        {user.name}
      </td>

      {/* Network Address (Email) */}
      <td className="p-5 text-slate-400 font-medium font-mono text-xs">
        {user.email}
      </td>

      {/* Access Permission (Role Selector) */}
      <td className="p-5">
        <select
          value={user.role}
          disabled={loadingAction}
          onChange={handleRoleSelect}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-300 focus:outline-none focus:border-cyan-500 uppercase cursor-pointer"
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
        </select>
      </td>

      {/* Core Integrity (Status Badge) */}
      <td className="p-5">
        <span
          className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md border ${
            user.status === "active"
              ? "bg-emerald-950/40 text-emerald-400 border-emerald-900/50"
              : "bg-rose-950/40 text-rose-400 border-rose-900/50"
          }`}
        >
          {user.status}
        </span>
      </td>

      {/* System Intercepts (Action Button) */}
      <td className="p-5 pr-8 text-right">
        <button
          onClick={() => onToggleStatus(user.id, user.status || "active")}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
            user.status === "active"
              ? "bg-slate-950 hover:bg-rose-950/40 text-rose-500 border-rose-900/30 hover:border-rose-700/60"
              : "bg-slate-950 hover:bg-emerald-950/40 text-emerald-400 border-emerald-900/30 hover:border-emerald-700/60"
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
      </td>

    </tr>
  );
}