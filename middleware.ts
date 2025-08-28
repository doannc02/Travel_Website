// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ⚡ Middleware chỉ kiểm tra sự tồn tại token
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bỏ qua auth cho login
  if (pathname === "/api/admin/auth") return NextResponse.next();

  if (pathname.startsWith("/admin") && !pathname.startsWith("/auth/admin-login")) {
    const token = request.cookies.get("admin_token")?.value;
    console.log("Middleware check admin_token:", token);
    if (!token) {
      return NextResponse.redirect(
        new URL(
          "/auth/admin-login?redirect=" + encodeURIComponent(pathname),
          request.url
        )
      );
    }
  }
  

  if (pathname.startsWith("/api/admin")) {
    const authHeader = request.headers.get("authorization")?.replace("Bearer ", "");
    const cookieToken = request.cookies.get("admin_token")?.value;
    const token = authHeader || cookieToken;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
