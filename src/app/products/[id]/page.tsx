"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSinglePro } from "@/lib/api";
import { toast } from "sonner";
import Link from "next/link";
import { FiLoader, FiArrowLeft, FiShoppingCart, FiCpu, FiCheckCircle, FiXCircle } from "react-icons/fi";

interface Product {
  _id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  stock: number;
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await getSinglePro(id as string);
        if (res.success) {
          setProduct(res.data);
          setRelated(res.relatedProducts || []);
        } else {
          toast.error(res.message || "Product not found.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100">
        <FiLoader className="animate-spin text-cyan-500 text-4xl mb-4" />
        <p className="text-xs font-bold tracking-widest uppercase animate-pulse">
          Decrypting Asset Matrix Data...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 p-6">
        <p className="text-2xl font-black text-rose-500 uppercase tracking-widest mb-4">
          [ 404 - Node Dissolved ]
        </p>
        <p className="text-sm text-slate-400 mb-6 uppercase tracking-wider">The requested product does not exist in the Grid.</p>
        <Link href="/products" className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400 font-bold uppercase px-6 py-3 rounded-xl text-xs transition-all">
          <FiArrowLeft /> Return to Grid Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-10 relative overflow-hidden">
      {/* 🔮 Background Glow Orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Navigation Breadcrumb */}
        <Link 
          href="/products" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-cyan-400 mb-8 group transition-colors"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Return to Assets Directory
        </Link>

        {/* 🛍️ MAIN PRODUCT DETAILS INTERFACE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-slate-900/20 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl mb-16 relative">
          
          {/* Left Block: Graphic Visual Vault */}
          <div className="relative h-[300px] sm:h-[400px] w-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden group">
            <img
              src={product.image || "https://placehold.co/600x400"}
              alt={product.title}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://placehold.co/600x400";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
          </div>

          {/* Right Block: Telemetry Info Specifications */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* Category Tag Badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-950 text-teal-400 border border-teal-500/20 mb-4">
                <FiCpu size={12} /> {product.category}
              </span>
              
              {/* Main Headline Title */}
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-3">
                {product.title}
              </h1>
              
              {/* Credits / Price Node */}
              <p className="text-3xl font-mono font-black text-cyan-400 tracking-tight mb-6">
                ৳{product.price.toLocaleString()}
              </p>
              
              {/* Asset Description Log */}
              <div className="border-t border-b border-slate-800/80 py-5 mb-6">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Description Matrix</h3>
                <p className="text-sm font-medium text-slate-400 leading-relaxed">
                  {product.description || "No customized configuration log provided for this specific item core."}
                </p>
              </div>
            </div>

            {/* Tactical Control Console */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Node Status:</span>
                {product.stock > 0 ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-md uppercase">
                    <FiCheckCircle size={12} /> {product.stock} Units Operational
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 rounded-md uppercase">
                    <FiXCircle size={12} /> Matrix Depleted
                  </span>
                )}
              </div>
              
              <button 
                disabled={product.stock <= 0}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black uppercase py-4 rounded-xl text-xs tracking-widest transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-cyan-600/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                <FiShoppingCart size={16} /> Execute Allocation Protocol / Purchase
              </button>
            </div>
          </div>
        </div>

        {/* 🔄 RELATED ITEMS SUBSYSTEM */}
        <div className="border-t border-slate-800/80 pt-12">
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              Related Core Modules
            </h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
              Synchronized data entities from the {product.category} sector
            </p>
          </div>

          {related.length === 0 ? (
            <div className="p-8 border border-dashed border-slate-800 rounded-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-600">No parallel data entries found in this vector.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((item) => (
                <Link
                  key={item._id}
                  href={`/products/${item._id}`}
                  className="group flex flex-col bg-slate-900/20 border border-slate-800/80 p-4 rounded-2xl hover:border-cyan-500/40 shadow-xl transition-all"
                >
                  <div className="relative h-40 w-full bg-slate-950 border border-slate-900 rounded-xl overflow-hidden mb-4">
                    <img 
                      src={item.image || "https://placehold.co/300"} 
                      alt={item.title} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/300";
                      }}
                    />
                  </div>
                  <h3 className="text-xs font-bold text-slate-200 line-clamp-1 mb-1 uppercase tracking-wide group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm font-mono font-black text-cyan-400 mt-auto pt-2 border-t border-slate-800/50">
                    ৳{item.price.toLocaleString()}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}