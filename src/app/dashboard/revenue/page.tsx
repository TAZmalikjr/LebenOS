"use client";

import React from "react";
import { BarChart3, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RevenuePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-green-400" />
          Revenue Crow
        </h2>
        <p className="text-muted-foreground mt-1">
          Growth insights and income trend analysis
        </p>
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardHeader className="p-0">
            <CardTitle className="text-xl">
              Revenue Crow is a Pro Feature
            </CardTitle>
          </CardHeader>
          <p className="text-muted-foreground mt-2 max-w-md">
            Upgrade to the Crow Keeper plan to unlock Revenue Crow. Get insights
            into your top-performing products, customer segments, and growth
            opportunities.
          </p>
          <Button className="mt-6">Upgrade to Crow Keeper</Button>
        </CardContent>
      </Card>
    </div>
  );
}
