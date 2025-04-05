import { NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with your secret key
// In production, this would come from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
  try {
    const { customerId } = await req.json()

    // Create a billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/account/billing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("Error creating portal session:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

