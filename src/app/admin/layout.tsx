"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  LayoutDashboard,
  Users,
  CreditCard,
  Activity,
  Settings,
  Bird,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNav = [
  { label: "Overview", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Businesses", href: "/admin/businesses", icon: <Users className="h-5 w-5" /> },
  { label: "Plans", href: "/admin/plans", icon: <CreditCard className="h-5 w-5" /> },
  { label: "Usage", href: "/admin/usage", icon: <Activity className="h-5 w-5" /> },
  { label: "Settings", href: "/admin/settings", icon: <Settings className="h-5 w-5" /> },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Admin Sidebar */}
      <aside className="flex h-screen w-64 flex-col border-r border-border bg-card">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-crow-danger">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">WalletCrow</h1>
            <p className="text-xs text-crow-danger font-semibold">
              Super Admin
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {adminNav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-crow-danger/10 text-crow-danger"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border px-3 py-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <Bird className="h-5 w-5" />
            <span>Back to App</span>
          </Link>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
          <h2 className="text-lg font-semibold">Super Admin Dashboard</h2>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-crow-danger/20 flex items-center justify-center">
              <Shield className="h-4 w-4 text-crow-danger" />
            </div>
            <span className="text-sm font-medium">Admin</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
