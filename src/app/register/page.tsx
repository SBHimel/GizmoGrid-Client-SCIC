'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc'; 
import { FaFacebook } from 'react-icons/fa6'; // ফেসবুক অফিশিয়াল আইকন ইম্পোর্ট
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff, FiUser, FiImage, FiCheck, FiX, FiLoader } from 'react-icons/fi';
// Better Auth ক্লায়েন্ট ইম্পোর্ট
import { authClient } from '@/lib/auth-client';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // পাসওয়ার্ড ভ্যালিডেশন স্টেটস (লাইভ ট্র্যাকিং)
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    number: false,
    capital: false,
  });

  // পাসওয়ার্ড চেঞ্জ হওয়ার সাথে সাথে রুলস চেক করা
  useEffect(() => {
    setPasswordRequirements({
      length: password.length >= 6,
      number: /\d/.test(password),
      capital: /[A-Z]/.test(password),
    });
  }, [password]);

  // সব রুলস ফিলাপ হয়েছে কি না চেক
  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid) {
      setErrorMessage('Please fulfill all passkey synchronization requirements.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await authClient.signUp.email({
        email,
        password,
        name,
        image: imageUrl || undefined,
        callbackURL: '/dashboard',
      }, {
        onRequest: () => setIsLoading(true),
        onSuccess: () => {
          setIsLoading(false);
          setSuccessMessage('Identity Created Successfully! Initializing Matrix Dashboard...');
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        },
        onError: (ctx) => {
          setIsLoading(false);
          setErrorMessage(ctx.error.message || 'Identity initialization failed.');
        }
      });
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('Something went wrong during registration.');
    }
  };

  // সোশ্যাল সাইন-ইন হ্যান্ডলার লজিক (গুগল ও ফেসবুক)
  const handleSocialSignIn = async (provider: 'google' | 'facebook') => {
    try {
      await authClient.signIn.social({
        provider: provider,
        callbackURL: '/dashboard', // সফল হলে ড্যাশবোর্ডে রিডাইরেক্ট করবে
      });
    } catch (err) {
      console.error(err);
      setErrorMessage(`${provider === 'google' ? 'Google' : 'Facebook'} authentication failed.`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden transition-colors duration-300 bg-grid-pattern pt-24 pb-12">
      
      {/* BACKGROUND GLOW ORBS */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[300px] md:w-[500px] h-[300px] bg-cyan-400/20 dark:bg-cyan-500/5 rounded-full blur-[80px] md:blur-[120px]" />
      </div>

      {/* MAIN CARD CONTAINER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none z-10"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-block text-2xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 mb-2">
            GizmoGrid
          </Link>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">Create Identity</h2>
          <p className="text-xs sm:text-sm text-slate-700/90 dark:text-slate-400 font-medium">
            Initialize your profile into the technology core.
          </p>
        </div>

        {/* লাইভ মেসেজ অ্যালার্ট গ্রুপ */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="mb-4 p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 text-center">
              {errorMessage}
            </motion.div>
          )}
          {successMessage && (
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400 text-center">
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🌟 SOCIAL AUTH BUTTONS (GOOGLE & FACEBOOK) */}
        <div className="flex flex-col gap-2.5 mb-5">
          {/* Google Button */}
          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleSocialSignIn('google')}
            className="w-full flex items-center justify-center gap-2.5 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all active:scale-98 cursor-pointer disabled:opacity-50"
          >
            <FcGoogle size={18} />
            <span>Continue with Google</span>
          </button>

          {/* Facebook Button */}
          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleSocialSignIn('facebook')}
            className="w-full flex items-center justify-center gap-2.5 bg-[#1877F2]/10 dark:bg-[#1877F2]/5 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 dark:border-[#1877F2]/20 text-[#1877F2] dark:text-[#4c94ff] py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all active:scale-98 cursor-pointer disabled:opacity-50"
          >
            <FaFacebook size={18} />
            <span>Continue with Facebook</span>
          </button>

          {/* Divider line */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink mx-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Or matrix mail</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Full Name</label>
            <div className="relative">
              <FiUser size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input type="text" required disabled={isLoading} value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Mercer" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl py-2.5 pl-11 pr-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all font-medium" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Matrix Email</label>
            <div className="relative">
              <FiMail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input type="email" required disabled={isLoading} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl py-2.5 pl-11 pr-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all font-medium" />
            </div>
          </div>

          {/* Image URL (Optional) */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Profile Image URL</label>
              <span className="text-[10px] font-bold text-slate-400 lowercase">Optional</span>
            </div>
            <div className="relative">
              <FiImage size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input type="url" disabled={isLoading} value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/avatar.jpg" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl py-2.5 pl-11 pr-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all font-medium" />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Passkey</label>
            <div className="relative">
              <FiLock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input type={showPassword ? 'text' : 'password'} required disabled={isLoading} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl py-2.5 pl-11 pr-11 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all font-medium" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 cursor-pointer">
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>

            {/* পাসওয়ার্ড রুলস ট্র্যাকার UI */}
            <div className="pt-2 pb-1 space-y-1 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5 transition-colors">
                {passwordRequirements.length ? <FiCheck className="text-emerald-500 stroke-[3]" /> : <FiX className="text-slate-300 dark:text-slate-700 stroke-[3]" />}
                <span className={passwordRequirements.length ? "text-emerald-600 dark:text-emerald-400" : ""}>Minimum 6 characters</span>
              </div>
              <div className="flex items-center gap-1.5 transition-colors">
                {passwordRequirements.number ? <FiCheck className="text-emerald-500 stroke-[3]" /> : <FiX className="text-slate-300 dark:text-slate-700 stroke-[3]" />}
                <span className={passwordRequirements.number ? "text-emerald-600 dark:text-emerald-400" : ""}>At least 1 numeric digit (0-9)</span>
              </div>
              <div className="flex items-center gap-1.5 transition-colors">
                {passwordRequirements.capital ? <FiCheck className="text-emerald-500 stroke-[3]" /> : <FiX className="text-slate-300 dark:text-slate-700 stroke-[3]" />}
                <span className={passwordRequirements.capital ? "text-emerald-600 dark:text-emerald-400" : ""}>At least 1 uppercase letter (A-Z)</span>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" disabled={isLoading} className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-600 hover:to-blue-600 text-white py-3.5 rounded-xl font-bold hover:scale-[1.02] active:scale-98 shadow-md shadow-cyan-600/10 dark:shadow-none transition-all duration-200 cursor-pointer text-sm disabled:opacity-70 disabled:pointer-events-none">
            {isLoading ? <FiLoader size={16} className="animate-spin" /> : (
              <>Initialize Core Identity <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-slate-600 dark:text-slate-400 font-medium mt-5">
          Already verified?{' '}
          <Link href="/login" className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline">
            Access matrix
          </Link>
        </p>

      </motion.div>
    </div>
  );
}