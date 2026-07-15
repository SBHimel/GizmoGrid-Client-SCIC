"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHelpCircle, FiChevronDown, FiMail, FiMessageSquare, FiSearch } from "react-icons/fi";

const faqs = [
  { question: "How to add a new product?", answer: "Go to the 'Add Item' section in the navbar, fill in the details, and submit for moderation." },
  { question: "How is the product approved?", answer: "Our moderation team reviews your product details within 24 hours of submission." },
  { question: "Can I manage my own inventory?", answer: "Yes, use the 'Manage' tab to edit, update, or delete your listed products." },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            How can we <span className="text-cyan-500">help?</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Search our knowledge base or reach out to the support team.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <FiSearch className="absolute left-4 top-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search for answers..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:border-cyan-500 transition-all text-slate-900 dark:text-white"
          />
        </div>

        {/* FAQ Section */}
        <div className="space-y-4">
          <h2 className="text-sm font-black uppercase text-slate-400 tracking-widest">Frequently Asked</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-slate-900 dark:text-white"
              >
                {faq.question}
                <FiChevronDown className={`transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                    className="px-6 pb-4 text-slate-500 dark:text-slate-400 text-sm"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-cyan-600 p-6 rounded-2xl text-white space-y-2">
            <FiMail size={24} />
            <h3 className="font-black text-lg">Email Support</h3>
            <p className="text-sm opacity-80">s.b.himel21@gmail.com</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-2xl text-white space-y-2 border border-slate-800">
            <FiMessageSquare size={24} />
            <h3 className="font-black text-lg">Live Chat</h3>
            <p className="text-sm opacity-80">Available 24/7 for sellers</p>
          </div>
        </div>
      </div>
    </div>
  );
}