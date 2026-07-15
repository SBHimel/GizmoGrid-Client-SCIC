"use client";

import { useState } from "react";
import { addProductToServer } from "@/lib/api";
import { imageUpload } from "@/lib/imgUpload";
import {
  FiPlusCircle,
  FiDollarSign,
  FiFileText,
  FiImage,
  FiLoader,
  FiCheckCircle,
} from "react-icons/fi";

// 🛠️ কম্পোনেন্টের প্রপ্স টাইপ ডিফাইন করা (যেহেতু টোকেন পেজ থেকে আসবে)
interface AddProductFormProps {
  token: string | undefined;
}

export default function AddProductForm({ token }: AddProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    stock: "10",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("দয়া করে একটি প্রোডাক্ট ইমেজ সিলেক্ট করুন!");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      // 🎯 ১. ImgBB-তে ছবি আপলোড করা
      const uploadedImageUrl = await imageUpload(file);

      if (!uploadedImageUrl) {
        setLoading(false);
        alert("ছবি আপলোড ব্যর্থ হয়েছে! আবার চেষ্টা করুন।");
        return;
      }

      // 🎯 ২. ফাইনাল ডাটা অবজেক্ট তৈরি
      const finalProductData = {
        ...product,
        image: uploadedImageUrl,
      };

      console.log("Final Product Data to Server:", finalProductData);

      // 🎯 ৩. এক্সপ্রেস ব্যাকএন্ড API কল (টোকেনসহ)
      const res = await addProductToServer(finalProductData);

      console.log("Server Response:", res);

      if (res.success) {
        setSuccess(true);
        setProduct({
          title: "",
          price: "",
          category: "",
          description: "",
          stock: "10",
        });
        setFile(null);
      } else {
        alert(res.message || "প্রোডাক্ট আপলোড ব্যর্থ হয়েছে।");
      }
    } catch (error) {
      console.error("Error during product submission:", error);
      alert("কোথাও একটা সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-md border border-slate-100 dark:border-slate-800">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <FiPlusCircle className="text-cyan-600" /> Add New Product
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Fill out the form below to add your store's new gazette or product to the database.
        </p>
      </div>

      {success && (
        <div className="mb-6 flex items-center gap-2 p-4 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl text-sm font-semibold">
          <FiCheckCircle size={18} /> প্রোডাক্টটি সফলভাবে ডাটাবেজে যুক্ত করা হয়েছে!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ১. প্রোডাক্টের নাম */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Product Title
            </label>
            <input
              type="text"
              required
              value={product.title}
              onChange={(e) => setProduct({ ...product, title: e.target.value })}
              placeholder="e.g., Mechanical Keyboard K2"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 text-slate-800 dark:text-white transition-all"
            />
          </div>

          {/* ২. ক্যাটাগরি */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Category
            </label>
            <select
              required
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
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

          {/* ৩. প্রোডাক্টের দাম */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Price (BDT)
            </label>
            <div className="relative">
              <FiDollarSign className="absolute left-4 top-3.5 text-slate-400" size={16} />
              <input
                type="number"
                required
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                placeholder="3500"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 text-slate-800 dark:text-white transition-all"
              />
            </div>
          </div>

          {/* ৪. স্টক */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Available Stock
            </label>
            <input
              type="number"
              required
              value={product.stock}
              onChange={(e) => setProduct({ ...product, stock: e.target.value })}
              placeholder="10"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 text-slate-800 dark:text-white transition-all"
            />
          </div>
        </div>

        {/* ৫. ইমেজ আপলোড */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Product Image
          </label>
          <div className="relative">
            <FiImage className="absolute left-4 top-3.5 text-slate-400" size={16} />
            <input
              type="file"
              required
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFile(e.target.files[0]);
                }
              }}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 text-slate-800 dark:text-white transition-all file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5">
            Upload a clear JPEG/PNG image from your computer or phone.
          </p>
        </div>

        {/* ৬. ডেসক্রিপশন */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Product Description
          </label>
          <div className="relative">
            <FiFileText className="absolute left-4 top-3.5 text-slate-400" size={16} />
            <textarea
              rows={4}
              required
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
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
          {loading ? "Adding Product to Database..." : "Upload Product"}
        </button>
      </form>
    </div>
  );
}