"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Bird, Loader2 } from "lucide-react";
import { Button, Card, CardContent, Input, Label, Separator } from "@walletcrow/ui";
import { createBrowserClient } from "@walletcrow/supabase/client";
import { DOMAINS } from "@walletcrow/config";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect_to") || `${DOMAINS.app}/`;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const supabase = createBrowserClient();

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${DOMAINS.accounts}/auth/callback?redirect_to=${encodeURIComponent(redirectTo)}`,
        },
      });
      if (error) setError(error.message);
    } catch {
      setError("Failed to sign up with Google");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${DOMAINS.accounts}/auth/callback?redirect_to=${encodeURIComponent(redirectTo)}`,
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-14 w-14 rounded-xl bg-crow-success/20 flex items-center justify-center">
                <Bird className="h-8 w-8 text-crow-success" />
              </div>
            </div>
            <h2 className="text-xl font-bold">Check your email</h2>
            <p className="text-sm text-muted-foreground">
              We sent a confirmation link to <strong>{email}</strong>. Click the link to activate your WalletCrow account.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary mb-4">
            <Bird className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-1">Start guarding your business finances</p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button variant="outline" className="w-full h-11" onClick={handleGoogleSignUp} disabled={isGoogleLoading}>
              {isGoogleLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : (
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              )}
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><Separator /></div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <form onSubmit={handleEmailSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jane Smith" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@business.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 8 characters" required minLength={8} />
              </div>
              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Create Account
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href={`/login${redirectTo !== `${DOMAINS.app}/` ? `?redirect_to=${encodeURIComponent(redirectTo)}` : ""}`} className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
