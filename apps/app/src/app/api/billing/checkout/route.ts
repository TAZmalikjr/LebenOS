import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@walletcrow/supabase/server";
import { createCheckoutSession } from "@/lib/billing";
import type { PlanSlug } from "@walletcrow/types";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { businessId, planSlug } = (await req.json()) as {
      businessId: string;
      planSlug: PlanSlug;
    };

    const returnUrl = `${process.env.NEXT_PUBLIC_APP_URL}/settings`;
    const checkoutUrl = await createCheckoutSession(businessId, user.id, planSlug, returnUrl);

    if (!checkoutUrl) {
      return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
    }

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
