"use client";

import React, { useState } from "react";
import { Target, Plus, Egg } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";

interface NestEgg {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string | null;
}

export default function GoalsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [goalTarget, setGoalTarget] = useState("");
  const [goalDeadline, setGoalDeadline] = useState("");

  const [goals] = useState<NestEgg[]>([
    {
      id: "1",
      name: "Delivery Van",
      targetAmount: 15000,
      currentAmount: 8750,
      deadline: "2025-06-30",
    },
    {
      id: "2",
      name: "Emergency Fund",
      targetAmount: 10000,
      currentAmount: 6200,
      deadline: null,
    },
    {
      id: "3",
      name: "New Equipment",
      targetAmount: 5000,
      currentAmount: 1200,
      deadline: "2025-03-15",
    },
    {
      id: "4",
      name: "Marketing Campaign",
      targetAmount: 3000,
      currentAmount: 3000,
      deadline: "2025-02-01",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            Nest Eggs
          </h2>
          <p className="text-muted-foreground mt-1">
            Set financial goals and watch your golden eggs grow
          </p>
        </div>
        <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a Nest Egg</DialogTitle>
              <DialogDescription>
                Set a new savings goal for your business.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Goal Name
                </label>
                <Input
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  placeholder="e.g., New delivery van"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Target Amount
                </label>
                <Input
                  type="number"
                  value={goalTarget}
                  onChange={(e) => setGoalTarget(e.target.value)}
                  placeholder="15000"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Target Date (optional)
                </label>
                <Input
                  type="date"
                  value={goalDeadline}
                  onChange={(e) => setGoalDeadline(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreate(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowCreate(false)}>Create Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = Math.round(
            (goal.currentAmount / goal.targetAmount) * 100
          );
          const isComplete = progress >= 100;

          return (
            <Card
              key={goal.id}
              className={isComplete ? "border-crow-gold/30" : ""}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold">
                  {goal.name}
                </CardTitle>
                <Egg
                  className={`h-6 w-6 ${
                    isComplete ? "text-crow-gold" : "text-muted-foreground"
                  }`}
                />
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(goal.currentAmount)} of{" "}
                      {formatCurrency(goal.targetAmount)}
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        isComplete ? "text-crow-gold" : "text-foreground"
                      }`}
                    >
                      {progress}%
                    </span>
                  </div>
                  <Progress
                    value={Math.min(progress, 100)}
                    className={isComplete ? "[&>div]:bg-crow-gold" : ""}
                  />
                </div>

                {goal.deadline && (
                  <p className="text-xs text-muted-foreground">
                    Target date: {goal.deadline}
                  </p>
                )}

                {isComplete ? (
                  <div className="bg-crow-gold/10 rounded-lg p-3 text-center">
                    <p className="text-sm font-semibold text-crow-gold">
                      Goal reached!
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Add Funds
                    </Button>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
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
