import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WalletCrow - Your Wallet's Smartest Flock",
  description: "AI-powered financial command center where specialized Crows guard, predict, and grow your business money. Not accounting software - your proactive financial ally.",
  keywords: ["AI finance", "small business", "cash flow", "expense tracking", "financial AI", "business intelligence"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
