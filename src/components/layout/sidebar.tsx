"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  TrendingUp,
  Scissors,
  BarChart3,
  FileText,
  ShoppingCart,
  Target,
  Settings,
  Shield,
  Bird,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  crowType?: string;
  locked?: boolean;
}

const mainNav: NavItem[] = [
  { label: "The Nest", href: "/dashboard", icon: <Home className="h-5 w-5" /> },
  {
    label: "Cashflow Crow",
    href: "/dashboard/cashflow",
    icon: <TrendingUp className="h-5 w-5" />,
    crowType: "CASHFLOW",
  },
  {
    label: "Expense Crow",
    href: "/dashboard/expenses",
    icon: <Scissors className="h-5 w-5" />,
    crowType: "EXPENSE",
  },
  {
    label: "Revenue Crow",
    href: "/dashboard/revenue",
    icon: <BarChart3 className="h-5 w-5" />,
    crowType: "REVENUE",
    locked: true,
  },
  {
    label: "Invoices",
    href: "/dashboard/invoices",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    label: "POS",
    href: "/dashboard/pos",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    label: "Nest Eggs",
    href: "/dashboard/goals",
    icon: <Target className="h-5 w-5" />,
  },
];

const bottomNav: NavItem[] = [
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <Bird className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">WalletCrow</h1>
          <p className="text-xs text-muted-foreground">Financial Guardian</p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        <p className="px-3 mb-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
          Navigation
        </p>
        {mainNav.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.locked ? "#" : item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
                item.locked && "opacity-50 cursor-not-allowed"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.locked && (
                <span className="ml-auto text-[10px] bg-secondary px-1.5 py-0.5 rounded-full">
                  PRO
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-border px-3 py-4 space-y-1">
        {bottomNav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
