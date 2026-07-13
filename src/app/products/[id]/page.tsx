"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSinglePro } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

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
      <div className="max-w-7xl mx-auto p-6 min-h-screen flex items-center justify-center bg-white text-black">
        <p className="text-xl font-black uppercase animate-pulse">Loading Product Data Matrix...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto p-6 min-h-screen flex flex-col items-center justify-center bg-white text-black">
        <p className="text-2xl font-black text-red-600 uppercase mb-4">404 - Product Not Found</p>
        <Link href="/products" className="border-2 border-black px-6 py-2 font-bold uppercase hover:bg-black hover:text-white transition">
          Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white min-h-screen text-black">
      {/* Breadcrumb / Back Link */}
      <Link href="/products" className="inline-block text-sm font-black uppercase mb-6 hover:underline">
        ← Back to all products
      </Link>

      {/* 🛍️ MAIN PRODUCT DETAILS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-4 border-black p-6 md:p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-16">
        {/* Left Side: Product Image */}
        <div className="relative h-96 w-full border-2 border-black bg-gray-50 rounded-xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side: Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="inline-block text-xs font-black tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-300 px-3 py-1 rounded-full mb-4">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black mb-4">
              {product.title}
            </h1>
            <p className="text-2xl font-black text-black mb-6">৳{product.price}</p>
            
            <div className="border-t-2 border-b-2 border-gray-200 py-4 mb-6">
              <h3 className="text-xs font-black uppercase text-gray-500 mb-2">Description</h3>
              <p className="text-base font-medium text-gray-800 leading-relaxed">
                {product.description || "No description provided for this specific premium listing."}
              </p>
            </div>
          </div>

          {/* Call to Action Controls */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-black uppercase">Availability:</span>
              <span className={`text-xs font-black px-3 py-1 rounded border ${product.stock > 0 ? "bg-green-100 text-green-800 border-green-400" : "bg-red-100 text-red-800 border-red-400"}`}>
                {product.stock > 0 ? `${product.stock} ITEMS IN STOCK` : "OUT OF STOCK"}
              </span>
            </div>
            
            <button 
              disabled={product.stock <= 0}
              className="w-full bg-black text-white font-black uppercase py-4 rounded-xl text-md hover:bg-gray-800 transition active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
            >
              Add To Cart / Purchase
            </button>
          </div>
        </div>
      </div>

      {/* 🔄 RELATED ITEMS LAYER (Requirement Module) */}
      <div className="border-t-4 border-black pt-12">
        <h2 className="text-2xl font-black uppercase text-black mb-8 tracking-tight">
          Related Items ({product.category})
        </h2>

        {related.length === 0 ? (
          <p className="text-sm font-semibold text-gray-500 italic">No similar items found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((item) => (
              <Link
                key={item._id}
                href={`/products/${item._id}`}
                className="flex flex-col border-2 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-[1.02] transition-all bg-white"
              >
                <div className="relative h-40 w-full bg-gray-50 rounded-md overflow-hidden mb-3">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <h3 className="text-sm font-black text-black line-clamp-1 mb-1 uppercase">{item.title}</h3>
                <p className="text-sm font-black text-gray-700 mt-auto">৳{item.price}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}