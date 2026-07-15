"use client";

import { motion } from "framer-motion";
import { FiCpu, FiShoppingCart } from "react-icons/fi";

interface Product {
  id?: string;
  _id?: string;
  title: string;
  price: number;
  category: string;
  image: string;
  sellerEmail: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const id = product.id || product._id;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="relative bg-slate-900/30 border border-slate-800/80 rounded-2xl p-4 overflow-hidden backdrop-blur-xl hover:border-slate-700/65 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all group flex flex-col justify-between h-full"
    >
      <div>
        {/* 📸 প্রোডাক্ট ইমেজ জোন */}
        <div className="relative h-44 w-full rounded-xl overflow-hidden border border-slate-800 shrink-0 bg-slate-950">
          <img
            src={product.image || "https://placehold.co/300"}
            alt={product.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/300";
            }}
          />
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-950/80 text-teal-400 border border-teal-500/20 backdrop-blur-sm">
            <FiCpu size={11} /> {product.category}
          </span>
        </div>

        {/* 📝 কন্টেন্ট */}
        <div className="mt-4">
          <h3 className="text-base font-extrabold text-white line-clamp-1 uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
            {product.title}
          </h3>
          <p className="text-[10px] font-medium text-slate-500 truncate mt-1">
            By: {product.sellerEmail}
          </p>
        </div>
      </div>

      {/* 💳 প্রাইস এবং অ্যাকশন বাটন */}
      <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2">
        <div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Price</p>
          <p className="text-lg font-mono font-black text-cyan-400">
            ৳{product.price.toLocaleString()}
          </p>
        </div>
        
        <button className="flex items-center justify-center p-2.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-600 text-cyan-400 hover:text-white border border-cyan-900/40 hover:border-cyan-500 transition-all cursor-pointer group/btn active:scale-95">
          <FiShoppingCart size={16} className="group-hover/btn:rotate-12 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}