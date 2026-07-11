import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider"; // ১. ইম্পোর্ট করুন

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GizmoGrid | Next-Gen Tech Gadgets Marketplace",
  description: "Explore, add, and manage cutting-edge technology and smart devices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full bg-white dark:bg-slate-950 text-slate-950 dark:text-slate-100 font-sans flex flex-col selection:bg-cyan-500 selection:text-slate-900 transition-colors duration-300">
        
        {/* ২. থিম প্রোভাইডার দিয়ে children ঘিরে দিন */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="flex-grow">
            {children}
          </div>
        </ThemeProvider>

        <Toaster position="top-right" richColors closeButton theme="dark" />
      </body>
    </html>
  );
}