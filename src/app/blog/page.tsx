"use client";

import { motion } from "framer-motion";
import { FiClock, FiUser, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

// আপাতত কিছু ডামি ডাটা, পরে ডাটাবেজ থেকে আসবে
const blogPosts = [
  {
    id: 1,
    title: "The Future of GizmoGrid Matrix",
    excerpt: "Exploring how we are decentralizing the product management ecosystem with AI integration.",
    author: "GizmoAdmin",
    date: "July 15, 2026",
    readTime: "5 min read",
    tag: "Update"
  },
  {
    id: 2,
    title: "Optimizing Your Seller Dashboard",
    excerpt: "Tips and tricks to manage your inventory more efficiently using our new grid tools.",
    author: "DevTeam",
    date: "July 12, 2026",
    readTime: "3 min read",
    tag: "Tutorial"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 px-4 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Grid <span className="text-cyan-500">Insights</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Latest updates, guides, and engineering breakthroughs from the GizmoGrid matrix.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                  {post.tag}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase">
                  <FiClock /> {post.readTime}
                </span>
              </div>
              
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-cyan-500 transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                  <FiUser /> {post.author}
                </div>
                <Link 
                  href={`/blog/${post.id}`}
                  className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400 hover:gap-3 transition-all"
                >
                  Read Article <FiArrowRight />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}