import { NextRequest, NextResponse } from "next/server";
import { queryCrow } from "@/lib/ai";
import { CrowType } from "@/types";
import { z } from "zod";

const chatSchema = z.object({
  crowType: z.enum(["CASHFLOW", "EXPENSE", "REVENUE", "TAX", "SCOUT"]),
  message: z.string().min(1),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
        timestamp: z.string(),
      })
    )
    .optional()
    .default([]),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { crowType, message, history } = chatSchema.parse(body);

    // In a real app, fetch business context from the database using the session
    const businessContext = {
      name: "Demo Business",
      industry: "Technology",
      size: "1-10",
      location: "Atlanta, GA",
      currency: "USD",
    };

    const conversationHistory = history.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    }));

    const response = await queryCrow(
      crowType as CrowType,
      message,
      businessContext,
      conversationHistory
    );

    return NextResponse.json({
      content: response.content,
      usage: response.usage,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Crow chat error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
