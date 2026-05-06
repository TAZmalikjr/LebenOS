"use client";

import React, { useState } from "react";
import { Target, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";

export default function GoalsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const goals = [
    { id: "1", name: "Delivery Van", target: 15000, current: 8750, deadline: "Jun 2025" },
    { id: "2", name: "Emergency Fund", target: 10000, current: 6200, deadline: null },
    { id: "3", name: "New Equipment", target: 5000, current: 1200, deadline: "Mar 2025" },
    { id: "4", name: "Marketing Campaign", target: 3000, current: 3000, deadline: "Feb 2025" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Goals</h1>
          <p className="text-sm text-muted-foreground">Track your financial targets</p>
        </div>
        <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="mr-2 h-3.5 w-3.5" /> New Goal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Goal</DialogTitle>
              <DialogDescription>Set a new savings target.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-4">
              <div><label className="text-xs font-medium mb-1 block">Name</label><Input placeholder="e.g., Delivery van" className="h-9" /></div>
              <div><label className="text-xs font-medium mb-1 block">Target Amount</label><Input type="number" placeholder="15000" className="h-9" /></div>
              <div><label className="text-xs font-medium mb-1 block">Deadline (optional)</label><Input type="date" className="h-9" /></div>
            </div>
            <DialogFooter>
              <Button variant="outline" size="sm" onClick={() => setShowCreate(false)}>Cancel</Button>
              <Button size="sm" onClick={() => setShowCreate(false)}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {goals.map((goal) => {
          const pct = Math.round((goal.current / goal.target) * 100);
          const done = pct >= 100;
          return (
            <Card key={goal.id}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Target className={`h-4 w-4 ${done ? "text-amber-500" : "text-muted-foreground"}`} />
                    <span className="text-sm font-medium">{goal.name}</span>
                  </div>
                  {done && <span className="text-xs font-medium text-amber-600 dark:text-amber-400">Reached!</span>}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">{formatCurrency(goal.current)} of {formatCurrency(goal.target)}</span>
                  <span className="text-xs font-medium">{pct}%</span>
                </div>
                <Progress value={Math.min(pct, 100)} className="h-1.5" />
                {goal.deadline && <p className="text-xs text-muted-foreground mt-2">Target: {goal.deadline}</p>}
                {!done && (
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="h-7 text-xs flex-1">Add Funds</Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">Edit</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
