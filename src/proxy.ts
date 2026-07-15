import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function proxy(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { pathname } = new URL(request.url);

  // Login না থাকলে
  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const role = session.user.role;

  // Admin Routes
  if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Seller Routes
  if (pathname.startsWith("/dashboard/seller") && role !== "seller") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Manager Routes
  if (pathname.startsWith("/dashboard/manager") && role !== "manager") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/items/add","/items/manage",'/profile',"/dashboard/:path*"],
};