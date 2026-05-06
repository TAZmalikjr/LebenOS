import { type NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@walletcrow/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { user, response } = await createMiddlewareClient(request);
  const { pathname } = request.nextUrl;

  // If user is already signed in and trying to access auth pages, redirect to app
  if (user && (pathname === "/login" || pathname === "/signup")) {
    const redirectTo = request.nextUrl.searchParams.get("redirect_to") || process.env.NEXT_PUBLIC_APP_URL || "/";
    return NextResponse.redirect(redirectTo);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|auth/callback).*)"],
};
