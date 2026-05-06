import React from "react";
import Link from "next/link";
import { createServerClient } from "@walletcrow/supabase/server";
import { DOMAINS } from "@walletcrow/config";
import {
  Home, TrendingUp, Scissors, BarChart3, FileText, ShoppingCart,
  Target, Settings, Bird, LogOut, Bell, User, Shield,
} from "lucide-react";

async function getBusinessData() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: businesses } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_id", user.id)
    .limit(1);

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return {
    user,
    profile,
    business: businesses?.[0] || null,
    isSuperAdmin: (process.env.SUPER_ADMIN_EMAILS || "").split(",").includes(user.email || ""),
  };
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const data = await getBusinessData();
  const planSlug = data?.business?.plan_slug || "sparrow";
  const hasPro = planSlug !== "sparrow";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="flex h-screen w-64 flex-col border-r border-border bg-card shrink-0">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Bird className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold">WalletCrow</h1>
            <p className="text-xs text-muted-foreground capitalize">{planSlug.replace("-", " ")} Plan</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          <p className="px-3 mb-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Main</p>
          <NavLink href="/" icon={<Home className="h-5 w-5" />} label="The Nest" />
          <NavLink href="/cashflow" icon={<TrendingUp className="h-5 w-5" />} label="Cashflow Crow" />
          <NavLink href="/expenses" icon={<Scissors className="h-5 w-5" />} label="Expense Crow" locked={!hasPro} />
          <NavLink href="/revenue" icon={<BarChart3 className="h-5 w-5" />} label="Revenue Crow" locked={!hasPro} />

          <p className="px-3 mt-4 mb-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Tools</p>
          <NavLink href="/invoices" icon={<FileText className="h-5 w-5" />} label="Invoices" />
          <NavLink href="/pos" icon={<ShoppingCart className="h-5 w-5" />} label="POS" />
          <NavLink href="/goals" icon={<Target className="h-5 w-5" />} label="Nest Eggs" />
        </nav>

        <div className="border-t border-border px-3 py-4 space-y-1">
          {data?.isSuperAdmin && (
            <NavLink href="/superadmin" icon={<Shield className="h-5 w-5" />} label="Super Admin" />
          )}
          <NavLink href="/settings" icon={<Settings className="h-5 w-5" />} label="Settings" />
          <form action={`${DOMAINS.accounts}/auth/signout`} method="POST">
            <button type="submit" className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
              <LogOut className="h-5 w-5" /><span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6 shrink-0">
          <div className="font-semibold">{data?.business?.name || "My Business"}</div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-md hover:bg-accent">
              <Bell className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-border">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium hidden md:block">
                {data?.profile?.full_name || data?.user?.email}
              </span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

function NavLink({ href, icon, label, locked }: { href: string; icon: React.ReactNode; label: string; locked?: boolean }) {
  return (
    <Link
      href={locked ? "#" : href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-muted-foreground hover:bg-accent hover:text-foreground ${locked ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {icon}
      <span>{label}</span>
      {locked && <span className="ml-auto text-[10px] bg-secondary px-1.5 py-0.5 rounded-full">PRO</span>}
    </Link>
  );
}
