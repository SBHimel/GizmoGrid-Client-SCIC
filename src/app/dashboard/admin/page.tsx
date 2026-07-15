"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { FiLoader, FiRefreshCw, FiUsers, FiLayers, FiShield, FiActivity, FiArrowRight } from "react-icons/fi";
import { toast } from "sonner";
import AdminStats from "./components/AdminStats";

// ইউজার টাইপ (শুধু কাউন্টিং বা স্ট্যাটসের জন্য লাগলে)
interface SystemUser {
  id: string;
  role: string;
  status?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [totalUsersCount, setTotalUsersCount] = useState(0);

  // 🔐 Better Auth সেশন ট্র্যাকিং
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.push("/login");
      return;
    }

    const role = (session.user as any).role;
    if (role !== "admin") {
      toast.error("Access Denied: Admin Clearance Required.");
      router.push("/dashboard");
      return;
    }

    // এডমিন ভেরিফাইড হলে ডাটা লোড হবে
    fetchDashboardOverview();
  }, [session, isPending, router]);

  const fetchDashboardOverview = async () => {
    setLoading(true);
    try {
      // এখানে সরাসরি তোমার api.ts থেকে ডাটা এনে কাউন্ট সেট করতে পারো
      // জাস্ট ডেমো হিসেবে আমরা স্ট্যাটস আপডেট করে নিচ্ছি
      setTotalUsersCount(128); // তোমার আসল ইউজারের সংখ্যা এখানে ডাইনামিক বসবে
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100">
        <FiLoader className="animate-spin text-cyan-400 text-4xl mb-4" />
        <p className="text-xs font-black uppercase tracking-widest animate-pulse">Requesting Admin Firewall Clearance...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-10 relative overflow-hidden">
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-500/5 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              Root Authority Terminal
            </h1>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">
              Global Operations Overview & System Metrics
            </p>
          </div>
          <button 
            onClick={fetchDashboardOverview}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400 font-bold uppercase px-4 py-2 rounded-xl text-xs transition-all cursor-pointer"
          >
            <FiRefreshCw /> Sync Systems
          </button>
        </div>

        {/* 📊 STATS COMPONENT (এটি অলরেডি কার্ড ভিত্তিক তাই সম্পূর্ণ রেসপন্সিভ) */}
        <AdminStats totalUsers={totalUsersCount} />

        {/* ⚡ TWO COLUMN CORE HUB */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          
          {/* NAVIGATION & QUICK ACTIONS (2 Columns on large screens) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-1">
              <FiLayers className="text-purple-400" /> Operational Control Hub
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1: Manage Users Link */}
              <Link href="/dashboard/admin/manage-users" className="group bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-300 backdrop-blur-md relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/10 transition-all" />
                <div className="bg-cyan-950/50 text-cyan-400 p-3 rounded-xl w-fit border border-cyan-900/40 mb-4">
                  <FiUsers className="text-xl" />
                </div>
                <h3 className="font-black uppercase tracking-wide text-white text-base flex items-center gap-2">
                  Identity Matrix <FiArrowRight className="text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-slate-400 text-xs mt-2 font-medium">
                  Modify network roles, access parameters, execute global user purges and status overrides.
                </p>
              </Link>

              {/* Card 2: Security Gate (Placeholder for other links like Products/Logs) */}
              <div className="group bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md shadow-lg opacity-70">
                <div className="bg-purple-950/50 text-purple-400 p-3 rounded-xl w-fit border border-purple-900/40 mb-4">
                  <FiShield className="text-xl" />
                </div>
                <h3 className="font-black uppercase tracking-wide text-slate-300 text-base">
                  Security Firewalls
                </h3>
                <p className="text-slate-500 text-xs mt-2 font-medium">
                  Monitor kernel requests, API request rates, encryption metrics, and active threat definitions.
                </p>
              </div>

            </div>
          </div>

          {/* 🖥️ LIVE SYSTEM ACTIVITY LOGS (মোবাইল ও ডেক্সটপ ফ্রেন্ডলি টার্মিনাল) */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-1">
              <FiActivity className="text-cyan-400" /> Real-time Security Logs
            </h2>

            <div className="bg-slate-950 border border-slate-950/60 rounded-2xl p-4 font-mono text-[11px] text-slate-400 flex flex-col gap-3 h-[240px] overflow-y-auto shadow-inner shadow-black/40">
              <div className="flex gap-2 items-start border-b border-slate-900 pb-2">
                <span className="text-emerald-500 font-bold">[OK]</span>
                <div>
                  <p className="text-slate-200">Database node synced successfully.</p>
                  <span className="text-slate-600 text-[9px]">Just now</span>
                </div>
              </div>
              
              <div className="flex gap-2 items-start border-b border-slate-900 pb-2">
                <span className="text-cyan-500 font-bold">[INFO]</span>
                <div>
                  <p className="text-slate-200">Admin session authorized for operator.</p>
                  <span className="text-slate-600 text-[9px]">3 mins ago</span>
                </div>
              </div>

              <div className="flex gap-2 items-start border-b border-slate-900 pb-2">
                <span className="text-purple-500 font-bold">[SYNC]</span>
                <div>
                  <p className="text-slate-200">Identity Directory integrity verification pass.</p>
                  <span className="text-slate-600 text-[9px]">12 mins ago</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}