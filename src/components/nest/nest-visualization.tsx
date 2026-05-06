"use client";

import React from "react";
import { cn, formatCurrency } from "@/lib/utils";
import { NestHealth } from "@/types";
import {
  TrendingUp,
  Scissors,
  BarChart3,
  FileText,
  Search,
} from "lucide-react";

interface NestVisualizationProps {
  totalBalance: number;
  health: NestHealth;
  currency?: string;
  crowStatuses?: {
    cashflow: "calm" | "alert" | "danger";
    expense: "calm" | "alert" | "danger";
    revenue: "calm" | "alert" | "danger";
    tax: "calm" | "alert" | "danger";
    scout: "calm" | "alert" | "danger";
  };
}

const crowPositions = [
  { angle: -60, icon: TrendingUp, label: "Cashflow", key: "cashflow" },
  { angle: -20, icon: Scissors, label: "Expense", key: "expense" },
  { angle: 20, icon: BarChart3, label: "Revenue", key: "revenue" },
  { angle: 60, icon: FileText, label: "Tax", key: "tax" },
  { angle: 100, icon: Search, label: "Scout", key: "scout" },
];

export function NestVisualization({
  totalBalance,
  health,
  currency = "USD",
  crowStatuses = {
    cashflow: "calm",
    expense: "calm",
    revenue: "calm",
    tax: "calm",
    scout: "calm",
  },
}: NestVisualizationProps) {
  const nestColorClass =
    health === "healthy"
      ? "nest-healthy border-crow-gold/30"
      : health === "caution"
        ? "nest-caution border-crow-warning/30"
        : "nest-danger border-crow-danger/30";

  const nestBg =
    health === "healthy"
      ? "bg-gradient-to-br from-crow-gold/5 to-crow-gold/10"
      : health === "caution"
        ? "bg-gradient-to-br from-crow-warning/5 to-crow-warning/10"
        : "bg-gradient-to-br from-crow-danger/5 to-crow-danger/10";

  return (
    <div className="relative flex flex-col items-center justify-center py-8">
      {/* The Nest */}
      <div
        className={cn(
          "relative flex flex-col items-center justify-center rounded-full border-2 w-64 h-64",
          nestColorClass,
          nestBg
        )}
      >
        <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
        <p className="text-3xl font-bold text-foreground">
          {formatCurrency(totalBalance, currency)}
        </p>
        <p className="text-xs text-muted-foreground mt-1 capitalize">
          Nest is {health}
        </p>

        {/* Crow Icons around the nest */}
        {crowPositions.map((crow) => {
          const status =
            crowStatuses[crow.key as keyof typeof crowStatuses] || "calm";
          const Icon = crow.icon;
          const radius = 150;
          const angleRad = (crow.angle * Math.PI) / 180;
          const x = Math.cos(angleRad) * radius;
          const y = Math.sin(angleRad) * radius;

          return (
            <div
              key={crow.key}
              className={cn(
                "absolute flex flex-col items-center gap-1",
                status === "danger" && "animate-crow-ruffle"
              )}
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center border",
                  status === "calm" &&
                    "bg-secondary border-border text-muted-foreground",
                  status === "alert" &&
                    "bg-crow-warning/20 border-crow-warning text-crow-warning",
                  status === "danger" &&
                    "bg-crow-danger/20 border-crow-danger text-crow-danger"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] text-muted-foreground font-medium">
                {crow.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
