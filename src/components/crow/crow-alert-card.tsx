"use client";

import React from "react";
import { AlertTriangle, Info, AlertOctagon, Bird } from "lucide-react";
import { cn } from "@/lib/utils";
import { CrowAlertData } from "@/types";
import { CROW_PERSONAS } from "@/lib/crows";

interface CrowAlertCardProps {
  alert: CrowAlertData;
  onDismiss?: (id: string) => void;
}

export function CrowAlertCard({ alert, onDismiss }: CrowAlertCardProps) {
  const persona = CROW_PERSONAS[alert.crowType];

  const Icon = {
    INFO: Info,
    WARNING: AlertTriangle,
    DANGER: AlertOctagon,
    CRITICAL: AlertOctagon,
  }[alert.severity];

  return (
    <div className={cn("flex gap-3 rounded-lg border p-3 text-sm", !alert.isRead && "bg-muted/50")}>
      <div className="mt-0.5">
        <Icon className={cn("h-4 w-4",
          alert.severity === "CRITICAL" || alert.severity === "DANGER" ? "text-destructive" :
          alert.severity === "WARNING" ? "text-amber-500" : "text-muted-foreground"
        )} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium">{alert.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{alert.message}</p>
        <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1">
          <Bird className="h-3 w-3" /> {persona.name}
        </span>
      </div>
      {onDismiss && (
        <button onClick={() => onDismiss(alert.id)} className="text-[10px] text-muted-foreground hover:text-foreground self-start">
          Dismiss
        </button>
      )}
    </div>
  );
}
