import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function Categories() {
  const categories = [
    { name: "Electronics", count: "140+ Items", color: "from-cyan-500 to-blue-600" },
    { name: "Gadgets", count: "80+ Items", color: "from-purple-500 to-indigo-600" },
    { name: "Clothing", count: "210+ Items", color: "from-amber-500 to-orange-600" },
    { name: "Shoes", count: "95+ Items", color: "from-emerald-500 to-teal-600" }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-black uppercase tracking-tight border-b-4 border-cyan-500 pb-2 mb-8 inline-block">
        Browse Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <Link href={`/products?category=${cat.name}`} key={i} 
            className={`p-6 rounded-2xl bg-gradient-to-br ${cat.color} hover:scale-[1.03] transition-all shadow-xl group border border-white/10`}
          >
            <h3 className="text-xl font-black uppercase tracking-wide text-white">{cat.name}</h3>
            <p className="text-sm font-bold text-white/80 mt-1">{cat.count}</p>
            <div className="mt-4 flex items-center text-xs font-black uppercase text-white group-hover:underline">
              Explore Now <FiArrowRight className="ml-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}