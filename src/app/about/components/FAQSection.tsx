"use client";

import { Accordion, AccordionItem } from "@heroui/react"; // 🎯 ইমপোর্ট ফিক্সড!

export default function FAQSection() {
  return (
    <section className="space-y-6">
      <div className="border-l-4 border-yellow-500 pl-4">
        <h2 className="text-xl font-black uppercase tracking-tight text-white">Frequently Asked Protocols (FAQ)</h2>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Frequently asked operational inquiries</p>
      </div>

      <div className="bg-slate-900/20 border border-slate-900 rounded-2xl p-4 backdrop-blur-xl">
        <Accordion variant="splitted" className="text-xs font-medium text-slate-300">
          <AccordionItem 
            key="1" 
            title={<span className="text-white font-bold text-sm">GizmoGrid কি সম্পূর্ণ ফ্রিতে ব্যবহার করা যাবে?</span>}
            className="bg-slate-950/80 border border-slate-900 rounded-xl px-4"
          >
            <p className="text-xs text-slate-400 pb-3 font-normal leading-relaxed">
              হ্যাঁ! বায়ার এবং সেলার হিসেবে অ্যাকাউন্ট তৈরি করা সম্পূর্ণ ফ্রি। যে কেউ প্রোডাক্ট লিস্টিং বা অর্ডার দেখতে পারেন।
            </p>
          </AccordionItem>
          <AccordionItem 
            key="2" 
            title={<span className="text-white font-bold text-sm">আমরা কীভাবে প্রোডাক্ট আপলোড করতে পারি?</span>}
            className="bg-slate-950/80 border border-slate-900 rounded-xl px-4"
          >
            <p className="text-xs text-slate-400 pb-3 font-normal leading-relaxed">
              প্রথমে একটি অ্যাকাউন্ট তৈরি করে Profile এ গিয়ে 'Become Seller' করতে হবে। এরপর 'Add Product' সেকশন থেকে ছবি, টাইটেল, এবং প্রাইস দিয়ে গ্লোবাল সার্ভারে আপলোড করা যাবে।
            </p>
          </AccordionItem>
          <AccordionItem 
            key="3" 
            title={<span className="text-white font-bold text-sm">ডাটাবেজ ও সিকিউরিটি কতটা নিরাপদ?</span>}
            className="bg-slate-950/80 border border-slate-900 rounded-xl px-4"
          >
            <p className="text-xs text-slate-400 pb-3 font-normal leading-relaxed">
              GizmoGrid এ Better-Auth অথেন্টিকেশন প্রোটোকল ব্যবহার করা হয়েছে এবং ব্যাকএন্ডে টোকেন ভেরিফিকেশনের মাধ্যমে ডাটাবেজ সিকিউর রাখা হয়, ফলে কোনো অননুমোদিত ইউজার ডাটা ডিলিট বা এডিট করতে পারে না।
            </p>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}