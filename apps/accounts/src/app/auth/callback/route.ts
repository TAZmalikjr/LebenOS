import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@walletcrow/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirectTo = requestUrl.searchParams.get("redirect_to") || process.env.NEXT_PUBLIC_APP_URL || "/";

  if (code) {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check if user has a business, if not create one
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: businesses } = await supabase
          .from("businesses")
          .select("id")
          .eq("owner_id", user.id)
          .limit(1);

        if (!businesses || businesses.length === 0) {
          await supabase.from("businesses").insert({
            name: `${user.user_metadata?.full_name || "My"}'s Business`,
            owner_id: user.id,
            plan_slug: "sparrow",
          });
        }
      }

      return NextResponse.redirect(redirectTo);
    }
  }

  // Auth error - redirect to login
  return NextResponse.redirect(`${requestUrl.origin}/login?error=auth_failed`);
}
