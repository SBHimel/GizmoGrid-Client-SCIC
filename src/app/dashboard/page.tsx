'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiLoader, FiGrid, FiShoppingBag, FiClock, FiHeart, FiUser } from 'react-icons/fi';
import Link from 'next/link';
// 🎯 তোমার প্রজেক্টের Better Auth ক্লায়েন্ট পাথ অনুযায়ী ইম্পোর্ট করো
import { authClient } from '@/lib/auth-client'; 
import { AuthUser } from '@/lib/auth';

export default function DashboardPage() {
  const router = useRouter();
  
  // 🔌 Better Auth থেকে সেশন এবং লোডিং স্টেট নেওয়া
  const { data: session, isPending } = authClient.useSession();

  // 🎯 ইউজারের রোল বের করা
  const userRole = (session?.user as AuthUser & { role?: string })?.role || "buyer";

  // 🔄 রোল অনুযায়ী সঠিক ড্যাশবোর্ডে অটোমেটিক পাঠিয়ে দেওয়ার লজিক (সেলার এবং এডমিনের জন্য)
  useEffect(() => {
    if (!isPending && session) {
      if (userRole === 'seller') {
        router.push('/dashboard/seller');
      } else if (userRole === 'admin') {
        router.push('/dashboard/admin');
      }
    }
  }, [userRole, isPending, session, router]);

  // ⏳ সেশন লোড হওয়ার সময় সুন্দর লোডার স্ক্রিন
  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-3">
        <FiLoader className="animate-spin text-cyan-500" size={36} />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading your space...</p>
      </div>
    );
  }

  // 🚫 ইউজার যদি লগইন ছাড়া ড্যাশবোর্ডে ঢোকার চেষ্টা করে
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Access Denied 🔒</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
To view the dashboard, you must first log in.</p>
        <Link href="/login" className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl text-sm transition shadow-sm">
          Go to Login
        </Link>
      </div>
    );
  }

  // 🟡 ৩. ইউজার যদি 'buyer' হয়, তবে সে রিডাইরেক্ট না হয়ে নিচের এই সুন্দর বায়ার ড্যাশবোর্ডটি দেখবে:
  return (
    <div className="space-y-6">
      {/* 🔹 ওয়েলকাম ব্যানার */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-950 p-8 rounded-2xl text-white shadow-md">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {session?.user?.name || 'Buyer'}! 👋</h1>
        <p className="text-slate-300">Welcome to the GizmoGrid dashboard. Track the latest updates on your favorite gadgets and orders from here.</p>
      </div>

      {/* 🔹 কুইক স্ট্যাটাস কার্ডস (বায়ারের ডামি ডাটা) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* কার্ড ১: মোট অর্ডার */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Orders</span>
            <span className="p-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-xl">
              <FiShoppingBag />
            </span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">3</h3>
          <p className="text-xs text-slate-400 mt-1">Total orders placed so far</p>
        </div>

        {/* কার্ড ২: পেন্ডিং অর্ডার */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Orders</span>
            <span className="p-2 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg text-xl">
              <FiClock />
            </span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">1</h3>
          <p className="text-xs text-slate-400 mt-1">
Orders that are still being processed</p>
        </div>

        {/* কার্ড ৩: উইশলিস্ট আইটেম */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Wishlist Items</span>
            <span className="p-2 bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 rounded-lg text-xl">
              <FiHeart />
            </span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">5</h3>
          <p className="text-xs text-slate-400 mt-1">Products added to your wishlist</p>
        </div>
      </div>

      {/* 🔹 কুইক অ্যাকশন এরিয়া */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link 
            href="/profile" 
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-lg text-sm transition"
          >
            <FiUser /> Update Profile
          </Link>
          <Link 
            href="/dashboard/buyer/my-orders" 
            className="flex items-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-xl text-sm transition shadow-sm"
          >
            <FiShoppingBag /> Track My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}