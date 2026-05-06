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
  crowType: CrowType;
  severity: AlertSeverity;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

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

export interface InvoiceData {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string | null;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: "DRAFT" | "SENT" | "VIEWED" | "PAID" | "OVERDUE" | "CANCELLED";
  dueDate: string;
  createdAt: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PosEntryData {
  id: string;
  amount: number;
  category: string | null;
  paymentMethod: "CASH" | "CARD" | "MOBILE" | "OTHER";
  note: string | null;
  createdAt: string;
}

export interface BudgetGoalData {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string | null;
}

export interface PlanFeatures {
  bankConnections: number;
  transactionsPerMonth: number;
  invoicesPerMonth: number;
  posTransactionsPerMonth: number;
  hasCashflowCrow: boolean;
  cashflowCrowLevel: string;
  hasExpenseCrow: boolean;
  hasRevenueCrow: boolean;
  hasTaxCrow: boolean;
  hasScoutCrow: boolean;
  hasMultiBusiness: boolean;
}
