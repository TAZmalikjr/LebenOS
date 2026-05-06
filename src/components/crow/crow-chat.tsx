"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bird } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CrowType } from "@/types";
import { CROW_PERSONAS } from "@/lib/crows";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface CrowChatProps {
  crowType: CrowType;
  initialMessages?: Message[];
}

export function CrowChat({ crowType, initialMessages = [] }: CrowChatProps) {
  const persona = CROW_PERSONAS[crowType];
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || isLoading) return;
    const msg: Message = { role: "user", content: input.trim(), timestamp: new Date().toISOString() };
    setMessages((p) => [...p, msg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/crow/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crowType, message: msg.content, history: messages }),
      });
      const data = await res.json();
      setMessages((p) => [...p, { role: "assistant", content: data.content || "Try again.", timestamp: new Date().toISOString() }]);
    } catch {
      setMessages((p) => [...p, { role: "assistant", content: "Something went wrong. Please try again.", timestamp: new Date().toISOString() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[400px] rounded-lg border bg-muted/30">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Bird className="h-8 w-8 text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">Ask {persona.name} anything</p>
            <p className="text-xs text-muted-foreground mt-0.5">{persona.role}</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={cn("flex gap-2", m.role === "user" ? "justify-end" : "justify-start")}>
            {m.role === "assistant" && (
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary">
                <Bird className="h-3 w-3" />
              </div>
            )}
            <div className={cn("max-w-[80%] rounded-lg px-3 py-2 text-sm", m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary")}>
              <p className="whitespace-pre-wrap text-xs leading-relaxed">{m.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary">
              <Bird className="h-3 w-3 animate-pulse" />
            </div>
            <div className="bg-secondary rounded-lg px-3 py-2">
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div className="flex items-center gap-2 p-3 border-t">
        <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder={`Ask ${persona.name}...`} disabled={isLoading} className="h-8 text-xs" />
        <Button onClick={send} disabled={!input.trim() || isLoading} size="icon" className="h-8 w-8 shrink-0">
          <Send className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
