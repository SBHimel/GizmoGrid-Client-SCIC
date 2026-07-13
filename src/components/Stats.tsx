import { FiUsers, FiShoppingBag, FiGlobe } from 'react-icons/fi';

export default function Stats() {
  const stats = [
    { icon: FiUsers, stat: "15,000+", label: "Active Tech Buyers" },
    { icon: FiShoppingBag, stat: "45,000+", label: "Products Verified & Sold" },
    { icon: FiGlobe, stat: "120+", label: "Top-Tier Tech Sellers Connected" }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 text-center">
      <h2 className="text-3xl font-black uppercase tracking-tight border-b-4 border-purple-500 pb-2 mb-12 inline-block">
        GizmoGrid In Numbers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="p-8 bg-slate-900 border-2 border-slate-800 rounded-2xl shadow-lg hover:border-purple-500/50 transition-colors">
            <stat.icon className="text-4xl mx-auto text-purple-400 mb-4" />
            <div className="text-4xl font-black text-white mb-2 tracking-tight">{stat.stat}</div>
            <div className="text-sm font-bold uppercase tracking-widest text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}