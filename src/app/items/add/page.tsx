"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { imageUpload } from "@/lib/imgUpload"; // ImgBB আপলোডার
import { 
  FiPlusCircle, FiDollarSign, FiFileText, FiCalendar, 
  FiAlertTriangle, FiImage, FiLoader, FiCheckCircle, FiChevronsUp 
} from "react-icons/fi";
import { addItemToServer } from "@/lib/api";

export default function AddItemPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [item, setItem] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    date: new Date().toISOString().split('T')[0], // Default আজকের তারিখ
    priority: "Medium",
  });

  // 🔒 ১. লগইন না থাকলে সেফলি /login এ রিডাইরেক্ট করার জন্য সাইড ইফেক্ট
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // 🔒 ২. অথেন্টিকেশন প্রসেসিং বা লোডিং স্টেট হ্যান্ডেল করা
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <FiLoader className="animate-spin text-cyan-500" size={30} />
      </div>
    );
  }

  // 🔒 ৩. সেশন না থাকা অবস্থায় রিডাইরেক্ট হওয়ার আগ পর্যন্ত স্ক্রিন ব্ল্যাঙ্ক রাখা
  if (!session) {
    return null;
  }

  // 🔒 ৪. রোল পারমিশন চেক (ইউজার যদি শুধুই Buyer হয়)
 const isAuthorized = ["seller", "manager", "admin"].includes(
  (session.user as { role?: string }).role || ""
);
  
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900/40 border border-red-500/20 rounded-2xl p-8 text-center backdrop-blur-xl shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
            <FiAlertTriangle size={32} />
          </div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight">Access Restricted</h2>
          <p className="text-xs font-medium text-slate-400 mt-2 leading-relaxed">
            Sorry! This section is for sellers and managers only. To add products or items, upgrade your account to a seller account.
          </p>
          <button 
            onClick={() => router.push("/")}
            className="mt-6 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg shadow-slate-900/50 cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      let finalImageUrl = "";
      
      if (file) {
        const uploadedUrl = await imageUpload(file);
        if (uploadedUrl) finalImageUrl = uploadedUrl;
      }

      const finalItemData = {
        title: item.title,
        shortDescription: item.shortDescription,
        fullDescription: item.fullDescription,
        price: Number(item.price),
        date: item.date,
        priority: item.priority,
        imageUrl: finalImageUrl,
        sellerEmail: session.user.email
      };

      const res = await addItemToServer(finalItemData);
      
      if (res.success) {
        setSuccess(true);
        setItem({
          title: "",
          shortDescription: "",
          fullDescription: "",
          price: "",
          date: new Date().toISOString().split('T')[0],
          priority: "Medium",
        });
        setFile(null);
        setPreviewUrl("");
      } else {
        alert(res.message || "আইটেম যুক্ত করতে সমস্যা হয়েছে।");
      }
    } catch (error) {
      console.error(error);
      alert("কোথাও একটা সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-slate-900/30 border border-slate-800/80 p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-white flex items-center gap-2 uppercase tracking-tight">
            <FiPlusCircle className="text-cyan-500" /> Add New Item
          </h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
            Deploy a new module unit onto the network grid
          </p>
        </div>

        {success && (
          <div className="mb-6 flex items-center gap-2 p-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-bold uppercase tracking-wider">
            <FiCheckCircle size={16} /> Item successfuly deployed to database!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Item Title</label>
              <input 
                type="text" required value={item.title}
                onChange={(e) => setItem({...item, title: e.target.value})}
                placeholder="e.g., Cybernetic Matrix core"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 text-white transition-all"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Price (BDT)</label>
              <div className="relative">
                <FiDollarSign className="absolute left-4 top-3.5 text-slate-500" size={16} />
                <input 
                  type="number" required value={item.price}
                  onChange={(e) => setItem({...item, price: e.target.value})}
                  placeholder="5500"
                  className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 text-white transition-all"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Deployment Date</label>
              <div className="relative">
                <FiCalendar className="absolute left-4 top-3.5 text-slate-500" size={16} />
                <input 
                  type="date" required value={item.date}
                  onChange={(e) => setItem({...item, date: e.target.value})}
                  className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 text-white transition-all appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Priority Level</label>
              <div className="relative">
                <FiChevronsUp className="absolute left-4 top-3.5 text-slate-500" size={16} />
                <select 
                  value={item.priority}
                  onChange={(e) => setItem({...item, priority: e.target.value})}
                  className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 text-white transition-all cursor-pointer select-none"
                >
                  <option value="Low" className="bg-slate-950 text-white">Low</option>
                  <option value="Medium" className="bg-slate-950 text-white">Medium</option>
                  <option value="High" className="bg-slate-950 text-white">High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Short Description</label>
            <input 
              type="text" required value={item.shortDescription}
              onChange={(e) => setItem({...item, shortDescription: e.target.value})}
              placeholder="Brief overview tagline..."
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 text-white transition-all"
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Full Description</label>
            <div className="relative">
              <FiFileText className="absolute left-4 top-3.5 text-slate-500" size={16} />
              <textarea 
                rows={4} required value={item.fullDescription}
                onChange={(e) => setItem({...item, fullDescription: e.target.value})}
                placeholder="Write detailed specifications here..."
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 text-white transition-all resize-none"
              />
            </div>
          </div>

          {/* Image Upload Zone */}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Product Image (Optional)</label>
            <div className="relative flex items-center gap-4 bg-slate-950 p-4 border border-slate-800 rounded-xl">
              <FiImage className="text-slate-500 shrink-0" size={20} />
              <input 
                type="file" accept="image/*"
                onChange={(e) => {
                  if(e.target.files && e.target.files[0]){
                    setFile(e.target.files[0]);
                    setPreviewUrl(URL.createObjectURL(e.target.files[0]));
                  }
                }}
                className="text-xs text-slate-400 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-black file:bg-cyan-950 file:text-cyan-400 border-0 cursor-pointer"
              />
              {previewUrl && (
                <img src={previewUrl} alt="Preview" className="w-12 h-12 object-cover rounded-md border border-slate-800 ml-auto animate-fade-in" />
              )}
            </div>
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-600/50 text-white font-bold rounded-xl text-sm transition-all shadow-lg uppercase tracking-wider cursor-pointer"
          >
            {loading ? <FiLoader className="animate-spin" size={16} /> : null}
            {loading ? "Deploying Code..." : "Upload Item"}
          </button>
        </form>
      </div>
    </div>
  );
}