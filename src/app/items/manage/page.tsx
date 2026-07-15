"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FiLoader, FiAlertTriangle, FiEye, FiTrash2, FiLayers, FiImage } from "react-icons/fi";
import { deleteItemFromServer, getMyItemsFromServer } from "@/lib/api";

export default function ManageItemsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSellerItems() {
      if (session?.user?.email) {
        setLoading(true);
        const res = await getMyItemsFromServer(session.user.email);
        if (res.success) {
          setItems(res.data || []);
        }
        setLoading(false);
      }
    }
    fetchSellerItems();
  }, [session]);

  if (isPending || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <FiLoader className="animate-spin text-cyan-500" size={30} />
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const isAuthorized = ["seller", "manager", "admin"].includes(session.user.role || "");
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900/40 border border-red-500/20 rounded-2xl p-8 text-center backdrop-blur-xl">
          <FiAlertTriangle className="text-red-400 mx-auto mb-4" size={45} />
          <h2 className="text-xl font-black text-white uppercase tracking-tight">Access Restricted</h2>
          <p className="text-xs font-medium text-slate-400 mt-2">
            Your account does not have permission to manage items.
          </p>
        </div>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        const res = await deleteItemFromServer(id);
        if (res.success) {
          setItems(items.filter((item) => item._id !== id && item.id !== id));
        } else {
          alert(res.message || "ডিলিট করা যায়নি।");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white flex items-center gap-2 uppercase tracking-tight">
            <FiLayers className="text-cyan-500" /> Manage Your Inventory
          </h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
            Review, audit, or wipe items active on the network matrix
          </p>
        </div>

        {items.length === 0 ? (
          <p className="text-center text-xs font-bold text-slate-600 uppercase tracking-wider py-12">No data modules deployed yet.</p>
        ) : (
          <>
            {/* 📱 MOBILE VIEW: Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
              {items.map((item) => {
                const itemId = item._id || item.id;
                return (
                  <div key={itemId} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-4">
                    <div>
                      {/* 📸 মোবাইল ভিউ ইমেজ জোন */}
                      <div className="relative w-full h-36 bg-slate-950 rounded-xl overflow-hidden border border-slate-800/80 mb-3 flex items-center justify-center">
                        {item.imageUrl || item.image ? (
                          <img 
                            src={item.imageUrl || item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <FiImage className="text-slate-700 text-2xl" />
                        )}
                      </div>

                      <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider mb-2 ${
                        item.priority === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-slate-950 text-cyan-400 border border-slate-800'
                      }`}>
                        {item.priority}
                      </span>
                      <h3 className="text-sm font-bold text-white uppercase tracking-tight">{item.title}</h3>
                      <p className="text-xs font-mono font-black text-cyan-400 mt-1">৳{item.price}</p>
                      <p className="text-[10px] text-slate-500 font-mono mt-1">Deployed: {item.date}</p>
                    </div>

                    {/* Actions Buttons */}
                    <div className="flex gap-2 pt-2 border-t border-slate-800/60">
                      <button 
                        onClick={() => router.push(`/products/${itemId}`)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white text-xs font-bold border border-slate-800"
                      >
                        <FiEye size={14} /> View
                      </button>
                      <button 
                        onClick={() => handleDelete(itemId)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-950/20 text-red-400 hover:bg-red-600 hover:text-white text-xs font-bold border border-red-900/30"
                      >
                        <FiTrash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 💻 DESKTOP & TABLET VIEW: Cyber Table Layout */}
            <div className="hidden lg:block bg-slate-900/20 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-800">
                    <th className="p-4 w-16">Image</th>
                    <th className="p-4">Item Details</th>
                    <th className="p-4">Priority</th>
                    <th className="p-4">Deployment Date</th>
                    <th className="p-4">Price</th>
                    <th className="p-4 text-right">Actions Matrix</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {items.map((item) => {
                    const itemId = item._id || item.id;
                    return (
                      <tr key={itemId} className="hover:bg-slate-900/20 transition-colors group">
                        {/* 📸 ডেক্সটপ টেবিল ভিউ ইমেজ থাম্বনেইল */}
                        <td className="p-4">
                          <div className="w-10 h-10 bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                            {item.imageUrl || item.image ? (
                              <img 
                                src={item.imageUrl || item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover animate-fade-in" 
                              />
                            ) : (
                              <FiImage className="text-slate-700" size={16} />
                            )}
                          </div>
                        </td>

                        <td className="p-4 font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
                          {item.title}
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider ${
                            item.priority === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-slate-950 text-cyan-400 border border-slate-800'
                          }`}>
                            {item.priority}
                          </span>
                        </td>
                        <td className="p-4 text-xs font-mono text-slate-400">{item.date}</td>
                        <td className="p-4 font-mono font-black text-cyan-400">৳{item.price.toLocaleString()}</td>
                        <td className="p-4 text-right">
                          <div className="inline-flex gap-2">
                            <button 
                              onClick={() => router.push(`/products/${itemId}`)}
                              className="p-2 bg-slate-950 text-slate-400 hover:text-white border border-slate-800 rounded-xl transition-all cursor-pointer"
                              title="View Item"
                            >
                              <FiEye size={15} />
                            </button>
                            <button 
                              onClick={() => handleDelete(itemId)}
                              className="p-2 bg-red-950/30 text-red-400 hover:bg-red-600 hover:text-white border border-red-950/40 rounded-xl transition-all cursor-pointer"
                              title="Delete Item"
                            >
                              <FiTrash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}