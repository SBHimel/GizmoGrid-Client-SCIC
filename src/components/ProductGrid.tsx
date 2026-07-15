"use client";

import { useEffect, useState } from "react";
import { getAllProductsForAdmin } from "@/lib/api"; // 💡 তোমার পাবলিক প্রোডাক্ট API থাকলে সেটা এখানে দিও
import ProductCard from "./ProductCard";
import { FiLoader, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

export default function ProductGrid() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const data = await getAllProductsForAdmin();
        if (data.success) {
          // 🎯 হোম পেজের জন্য মাত্র ৪টি প্রোডাক্ট স্লাইস করে নেওয়া হলো
          setProducts(data.data?.slice(0, 4) || []);
        }
      } catch (error) {
        console.error("Error fetching homepage products:", error);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-slate-400">
        <FiLoader className="animate-spin text-cyan-500 text-3xl mb-3" />
        <p className="text-xs uppercase tracking-widest font-bold animate-pulse">Loading Grid Core...</p>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      {/* 📱 Mobile & Tablet: 1-2 Columns | 💻 Desktop: 4 Columns (grid-cols-4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id || product._id} product={product} />
        ))}
      </div>

      {/* 🚀 Explore All Products Button */}
      <div className="mt-10 flex justify-center">
        <Link 
          href="/products"
          className="group flex items-center gap-2 bg-gradient-to-r from-cyan-950/40 to-slate-900/60 hover:from-cyan-600 hover:to-teal-600 border border-cyan-500/20 hover:border-cyan-400 text-cyan-400 hover:text-white font-bold uppercase px-6 py-3 rounded-xl text-xs transition-all tracking-widest shadow-lg shadow-cyan-950/20 active:scale-98 cursor-pointer"
        >
          Explore All Products 
          <FiArrowRight className="group-hover:translate-x-1 transition-transform text-sm" />
        </Link>
      </div>
    </div>
  );
}