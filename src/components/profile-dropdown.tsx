'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLogOut, FiUser, FiChevronDown, FiLoader, FiGrid } from 'react-icons/fi'; // 👈 FiGrid আইকন অ্যাড করেছি

interface ProfileDropdownProps {
  session: any;
  onLogout: () => Promise<void>;
  isLoggingOut: boolean;
}

export default function ProfileDropdown({ session, onLogout, isLoggingOut }: ProfileDropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ড্রপডাউনের বাইরে ক্লিক করলে বন্ধ হওয়ার লজিক
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoutClick = async () => {
    await onLogout();
    setDropdownOpen(false);
  };

  // 🎯 ইউজারের রোল বের করা (ডিফল্ট বায়ার যদি কোনো কারণে রোল না থাকে)
  const userRole = session?.user?.role || 'buyer';

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800 transition-all cursor-pointer select-none"
      >
        {session?.user?.image ? (
          <img src={session.user.image} alt={session.user.name} className="w-8 h-8 rounded-lg object-cover" />
        ) : (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center font-black uppercase text-xs">
            {session?.user?.name ? session.user.name.charAt(0) : 'U'}
          </div>
        )}
        <FiChevronDown size={14} className={`text-slate-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu Overlay */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50 overflow-hidden"
          >
            <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Matrix Account</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{session?.user?.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{session?.user?.email}</p>
              
              {/* ✨ ইউজারের রোলটি ব্যাজ আকারে দেখানোর জন্য (ঐচ্ছিক, দেখতে সুন্দর লাগে) */}
              <span className="inline-block mt-1 text-[10px] font-black uppercase tracking-widest bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-1.5 py-0.5 rounded-md">
                {userRole}
              </span>
            </div>

            <div className="p-1">
              {/* 🎯 ১. ডাইনামিক ড্যাশবোর্ড লিংক (রোল অনুযায়ী ইউআরএল সেট হবে) */}
              <Link 
                href={userRole === 'buyer' ? '/dashboard' : `/dashboard/${userRole}`} 
                onClick={() => setDropdownOpen(false)} 
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <FiGrid size={15} className="text-cyan-500" /> Dashboard
              </Link>

              {/* ২. প্রোফাইল লিংক */}
              <Link href="/profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <FiUser size={15} /> My Profile
              </Link>
              
              <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

              {/* ৩. লগআউট বাটন */}
              <button 
                onClick={handleLogoutClick}
                disabled={isLoggingOut}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all text-left cursor-pointer disabled:opacity-50"
              >
                {isLoggingOut ? <FiLoader className="animate-spin" size={15} /> : <FiLogOut size={15} />}
                {isLoggingOut ? 'Sign-out initialized...' : 'Logout Session'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}