'use client';

import React from 'react';
import { FiPackage, FiClock, FiCheckCircle, FiTruck } from 'react-icons/fi';

// ডামি অর্ডার ডাটা (পরবর্তীতে এটি ডাটাবেজ থেকে আসবে)
const dummyOrders = [
  {
    id: "GZ-98321",
    date: "10 July, 2026",
    product: "Mechanical Keyboard (RGB)",
    amount: "৳৩,৫০০",
    status: "Pending",
    statusColor: "text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400"
  },
  {
    id: "GZ-97540",
    date: "05 July, 2026",
    product: "Wireless Gaming Mouse",
    amount: "৳১,৮০০",
    status: "Shipped",
    statusColor: "text-blue-600 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400"
  },
  {
    id: "GZ-96112",
    date: "28 June, 2026",
    product: "UltraWide 2K Monitor",
    amount: "৳২২,০০০",
    status: "Delivered",
    statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400"
  }
];

export default function MyOrdersPage() {
  return (
    <div className="space-y-6">
      {/* 🔹 হেডার সেকশন */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <FiPackage className="text-cyan-600" /> My Orders
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">আপনার কেনা সমস্ত গেজেটের তালিকা এবং বর্তমান ডেলিভারি স্ট্যাটাস এখানে দেখুন।</p>
      </div>

      {/* 🔹 অর্ডার টেবিল */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Order ID</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Product Name</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Total Amount</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {dummyOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all">
                  <td className="p-4 text-sm font-bold text-cyan-600 dark:text-cyan-400">#{order.id}</td>
                  <td className="p-4 text-sm text-slate-500 dark:text-slate-400">{order.date}</td>
                  <td className="p-4 text-sm font-semibold text-slate-800 dark:text-slate-200">{order.product}</td>
                  <td className="p-4 text-sm font-bold text-slate-900 dark:text-white">{order.amount}</td>
                  <td className="p-4 text-sm">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${order.statusColor}`}>
                      {order.status === "Pending" && <FiClock size={12} />}
                      {order.status === "Shipped" && <FiTruck size={12} />}
                      {order.status === "Delivered" && <FiCheckCircle size={12} />}
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}