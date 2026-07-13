"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiLogIn,
  FiLogOut,
  FiPlusCircle,
  FiGrid,
  FiCompass,
  FiHome,
  FiLoader,
} from "react-icons/fi";
import { useSession, authClient } from "@/lib/auth-client";
// নতুন তৈরি করা প্রোফাইল কম্পোনেন্ট ইম্পোর্ট
import ProfileDropdown from "@/components/profile-dropdown";
import { toast } from "sonner";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

const handleLogout = async () => {
    setIsLoggingOut(true);
    setMobileMenuOpen(false);

    // Sonner-এর লোডিং ও প্রমিজ হ্যান্ডলার ব্যবহার করলাম
    toast.promise(
      authClient.signOut({
        onSuccess: () => {
          setIsLoggingOut(false);
          // Better Auth কুকি রিলিজ করার জন্য ১ সেকেন্ড টাইম দিয়ে ফোর্স রিডাইরেক্ট
          setTimeout(() => {
            window.location.href = '/login';
          }, 1000);
        },
        onError: (ctx) => {
          setIsLoggingOut(false);
          throw new Error(ctx.error.message || 'Logout failed.');
        }
      }),
      {
        loading: 'Disconnecting from GizmoGrid matrix...',
        success: 'Logged out successfully! Redirecting...',
        error: (err) => err.message || 'Could not terminate session.',
      }
    );
  };

  const navItems = [
    { path: "/", label: "Home", icon: FiHome },
    { path: "/products", label: "Explore", icon: FiCompass },
    ...(session
      ? [
          { path: "/items/add", label: "Add Item", icon: FiPlusCircle },
          { path: "/items/manage", label: "Manage", icon: FiGrid },
        ]
      : []),
  ];

  return (
    <div className="fixed top-4 left-0 w-full z-50 px-4 md:px-8">
      <nav className="max-w-7xl mx-auto bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 text-slate-900 dark:text-white rounded-2xl shadow-[0_8px_32px_0_rgba(15,23,42,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300">
        <div className="h-16 px-6 flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 dark:from-cyan-400 dark:via-cyan-300 dark:to-blue-500 group-hover:opacity-80 transition-opacity">
              GizmoGrid
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="relative px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-colors duration-200"
                  onMouseEnter={() => setHoveredPath(item.path)}
                  onMouseLeave={() => setHoveredPath(null)}
                >
                  <item.icon
                    size={15}
                    className={
                      isActive
                        ? "text-cyan-500 dark:text-cyan-400"
                        : "text-slate-500"
                    }
                  />
                  <span
                    className={
                      isActive
                        ? "text-slate-900 dark:text-white font-bold"
                        : "text-slate-600 dark:text-slate-300"
                    }
                  >
                    {item.label}
                  </span>

                  {hoveredPath === item.path && (
                    <motion.span
                      layoutId="hoverBackground"
                      className="absolute inset-0 bg-slate-100 dark:bg-slate-800/80 rounded-xl -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-400 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-amber-500 dark:text-cyan-400 hover:scale-105 active:scale-95 transition-all overflow-hidden cursor-pointer"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === "dark" ? (
                    <motion.div
                      key="moon"
                      initial={{ y: -15, opacity: 0, rotate: 45 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: 15, opacity: 0, rotate: -45 }}
                      transition={{ duration: 0.15 }}
                    >
                      <FiMoon size={16} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ y: -15, opacity: 0, rotate: -45 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: 15, opacity: 0, rotate: 45 }}
                      transition={{ duration: 0.15 }}
                    >
                      <FiSun size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            )}

            {/* Better Auth Dynamic Actions - কম্পোনেন্ট কল */}
            {isPending ? (
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-xl" />
            ) : session ? (
              <ProfileDropdown
                session={session}
                onLogout={handleLogout}
                isLoggingOut={isLoggingOut}
              />
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:opacity-95 shadow-md shadow-cyan-500/10 dark:shadow-none hover:scale-105 active:scale-95 transition-all"
              >
                <FiLogIn size={15} /> Login
              </Link>
            )}
          </div>

          {/* Mobile Interactive Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-amber-500 dark:text-cyan-400"
              >
                {theme === "dark" ? <FiMoon size={16} /> : <FiSun size={16} />}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Interactive Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl p-4 flex flex-col gap-2 border border-slate-200 dark:border-slate-800 shadow-xl"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${pathname === item.path ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400" : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"}`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
            <div className="h-[1px] bg-slate-200 dark:bg-slate-800 my-2" />

            {/* Mobile User Section */}
            {session ? (
              <div className="flex flex-col gap-3 pt-1">
                <div className="flex items-center justify-between px-4 py-1">
                  <div className="flex items-center gap-3">
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name}
                        className="w-9 h-9 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center font-black uppercase text-xs">
                        {session.user.name ? session.user.name.charAt(0) : "U"}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate max-w-[150px]">
                        {session.user.name}
                      </span>
                      <span className="text-[11px] text-slate-500 truncate max-w-[150px]">
                        {session.user.email}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-bold text-cyan-500 hover:underline"
                  >
                    View Profile
                  </Link>
                </div>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoggingOut ? (
                    <FiLoader className="animate-spin" size={16} />
                  ) : (
                    <FiLogOut size={16} />
                  )}
                  Logout Session
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 text-center"
              >
                <FiLogIn size={16} /> Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
