'use client';

import { useState } from 'react';
import { FiPlusCircle, FiDollarSign, FiLayers, FiFileText, FiImage, FiLoader, FiCheckCircle } from 'react-icons/fi';

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // প্রোডাক্টের ডাটা স্টোর করার স্টেট
  const [product, setProduct] = useState({
    title: '',
    price: '',
    category: '',
    image: '',
    description: '',
    stock: '10', // ডিফল্ট স্টক ১০ দিয়ে রাখলাম
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // 🎯 এখানে পরবর্তীতে আমাদের এক্সপ্রেস ব্যাকএন্ড এপিআই (axios/fetch) কল হবে
    console.log("Product Data to Server:", product);

    // ডামি সাকসেস রেসপন্স (টেস্ট করার জন্য)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // ফর্ম রিসেট করা
      setProduct({ title: '', price: '', category: '', image: '', description: '', stock: '10' });
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-md border border-slate-100 dark:border-slate-800">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <FiPlusCircle className="text-cyan-600" /> Add New Product
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">আপনার দোকানের নতুন গেজেট বা প্রোডাক্টটি ডাটাবেজে যুক্ত করতে নিচের ফর্মটি পূরণ করুন।</p>
      </div>

      {success && (
        <div className="mb-6 flex items-center gap-2 p-4 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl text-sm font-semibold">
          <FiCheckCircle size={18} /> প্রোডাক্টটি সফলভাবে ডাটাবেজে যুক্ত করা হয়েছে!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ১. প্রোডাক্টের নাম */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Product Title</label>
            <input 
              type="text" 
              required
              value={product.title}
              onChange={(e) => setProduct({...product, title: e.target.value})}
              placeholder="e.g., Mechanical Keyboard K2" 
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 text-slate-800 dark:text-white transition-all"
            />
          </div>

          {/* ২. ক্যাটাগরি ড্রপডাউন */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category</label>
            <div className="relative">
              <select 
                required
                value={product.category}
                onChange={(e) => setProduct({...product, category: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 text-slate-800 dark:text-white transition-all appearance-none cursor-pointer"
              >
                <option value="">Select Category</option>
                <option value="Keyboard">Keyboard</option>
                <option value="Mouse">Mouse</option>
                <option value="Monitor">Monitor</option>
                <option value="Headphone">Headphone</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

          {/* ৩. প্রোডাক্টের দাম */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Price (BDT)</label>
            <div className="relative">
              <FiDollarSign className="absolute left-4 top-3.5 text-slate-400" size={16} />
              <input 
                type="number" 
                required
                value={product.price}
                onChange={(e) => setProduct({...product, price: e.target.value})}
                placeholder="3500" 
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 text-slate-800 dark:text-white transition-all"
              />
            </div>
          </div>

          {/* ৪. স্টক বা কোয়ান্টিটি */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Available Stock</label>
            <input 
              type="number" 
              required
              value={product.stock}
              onChange={(e) => setProduct({...product, stock: e.target.value})}
              placeholder="10" 
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 text-slate-800 dark:text-white transition-all"
            />
          </div>
        </div>

        {/* ৫. ইমেজ ইউআরএল */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Product Image URL</label>
          <div className="relative">
            <FiImage className="absolute left-4 top-3.5 text-slate-400" size={16} />
            <input 
              type="text" 
              required
              value={product.image}
              onChange={(e) => setProduct({...product, image: e.target.value})}
              placeholder="https://example.com/product.jpg" 
              className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 text-slate-800 dark:text-white transition-all"
            />
          </div>
        </div>

        {/* ৬. ডেসক্রিপশন */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Product Description</label>
          <div className="relative">
            <FiFileText className="absolute left-4 top-3.5 text-slate-400" size={16} />
            <textarea 
              rows={4}
              required
              value={product.description}
              onChange={(e) => setProduct({...product, description: e.target.value})}
              placeholder="Write something about the product features..." 
              className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 text-slate-800 dark:text-white transition-all resize-none"
            />
          </div>
        </div>

        {/* সাবমিট বাটন */}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-600/50 text-white font-bold rounded-xl text-sm transition-all cursor-pointer select-none shadow-md"
        >
          {loading ? <FiLoader className="animate-spin" size={16} /> : null}
          {loading ? 'Adding Product to Database...' : 'Upload Product'}
        </button>
      </form>
    </div>
  );
}