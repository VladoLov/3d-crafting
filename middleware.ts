import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export default async function authMiddleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  // Protected routes that require authentication
  const protectedRoutes = ["/kosara", "/checkout", "/profil", "/narudzbe"];
  const adminRoutes = ["/admin"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isAdminRoute = adminRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Redirect to home if accessing protected route without session
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // For admin routes, check if user has admin role (mock check for now)
  if (isAdminRoute) {
    if (!session) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Mock admin check - in real app, check user role from database
    const isAdmin =
      session.user.email === "admin@vlado.hr" ||
      session.user.email?.includes("admin");

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/korpa/:path*",
    "/checkout/:path*",
    "/profil/:path*",
    "/narudzbe/:path*",
    "/admin/:path*",
  ],
};
