"use client";

export default function TimelineSection() {
  return (
    <section className="space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black uppercase tracking-tight text-white">Platform Pipeline</h2>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">How the matrix works in harmony</p>
      </div>

      <div className="relative max-w-lg mx-auto pl-8 border-l border-slate-800/80 space-y-10 py-4">
        {[
          { step: "01", title: "Join Network", desc: "Create your node. Verify email via Better Auth layer." },
          { step: "02", title: "Apply Seller Permission", desc: "Instantly change buyer state to seller permission matrix." },
          { step: "03", title: "Deploy Hardware Modules", desc: "Add products with image upload directly to cloud server." },
          { step: "04", title: "Exchange System", desc: "Buyers interact and securely purge or manage modules." }
        ].map((node, i) => (
          <div key={i} className="relative group">
            <div className="absolute -left-[41px] top-0.5 w-6 h-6 bg-slate-950 border-2 border-slate-800 rounded-full group-hover:border-cyan-400 flex items-center justify-center transition-colors">
              <div className="w-1.5 h-1.5 bg-slate-700 group-hover:bg-cyan-400 rounded-full transition-colors" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-black text-cyan-500 uppercase">{node.step} // Step</span>
              <h4 className="text-sm font-black uppercase tracking-tight text-white group-hover:text-cyan-400 transition-colors">{node.title}</h4>
              <p className="text-xs text-slate-400 font-medium">{node.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}