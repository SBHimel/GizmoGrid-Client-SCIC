'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiShoppingBag, FiHeart, FiCreditCard, // Buyer Icons
  FiPlusCircle, FiBox, FiTrendingUp,    // Seller Icons
  FiUsers, FiGrid, FiShield,            // Admin Icons
  FiHome, FiLoader
} from 'react-icons/fi';
// 🎯 তোমার প্রজেক্টের Better Auth ক্লায়েন্টটি যেখানে আছে সেখান থেকে ইম্পোর্ট করো
import { authClient } from '@/lib/auth-client'; 

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 🔌 Better Auth থেকে সেশন এবং লোডিং স্টেট নেওয়া
  const { data: session, isPending } = authClient.useSession();

  // 🔹 ১. বায়ারের জন্য সাইডবার মেনু
  const buyerLinks = [
    { name: 'Dashboard Home', href: '/dashboard', icon: FiGrid },
    { name: 'My Orders', href: '/dashboard/buyer/my-orders', icon: FiShoppingBag },
    { name: 'My Wishlist', href: '/dashboard/buyer/wishlist', icon: FiHeart },
  ];

  // 🔹 ২. সেলারের জন্য সাইডবার মেনু
  const sellerLinks = [
    { name: 'Seller Home', href: '/dashboard/seller', icon: FiTrendingUp },
    { name: 'Add Product', href: '/dashboard/seller/add-product', icon: FiPlusCircle },
    { name: 'My Products', href: '/dashboard/seller/my-products', icon: FiBox },
  ];

  // 🔹 ৩. এডমিনের জন্য সাইডবার মেনু
  const adminLinks = [
    { name: 'Admin Home', href: '/dashboard/admin', icon: FiShield },
    { name: 'Manage Users', href: '/dashboard/admin/manage-users', icon: FiUsers },
    { name: 'All Products', href: '/dashboard/admin/all-products', icon: FiGrid },
  ];

  // ⏳ সেশন লোড হওয়ার সময় একটি সুন্দর লোডার দেখানো
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <FiLoader className="animate-spin text-cyan-500" size={30} />
      </div>
    );
  }

  // 🎯 ডাটাবেজ থেকে আসা ইউজারের রিয়েল রোল (যদি না থাকে তবে ডিফল্ট 'buyer')
  const userRole = session?.user?.role || 'buyer';

  // 🌟 ইউজারের রোলের ওপর ভিত্তি করে সাইডবার মেনু ফিল্টার করা
  let currentLinks = buyerLinks; 
  if (userRole === 'seller') currentLinks = sellerLinks;
  if (userRole === 'admin') currentLinks = adminLinks;
  // ফিউচারে ম্যানেজার অ্যাড করলে: if (userRole === 'manager') currentLinks = managerLinks;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* ⬅️ ডাইনামিক সাইডবার */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between fixed h-full z-30">
        <div className="p-6">
          {/* লোগো */}
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2 mb-8">
            <FiGrid className="text-cyan-600" /> GizmoGrid
          </Link>

          {/* 🏷️ বর্তমান রোল ব্যাজ */}
          <div className="mb-6 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Account Type</span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 px-2 py-0.5 bg-cyan-50 dark:bg-cyan-500/10 rounded-md">
              {userRole}
            </span>
          </div>

          {/* ডাইনামিক মেনু লিস্ট */}
          <nav className="space-y-1">
            {currentLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                    isActive
                      ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-600/20'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 🚪 নিচে মেইন হোমপেজে ফেরার বাটন */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-all"
          >
            <FiHome size={18} /> Back to Home
          </Link>
        </div>
      </aside>

      {/* 📋 মেইন কন্টেন্ট এরিয়া */}
      <main className="flex-1 ml-64 p-8 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}