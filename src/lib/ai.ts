import { CrowType } from "@/types";
import { buildCrowSystemPrompt } from "@/lib/crows";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface AIResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
  };
}

export async function queryCrow(
  crowType: CrowType,
  userMessage: string,
  businessContext: {
    name: string;
    industry?: string;
    size?: string;
    location?: string;
    currency: string;
  },
  conversationHistory: ChatMessage[] = [],
  financialContext?: string
): Promise<AIResponse> {
  const systemPrompt = buildCrowSystemPrompt(crowType, businessContext);

  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
  ];

  if (financialContext) {
    messages.push({
      role: "system",
      content: `## Current Financial Data\n${financialContext}`,
    });
  }

  messages.push(...conversationHistory);
  messages.push({ role: "user", content: userMessage });

  const apiKey = process.env.DEEPSEEK_API_KEY;
  const baseUrl = process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com/v1";

  if (!apiKey) {
    // Return a mock response when no API key is configured
    return {
      content: getMockResponse(crowType, userMessage),
    };
  }

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      content: data.choices[0].message.content,
      usage: {
        promptTokens: data.usage?.prompt_tokens ?? 0,
        completionTokens: data.usage?.completion_tokens ?? 0,
      },
    };
  } catch (error) {
    console.error("AI query failed:", error);
    return {
      content: getMockResponse(crowType, userMessage),
    };
  }
}

function getMockResponse(crowType: CrowType, _userMessage: string): string {
  switch (crowType) {
    case "CASHFLOW":
      return `## Cash Position Overview

**Current Balance:** Analyzing your accounts...

### 7-Day Forecast
- Projected inflows: Based on pending invoices
- Projected outflows: Based on recurring expenses
- Net position: Calculating...

### Alerts
- Review your upcoming bills to ensure coverage
- Consider chasing any overdue invoices

*Connect your bank accounts and add transactions for personalized forecasting.*`;

    case "EXPENSE":
      return `## Expense Analysis

I'm scanning your transactions for waste and optimization opportunities.

### Quick Findings
- Add more transactions so I can identify patterns
- I'll flag duplicate charges, unused subscriptions, and unusual spikes

### Recommendations
- Start categorizing your expenses for better insights
- Link your bank accounts for automatic tracking

*The more data I have, the more savings I can find.*`;

    case "REVENUE":
      return `## Revenue Insights

I'm looking at your income trends and growth opportunities.

### Overview
- Add sales data through the POS or invoicing modules
- I'll identify your top-performing products and services

### Growth Tips
- Track all revenue sources for comprehensive analysis
- I'll suggest upsell opportunities once I see patterns

*Feed me data and I'll find your growth levers!*`;

    case "TAX":
      return `## Tax Preparation Status

I'm organizing your financial data for tax readiness.

### Current Status
- Categorize your expenses for deduction tracking
- I'll estimate your tax obligations as data comes in

### Recommended Actions
- Keep receipts for all business expenses
- Set aside funds in your Tax Nest for upcoming obligations

*The more organized we are now, the smoother tax season will be.*`;

    case "SCOUT":
      return `## External Intelligence

I'm scanning for opportunities and insights relevant to your business.

### What I'm Watching
- Government grants and incentives
- Industry benchmarks
- Market trends

### Getting Started
- Complete your business profile (industry, location, size)
- I'll tailor my research to your specific situation

*Tell me more about your business and I'll bring back the shiniest findings!*`;
  }
}
