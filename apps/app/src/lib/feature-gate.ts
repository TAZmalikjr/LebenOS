import { PLAN_FEATURES, type CrowType, type PlanSlug, type PlanFeatures } from "@walletcrow/types";

export function getFeatures(planSlug: PlanSlug): PlanFeatures {
  return PLAN_FEATURES[planSlug] || PLAN_FEATURES.sparrow;
}

export function canAccessCrow(crowType: CrowType, planSlug: PlanSlug): boolean {
  const features = getFeatures(planSlug);
  switch (crowType) {
    case "CASHFLOW": return features.hasCashflowCrow;
    case "EXPENSE": return features.hasExpenseCrow;
    case "REVENUE": return features.hasRevenueCrow;
    case "TAX": return features.hasTaxCrow;
    case "SCOUT": return features.hasScoutCrow;
    default: return false;
  }
}

export function checkUsageLimit(
  feature: "transactionsPerMonth" | "invoicesPerMonth" | "posTransactionsPerMonth" | "bankConnections",
  currentUsage: number,
  planSlug: PlanSlug
): { allowed: boolean; limit: number; remaining: number } {
  const features = getFeatures(planSlug);
  const limit = features[feature];
  if (limit === -1) return { allowed: true, limit: -1, remaining: Infinity };
  return { allowed: currentUsage < limit, limit, remaining: Math.max(0, limit - currentUsage) };
}
