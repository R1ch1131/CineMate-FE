import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ 
    req,
    secret: process.env.NEXTAUTH_SECRET 
  });

  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const isProtectedRoute = 
    req.nextUrl.pathname.startsWith("/profile") ||
    req.nextUrl.pathname.startsWith("/protected");

  // Если пользователь не авторизован и пытается зайти на защищенный маршрут
  if (!token && isProtectedRoute) {
    const loginUrl = new URL("/auth", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Если пользователь авторизован и пытается зайти на страницу авторизации
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/protected/:path*", "/auth"],
};
