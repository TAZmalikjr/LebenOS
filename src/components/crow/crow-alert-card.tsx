"use client";

import React from "react";
import { AlertTriangle, Info, AlertOctagon, Bird } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CrowAlertData } from "@/types";
import { CROW_PERSONAS } from "@/lib/crows";

interface CrowAlertCardProps {
  alert: CrowAlertData;
  onDismiss?: (id: string) => void;
}

export function CrowAlertCard({ alert, onDismiss }: CrowAlertCardProps) {
  const persona = CROW_PERSONAS[alert.crowType];

  const severityIcon = {
    INFO: <Info className="h-4 w-4" />,
    WARNING: <AlertTriangle className="h-4 w-4" />,
    DANGER: <AlertOctagon className="h-4 w-4" />,
    CRITICAL: <AlertOctagon className="h-4 w-4" />,
  };

  const severityVariant = {
    INFO: "secondary" as const,
    WARNING: "warning" as const,
    DANGER: "danger" as const,
    CRITICAL: "destructive" as const,
  };

  return (
    <Card
      className={cn(
        "transition-all hover:shadow-md",
        alert.severity === "CRITICAL" && "border-crow-danger animate-crow-ruffle",
        alert.severity === "DANGER" && "border-crow-danger/50",
        alert.severity === "WARNING" && "border-crow-warning/50",
        !alert.isRead && "border-l-4"
      )}
    >
      <CardContent className="flex items-start gap-3 p-4">
        <div className={cn("h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0", persona.bgColor)}>
          <Bird className={cn("h-4 w-4", persona.color)} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn("text-xs font-medium", persona.color)}>
              {persona.name}
            </span>
            <Badge variant={severityVariant[alert.severity]}>
              {severityIcon[alert.severity]}
              <span className="ml-1">{alert.severity}</span>
            </Badge>
          </div>
          <p className="text-sm font-medium text-foreground">{alert.title}</p>
          <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
        </div>

        {onDismiss && (
          <button
            onClick={() => onDismiss(alert.id)}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Dismiss
          </button>
        )}
      </CardContent>
    </Card>
  );
}
