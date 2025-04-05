import { loadStripe } from "@stripe/stripe-js"

// Initialize Stripe with your publishable key
// In production, this would come from environment variables
let stripePromise: Promise<any> | null = null

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")
  }
  return stripePromise
}

export async function createCheckoutSession(planId: string, userId: string, billingInterval: "monthly" | "annually") {
  try {
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        planId,
        userId,
        billingInterval,
      }),
    })

    const { url } = await response.json()

    // Redirect to Stripe Checkout
    window.location.href = url
  } catch (error) {
    console.error("Error creating checkout session:", error)
    throw error
  }
}

export async function createPortalSession(customerId: string) {
  try {
    const response = await fetch("/api/create-portal-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId,
      }),
    })

    const { url } = await response.json()

    // Redirect to Stripe Customer Portal
    window.location.href = url
  } catch (error) {
    console.error("Error creating portal session:", error)
    throw error
  }
}

