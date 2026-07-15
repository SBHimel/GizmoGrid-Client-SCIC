import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md transition-all duration-500">
      {/* গ্লোয়িং ব্যাকগ্রাউন্ড অরোরা ইফেক্ট */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-violet-600 to-cyan-500 rounded-full blur-[120px] opacity-30 animate-pulse pointer-events-none" />

      {/* মেইন গ্লাস কার্ড ও স্পিনার কন্টেইনার */}
      <div className="relative flex flex-col items-center p-8 rounded-3xl border border-white/10 bg-white/[0.02] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] backdrop-blur-lg">
        
        {/* থ্রি-ডি গর্জিয়াস লুপ স্পিনার */}
        <div className="relative w-20 h-20">
          {/* আউটার নিয়ন রিং */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-violet-500 animate-[spin_1.5s_linear_infinite]" />
          
          {/* ইনার রিভার্স রিং */}
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-fuchsia-500 border-l-emerald-400 animate-[spin_1s_linear_reverse_infinite] opacity-80" />
          
          {/* সেন্ট্রাল গ্লোয়িং ডট */}
          <div className="absolute inset-[30px] bg-gradient-to-br from-cyan-400 to-violet-600 rounded-full blur-[2px] animate-ping" />
        </div>

        {/* মডার্ন টেক্সট ও সাবটাইটেল */}
        <div className="mt-6 text-center space-y-1">
          <h2 className="text-lg font-semibold tracking-wider bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent animate-pulse">
            Fetching Experience...
          </h2>
          <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">
            Please hold on
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;