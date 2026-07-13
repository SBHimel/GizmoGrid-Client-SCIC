"use client";

import { useEffect, useState } from "react";
import { deleteProductFromServer, getSellerProducts } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  stock: number;
  image: string;
}

export default function MyProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getSellerProducts();
      if (res.success && res.data) {
        setProducts(res.data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId: string) => {
    const confirmDelete = window.confirm(
      "আপনি কি নিশ্চিত যে এই প্রোডাক্টটি ডিলিট করতে চান?",
    );
    if (!confirmDelete) return;

    try {
      const res = await deleteProductFromServer(productId);
      if (res.success) {
        // 🎯 রিয়েল-টাইম স্টেট থেকে ডিলিট হওয়া প্রোডাক্টটি বাদ দেওয়া যাতে পেজ রিফ্রেশ ছাড়া UI আপডেট হয়
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p._id !== productId),
        );
        alert("প্রোডাক্টটি সফলভাবে ডিলিট হয়েছে।");
      } else {
        alert(res.message || "ডিলিট করতে সমস্যা হয়েছে।");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("কোথাও একটা ভুল হয়েছে!");
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          My Products ({products.length})
        </h1>
        <Link
          href="/dashboard/seller/add-product"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          ➕ Add New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center border border-gray-100">
          <p className="text-gray-500 mb-4 text-lg">
            আপনি এখনো কোনো প্রোডাক্ট যোগ করেননি।
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-100">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {product.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    ৳{product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.stock} টি
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {/* 🎯 নতুন ডায়নামিক এডিট লিংক */}
<Link
  href={`/dashboard/seller/edit-product/${product._id}`}
  className="text-indigo-600 hover:text-indigo-900 font-medium mr-4 transition"
>
  Edit
</Link>
                    {/* নতুন বাটন */}
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-900 transition font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
