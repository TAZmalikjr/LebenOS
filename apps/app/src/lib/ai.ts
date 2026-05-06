import type { CrowType } from "@walletcrow/types";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

const CROW_PROMPTS: Record<CrowType, { name: string; personality: string; format: string }> = {
  CASHFLOW: {
    name: "Cashflow Crow",
    personality: "Calm, serious, always looking forward. Speaks in measured tones with a focus on what lies ahead.",
    format: "Return structured forecasts with warnings first. Include current cash position, projected balances, immediate risks, and recommended actions.",
  },
  EXPENSE: {
    name: "Expense Crow",
    personality: "Sharp-eyed, slightly grumpy, obsessed with efficiency. Finds waste everywhere.",
    format: "Lead with waste findings and savings opportunities. Include flagged items with amounts, estimated savings, and specific actions to take.",
  },
  REVENUE: {
    name: "Revenue Crow",
    personality: "Cheerful, energetic, data-narrative driven. Always looking for growth opportunities.",
    format: "Lead with positive trends and growth opportunities. Include revenue highlights, top performers, and actionable growth suggestions.",
  },
  TAX: {
    name: "Tax Crow",
    personality: "Precise, tidy, slightly obsessive about collecting shiny things for tax season.",
    format: "Be precise and organized. Include estimated tax obligations, categorized deductible expenses, and upcoming deadlines.",
  },
  SCOUT: {
    name: "Scout Crow",
    personality: "Curious, well-traveled, brings back shiny objects of information.",
    format: "Return bullet-pointed findings with source references. Include key findings, benchmark data, and external factors to monitor.",
  },
};

export async function queryCrow(
  crowType: CrowType,
  userMessage: string,
  businessContext: { name: string; industry?: string; currency: string },
  history: ChatMessage[] = []
): Promise<string> {
  const crow = CROW_PROMPTS[crowType];
  const systemPrompt = `You are ${crow.name}, an AI financial assistant in WalletCrow.
Personality: ${crow.personality}
Business: ${businessContext.name} (${businessContext.industry || "General"}, ${businessContext.currency})
Response Format: ${crow.format}
Rules: Stay in character. Only discuss financial topics. Be proactive with insights.`;

  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...history,
    { role: "user", content: userMessage },
  ];

  const apiKey = process.env.DEEPSEEK_API_KEY;
  const baseUrl = process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com/v1";

  if (!apiKey) {
    return getMockResponse(crowType);
  }

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "deepseek-chat", messages, temperature: 0.7, max_tokens: 1500 }),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("AI query failed:", error);
    return getMockResponse(crowType);
  }
}

function getMockResponse(crowType: CrowType): string {
  const responses: Record<CrowType, string> = {
    CASHFLOW: "## Cash Position\n\n**Current Balance:** Analyzing...\n\n### 7-Day Forecast\n- Reviewing pending invoices and recurring bills\n- Cash runway calculation in progress\n\n### Recommendations\n- Chase any overdue invoices immediately\n- Review upcoming recurring expenses\n\n*Add more transactions for personalized forecasting.*",
    EXPENSE: "## Expense Analysis\n\nScanning your transactions for waste and optimization.\n\n### Quick Findings\n- Add transactions so I can identify patterns\n- I will flag duplicates, unused subscriptions, and spikes\n\n*The more data I have, the more savings I can find.*",
    REVENUE: "## Revenue Insights\n\nLooking at your income trends.\n\n### Overview\n- Add sales data through POS or invoicing\n- I will identify top-performing products and services\n\n*Feed me data and I will find your growth levers!*",
    TAX: "## Tax Preparation\n\nOrganizing your financial data for tax readiness.\n\n### Recommended Actions\n- Categorize expenses for deduction tracking\n- Set aside funds in your Tax Nest\n\n*The more organized now, the smoother tax season.*",
    SCOUT: "## External Intelligence\n\nScanning for opportunities relevant to your business.\n\n### What I Watch\n- Government grants and incentives\n- Industry benchmarks and market trends\n\n*Complete your business profile for tailored research.*",
  };
  return responses[crowType];
}
