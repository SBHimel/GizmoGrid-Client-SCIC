import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import Features from '@/components/Features';
import Stats from '@/components/Stats';
import PromoFlash from '@/components/PromoFlash';
import ReviewsAndFAQ from '@/components/ReviewsAndFAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden">
      <div>
        {/* 1 & 2. Top Hierarchy */}
        <Navbar />
        <Hero />

        {/* 3 to 8. Meaningful Production Modular Component Layers */}
        <Categories />
        <Features />
        <Stats />
        <PromoFlash />
        <ReviewsAndFAQ />
      </div>
      
      {/* Structural Footer */}
      <Footer />
    </main>
  );
}