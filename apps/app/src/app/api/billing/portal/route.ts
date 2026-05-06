import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@walletcrow/supabase/server";
import { createPortalSession } from "@/lib/billing";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { businessId } = (await req.json()) as { businessId: string };
    const returnUrl = `${process.env.NEXT_PUBLIC_APP_URL}/settings`;
    const portalUrl = await createPortalSession(businessId, returnUrl);

    if (!portalUrl) {
      return NextResponse.json({ error: "No billing account found" }, { status: 404 });
    }

    return NextResponse.json({ url: portalUrl });
  } catch (error) {
    console.error("Portal error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
