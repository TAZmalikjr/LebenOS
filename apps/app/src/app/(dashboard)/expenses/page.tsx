"use client";

import React from "react";
import { Scissors, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@walletcrow/ui";

export default function ExpensesPage() {
  // Feature gating is handled by sidebar, but also check here
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Scissors className="h-6 w-6 text-red-400" /> Expense Crow
        </h2>
        <p className="text-muted-foreground mt-1">Hunting waste and killing unnecessary subscriptions</p>
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardHeader className="p-0"><CardTitle className="text-xl">Upgrade Required</CardTitle></CardHeader>
          <p className="text-muted-foreground mt-2 max-w-md">
            Expense Crow is available on the Crow Keeper plan. Upgrade to unlock subscription auditing, waste detection, and expense spike analysis.
          </p>
          <Button className="mt-6" onClick={() => window.location.href = "/settings"}>View Plans</Button>
        </CardContent>
      </Card>
    </div>
  );
}
