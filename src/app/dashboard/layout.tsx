'use client';

import React, { useState, useEffect } from 'react'; // 🌟 useEffect ইমপোর্ট করা হলো
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiShoppingBag, FiHeart, 
  FiPlusCircle, FiBox, FiTrendingUp,    
  FiUsers, FiGrid, FiShield,            
  FiHome, FiLoader, FiMenu, FiX 
} from 'react-icons/fi';
import { authClient } from '@/lib/auth-client'; 
import { AuthUser } from '@/lib/auth';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // 📱 মোবাইল সাইডবার ওপেন/ক্লোজ করার স্টেট
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // 🔌 Better Auth থেকে সেশন এবং লোডিং স্টেট নেওয়া
  const { data: session, isPending } = authClient.useSession();

  // 🛡️ ─── REAL-TIME SUSPENSION CHECK ───
  useEffect(() => {
    // সেশন থেকে ইউজারের কারেন্ট স্ট্যাটাস চেক করা হচ্ছে
    const userStatus = (session?.user as any)?.status;
    
    if (session?.user && userStatus === 'suspended') {
      // ইউজার সাসপেন্ডেড হলে টোকেন ডিলিট করে লগইন পেজে কিক-আউট করা হবে
      authClient.signOut().then(() => {
        window.location.href = '/login?error=suspended';
      });
    }
  }, [session]);

  // 🔹 ১. বায়ারের জন্য সাইডবার মেনু
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

  // ⏳ সেশন লোড হওয়ার সময় বা সাসপেন্ড হয়ে রিডাইরেক্ট হওয়ার ঠিক আগের মুহূর্ত পর্যন্ত লোডার শো করবে
  if (isPending || (session?.user && (session.user as any).status === 'suspended')) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <FiLoader className="animate-spin text-cyan-500" size={30} />
      </div>
    );
  }

const userRole = (session?.user as AuthUser & { role?: string })?.role || "buyer";

  let currentLinks = buyerLinks; 
  if (userRole === 'seller') currentLinks = sellerLinks;
  if (userRole === 'admin') currentLinks = adminLinks;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      {/* 📱 MOBILE TOP BAR */}
      <header className="md:hidden flex items-center justify-between bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 z-40 shadow-sm">
        <Link href="/" className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
          <FiGrid className="text-cyan-600" /> GizmoGrid
        </Link>
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-all cursor-pointer"
        >
          <FiMenu size={22} />
        </button>
      </header>

      {/* 📱 MOBILE OVERLAY BACKDROP */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      {/* ⬅️ DYNAMIC SIDEBAR */}
      <aside className={`
        fixed top-0 bottom-0 left-0 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 
        flex flex-col justify-between h-full z-50 transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
              <FiGrid className="text-cyan-600" /> GizmoGrid
            </Link>
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 transition-all cursor-pointer"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* 🏷️ অ্যাকাউন্ট রোল ব্যাজ */}
          <div className="mb-6 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Account Type</span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 px-2 py-0.5 bg-cyan-50 dark:bg-cyan-500/10 rounded-md">
              {userRole}
            </span>
          </div>

          {/* ডাইনামিক নেভিগেশন মেনু */}
          <nav className="space-y-1">
            {currentLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
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

      {/* 📋 MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-64 p-4 sm:p-6 md:p-8 min-h-screen transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}