'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiImage, FiLoader, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import { authClient } from '@/lib/auth-client'; // 💡 তোমার প্রজেক্টের পাথ অনুযায়ী ঠিক করে নিও
import Link from 'next/link';

export default function ProfileUpdatePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  
  const [name, setName] = useState(session?.user?.name || '');
  const [image, setImage] = useState(session?.user?.image || '');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <FiLoader className="animate-spin text-cyan-500" size={30} />
      </div>
    );
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await authClient.updateUser({
        name: name,
        image: image,
      });

      setSuccess(true);
      router.refresh();
    } catch (error) {
      console.error("Profile update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🎯 ইউজারের রোল অনুযায়ী ড্যাশবোর্ডের ব্যাক ইউআরএল ঠিক করা
  const userRole = session?.user?.role || 'buyer';
  const dashboardLink = userRole === 'buyer' ? '/dashboard' : `/dashboard/${userRole}`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        
        {/* 🔙 ড্যাশবোর্ডে ফিরে যাওয়ার বাটন */}
        <Link 
          href={dashboardLink}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 mb-6 transition-all"
        >
          <FiArrowLeft /> Back to Dashboard
        </Link>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-md border border-slate-100 dark:border-slate-800">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Update Profile 👤</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">আপনার অ্যাকাউন্টের নাম এবং প্রোফাইল ছবি এখান থেকে পরিবর্তন করুন।</p>
          </div>

          {success && (
            <div className="mb-6 flex items-center gap-2 p-4 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl text-sm font-semibold">
              <FiCheckCircle size={18} /> প্রোফাইল সফলভাবে আপডেট করা হয়েছে!
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" 
                value={session?.user?.email} 
                disabled 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-3.5 text-slate-400" size={16} />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name" 
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-500 text-slate-800 dark:text-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Profile Image URL</label>
              <div className="relative">
                <FiImage className="absolute left-4 top-3.5 text-slate-400" size={16} />
                <input 
                  type="text" 
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/avatar.jpg" 
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-500 text-slate-800 dark:text-white transition-all"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">আপাতত ImgBB বা যেকোনো লাইভ ইমেজ ইউআরএল এখানে পেস্ট করতে পারো।</p>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-600/50 text-white font-bold rounded-xl text-sm transition-all cursor-pointer select-none"
            >
              {loading ? <FiLoader className="animate-spin" size={16} /> : null}
              {loading ? 'Updating Profile...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}