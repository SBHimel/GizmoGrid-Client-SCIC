"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideLayout =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/auth"); // চাইলে login/register-ও hide করতে পারো

  return (
    <>
      {!hideLayout && <Navbar />}

      <main className="flex-grow">
        {children}
      </main>

      {!hideLayout && <Footer />}
    </>
  );
}