"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSingleProduct, updateProductOnServer } from "@/lib/api";
import { toast } from "sonner";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    category: "",
    stock: 0,
    description: "",
    image: "",
  });

  useEffect(() => {
    if (!id) return;
    const loadProductData = async () => {
      try {
        const res = await getSingleProduct(id as string);
        if (res.success && res.data) {
          setFormData({
            title: res.data.title || "",
            price: res.data.price || 0,
            category: res.data.category || "",
            stock: res.data.stock || 0,
            description: res.data.description || "",
            image: res.data.image || "",
          });
        } else {
          toast.error("Product details not found.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    };
    loadProductData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Updating product...");

    try {
      const res = await updateProductOnServer(id as string, formData);
      if (res.success) {
        toast.success("Product updated successfully!", { id: toastId });
        router.push("/dashboard/seller/my-products");
      } else {
        toast.error(res.message || "Failed to update product.", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-300 mt-6">
      {/* Heavy Black Heading */}
      <h1 className="text-3xl font-black text-black mb-6 tracking-tight">
        Edit Product Details
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-black mb-1.5 uppercase tracking-wide">
            Product Name
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-400 bg-white text-black font-semibold rounded-md p-2.5 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none shadow-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-black mb-1.5 uppercase tracking-wide">
              Price (৳)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border border-gray-400 bg-white text-black font-semibold rounded-md p-2.5 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-black mb-1.5 uppercase tracking-wide">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="w-full border border-gray-400 bg-white text-black font-semibold rounded-md p-2.5 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none shadow-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-black mb-1.5 uppercase tracking-wide">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-400 bg-white text-black font-semibold rounded-md p-2.5 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-black mb-1.5 uppercase tracking-wide">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full border border-gray-400 bg-white text-black font-semibold rounded-md p-2.5 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-black mb-1.5 uppercase tracking-wide">
            Product Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-400 bg-white text-black font-semibold rounded-md p-2.5 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none shadow-sm"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => router.push("/dashboard/seller/my-products")}
            className="px-5 py-2.5 border border-gray-400 rounded-md text-black bg-gray-100 font-bold hover:bg-gray-200 transition active:scale-95"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition shadow active:scale-95"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}