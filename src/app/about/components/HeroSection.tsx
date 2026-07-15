"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative py-24 px-6 border-b border-slate-900/60 overflow-hidden flex flex-col items-center text-center">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">
          System Protocol 1.0.3
        </span>
        <h1 className="mt-4 text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
          Inside <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500">GizmoGrid</span> Matrix
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-xs md:text-sm text-slate-400 font-medium leading-relaxed">
          GizmoGrid-এ স্বাগতম! এটি কেবল একটি মার্কেটপ্লেস নয়, এটি কম্পিউটার ও টেকনোলজি লাভারদের জন্য একটি ফুললি সিকিউরড ডিসেন্ট্রালাইজড টেক হাব।
        </p>
      </motion.div>
    </section>
  );
}