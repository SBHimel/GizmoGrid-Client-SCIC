"use client";

import { useEffect, useState } from "react";
import { getAllProducts } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  FiSearch,
  FiSliders,
  FiMaximize2,
  FiChevronLeft,
  FiChevronRight,
  FiRefreshCw,
} from "react-icons/fi";

interface Product {
  _id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  stock: number;
  imageUrl?: string;
}

export default function ExploreProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Search and Filter States
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          search,
          category,
          minPrice,
          maxPrice,
          sortBy,
          page: page.toString(),
          limit: "8",
        });

        const res = await getAllProducts(params.toString());
        if (res.success) {
          setProducts(res.data || []);
          setTotalPages(res.totalPages || 1);
        } else {
          toast.error("Failed to sync inventory flow.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Cybernetics link interrupted while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search, category, minPrice, maxPrice, sortBy, page]);

  const handleFilterChange = (type: string, value: string) => {
    setPage(1);
    if (type === "category") setCategory(value);
    if (type === "minPrice") setMinPrice(value);
    if (type === "maxPrice") setMaxPrice(value);
    if (type === "sortBy") setSortBy(value);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 relative overflow-hidden pt-24 pb-16">
      {/* BACKGROUND NEO-GLOW ORBS */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-12 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Page Heading */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 inline-block border-b-4 border-cyan-500 pb-2">
            Explore Products Matrix
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-2">
            Filter and query premium catalog items live
          </p>
        </div>

        {/* 🔍 CONTROL MATRIX PANEL */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl shadow-xl mb-10 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Search Input */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wide text-slate-400">
                <FiSearch size={12} className="text-cyan-400" /> Search
                Identifier
              </label>
              <input
                type="text"
                placeholder="Query items by name..."
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-all font-medium"
              />
            </div>

            {/* Category Option */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wide text-slate-400">
                Category Pipeline
              </label>
              <select
                value={category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-slate-300 focus:outline-none focus:border-cyan-500 transition-all font-semibold"
              >
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Gadgets">Gadgets</option>
                <option value="Shoes">Shoes</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wide text-slate-400">
                Sort Metric
              </label>
              <select
                value={sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-slate-300 focus:outline-none focus:border-cyan-500 transition-all font-semibold"
              >
                <option value="">Default (Latest)</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Price Range Filter & Reset Trigger */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 items-end pt-2 border-t border-slate-800/60">
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wide text-slate-400">
                Min Credits ($)
              </label>
              <input
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-white placeholder-slate-700 focus:outline-none focus:border-cyan-500 transition-all font-medium"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wide text-slate-400">
                Max Credits ($)
              </label>
              <input
                type="number"
                placeholder="99999"
                value={maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-white placeholder-slate-700 focus:outline-none focus:border-cyan-500 transition-all font-medium"
              />
            </div>

            <button
              onClick={clearFilters}
              className="col-span-2 md:col-span-2 w-full flex items-center justify-center gap-2 border border-slate-700 hover:border-red-500/50 hover:bg-red-950/20 text-slate-300 hover:text-red-400 py-2.5 px-4 rounded-xl font-bold text-xs uppercase transition-all active:scale-[0.98] cursor-pointer"
            >
              <FiRefreshCw size={13} /> Clear Control Parameters
            </button>
          </div>
        </div>

        {/* 📦 PRODUCTS DATA STREAM GRID */}
        {loading ? (
          /* 💀 NEO SKELTON DISPLAY SYSTEM */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 animate-pulse"
              >
                <div className="bg-slate-950 h-48 w-full rounded-xl border border-slate-800/60"></div>
                <div className="h-4 bg-slate-800 rounded w-1/3"></div>
                <div className="h-5 bg-slate-800 rounded w-3/4"></div>
                <div className="h-3 bg-slate-800 rounded w-full"></div>
                <div className="h-8 bg-slate-800 rounded w-full mt-4"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
            <p className="text-md font-bold text-slate-400">
              No active parameters match our current storage arrays.
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Try resetting or shifting your matrix parameters.
            </p>
          </div>
        ) : (
          /* 🛍️ PREMIUM DARK CELL CARDS */
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="group flex flex-col bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-4 hover:shadow-2xl hover:shadow-cyan-500/5 transition-all duration-300"
                >
                  {/* Image Vault */}
                  <div className="relative h-48 w-full mb-4 bg-slate-950 border border-slate-800/60 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      // 🎯 ১. খালি স্ট্রিং বা অবজেক্টের ঝামেলা এড়াতে কন্ডিশনাল src সেট করা হলো
                      src={
                        typeof product.image === "string" &&
                        product.image.trim() !== ""
                          ? product.image
                          : product.imageUrl &&
                              typeof product.imageUrl === "string" &&
                              product.imageUrl.trim() !== ""
                            ? product.imageUrl
                            : "https://placehold.co/500x500/png" // ডামি ব্যাকআপ ইমেজ
                      }
                      alt={product.title || "Product Matrix"}
                      fill
                      // 🎯 ২. 'fill' এর পারফরম্যান্স ওয়ার্নিং দূর করার জন্য এই sizes প্রপটি দেওয়া হলো
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority={false}
                    />
                  </div>

                  {/* Info Hierarchy */}
                  <div className="flex flex-col flex-grow">
                    <span className="text-[10px] font-black tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-900/50 px-2 py-0.5 rounded-full uppercase mb-2 self-start">
                      {product.category}
                    </span>
                    <h2 className="text-md font-bold text-white group-hover:text-cyan-400 line-clamp-1 mb-1.5 transition-colors">
                      {product.title}
                    </h2>
                    <p className="text-xs font-medium text-slate-400 line-clamp-2 mb-4 flex-grow leading-relaxed">
                      {product.description ||
                        "No specific grid matrix metadata provided for this catalog index."}
                    </p>

                    {/* Meta Vault Indicators */}
                    <div className="flex justify-between items-center mb-4 pt-3 border-t border-slate-800/60">
                      <span className="text-lg font-black text-white">
                        ${product.price}
                      </span>
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                          product.stock > 0
                            ? "bg-emerald-950/60 text-emerald-400 border-emerald-900/60"
                            : "bg-red-950/60 text-red-400 border-red-900/60"
                        }`}
                      >
                        {product.stock > 0
                          ? `${product.stock} Units Available`
                          : "Depleted"}
                      </span>
                    </div>

                    {/* Action Execution Button */}
                    <Link
                      href={`/products/${product._id}`}
                      className="w-full flex items-center justify-center gap-1 bg-slate-800 hover:bg-cyan-500 text-slate-200 hover:text-slate-950 font-black uppercase py-2.5 rounded-xl transition-all duration-200 text-xs tracking-wider active:scale-[0.97]"
                    >
                      Analyze Profile <FiMaximize2 size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* 📄 MATRIX LAYER PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-3 mt-14">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                  className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl font-bold uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:border-cyan-500/50 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  <FiChevronLeft size={16} />
                </button>

                <span className="font-black text-xs uppercase tracking-widest px-4 text-slate-400">
                  Sector <span className="text-white font-black">{page}</span> /{" "}
                  {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl font-bold uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:border-cyan-500/50 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  <FiChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
