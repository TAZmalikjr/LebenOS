import Stripe from "stripe";
import { createServerClient } from "@walletcrow/supabase/server";
import { STRIPE_PRICES } from "@walletcrow/config";
import type { PlanSlug } from "@walletcrow/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia" as Stripe.LatestApiVersion,
});

export async function createCheckoutSession(
  businessId: string,
  userId: string,
  planSlug: PlanSlug,
  returnUrl: string
): Promise<string | null> {
  const supabase = await createServerClient();

  // Get or create Stripe customer
  const { data: business } = await supabase
    .from("businesses")
    .select("stripe_customer_id, name")
    .eq("id", businessId)
    .single();

  let customerId = business?.stripe_customer_id;

  if (!customerId) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("email")
      .eq("id", userId)
      .single();

    const customer = await stripe.customers.create({
      email: profile?.email,
      metadata: { business_id: businessId, user_id: userId },
    });

    customerId = customer.id;

    await supabase
      .from("businesses")
      .update({ stripe_customer_id: customerId })
      .eq("id", businessId);
  }

  const priceId = STRIPE_PRICES[planSlug as keyof typeof STRIPE_PRICES];
  if (!priceId) return null;

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}&success=true`,
    cancel_url: `${returnUrl}?canceled=true`,
    metadata: { business_id: businessId, plan_slug: planSlug },
  });

  return session.url;
}

export async function createPortalSession(
  businessId: string,
  returnUrl: string
): Promise<string | null> {
  const supabase = await createServerClient();

  const { data: business } = await supabase
    .from("businesses")
    .select("stripe_customer_id")
    .eq("id", businessId)
    .single();

  if (!business?.stripe_customer_id) return null;

  const session = await stripe.billingPortal.sessions.create({
    customer: business.stripe_customer_id,
    return_url: returnUrl,
  });

  return session.url;
}

export async function handleWebhookEvent(event: Stripe.Event): Promise<void> {
  const supabase = await createServerClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const businessId = session.metadata?.business_id;
      const planSlug = session.metadata?.plan_slug;

      if (businessId && planSlug) {
        await supabase
          .from("businesses")
          .update({
            plan_slug: planSlug,
            stripe_subscription_id: session.subscription as string,
          })
          .eq("id", businessId);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await supabase
        .from("businesses")
        .update({ plan_slug: "sparrow", stripe_subscription_id: null })
        .eq("stripe_subscription_id", subscription.id);
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      if (subscription.status === "canceled" || subscription.status === "unpaid") {
        await supabase
          .from("businesses")
          .update({ plan_slug: "sparrow" })
          .eq("stripe_subscription_id", subscription.id);
      }
      break;
    }
  }
}
