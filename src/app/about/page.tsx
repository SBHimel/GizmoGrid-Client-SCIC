"use client";

import React, { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { fetchAboutStats } from "@/lib/api"; // তোমার সেই ফাইল থেকে ইমপোর্ট

// কম্পোনেন্টগুলো ইমপোর্ট করো
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import ChartsDashboard from "./components/ChartsDashboard";
import TechStack from "./components/TechStack";
import TimelineSection from "./components/TimelineSection";
import FAQSection from "./components/FAQSection";

export default function AboutPage() {
  interface AboutData {
    stats: {
      totalUsers: number;
      totalProducts: number;
      totalSellers: number;
      pendingProducts: number;
    };

    userDistribution: {
      name: string;
      value: number;
      fill: string;
    }[];

    productStatus: {
      name: string;
      value: number;
    }[];

    growthData: {
      month: string;
      Users: number;
      Products: number;
    }[];
  }

  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchAboutStats();
        setData(res);
      } catch (err) {
        console.error("Error loading stats:", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <FiLoader className="animate-spin text-cyan-500" size={30} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">
      <HeroSection />
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-24">
        {/* ডাটাগুলো প্রপস হিসেবে কম্পোনেন্টে পাস করছি */}
        <StatsSection
          stats={
            data?.stats ?? {
              totalUsers: 0,
              totalProducts: 0,
              totalSellers: 0,
              pendingProducts: 0,
            }
          }
        />
        <ChartsDashboard
          userDistribution={data?.userDistribution ?? []}
          productStatus={data?.productStatus ?? []}
          growthData={data?.growthData ?? []}
        />
        <TechStack />
        <TimelineSection />
        <FAQSection />
      </div>
    </div>
  );
}
