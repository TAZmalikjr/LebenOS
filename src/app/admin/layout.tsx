"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, LayoutDashboard, Users, CreditCard, Activity, Settings, Bird } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Businesses", href: "/admin/businesses", icon: Users },
  { label: "Plans", href: "/admin/plans", icon: CreditCard },
  { label: "Usage", href: "/admin/usage", icon: Activity },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="flex h-screen w-[220px] flex-col border-r bg-sidebar-background">
        <div className="flex h-14 items-center gap-2 border-b px-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-destructive text-white">
            <Shield className="h-3.5 w-3.5" />
          </div>
          <div>
            <span className="text-sm font-semibold">WalletCrow</span>
            <p className="text-[10px] text-destructive font-medium">Admin</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-3">
          {nav.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} className={cn("flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors", active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent")}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t p-2">
          <Link href="/dashboard" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-sidebar-accent">
            <Bird className="h-4 w-4" /> Back to App
          </Link>
        </div>
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center justify-between border-b px-6">
          <span className="text-sm font-medium">Super Admin</span>
          <ThemeToggle />
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl px-6 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
