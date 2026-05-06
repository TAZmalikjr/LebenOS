import { type NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@walletcrow/supabase/middleware";

const ACCOUNTS_URL = process.env.NEXT_PUBLIC_ACCOUNTS_URL || "http://localhost:3002";
const SUPER_ADMIN_EMAILS = (process.env.SUPER_ADMIN_EMAILS || "").split(",").map((e) => e.trim());

export async function middleware(request: NextRequest) {
  const { user, response } = await createMiddlewareClient(request);
  const { pathname } = request.nextUrl;

  // Protected routes - require auth
  if (!user) {
    const loginUrl = `${ACCOUNTS_URL}/login?redirect_to=${encodeURIComponent(request.url)}`;
    return NextResponse.redirect(loginUrl);
  }

  // Super admin routes - require super admin role
  if (pathname.startsWith("/superadmin")) {
    const isSuperAdmin = SUPER_ADMIN_EMAILS.includes(user.email || "");
    if (!isSuperAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/webhooks).*)"],
};
