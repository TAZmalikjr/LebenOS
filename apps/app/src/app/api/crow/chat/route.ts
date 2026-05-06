import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@walletcrow/supabase/server";
import type { CrowType, PlanSlug } from "@walletcrow/types";
import { queryCrow } from "@/lib/ai";
import { checkAiRateLimit, recordAiUsage } from "@/lib/rate-limit";
import { canAccessCrow } from "@/lib/feature-gate";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { crowType, message, history, businessId } = body as {
      crowType: CrowType;
      message: string;
      history: { role: "user" | "assistant"; content: string }[];
      businessId: string;
    };

    // Get business and check plan
    const { data: business } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", businessId)
      .eq("owner_id", user.id)
      .single();

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const planSlug = (business.plan_slug || "sparrow") as PlanSlug;

    // Check crow access
    if (!canAccessCrow(crowType, planSlug)) {
      return NextResponse.json(
        { error: "This Crow requires a higher plan. Upgrade to access." },
        { status: 403 }
      );
    }

    // Check rate limit
    const rateLimit = await checkAiRateLimit(user.id, businessId, planSlug);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Daily AI query limit reached (${rateLimit.limit}/day). Resets at midnight UTC.`,
          limit: rateLimit.limit,
          remaining: 0,
          resetAt: rateLimit.resetAt,
        },
        { status: 429 }
      );
    }

    // Query the AI
    const content = await queryCrow(
      crowType,
      message,
      { name: business.name, industry: business.industry, currency: business.currency },
      history.map((m) => ({ role: m.role, content: m.content }))
    );

    // Record usage
    await recordAiUsage(user.id, businessId, crowType);

    return NextResponse.json({
      content,
      remaining: rateLimit.remaining - 1,
      limit: rateLimit.limit,
    });
  } catch (error) {
    console.error("Crow chat error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
