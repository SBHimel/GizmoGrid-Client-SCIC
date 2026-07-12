"use client";


import { authClient } from "@/lib/auth-client";
import { FiLoader } from "react-icons/fi";
import AddProductForm from "../components/AddProductForm";

export default function AddProductPage() {
  // 🎯 ১. সেশন হুকটি এখানে কল করায় রিয়েক্টের নিয়ম ভাঙবে না এবং বাগ ফিক্স হবে
  const { data: sessionData, isPending } = authClient.useSession();
  const token = sessionData?.session?.token;

  // ⏳ সেশন লোড হওয়ার সময় সুন্দর লোডিং স্টেট
  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
        <FiLoader className="animate-spin text-cyan-500" size={36} />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Verifying session...</p>
      </div>
    );
  }

  // 📦 ক্লিন কম্পোনেন্ট রিটার্ন এবং প্রপ্স হিসেবে টোকেন পাঠানো
  return (
    <div className="py-6">
      <AddProductForm token={token} />
    </div>
  );
}