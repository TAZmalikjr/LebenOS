import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  businessName: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name, businessName } = registerSchema.parse(body);

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // Get or create the free plan
    let freePlan = await db.pricingPlan.findUnique({
      where: { slug: "sparrow" },
    });

    if (!freePlan) {
      freePlan = await db.pricingPlan.create({
        data: {
          name: "Sparrow",
          slug: "sparrow",
          price: 0,
          bankConnections: 1,
          transactionsPerMonth: 100,
          invoicesPerMonth: 5,
          posTransactionsPerMonth: 50,
          hasCashflowCrow: true,
          cashflowCrowLevel: "basic",
          hasExpenseCrow: false,
          hasRevenueCrow: false,
          hasTaxCrow: false,
          hasScoutCrow: false,
          hasMultiBusiness: false,
          hasBranding: true,
          supportLevel: "community",
        },
      });
    }

    const user = await db.user.create({
      data: {
        email,
        name,
        passwordHash,
        role: "OWNER",
      },
    });

    const business = await db.business.create({
      data: {
        name: businessName,
        planId: freePlan.id,
        members: {
          create: {
            userId: user.id,
            role: "OWNER",
          },
        },
      },
    });

    return NextResponse.json(
      {
        user: { id: user.id, email: user.email, name: user.name },
        business: { id: business.id, name: business.name },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
