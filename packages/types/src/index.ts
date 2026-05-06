// ─── Crow Types ─────────────────────────────────────────
export type CrowType = "CASHFLOW" | "EXPENSE" | "REVENUE" | "TAX" | "SCOUT";
export type NestHealth = "healthy" | "caution" | "danger";
export type AlertSeverity = "INFO" | "WARNING" | "DANGER" | "CRITICAL";

export interface CrowPersona {
  type: CrowType;
  name: string;
  role: string;
  personality: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface CrowAlertData {
  id: string;
  crow_type: CrowType;
  severity: AlertSeverity;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

// ─── Dashboard Types ────────────────────────────────────
export interface DashboardData {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  pendingInvoices: number;
  overdueInvoices: number;
  cashRunwayDays: number;
  nestHealth: NestHealth;
  recentTransactions: TransactionData[];
  alerts: CrowAlertData[];
}

export interface TransactionData {
  id: string;
  amount: number;
  type: "INCOME" | "EXPENSE" | "TRANSFER";
  category: string | null;
  description: string | null;
  vendor: string | null;
  date: string;
}

// ─── Invoice Types ──────────────────────────────────────
export type InvoiceStatus = "DRAFT" | "SENT" | "VIEWED" | "PAID" | "OVERDUE" | "CANCELLED";

export interface InvoiceData {
  id: string;
  invoice_number: string;
  client_name: string;
  client_email: string | null;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: InvoiceStatus;
  due_date: string;
  created_at: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

// ─── POS Types ──────────────────────────────────────────
export type PaymentMethod = "CASH" | "CARD" | "MOBILE" | "OTHER";

export interface PosEntryData {
  id: string;
  amount: number;
  category: string | null;
  payment_method: PaymentMethod;
  note: string | null;
  created_at: string;
}

// ─── Budget Goals ───────────────────────────────────────
export interface BudgetGoalData {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  deadline: string | null;
}

// ─── Pricing & Plans ────────────────────────────────────
export type PlanSlug = "sparrow" | "crow-keeper" | "the-murder";

export interface PlanFeatures {
  bankConnections: number;
  transactionsPerMonth: number;
  invoicesPerMonth: number;
  posTransactionsPerMonth: number;
  hasCashflowCrow: boolean;
  cashflowCrowLevel: "basic" | "full" | "advanced";
  hasExpenseCrow: boolean;
  hasRevenueCrow: boolean;
  hasTaxCrow: boolean;
  hasScoutCrow: boolean;
  hasMultiBusiness: boolean;
  aiQueriesPerDay: number;
}

export const PLAN_FEATURES: Record<PlanSlug, PlanFeatures> = {
  sparrow: {
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
    aiQueriesPerDay: 10,
  },
  "crow-keeper": {
    bankConnections: -1,
    transactionsPerMonth: -1,
    invoicesPerMonth: -1,
    posTransactionsPerMonth: -1,
    hasCashflowCrow: true,
    cashflowCrowLevel: "full",
    hasExpenseCrow: true,
    hasRevenueCrow: true,
    hasTaxCrow: false,
    hasScoutCrow: false,
    hasMultiBusiness: false,
    aiQueriesPerDay: 100,
  },
  "the-murder": {
    bankConnections: -1,
    transactionsPerMonth: -1,
    invoicesPerMonth: -1,
    posTransactionsPerMonth: -1,
    hasCashflowCrow: true,
    cashflowCrowLevel: "advanced",
    hasExpenseCrow: true,
    hasRevenueCrow: true,
    hasTaxCrow: true,
    hasScoutCrow: true,
    hasMultiBusiness: true,
    aiQueriesPerDay: 500,
  },
};

// ─── User & Auth ────────────────────────────────────────
export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: "owner" | "admin" | "super_admin";
  created_at: string;
}

export interface BusinessProfile {
  id: string;
  name: string;
  industry: string | null;
  size: string | null;
  location: string | null;
  currency: string;
  plan_slug: PlanSlug;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  owner_id: string;
  created_at: string;
}

// ─── Database table types (Supabase) ────────────────────
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: UserProfile;
        Insert: Omit<UserProfile, "created_at">;
        Update: Partial<Omit<UserProfile, "id" | "created_at">>;
      };
      businesses: {
        Row: BusinessProfile;
        Insert: Omit<BusinessProfile, "created_at">;
        Update: Partial<Omit<BusinessProfile, "id" | "created_at">>;
      };
    };
  };
}
