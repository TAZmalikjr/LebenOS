import { createServerClient } from "@walletcrow/supabase/server";
import { PLAN_FEATURES, type PlanSlug } from "@walletcrow/types";

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  limit: number;
  resetAt: string;
}

export async function checkAiRateLimit(
  userId: string,
  businessId: string,
  planSlug: PlanSlug
): Promise<RateLimitResult> {
  const supabase = await createServerClient();
  const limit = PLAN_FEATURES[planSlug].aiQueriesPerDay;

  // Count today's usage
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { count } = await supabase
    .from("ai_usage")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", today.toISOString());

  const used = count || 0;
  const remaining = Math.max(0, limit - used);

  // Reset at midnight UTC
  const resetAt = new Date();
  resetAt.setUTCHours(24, 0, 0, 0);

  return {
    allowed: used < limit,
    remaining,
    limit,
    resetAt: resetAt.toISOString(),
  };
}

export async function recordAiUsage(
  userId: string,
  businessId: string,
  crowType: string,
  tokensUsed: number = 0
): Promise<void> {
  const supabase = await createServerClient();
  await supabase.from("ai_usage").insert({
    user_id: userId,
    business_id: businessId,
    crow_type: crowType,
    tokens_used: tokensUsed,
  });
}
