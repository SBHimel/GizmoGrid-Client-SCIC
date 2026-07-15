"use client";

import { motion } from "framer-motion";
import { FiLock, FiEye, FiDatabase, FiSettings } from "react-icons/fi";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 px-4 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-600 dark:text-indigo-400">
            <FiLock size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Updated: July 15, 2026
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="prose dark:prose-invert prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FiEye className="text-indigo-500" /> 1. Information We Collect
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We collect information you provide directly to us, such as your name, email address, 
              and professional profile details when you sign up for an account on GizmoGrid.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FiDatabase className="text-indigo-500" /> 2. How We Use Data
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Your data is primarily used to enhance your experience within our grid system:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
              <li>To provide, maintain, and improve our services.</li>
              <li>To personalize your dashboard content and recommendations.</li>
              <li>To communicate with you regarding updates or security notices.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FiSettings className="text-indigo-500" /> 3. Data Protection
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We implement industry-standard security measures to protect your personal information 
              from unauthorized access, alteration, or disclosure. We do not sell your personal data 
              to third-party advertisers.
            </p>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 p-6 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Questions about our privacy practices? Reach out to us at{" "}
            <a href="mailto:privacy@gizmogrid.com" className="text-indigo-500 font-bold hover:underline">
              privacy@gizmogrid.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}