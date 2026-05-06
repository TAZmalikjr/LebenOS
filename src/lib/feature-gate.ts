import { CrowType, PlanFeatures } from "@/types";

const DEFAULT_FREE_PLAN: PlanFeatures = {
  bankConnections: 1,
  transactionsPerMonth: 100,
  invoicesPerMonth: 5,
  posTransactionsPerMonth: 50,
  hasCashflowCrow: true,
  cashflowCrowLevel: "basic",
  hasExpenseCrow: false,
  hasRevenueCrow: false,
  hasTaxCrow: false,
  hasScoutCrow: false,
  hasMultiBusiness: false,
};

export function canAccessCrow(
  crowType: CrowType,
  plan: PlanFeatures | null
): boolean {
  const features = plan || DEFAULT_FREE_PLAN;

  switch (crowType) {
    case "CASHFLOW":
      return features.hasCashflowCrow;
    case "EXPENSE":
      return features.hasExpenseCrow;
    case "REVENUE":
      return features.hasRevenueCrow;
    case "TAX":
      return features.hasTaxCrow;
    case "SCOUT":
      return features.hasScoutCrow;
    default:
      return false;
  }
}

export function checkLimit(
  feature: keyof PlanFeatures,
  currentUsage: number,
  plan: PlanFeatures | null
): { allowed: boolean; limit: number; remaining: number } {
  const features = plan || DEFAULT_FREE_PLAN;
  const limit = features[feature] as number;

  // -1 means unlimited
  if (limit === -1) {
    return { allowed: true, limit: -1, remaining: Infinity };
  }

  return {
    allowed: currentUsage < limit,
    limit,
    remaining: Math.max(0, limit - currentUsage),
  };
}

export function getPlanDisplayName(slug: string): string {
  switch (slug) {
    case "sparrow":
      return "Sparrow (Free)";
    case "crow-keeper":
      return "Crow Keeper";
    case "the-murder":
      return "The Murder";
    default:
      return slug;
  }
}
