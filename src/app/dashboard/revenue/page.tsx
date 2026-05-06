"use client";

import React from "react";
import { BarChart3, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RevenuePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Revenue</h1>
        <p className="text-sm text-muted-foreground">Growth insights and income analysis</p>
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
            <Lock className="h-5 w-5 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">Revenue Crow is a Pro feature</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            Upgrade to Crow Keeper to unlock revenue analysis, top-performing product insights, and growth recommendations.
          </p>
          <Button className="mt-4" size="sm">Upgrade to Crow Keeper</Button>
        </CardContent>
      </Card>
    </div>
  );
}
