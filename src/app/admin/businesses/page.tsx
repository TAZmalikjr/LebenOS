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
    { id: "1", name: "Joe's Coffee Shop", plan: "Sparrow", users: 1, balance: 4200, status: "active", industry: "Food & Beverage" },
    { id: "2", name: "TechFlow Agency", plan: "Crow Keeper", users: 3, balance: 24500, status: "active", industry: "Technology" },
    { id: "3", name: "Green Gardens Landscaping", plan: "Sparrow", users: 1, balance: 8900, status: "active", industry: "Services" },
    { id: "4", name: "Metro Plumbing Co", plan: "Crow Keeper", users: 2, balance: 15200, status: "active", industry: "Services" },
    { id: "5", name: "Bright Ideas Marketing", plan: "The Murder", users: 5, balance: 62000, status: "active", industry: "Marketing" },
    { id: "6", name: "Sunset Boutique", plan: "Sparrow", users: 1, balance: 3100, status: "inactive", industry: "Retail" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Building2 className="h-6 w-6" />
          Business Management
        </h2>
        <p className="text-muted-foreground mt-1">
          View, search, and manage all registered businesses
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search businesses..." className="pl-10" />
        </div>
        <Button variant="outline">Export CSV</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            All Businesses ({businesses.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Business</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Industry</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Plan</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Users</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Balance</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {businesses.map((biz) => (
                  <tr key={biz.id} className="border-b border-border last:border-0 hover:bg-accent/50">
                    <td className="py-3 px-4 font-medium">{biz.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{biz.industry}</td>
                    <td className="py-3 px-4">
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
                    </td>
                    <td className="py-3 px-4">{biz.users}</td>
                    <td className="py-3 px-4">{formatCurrency(biz.balance)}</td>
                    <td className="py-3 px-4">
                      <Badge variant={biz.status === "active" ? "success" : "secondary"}>
                        {biz.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" title="Impersonate">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="More">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
