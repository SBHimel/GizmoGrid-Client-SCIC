"use client";
import CountUp from "react-countup";
import { FiUsers, FiShoppingBag, FiLayers, FiShield } from "react-icons/fi";

interface Stats {
  totalUsers: number;
  totalProducts: number;
  totalSellers: number;
  pendingProducts: number;
}

export default function StatsSection({
  stats,
}: {
  stats: Stats;
}) {
  // প্রপস থেকে ডেটা রিসিভ করছি, না থাকলে ডিফল্ট 0 দিচ্ছি
  const data = [
    { label: "Active Users", count: stats?.totalUsers || 0, icon: FiUsers, color: "text-cyan-400" },
    { label: "Total Products", count: stats?.totalProducts || 0, icon: FiShoppingBag, color: "text-emerald-400" },
    { label: "Network Sellers", count: stats?.totalSellers || 0, icon: FiLayers, color: "text-purple-400" },
    { label: "Pending Tasks", count: stats?.pendingProducts || 0, icon: FiShield, color: "text-blue-400" },
  ];

  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <div 
            key={index} 
            className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                {item.label}
              </span>
              <item.icon size={18} className={item.color} />
            </div>
            
            <h3 className="text-2xl md:text-4xl font-black font-mono text-white">
              <CountUp end={item.count} duration={2.5} separator="," />
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}