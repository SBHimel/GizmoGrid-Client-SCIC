'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiImage, FiLoader, FiCheckCircle, FiArrowLeft, FiCamera } from 'react-icons/fi';
import { authClient } from '@/lib/auth-client'; 
import { imageUpload } from '@/lib/imgUpload'; // 🎯 ImgBB আপলোডার ইম্পোর্ট করা হলো
import Link from 'next/link';

export default function ProfileUpdatePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(''); // 📸 লোকাল ইমেজ প্রিভিউয়ের জন্য
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🔄 সেশন লোড হওয়ার পর স্টেট আপডেট করা
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setImage(session.user.image || '');
    }
  }, [session]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <FiLoader className="animate-spin text-cyan-500" size={30} />
      </div>
    );
  }

  // 🖼️ লোকাল ফাইল সিলেক্ট হ্যান্ডলার
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile)); // ইনস্ট্যান্ট প্রিভিউ দেখানোর জন্য URL তৈরি
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      let finalImageUrl = image;

      // 🎯 যদি ইউজার নতুন ফাইল সিলেক্ট করে, তবেই ImgBB-তে আপলোড হবে
      if (file) {
        const uploadedUrl = await imageUpload(file);
        if (!uploadedUrl) {
          alert("ছবি আপলোড ব্যর্থ হয়েছে! আবার চেষ্টা করুন।");
          setLoading(false);
          return;
        }
        finalImageUrl = uploadedUrl;
      }

      // 🎯 Better-Auth ব্যবহারকারী আপডেট করা
      await authClient.updateUser({
        name: name,
        image: finalImageUrl,
      });

      setImage(finalImageUrl);
      setFile(null); // আপলোড শেষে ফাইল স্টেট ক্লিয়ার
      setSuccess(true);
      router.refresh();
    } catch (error) {
      console.error("Profile update failed:", error);
      alert("কোথাও একটা সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  const userRole = (session?.user as { role?: string })?.role ?? "buyer";
  const dashboardLink = userRole === 'buyer' ? '/dashboard' : `/dashboard/${userRole}`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        
        {/* 🔙 ব্যাক বাটন */}
        <Link 
          href={dashboardLink}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 mb-6 transition-all"
        >
          <FiArrowLeft /> Back to Dashboard
        </Link>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-md border border-slate-100 dark:border-slate-800">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Update Profile 👤</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
Change your username and profile picture.</p>
          </div>

          {success && (
            <div className="mb-6 flex items-center gap-2 p-4 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl text-sm font-semibold">
              <FiCheckCircle size={18} /> 
Profile updated successfully!
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-6">
            
            {/* 📸 প্রফেশনাল গোল্ডেন/নিওন অবতার আপলোড জোন */}
            <div className="flex flex-col items-center justify-center pb-4">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="group relative h-28 w-28 rounded-full overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 cursor-pointer transition-all flex items-center justify-center bg-slate-50 dark:bg-slate-800/40"
              >
                {previewUrl || image ? (
                  <img 
                    src={previewUrl || image} 
                    alt="Profile Avatar" 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FiUser className="text-slate-400" size={36} />
                )}
                
                {/* হোভার ওভারলে ইফেক্ট */}
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FiCamera className="text-white mb-1" size={18} />
                  <span className="text-[9px] text-white font-bold uppercase tracking-wider">Upload</span>
                </div>
              </div>

              {/* হিডেন ফাইল ইনপুট */}
              <input 
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <p className="text-[11px] text-slate-400 mt-2">Click on the circular profile to change the picture.</p>
            </div>

            {/* ইমেইল এড্রেস (রিড-অনলি) */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" 
                value={session?.user?.email || ''} 
                disabled 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-400 cursor-not-allowed"
              />
            </div>

            {/* ইউজার নেম */}
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

            {/* সাবমিট বাটন */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-600/50 text-white font-bold rounded-xl text-sm transition-all cursor-pointer select-none shadow-md"
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