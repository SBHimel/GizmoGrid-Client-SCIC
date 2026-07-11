import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />
        <Hero />
        {/* এখানে পরবর্তীতে আপনার বাকি ৭টি সেকশন আসবে */}
      </div>
      <Footer /> 
    </main>
  );
}