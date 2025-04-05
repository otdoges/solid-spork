import { NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with your secret key
// In production, this would come from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
  try {
    const { planId, userId, billingInterval } = await req.json()

    // Define your product price IDs
    // In a real application, these would be stored in a database or environment variables
    const prices = {
      starter: {
        monthly: "price_starter_monthly",
        annually: "price_starter_annually",
      },
      professional: {
        monthly: "price_professional_monthly",
        annually: "price_professional_annually",
      },
      enterprise: {
        monthly: "price_enterprise_monthly",
        annually: "price_enterprise_annually",
      },
    }

    // Get the correct price ID based on the plan and billing interval
    const priceId = prices[planId as keyof typeof prices]?.[billingInterval as "monthly" | "annually"]

    if (!priceId) {
      return NextResponse.json({ error: "Invalid plan or billing interval" }, { status: 400 })
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/account/billing?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        userId,
        planId,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

