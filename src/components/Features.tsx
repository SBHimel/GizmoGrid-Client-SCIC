import { FiTruck, FiShield, FiRotateCcw, FiHeadphones } from 'react-icons/fi';

export default function Features() {
  const items = [
    { icon: FiTruck, title: "Fast Delivery", desc: "Guaranteed shipping within 48 hours across the nation." },
    { icon: FiShield, title: "Secure Checkout", desc: "100% encrypted JWT & secure digital payment gateway options." },
    { icon: FiRotateCcw, title: "Easy Returns", desc: "Not satisfied? Return your premium gadget within 7 working days." },
    { icon: FiHeadphones, title: "24/7 Support", desc: "Direct tech expert support queue available for all registered buyers." }
  ];

  return (
    <section className="bg-slate-900 border-t border-b border-slate-800 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-start p-4 bg-slate-950/40 rounded-xl border border-slate-800">
            <item.icon className="text-3xl text-cyan-400 mb-4" />
            <h3 className="text-lg font-black uppercase mb-2 tracking-wide text-white">{item.title}</h3>
            <p className="text-sm font-medium text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}