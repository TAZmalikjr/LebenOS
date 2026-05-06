import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        crow: {
          gold: "#D4A017",
          dark: "#1A1A2E",
          nest: "#2D2D44",
          danger: "#E74C3C",
          success: "#2ECC71",
          warning: "#F39C12",
          info: "#3498DB",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "crow-ruffle": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-3deg)" },
          "75%": { transform: "rotate(3deg)" },
        },
        "nest-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 160, 23, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(212, 160, 23, 0.6)" },
        },
        "nest-danger": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(231, 76, 60, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(231, 76, 60, 0.6)" },
        },
      },
      animation: {
        "crow-ruffle": "crow-ruffle 0.5s ease-in-out infinite",
        "nest-glow": "nest-glow 3s ease-in-out infinite",
        "nest-danger": "nest-danger 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
