// Domain configuration
export const DOMAINS = {
  app: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001",
  accounts: process.env.NEXT_PUBLIC_ACCOUNTS_URL || "http://localhost:3002",
  marketing: process.env.NEXT_PUBLIC_MARKETING_URL || "http://localhost:3000",
} as const;

// Auth redirect helpers
export function getLoginUrl(redirectTo?: string): string {
  const base = `${DOMAINS.accounts}/login`;
  if (redirectTo) {
    return `${base}?redirect_to=${encodeURIComponent(redirectTo)}`;
  }
  return base;
}

export function getSignupUrl(redirectTo?: string): string {
  const base = `${DOMAINS.accounts}/signup`;
  if (redirectTo) {
    return `${base}?redirect_to=${encodeURIComponent(redirectTo)}`;
  }
  return base;
}

export function getDashboardUrl(path: string = "/"): string {
  return `${DOMAINS.app}${path}`;
}

export function getMarketingUrl(path: string = "/"): string {
  return `${DOMAINS.marketing}${path}`;
}

// Rate limit configuration
export const RATE_LIMITS = {
  ai: {
    sparrow: parseInt(process.env.RATE_LIMIT_AI_FREE || "10", 10),
    "crow-keeper": parseInt(process.env.RATE_LIMIT_AI_PAID || "100", 10),
    "the-murder": parseInt(process.env.RATE_LIMIT_AI_MURDER || "500", 10),
  },
} as const;

// Stripe price IDs
export const STRIPE_PRICES = {
  "crow-keeper": process.env.STRIPE_PRICE_CROW_KEEPER || "",
  "the-murder": process.env.STRIPE_PRICE_THE_MURDER || "",
} as const;
