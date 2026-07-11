'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-6 relative overflow-hidden transition-colors duration-300 bg-grid-pattern">
      
      {/* ================= WOW ANIMATED BACKGROUND ORBS ================= */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* লাইট মোডে একটু স্পষ্ট এবং ডার্ক মোডে ফিউচারিস্টিক গ্লো ইফেক্ট */}
        <motion.div 
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -40, 40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[550px] h-[320px] sm:h-[550px] bg-red-400/20 dark:bg-red-500/5 rounded-full blur-[90px] sm:blur-[130px]"
        />
      </div>

      <div className="text-center max-w-md z-10">
        
        {/* ৪MD৪ এনিমেটেড আইকন (লাইট ও ডার্ক মোডে হাই-কন্ট্রাস্ট বর্ডার) */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 15 }}
          className="inline-flex p-5 rounded-2xl bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-500 mb-6 border border-red-300 dark:border-red-500/20 shadow-sm dark:shadow-[0_0_30px_rgba(239,68,68,0.1)]"
        >
          <AlertTriangle size={44} className="animate-bounce" />
        </motion.div>

        {/* ৪MD৪ হেডিং (লাইট মোডে একদম ক্রিস্প ডার্ক স্লেট) */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-7xl sm:text-8xl font-black text-slate-200 dark:text-white mb-2 tracking-tight"
        >
          404
        </motion.h1>

        {/* সাব-টাইটেল */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-extrabold text-slate-200 dark:text-slate-200 mb-4 tracking-wide"
        >
          Lost in the Grid?
        </motion.h2>

        {/* ডেসক্রিপশন (text-slate-600 বদলে WOW হাই-কন্ট্রাস্ট গ্রে-সায়ান শেড) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-slate-200/90 dark:text-slate-400 text-sm sm:text-base mb-10 leading-relaxed font-medium dark:font-normal"
        >
          The gadget or matrix route you are trying to access does not exist or has been shifted to a different coordinate in GizmoGrid.
        </motion.p>

        {/* ইন্টারঅ্যাক্টিভ বাটন গ্রুপ (লাইট ও ডার্ক মোডে ফুল অপ্টিমাইজড) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-7 py-3.5 rounded-xl font-bold hover:scale-105 active:scale-95 shadow-md shadow-cyan-600/10 dark:shadow-none transition-all duration-200 cursor-pointer text-sm"
          >
            <Home size={16} />
            Back to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-7 py-3.5 rounded-xl font-bold hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm cursor-pointer text-sm"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </motion.div>

      </div>
    </div>
  );
}