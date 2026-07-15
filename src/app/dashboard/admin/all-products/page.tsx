"use client";

import { useEffect, useState } from "react";
import { FiLoader, FiSearch, FiFilter, FiRefreshCw, FiTrash2, FiCpu, FiAlertTriangle } from "react-icons/fi";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { toast } from "sonner";
import { getAllProductsForAdmin, deleteProductByAdmin } from "@/lib/api";

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  sellerEmail: string;
  image: string;
  status: string;
}

export default function AllProductsPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    fetchProductsData();
  }, []);

  const fetchProductsData = async () => {
    setLoading(true);
    try {
      const data = await getAllProductsForAdmin();
      if (data.success) {
        setProducts(data.data || []);
      } else {
        toast.error("Failed to load product matrix.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Database connection failure.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you absolutely sure to purge this product asset?")) return;

    try {
      const data = await deleteProductByAdmin(productId);
      if (data.success) {
        toast.success("Product node successfully purged.");
        setProducts((prev) => prev.filter((p) => p.id !== productId && (p as any)._id !== productId));
      } else {
        toast.error("Failed to execute purge routing.");
      }
    } catch (error) {
      toast.error("Request execution failed.");
    }
  };

  const filteredProducts = products.filter((prod) => {
    const titleMatch = prod.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const emailMatch = prod.sellerEmail?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const matchesSearch = titleMatch || emailMatch;

    const matchesFilter = categoryFilter === "all" || prod.category?.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))];

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100">
        <FiLoader className="animate-spin text-cyan-500 text-4xl mb-4" />
        <p className="text-xs font-bold tracking-widest uppercase animate-pulse">
          Scanning Product Grid Core...
        </p>
      </div>
    );
  }

  // Framer Motion Animation Variants
  const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-10 relative overflow-hidden">
      {/* 🔮 Background Glow Effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-md">
                Admin Console
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 mt-2">
              Product Asset Index
            </h1>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">
              Global inventory monitoring, node destruction, and compliance controls
            </p>
          </div>
          <button
            onClick={fetchProductsData}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-cyan-400 hover:text-cyan-300 font-bold uppercase px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <FiRefreshCw className={loading ? "animate-spin" : ""} /> Sync Grid Matrix
          </button>
        </div>

        {/* CONTROLS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative md:col-span-2">
            <FiSearch className="absolute left-4 top-4 text-slate-500 text-lg" />
            <input
              type="text"
              placeholder="Search Title or Vendor Email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/80 backdrop-blur-md transition-all focus:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            />
          </div>

          <div className="relative">
            <FiFilter className="absolute left-4 top-4 text-slate-500 text-md" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl pl-10 pr-4 py-3.5 text-sm font-bold text-slate-300 focus:outline-none focus:border-teal-500/80 uppercase cursor-pointer appearance-none transition-all backdrop-blur-md"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-950 text-slate-300">
                  {cat === "all" ? "All Sector Protocols" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ACTIVE NODES COUNTER BAR */}
        <div className="mb-4 flex justify-between items-center bg-slate-950 border border-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500">
          <span>Telemetry Status</span>
          <span className="text-cyan-400">
            [ {filteredProducts.length} Active Node Cores Online ]
          </span>
        </div>

        {/* 📱 MOBILE CARD LAYOUT (Hidden on MD & Up) */}
        <div className="block lg:hidden">
          {filteredProducts.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-4"
            >
              {filteredProducts.map((prod) => {
                const id = prod.id || (prod as any)._id;
                return (
                  <motion.div
                    key={id}
                    variants={itemVariants}
                    className="relative bg-slate-900/20 border border-slate-800/80 rounded-2xl p-4 overflow-hidden backdrop-blur-xl hover:border-slate-700/80 transition-all group"
                  >
                    <div className="flex gap-4">
                      {/* Product Thumbnail */}
                      <div className="relative h-16 w-20 rounded-xl overflow-hidden border border-slate-800 shrink-0">
                        <img
                          src={prod.image || "https://placehold.co/150"}
                          alt={prod.title}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/150";
                          }}
                        />
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 min-w-0">
                        <span className="inline-block text-[9px] font-black text-teal-400 uppercase tracking-widest mb-1">
                          {prod.category}
                        </span>
                        <h3 className="text-sm font-extrabold text-white truncate uppercase">
                          {prod.title}
                        </h3>
                        <p className="text-xs font-mono font-bold text-cyan-400 mt-1">
                          ${prod.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Footer Info & Danger Button */}
                    <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-wider">Vendor Node</p>
                        <p className="text-[10px] font-medium text-slate-400 truncate">{prod.sellerEmail}</p>
                      </div>
                      
                      <button
                        onClick={() => handleDeleteProduct(id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/40 text-red-400 border border-red-900/30 hover:border-red-500 transition-all cursor-pointer text-xs font-bold uppercase"
                      >
                        <FiTrash2 size={13} /> Purge
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="p-12 border border-dashed border-slate-800 rounded-2xl text-center">
              <FiAlertTriangle className="text-slate-600 text-3xl mx-auto mb-2" />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
                No active product nodes found in this sector.
              </p>
            </div>
          )}
        </div>

        {/* 💻 DESKTOP TABLE LAYOUT (Hidden on Mobile/Tablet) */}
        <div className="hidden md:block bg-slate-900/20 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <th className="p-5 pl-8">Asset Visual</th>
                <th className="p-5">Product Identifier</th>
                <th className="p-5">Sector (Category)</th>
                <th className="p-5">Price (Credits)</th>
                <th className="p-5">Vendor Source</th>
                <th className="p-5 pr-8 text-right">Emergency Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850/50 text-sm">
              <AnimatePresence mode="popLayout">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((prod) => {
                    const id = prod.id || (prod as any)._id;
                    return (
                      <motion.tr
                        key={id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="hover:bg-slate-900/40 transition-colors group"
                      >
                        {/* Visual */}
                        <td className="p-4 pl-8">
                          <div className="relative h-12 w-16 rounded-xl overflow-hidden border border-slate-800 group-hover:border-slate-700 transition-colors">
                            <img
                              src={prod.image || "https://placehold.co/150"}
                              alt={prod.title}
                              className="object-cover w-full h-full"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://placehold.co/150";
                              }}
                            />
                          </div>
                        </td>
                        {/* Title */}
                        <td className="p-4 font-bold text-slate-200 max-w-[220px] truncate uppercase">
                          {prod.title}
                        </td>
                        {/* Category */}
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-950 text-teal-400 border border-teal-500/20">
                            <FiCpu size={11} /> {prod.category}
                          </span>
                        </td>
                        {/* Price */}
                        <td className="p-4 font-mono font-bold text-cyan-400">
                          ${prod.price.toLocaleString()}
                        </td>
                        {/* Seller */}
                        <td className="p-4 text-xs font-medium text-slate-400">
                          {prod.sellerEmail}
                        </td>
                        {/* Action */}
                        <td className="p-4 pr-8 text-right">
                          <button
                            onClick={() => handleDeleteProduct(id)}
                            className="inline-flex items-center justify-center p-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-900/30 hover:border-red-500 transition-all cursor-pointer group"
                            title="Purge Asset Node"
                          >
                            <FiTrash2 size={16} className="group-hover:scale-110 transition-transform" />
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })
                ) : (
                  <motion.tr layout>
                    <td colSpan={6} className="p-16 text-center">
                      <FiAlertTriangle className="text-slate-600 text-4xl mx-auto mb-3" />
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
                        No active product nodes found in this sector.
                      </p>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}