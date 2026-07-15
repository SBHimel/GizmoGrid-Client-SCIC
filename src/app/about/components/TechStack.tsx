"use client";

import { motion } from "framer-motion";

const techStack = [
  { name: "Next.js 15", category: "Frontend", level: 95 },
  { name: "React 19", category: "Library", level: 90 },
  { name: "TypeScript", category: "Language", level: 85 },
  { name: "Tailwind CSS", category: "Styling", level: 95 },
  { name: "Express.js", category: "Backend", level: 80 },
  { name: "MongoDB", category: "Database", level: 85 },
];

export default function TechStack() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="space-y-4">
        <div className="border-l-4 border-purple-500 pl-4">
          <h2 className="text-xl font-black uppercase tracking-tight text-white">The Tech Stack</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Built with state-of-the-art architectures</p>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-medium">
          GizmoGrid সম্পূর্ণ আধুনিক এবং ফাস্টেস্ট ফ্রেমওয়ার্ক দিয়ে কোড করা হয়েছে। ডেটা সিকিউরিটি ও ইউজার এক্সপেরিয়েন্সকে অপ্টিমাইজড রাখতে এই শক্তিশালী টেকনোলজিগুলো ব্যাকএন্ড ও ফ্রন্টএন্ডে রুল করছে।
        </p>
      </div>

      <div className="space-y-4 bg-slate-900/20 border border-slate-900 rounded-2xl p-6 backdrop-blur-xl">
        {techStack.map((tech, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="font-bold text-slate-300">{tech.name}</span>
              <span className="text-cyan-400 font-bold">{tech.level}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-950 border border-slate-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${tech.level}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" 
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}