"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bird } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-foreground text-background">
              <Bird className="h-5 w-5" />
            </div>
          </div>
          <CardTitle className="text-lg">Sign in to WalletCrow</CardTitle>
          <p className="text-xs text-muted-foreground">Enter your credentials to continue</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="text-xs font-medium mb-1 block">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@business.com" required className="h-9" />
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">Password</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="h-9" />
            </div>
            <Button type="submit" className="w-full h-9" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <div className="mt-3 text-center text-xs text-muted-foreground">
            No account? <Link href="/register" className="text-foreground hover:underline">Create one</Link>
          </div>
          <div className="mt-2 text-center">
            <Link href="/dashboard" className="text-[10px] text-muted-foreground hover:text-foreground">Skip to demo</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
