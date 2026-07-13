"use client";

import { useEffect, useState } from "react";
import { getAllProducts } from "@/lib/api";
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

  // Load products whenever filters or page changes
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
          limit: "8", // 8 items per page means 2 complete rows on desktop
        });

        const res = await getAllProducts(params.toString());
        if (res.success) {
          setProducts(res.data || []);
          setTotalPages(res.totalPages || 1);
        } else {
          toast.error("Failed to load products.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    // Debounce or immediate call setup
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 400); // 400ms delay to avoid aggressive API calls while typing search

    return () => clearTimeout(delayDebounceFn);
  }, [search, category, minPrice, maxPrice, sortBy, page]);

  // Reset page to 1 when any filter changes
  const handleFilterChange = (type: string, value: string) => {
    setPage(1);
    if (type === "category") setCategory(value);
    if (type === "minPrice") setMinPrice(value);
    if (type === "maxPrice") setMaxPrice(value);
    if (type === "sortBy") setSortBy(value);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white min-h-screen text-black">
      {/* Page Heading */}
      <h1 className="text-4xl font-black text-black mb-8 uppercase tracking-tight border-b-4 border-black pb-2">
        Explore Products
      </h1>

      {/* 🔍 SEARCH AND FILTER CONTROL PANEL */}
      <div className="bg-gray-100 p-4 rounded-lg border-2 border-gray-400 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Field */}
          <div>
            <label className="block text-xs font-black uppercase mb-1">Search Product</label>
            <input
              type="text"
              placeholder="Type product name..."
              value={search}
              onChange={(e) => { setPage(1); setSearch(e.target.value); }}
              className="w-full border-2 border-gray-400 p-2 text-black font-semibold rounded outline-none focus:border-black bg-white"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-black uppercase mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full border-2 border-gray-400 p-2 text-black font-semibold rounded outline-none focus:border-black bg-white"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Gadgets">Gadgets</option>
              <option value="Shoes">Shoes</option>
            </select>
          </div>

          {/* Sorting Options */}
          <div>
            <label className="block text-xs font-black uppercase mb-1">Sort By Price</label>
            <select
              value={sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="w-full border-2 border-gray-400 p-2 text-black font-semibold rounded outline-none focus:border-black bg-white"
            >
              <option value="">Default (Latest)</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Price Range Filter (Requirement: At least 2 fields filtering) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-black uppercase mb-1">Min Price (৳)</label>
            <input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              className="w-full border-2 border-gray-400 p-2 text-black font-semibold rounded outline-none focus:border-black bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase mb-1">Max Price (৳)</label>
            <input
              type="number"
              placeholder="99999"
              value={maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              className="w-full border-2 border-gray-400 p-2 text-black font-semibold rounded outline-none focus:border-black bg-white"
            />
          </div>
          <button
            onClick={() => { setSearch(""); setCategory(""); setMinPrice(""); setMaxPrice(""); setSortBy(""); setPage(1); }}
            className="col-span-2 md:col-span-2 w-full bg-black text-white font-black uppercase p-2.5 rounded hover:bg-gray-800 transition active:scale-95"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* 📦 PRODUCTS GRID SECTION */}
      {loading ? (
        /* 💀 SKELETON LOADER (Requirement Rule) */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, idx) => (
            <div key={idx} className="border-2 border-gray-300 rounded-lg p-4 space-y-3 animate-pulse">
              <div className="bg-gray-300 h-48 w-full rounded-md"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-9 bg-gray-300 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-400 rounded-lg">
          <p className="text-xl font-bold text-gray-600">No products found matching your criteria.</p>
        </div>
      ) : (
        /* 🛍️ ACTUAL PRODUCT CARDS (Requirement: 4 cards per row on Desktop) */
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="flex flex-col border-2 border-black bg-white rounded-lg p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              >
                {/* Image Container */}
                <div className="relative h-48 w-full mb-4 bg-gray-50 border border-gray-200 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Content Elements */}
                <div className="flex flex-col flex-grow">
                  <span className="text-xs font-black tracking-widest text-blue-600 uppercase mb-1">
                    {product.category}
                  </span>
                  <h2 className="text-lg font-black text-black line-clamp-1 mb-2">
                    {product.title}
                  </h2>
                  <p className="text-sm font-semibold text-gray-700 line-clamp-2 mb-4 flex-grow">
                    {product.description || "No description provided for this specific product listing."}
                  </p>
                  
                  {/* Meta Information */}
                  <div className="flex justify-between items-center mb-4 pt-2 border-t border-gray-200">
                    <span className="text-xl font-black text-black">৳{product.price}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded border ${product.stock > 0 ? "bg-green-100 text-green-800 border-green-300" : "bg-red-100 text-red-800 border-red-300"}`}>
                      {product.stock > 0 ? `${product.stock} In Stock` : "Out of Stock"}
                    </span>
                  </div>

                  {/* View Details CTA Button */}
                  <Link
                    href={`/products/${product._id}`}
                    className="w-full text-center bg-black text-white font-black uppercase py-2 rounded hover:bg-gray-800 transition active:scale-95 text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* 📄 PAGINATION LAYER (Requirement Rule) */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-12 pb-6">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-4 py-2 border-2 border-black font-bold uppercase rounded disabled:opacity-40 disabled:cursor-not-allowed bg-white text-black hover:bg-gray-100 transition"
              >
                Prev
              </button>
              
              <span className="font-black text-lg px-4 text-black">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-2 border-2 border-black font-bold uppercase rounded disabled:opacity-40 disabled:cursor-not-allowed bg-white text-black hover:bg-gray-100 transition"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}