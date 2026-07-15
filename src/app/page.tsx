"use client";

import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import Features from '@/components/Features';
import Stats from '@/components/Stats';
import ProductGrid from '@/components/ProductGrid'; // 🎯 প্রোডাক্ট গ্রিড ইম্পোর্ট করা হলো
import PromoFlash from '@/components/PromoFlash';
import ReviewsAndFAQ from '@/components/ReviewsAndFAQ';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden relative">
      {/* 🔮 Background Global Cyber Overlay (ঐচ্ছিক, ডিজাইনকে আরও WOW করার জন্য) */}
      <div className="absolute top-[20%] right-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-[50%] left-0 w-96 h-96 bg-teal-600/5 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="relative z-10">
        {/* 1 & 2. Top Hierarchy */}
        <Hero />

        {/* 3 to 8. Meaningful Production Modular Component Layers */}
        <Categories />
        <Features />
        <Stats />

        {/* 🛒 4-Column Responsive Featured Products Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12">
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded-md">
                Live Drop Matrix
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 mt-2">
              Featured Asset Drops
            </h2>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">
              Handpicked hardware matrix modules freshly deployed to the grid
            </p>
          </div>
          
          {/* এখানে কম্পোনেন্টটি কল হবে */}
          <ProductGrid />
        </section>

        <PromoFlash />
        <ReviewsAndFAQ />
      </div>
    </main>
  );
}