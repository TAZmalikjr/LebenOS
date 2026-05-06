import type { Config } from "tailwindcss";
import sharedConfig from "@walletcrow/config/tailwind";

const config: Config = {
  ...sharedConfig,
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
} as Config;

export default config;
