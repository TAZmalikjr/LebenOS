"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bird,
  Home,
  TrendingUp,
  Scissors,
  BarChart3,
  FileText,
  ShoppingCart,
  Target,
  Settings,
  Zap,
  Bell,
  BarChart,
  ChevronLeft,
  ChevronsUpDown,
  Sparkles,
  CreditCard,
  LogOut,
  User,
  Shield,
  Plug,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const mainNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Cashflow", href: "/dashboard/cashflow", icon: TrendingUp },
  { label: "Expenses", href: "/dashboard/expenses", icon: Scissors },
  { label: "Revenue", href: "/dashboard/revenue", icon: BarChart3, badge: "Pro" },
  { label: "Invoices", href: "/dashboard/invoices", icon: FileText },
  { label: "Point of Sale", href: "/dashboard/pos", icon: ShoppingCart },
  { label: "Goals", href: "/dashboard/goals", icon: Target },
  { label: "Reports", href: "/dashboard/reports", icon: BarChart },
];

const secondaryNav: NavItem[] = [
  { label: "Integrations", href: "/dashboard/integrations", icon: Plug },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "relative flex h-screen flex-col border-r bg-sidebar-background text-sidebar-foreground transition-all duration-300 ease-in-out",
          collapsed ? "w-[60px]" : "w-[240px]"
        )}
      >
        {/* Header */}
        <div className={cn("flex h-14 items-center border-b px-3", collapsed ? "justify-center" : "gap-2")}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-foreground text-background">
            <Bird className="h-4 w-4" />
          </div>
          {!collapsed && (
            <span className="text-sm font-semibold tracking-tight">WalletCrow</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className={cn("ml-auto h-7 w-7 shrink-0", collapsed && "ml-0 hidden")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-2">
          <nav className="flex flex-col gap-1 px-2">
            <SectionLabel collapsed={collapsed}>Main</SectionLabel>
            {mainNav.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                isActive={
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname?.startsWith(item.href))
                }
                collapsed={collapsed}
              />
            ))}

            <Separator className="my-2" />
            <SectionLabel collapsed={collapsed}>System</SectionLabel>
            {secondaryNav.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                isActive={pathname === item.href || pathname?.startsWith(item.href)}
                collapsed={collapsed}
              />
            ))}
          </nav>
        </ScrollArea>

        {/* Upgrade Card */}
        {!collapsed && (
          <div className="mx-2 mb-2 rounded-lg border bg-card p-3">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span className="text-xs font-semibold">Upgrade to Pro</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
              Unlock all Crows, unlimited transactions, and advanced forecasting.
            </p>
            <Button size="sm" className="w-full h-7 text-xs">
              Upgrade Plan
            </Button>
          </div>
        )}

        {/* User Menu */}
        <div className="border-t p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "flex w-full items-center gap-2 rounded-md p-2 text-left text-sm hover:bg-sidebar-accent transition-colors",
                  collapsed && "justify-center"
                )}
              >
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="text-[10px] bg-foreground text-background">
                    JD
                  </AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">John Doe</p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        john@demo.com
                      </p>
                    </div>
                    <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  </>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align={collapsed ? "center" : "end"}
              side="top"
              className="w-56"
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@demo.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Sparkles className="mr-2 h-4 w-4 text-amber-500" />
                  Upgrade to Pro
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Shield className="mr-2 h-4 w-4" />
                Admin Panel
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Collapse toggle for collapsed state */}
        {collapsed && (
          <div className="absolute -right-3 top-16">
            <Button
              variant="outline"
              size="icon"
              onClick={onToggle}
              className="h-6 w-6 rounded-full border bg-background shadow-sm"
            >
              <ChevronLeft className="h-3 w-3 rotate-180" />
            </Button>
          </div>
        )}
      </aside>
    </TooltipProvider>
  );
}

function SectionLabel({ collapsed, children }: { collapsed: boolean; children: React.ReactNode }) {
  if (collapsed) return null;
  return (
    <span className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
      {children}
    </span>
  );
}

function NavLink({
  item,
  isActive,
  collapsed,
}: {
  item: NavItem;
  isActive: boolean;
  collapsed: boolean;
}) {
  const Icon = item.icon;

  const link = (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        collapsed && "justify-center px-0"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed && (
        <>
          <span className="flex-1">{item.label}</span>
          {item.badge && (
            <span className="rounded bg-foreground/10 px-1.5 py-0.5 text-[10px] font-semibold">
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-2">
          {item.label}
          {item.badge && (
            <span className="rounded bg-muted px-1.5 py-0.5 text-[10px]">
              {item.badge}
            </span>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }

  return link;
}
