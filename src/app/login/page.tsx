'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { motion } from 'framer-motion';
import { FaGoogle, FaFacebook } from 'react-icons/fa6'; 
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff, FiShield, FiLoader, FiTerminal } from 'react-icons/fi';
import { authClient } from '@/lib/auth-client'; 

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 🎯 ডেমো অ্যাকাউন্ট অটো-ফিল এবং ডিরেক্ট লগইন ফাংশন
  const handleDemoLogin = async () => {
    const demoEmail = 'seller@gizmogrid.com';
    const demoPassword = 'Password123!';
    
    setEmail(demoEmail);
    setPassword(demoPassword);
    setIsLoading(true);
    setErrorMessage('');

    try {
      await authClient.signIn.email({
        email: demoEmail,
        password: demoPassword,
        callbackURL: '/dashboard',
      }, {
        onRequest: () => setIsLoading(true),
        onSuccess: () => {
          setIsLoading(false);
          router.push('/dashboard');
        },
        onError: (ctx) => {
          setIsLoading(false);
          setErrorMessage(ctx.error.message || 'Demo pipeline access denied.');
        }
      });
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('Failed to trigger bypass sequence.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      await authClient.signIn.email({
        email,
        password,
        callbackURL: '/dashboard',
      }, {
        onRequest: () => setIsLoading(true),
        onSuccess: () => {
          setIsLoading(false);
          router.push('/dashboard');
        },
        onError: (ctx) => {
          setIsLoading(false);
          setErrorMessage(ctx.error.message || 'Authentication failed.');
        }
      });
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'facebook') => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: '/dashboard',
      });
    } catch (err) {
      setErrorMessage(`Failed to connect with ${provider}.`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden transition-colors duration-300 bg-grid-pattern pt-20 pb-12">
      
      {/* BACKGROUND GLOW ORBS */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] bg-cyan-400/20 dark:bg-cyan-500/5 rounded-full blur-[80px] md:blur-[120px]" />
      </div>

      {/* MAIN CARD CONTAINER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none z-10"
      >
        <div className="text-center mb-6">
          <Link href="/" className="inline-block text-2xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 mb-2">
            GizmoGrid
          </Link>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">Welcome back</h2>
          <p className="text-xs sm:text-sm text-slate-700/90 dark:text-slate-400 font-medium dark:font-normal">
            Enter your access matrix coordinates to proceed.
          </p>
        </div>

        {/* ─────────────── ⚡ DEMO CREDENTIALS SHORTCUT BOX ─────────────── */}
        <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="flex items-center gap-2 text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
            <FiTerminal className="text-cyan-500" size={14} /> Assignment Review Bypass
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
            Click the button below to instantly populate fields and authorize access as a verified system Seller.
          </p>
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white dark:text-cyan-400 py-2 rounded-lg font-bold text-xs transition-all active:scale-[0.98] border border-slate-700 dark:border-slate-700 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? <FiLoader size={12} className="animate-spin" /> : "⚡ One-Click Demo Login"}
          </button>
        </div>

        {/* এরর মেসেজ ডিসপ্লে */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 text-center animate-shake">
            {errorMessage}
          </div>
        )}

        {/* Social Authentication Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button 
            type="button"
            onClick={() => handleSocialSignIn('google')}
            className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 py-2.5 px-4 rounded-xl font-bold text-xs active:scale-95 transition-all cursor-pointer border border-slate-200/60 dark:border-transparent"
          >
            <FaGoogle size={14} className="text-red-500" />
            Google
          </button>
          
          <button 
            type="button"
            onClick={() => handleSocialSignIn('facebook')}
            className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 py-2.5 px-4 rounded-xl font-bold text-xs active:scale-95 transition-all cursor-pointer border border-slate-200/60 dark:border-transparent"
          >
            <FaFacebook size={15} className="text-blue-600 dark:text-blue-500" />
            Facebook
          </button>
        </div>

        <div className="relative flex items-center my-6">
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          <span className="flex-shrink mx-4 text-slate-400 dark:text-slate-500 text-xs font-semibold uppercase tracking-wider">Or secure email</span>
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
        </div>

        {/* Main Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Matrix Email</label>
            <div className="relative">
              <FiMail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input 
                type="email" 
                required
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 disabled:opacity-60 transition-all font-medium"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Passkey</label>
              <Link href="/forgot-password" className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <div className="relative">
                <FiLock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl py-3 pl-11 pr-11 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 disabled:opacity-60 transition-all font-medium"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Secure Session Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input 
              type="checkbox" 
              id="remember" 
              className="w-4 h-4 rounded bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-cyan-500 focus:ring-cyan-500/20 accent-cyan-500 cursor-pointer"
            />
            <label htmlFor="remember" className="text-xs text-slate-600 dark:text-slate-400 font-medium select-none cursor-pointer flex items-center gap-1.5">
              <FiShield size={14} className="text-emerald-500 stroke-[2.5]" /> Keep my session encrypted
            </label>
          </div>

          {/* Submit Button with Loading State */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-3.5 rounded-xl font-bold hover:scale-[1.02] active:scale-98 shadow-md shadow-cyan-600/10 dark:shadow-none transition-all duration-200 cursor-pointer text-sm disabled:opacity-70 disabled:pointer-events-none"
          >
            {isLoading ? (
              <FiLoader size={16} className="animate-spin" />
            ) : (
              <>
                Authorize Access
                <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-slate-600 dark:text-slate-400 font-medium mt-6">
          New to the Grid?{' '}
          <Link href="/register" className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline">
            Create an identity
          </Link>
        </p>

      </motion.div>
    </div>
  );
}