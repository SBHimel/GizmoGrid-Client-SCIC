"use client";

import { useState } from "react";

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "seller" | "admin" | "manager";
}

interface RowProps {
  user: SystemUser;
  onRoleChange: (userId: string, newRole: string) => Promise<void>;
}

export default function UserTableRow({ user, onRoleChange }: RowProps) {
  const [updating, setUpdating] = useState(false);

  const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUpdating(true);
    await onRoleChange(user.id, e.target.value);
    setUpdating(false);
  };

  return (
    <tr className="hover:bg-slate-900/30 transition-colors">
      {/* Operator Identity */}
      <td className="p-4 pl-6 font-bold text-white uppercase tracking-wide">
        {user.name}
      </td>
      
      {/* Coordinates (Email) */}
      <td className="p-4 text-slate-400 font-medium">
        {user.email}
      </td>

      {/* Access Level (Role) Badge */}
      <td className="p-4">
        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
          user.role === "admin" 
            ? "bg-purple-950/60 text-purple-400 border-purple-900/60"
            : user.role === "seller"
            ? "bg-cyan-950/60 text-cyan-400 border-cyan-900/60"
            : "bg-slate-950 text-slate-400 border-slate-800"
        }`}>
          {user.role}
        </span>
      </td>

      {/* Dropdown Action */}
      <td className="p-4 pr-6 text-right">
        <select
          value={user.role}
          disabled={updating}
          onChange={handleSelectChange}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-40 uppercase cursor-pointer"
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
        </select>
      </td>
    </tr>
  );
}