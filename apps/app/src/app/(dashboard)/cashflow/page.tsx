"use client";

import React, { useState } from "react";
import { TrendingUp, Send, Bird } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge, formatCurrency } from "@walletcrow/ui";

export default function CashflowPage() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = { role: "user" as const, content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/crow/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crowType: "CASHFLOW", message: userMsg.content, history: messages, businessId: "current" }),
      });
      const data = await res.json();
      if (data.error) {
        setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${data.error}` }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Failed to reach Cashflow Crow. Try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-blue-400" /> Cashflow Crow
        </h2>
        <p className="text-muted-foreground mt-1">Forecasting and early-warning system for your cash position</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Current Balance</p><p className="text-2xl font-bold mt-1">{formatCurrency(0)}</p><Badge variant="secondary" className="mt-2">Connect accounts to see</Badge></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">7-Day Forecast</p><p className="text-2xl font-bold mt-1">--</p><Badge variant="secondary" className="mt-2">Needs data</Badge></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">14-Day Forecast</p><p className="text-2xl font-bold mt-1">--</p><Badge variant="secondary" className="mt-2">Needs data</Badge></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Cash Runway</p><p className="text-2xl font-bold mt-1">-- days</p><Badge variant="secondary" className="mt-2">Needs data</Badge></CardContent></Card>
      </div>

      {/* Chat */}
      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Bird className="h-5 w-5 text-blue-400" /> Talk to Cashflow Crow</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-col h-[400px] border rounded-lg">
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                  <Bird className="h-10 w-10 mb-2 text-blue-400" />
                  <p className="text-sm">Ask Cashflow Crow about your cash position, forecasts, or what-if scenarios</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-lg px-4 py-2.5 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && <div className="flex gap-1 ml-2"><span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" /><span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} /><span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} /></div>}
            </div>
            <div className="flex items-center gap-2 p-4 border-t">
              <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Ask Cashflow Crow..." disabled={isLoading} className="flex-1" />
              <Button onClick={handleSend} disabled={!input.trim() || isLoading} size="icon"><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
