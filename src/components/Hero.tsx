'use client';

import { motion, Variants } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Cpu, Zap } from 'lucide-react';

export default function Hero() {
  // অ্যানিমেশন ভ্যারিয়েন্ট
  const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

  const containerLayout = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  return (
    <section className="relative min-h-[75vh] pt-28 pb-16 flex items-center justify-center bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      
      {/* ================= WOW ANIMATED BACKGROUND ================= */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* ১ম অ্যানিমেটেড লাইট ওর্ব (লাইট মোডে একটু ডিপ কালার যেন সাদা ব্যাকগ্রাউন্ডে দেখা যায়) */}
        <motion.div 
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -50, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/3 w-[350px] md:w-[600px] h-[350px] bg-cyan-400/20 dark:bg-cyan-500/5 rounded-full blur-[80px] md:blur-[120px]"
        />
        
        {/* ২য় অ্যানিমেটেড লাইট ওর্ব */}
        <motion.div 
          animate={{
            x: [0, -30, 50, 0],
            y: [0, 40, -40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 left-2/3 w-[250px] md:w-[450px] h-[250px] bg-blue-400/20 dark:bg-indigo-500/5 rounded-full blur-[80px]"
        />
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-6 text-center z-10"
        variants={containerLayout}
        initial="hidden"
        animate="visible"
      >
        
        {/* ছোট ব্যাজ অ্যানিমেশন (লাইট মোডে বর্ডার ও টেক্সট আরও স্পষ্ট করা হয়েছে) */}
        <motion.div 
          variants={fadeInUp}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-400/10 border border-cyan-300 dark:border-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-xs font-bold mb-6 tracking-wide shadow-sm dark:shadow-none"
        >
          <Sparkles size={14} className="animate-pulse text-cyan-600 dark:text-cyan-400" />
          <span>Next-Generation Technology Grid</span>
        </motion.div>

        {/* মেইন হেডিং (লাইট মোডে slate-900 যা একদম ক্রিস্প ক্লিয়ার দেখাবে) */}
        <motion.h1 
          variants={fadeInUp}
          className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-slate-200 dark:text-white leading-[1.1] mb-6"
        >
          Discover & Manage <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-cyan-300 dark:to-blue-500">
            Ultimate Tech Gizmos
          </span>
        </motion.h1>

        {/* সাবহেডিং (লাইট মোডে slate-600 দিয়ে রিডেবিলিটি ফিক্সড) */}
        <motion.p 
          variants={fadeInUp}
          className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 dark:text-slate-400 mb-10 leading-relaxed font-medium dark:font-normal"
        >
          Welcome to GizmoGrid. Explore cutting-edge devices, track live metrics, and manage your inventory with our highly secured, next-gen full-stack client framework.
        </motion.p>

        {/* বাটন গ্রুপ */}
        <motion.div 
          variants={fadeInUp}
          className="flex flex-wrap justify-center items-center gap-4 mb-16"
        >
          <button className="group flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-3.5 rounded-xl font-semibold shadow-md shadow-cyan-600/10 dark:shadow-none hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer">
            Explore Grid
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm cursor-pointer">
            Documentation
          </button>
        </motion.div>

        {/* ফিচার ট্র্যাকার গ্রিড (লাইট মোডে বর্ডার ও ব্যাকগ্রাউন্ড অপটিমাইজড) */}
        <motion.div 
          variants={fadeInUp}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8 border-t border-slate-200 dark:border-slate-800/80"
        >
          <div className="flex items-center gap-3 justify-center sm:justify-start px-4">
            <div className="p-2.5 rounded-lg bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Cpu size={20} />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-slate-200 dark:text-white text-sm">Automated Sync</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">MongoDB Database Ready</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start px-4 border-y sm:border-y-0 sm:border-x border-slate-200 dark:border-slate-800/80 py-4 sm:py-0">
            <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-500">
              <Shield size={20} />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-slate-200 dark:text-white text-sm">Secure Session</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Better Auth Integrated</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start px-4">
            <div className="p-2.5 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-500">
              <Zap size={20} />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-slate-200 dark:text-white text-sm">Ultra Fast Speed</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Next.js App Router Optimized</p>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}