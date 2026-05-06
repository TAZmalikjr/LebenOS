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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/crow/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crowType,
          message: userMessage.content,
          history: messages,
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.content || "I'm having trouble processing that right now. Please try again.",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-lg bg-card">
      {/* Chat Header */}
      <div className={cn("flex items-center gap-3 px-4 py-3 border-b", persona.bgColor)}>
        <div className={cn("h-8 w-8 rounded-full flex items-center justify-center bg-card", persona.color)}>
          <Bird className="h-4 w-4" />
        </div>
        <div>
          <p className={cn("text-sm font-semibold", persona.color)}>
            {persona.name}
          </p>
          <p className="text-xs text-muted-foreground">{persona.role}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Bird className={cn("h-12 w-12 mb-3", persona.color)} />
            <p className="text-sm text-muted-foreground">
              Start a conversation with {persona.name}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Ask about {persona.role.toLowerCase()}
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "flex gap-3",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {msg.role === "assistant" && (
              <div className={cn("h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0", persona.bgColor)}>
                <Bird className={cn("h-4 w-4", persona.color)} />
              </div>
            )}
            <div
              className={cn(
                "max-w-[80%] rounded-lg px-4 py-2.5 text-sm",
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground"
              )}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className={cn("h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0", persona.bgColor)}>
              <Bird className={cn("h-4 w-4 animate-pulse", persona.color)} />
            </div>
            <div className="bg-secondary rounded-lg px-4 py-2.5">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-4 border-t">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={`Ask ${persona.name}...`}
          disabled={isLoading}
          className="flex-1"
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
