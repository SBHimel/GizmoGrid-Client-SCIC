"use client";

import { useEffect, useState } from "react";
import { FiLoader, FiSearch, FiFilter, FiRefreshCw } from "react-icons/fi";
import { toast } from "sonner";
import { getAllUsers, updateUserRoleInDB, updateUserStatusInDB } from "@/lib/api";
import UserManageRow from "./components/UserManageRow";
import UserManageCard from "./components/UserManageCard";
import { authClient } from "@/lib/auth-client";

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "seller" | "admin" | "manager";
  status?: "active" | "suspended";
}

export default function ManageUsersPage() {
  
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const { data: session } = authClient.useSession();

const currentUserId = session?.user?.id;

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      if (data.success) {
        // ডাটাবেজে status না থাকলে ফ্রন্টএন্ডের জন্য active ডিফল্ট সেট করে নিচ্ছি
        const updatedUsers = data.data.map((u: any) => ({
          ...u,
          status: u.status || "active",
        }));
        setUsers(updatedUsers);
      } else {
        toast.error("Failed to load users from DB Core.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Database connection failure.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const data = await updateUserRoleInDB(userId, newRole);
      if (data.success) {
        toast.success("Security authorization level adjusted.");
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId ? { ...u, role: newRole as any } : u,
          ),
        );
      } else {
        toast.error("Database sync failed.");
      }
    } catch (error) {
      toast.error("Failed to update role.");
    }
  };

const handleToggleStatus = async (userId: string, currentStatus: string) => {
  if (userId === currentUserId) {
  toast.error("You cannot suspend your own account.");
  return;
}
  const nextStatus = currentStatus === "active" ? "suspended" : "active";
  
  try {
    // 🔌 তোমার সেন্ট্রাল ইনডেক্স থেকে আসা ফাংশন কল
    const data = await updateUserStatusInDB(userId, nextStatus);
    
    if (data.success) {
      // ডাটাবেজে সফলভাবে সেভ হলেই কেবল UI চেঞ্জ হবে
      toast.success(`User access clearance set to: ${nextStatus.toUpperCase()}`);
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: nextStatus as any } : u));
    } else {
      toast.error("Database connection failed to sync status.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Status update failed.");
  }
};

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesFilter;
  });

  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100">
        <FiLoader className="animate-spin text-purple-500 text-4xl mb-4" />
        <p className="text-xs font-bold tracking-widest uppercase animate-pulse">
          Loading Identity Matrix Core...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-10 relative overflow-hidden">
      {/* CYBER SHADOW EFFECT */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* TOP PANEL HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
              Identity Grid Controller
            </h1>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 mt-2">
              Execute root-level overrides, ban routines, and network
              classifications
            </p>
          </div>
          <button
            onClick={fetchUsersData}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400 font-bold uppercase px-4 py-2 rounded-xl text-xs transition-all cursor-pointer"
          >
            <FiRefreshCw className={loading ? "animate-spin" : ""} /> Sync Node
          </button>
        </div>

        {/* CONTROLS: SEARCH & FILTER */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="relative sm:col-span-2">
            <FiSearch className="absolute left-4 top-3.5 text-slate-500 text-lg" />
            <input
              type="text"
              placeholder="Search Name or Email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl pl-12 pr-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 backdrop-blur-sm transition-all"
            />
          </div>

          <div className="relative">
            <FiFilter className="absolute left-4 top-3.5 text-slate-500 text-md" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl pl-10 pr-4 py-3 text-sm font-bold text-slate-300 focus:outline-none focus:border-cyan-500 uppercase cursor-pointer appearance-none transition-all"
            >
              <option value="all">All Clearance Levels</option>
              <option value="admin">Admin Only</option>
              <option value="seller">Seller Only</option>
              <option value="buyer">Buyer Only</option>
              <option value="manager">Manager Only</option>
            </select>
          </div>
        </div>

        {/* 📱 ১. মোবাইল লেআউট: টেবিল বাদে সম্পূর্ণ স্বাধীন গ্লোয়িং কার্ড গ্রিড */}
        <div className="block md:hidden grid grid-cols-1 gap-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserManageCard
                key={user.id}
                user={user}
                onRoleChange={handleRoleChange}
                onToggleStatus={handleToggleStatus}
              />
            ))
          ) : (
            <div className="p-10 text-center text-xs font-bold uppercase tracking-widest text-slate-600 bg-slate-900/30 border border-slate-800/80 rounded-2xl">
              No matching identity logs discovered.
            </div>
          )}
        </div>

        {/* 💻 ২. ডেস্কটপ লেআউট: পিওর এইচটিএমএল টেবিল স্ট্রাকচার */}
        {/* 🌟 এখানে overflow-hidden এর জায়গায় overflow-x-auto করেছি যা ট্যাব-ল্যাপটপে স্ক্রল দিবে */}
        <div className="hidden md:block bg-slate-900/30 border border-slate-800/80 rounded-2xl overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800 backdrop-blur-xl shadow-2xl">
          <div className="w-full">
            {/* 🌟 এখানে টেবিলে min-w-[900px] দিয়েছি যাতে মাঝারি ডিভাইসে টেবিলের কলামগুলো ডেটা চেপে না যায় */}
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <th className="p-5 pl-8">Operator Alias</th>
                  <th className="p-5">Network Address</th>
                  <th className="p-5">Access Permission</th>
                  <th className="p-5">Core Integrity</th>
                  <th className="p-5 pr-8 text-right">System Intercepts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-sm">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <UserManageRow
                      key={user.id}
                      user={user}
                      onRoleChange={handleRoleChange}
                      onToggleStatus={handleToggleStatus}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-10 text-center text-xs font-bold uppercase tracking-widest text-slate-600"
                    >
                      No matching identity logs discovered in this sector.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
