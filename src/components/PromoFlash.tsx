import Link from 'next/link';

export default function PromoFlash() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 border-2 border-cyan-500/30 p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        <div>
          <span className="text-xs font-black tracking-widest text-cyan-400 bg-cyan-950 border border-cyan-800 px-3 py-1 rounded-full uppercase">
            Limited Time Matrix Event
          </span>
          <h2 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tight mt-4 mb-2">
            Upgrade Your Gear Matrix Setup
          </h2>
          <p className="text-slate-300 font-medium max-w-xl text-sm md:text-base">
            Get up to 25% off on high-end mechanical keyboards, smart ecosystem controllers, and premium essentials. Pure authentic stock only.
          </p>
        </div>
        <Link href="/products" className="bg-white text-slate-950 font-black uppercase px-8 py-4 rounded-xl shadow-lg hover:bg-slate-200 transition whitespace-nowrap active:scale-95">
          Shop Flash Sale
        </Link>
      </div>
    </section>
  );
}