"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bird, Loader2, ArrowLeft } from "lucide-react";
import { Button, Card, CardContent, Input, Label } from "@walletcrow/ui";
import { createBrowserClient } from "@walletcrow/supabase/client";
import { DOMAINS } from "@walletcrow/config";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createBrowserClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${DOMAINS.accounts}/auth/callback?redirect_to=${encodeURIComponent(`${DOMAINS.app}/settings`)}`,
      });
      if (error) setError(error.message);
      else setSent(true);
    } catch {
      setError("Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary mb-4">
            <Bird className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Reset password</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {sent ? "Check your email for a reset link" : "Enter your email to receive a reset link"}
          </p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">{error}</div>
            )}
            {!sent ? (
              <form onSubmit={handleReset} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@business.com" required autoFocus />
                </div>
                <Button type="submit" className="w-full h-11" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  Send Reset Link
                </Button>
              </form>
            ) : (
              <div className="text-center text-sm text-muted-foreground py-4">
                If an account exists for <strong>{email}</strong>, you will receive a password reset email shortly.
              </div>
            )}
          </CardContent>
        </Card>

        <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to sign in
        </Link>
      </div>
    </div>
  );
}
