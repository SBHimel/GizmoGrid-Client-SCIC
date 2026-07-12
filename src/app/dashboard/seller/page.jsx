'use client';

import React from 'react';
import Link from 'next/link';
import { FiPlusCircle, FiShoppingBag, FiDollarSign, FiBox, FiArrowRight } from 'react-icons/fi';

export default function SellerDashboardHome() {
  return (
    <div className="space-y-6">
      {/* 🔹 ওয়েলকাম ব্যানার */}
      <div className="bg-gradient-to-r from-cyan-900 to-slate-950 p-8 rounded-2xl text-white shadow-md">
        <h1 className="text-3xl font-bold mb-2">Welcome Seller Panel! 🚀</h1>
        <p className="text-cyan-200/80">GizmoGrid-এ আপনার দোকান ও গেজেটসমূহ এখান থেকে ম্যানেজ করুন। নতুন প্রোডাক্ট যোগ করুন এবং সেলস ট্র্যাক করুন।</p>
      </div>

      {/* 🔹 সেলার স্ট্যাটাস কার্ডস */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* কার্ড ১: মোট ইনকাম */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Earnings</span>
            <span className="p-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg text-xl">
              <FiDollarSign />
            </span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">৳০.০০</h3>
          <p className="text-xs text-slate-400 mt-1">আপনার সফলভাবে বিক্রি হওয়া প্রোডাক্টের মোট আয়</p>
        </div>

        {/* কার্ড ২: মোট প্রোডাক্ট */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">My Products</span>
            <span className="p-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-xl">
              <FiBox />
            </span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">০</h3>
          <p className="text-xs text-slate-400 mt-1">আপনার দোকানে আপলোড করা মোট গেজেট সংখ্যা</p>
        </div>

        {/* কার্ড ৩: মোট অর্ডার রিকোয়েস্ট */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Product Orders</span>
            <span className="p-2 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg text-xl">
              <FiShoppingBag />
            </span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">০</h3>
          <p className="text-xs text-slate-400 mt-1">কাস্টমাররা আপনার প্রোডাক্টের জন্য যতগুলো অর্ডার করেছে</p>
        </div>
      </div>

      {/* 🔹 কুইক নেভিগেশন অ্যাকশন */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Quick Shop Actions</h2>
        <div className="flex flex-wrap gap-4">
          {/* 🎯 নতুন প্রোডাক্ট যোগ করার পেজের লিংক */}
          <Link 
            href="/dashboard/seller/add-product" 
            className="flex items-center gap-2 px-5 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl text-sm transition shadow-sm"
          >
            <FiPlusCircle /> Add New Product <FiArrowRight />
          </Link>

          <Link 
            href="/dashboard/seller/my-products" 
            className="flex items-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-sm transition"
          >
            <FiBox /> Manage My Shop
          </Link>
        </div>
      </div>
    </div>
  );
}