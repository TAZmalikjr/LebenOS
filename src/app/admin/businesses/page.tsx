"use client";

import React from "react";
import { Building2, Search, Eye, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export default function AdminBusinessesPage() {
  const businesses = [
    { id: "1", name: "Joe's Coffee Shop", plan: "Sparrow", users: 1, balance: 4200, status: "active", industry: "Food" },
    { id: "2", name: "TechFlow Agency", plan: "Crow Keeper", users: 3, balance: 24500, status: "active", industry: "Tech" },
    { id: "3", name: "Green Gardens", plan: "Sparrow", users: 1, balance: 8900, status: "active", industry: "Services" },
    { id: "4", name: "Metro Plumbing", plan: "Crow Keeper", users: 2, balance: 15200, status: "active", industry: "Services" },
    { id: "5", name: "Bright Ideas Marketing", plan: "The Murder", users: 5, balance: 62000, status: "active", industry: "Marketing" },
    { id: "6", name: "Sunset Boutique", plan: "Sparrow", users: 1, balance: 3100, status: "inactive", industry: "Retail" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Businesses</h1>
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Search businesses..." className="pl-8 h-9" />
        </div>
        <Button variant="outline" size="sm">Export</Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Business</th>
                <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Plan</th>
                <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Users</th>
                <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Balance</th>
                <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Status</th>
                <th className="text-right py-3 px-4 text-xs text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {businesses.map((b) => (
                <tr key={b.id} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="py-3 px-4">
                    <p className="font-medium">{b.name}</p>
                    <p className="text-xs text-muted-foreground">{b.industry}</p>
                  </td>
                  <td className="py-3 px-4"><Badge variant="secondary" className="text-[10px]">{b.plan}</Badge></td>
                  <td className="py-3 px-4">{b.users}</td>
                  <td className="py-3 px-4">{formatCurrency(b.balance)}</td>
                  <td className="py-3 px-4">
                    <Badge variant={b.status === "active" ? "default" : "secondary"} className="text-[10px]">{b.status}</Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
