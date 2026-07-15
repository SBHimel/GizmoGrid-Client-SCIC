"use client";

import { motion } from "framer-motion";
import { FiShield, FiFileText, FiCheckCircle } from "react-icons/fi";

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 px-4 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-cyan-500/10 rounded-2xl text-cyan-600 dark:text-cyan-400">
            <FiShield size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Terms of Service
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Last updated: July 15, 2026
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="prose dark:prose-invert prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FiFileText className="text-cyan-500" /> 1. Acceptance of Terms
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              By accessing and using GizmoGrid, you acknowledge that you have read, understood, 
              and agree to be bound by these terms. If you do not agree with any part of these 
              terms, please refrain from using our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FiCheckCircle className="text-cyan-500" /> 2. User Responsibilities
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
              <li>You must be at least 18 years old to create a seller account.</li>
              <li>You are responsible for maintaining the security of your account credentials.</li>
              <li>All content submitted must comply with local laws and GizmoGrid policies.</li>
              <li>You agree not to engage in any activity that disrupts our platform infrastructure.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FiShield className="text-cyan-500" /> 3. Intellectual Property
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              All content, logos, and software provided on this platform are the property 
              of GizmoGrid. You may not reproduce, distribute, or modify our content 
              without express written permission from the platform administration.
            </p>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 p-6 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Have questions regarding these terms? Contact our legal team at{" "}
            <a href="mailto:legal@gizmogrid.com" className="text-cyan-500 font-bold hover:underline">
              legal@gizmogrid.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}