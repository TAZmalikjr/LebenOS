"use client";

import React from "react";
import {
  Users,
  Building2,
  DollarSign,
  Activity,
  TrendingUp,
  Brain,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export default function AdminPage() {
  // Demo admin data
  const stats = {
    totalBusinesses: 142,
    activeUsers: 234,
    connectedAccounts: 89,
    monthlyRevenue: 8420,
    aiQueries: 12450,
    activeTrials: 28,
  };

  const recentBusinesses = [
    { name: "Joe's Coffee Shop", plan: "Sparrow", users: 1, createdAt: "2025-01-10" },
    { name: "TechFlow Agency", plan: "Crow Keeper", users: 3, createdAt: "2025-01-09" },
    { name: "Green Gardens Landscaping", plan: "Sparrow", users: 1, createdAt: "2025-01-08" },
    { name: "Metro Plumbing Co", plan: "Crow Keeper", users: 2, createdAt: "2025-01-07" },
    { name: "Bright Ideas Marketing", plan: "The Murder", users: 5, createdAt: "2025-01-06" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Platform Overview</h2>
        <p className="text-muted-foreground mt-1">
          Global stats and management for WalletCrow
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Businesses</p>
              <p className="text-2xl font-bold">{stats.totalBusinesses}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold">{stats.activeUsers}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="h-12 w-12 rounded-lg bg-crow-gold/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-crow-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Monthly Revenue</p>
              <p className="text-2xl font-bold">
                {formatCurrency(stats.monthlyRevenue)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Activity className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Connected Accounts</p>
              <p className="text-2xl font-bold">{stats.connectedAccounts}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="h-12 w-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <Brain className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">AI Queries (30d)</p>
              <p className="text-2xl font-bold">
                {stats.aiQueries.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Trials</p>
              <p className="text-2xl font-bold">{stats.activeTrials}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Businesses */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recently Registered Businesses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentBusinesses.map((biz, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{biz.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {biz.users} user(s) &middot; Joined {biz.createdAt}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={
                    biz.plan === "The Murder"
                      ? "default"
                      : biz.plan === "Crow Keeper"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {biz.plan}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
