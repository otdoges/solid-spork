import { NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with your secret key
// In production, this would come from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature") as string

  let event: Stripe.Event

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || "")
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSession = event.data.object as Stripe.Checkout.Session
      // Handle successful checkout
      await handleSuccessfulCheckout(checkoutSession)
      break
    case "invoice.paid":
      const invoice = event.data.object as Stripe.Invoice
      // Handle successful payment
      await handleSuccessfulPayment(invoice)
      break
    case "invoice.payment_failed":
      const failedInvoice = event.data.object as Stripe.Invoice
      // Handle failed payment
      await handleFailedPayment(failedInvoice)
      break
    case "customer.subscription.updated":
      const subscription = event.data.object as Stripe.Subscription
      // Handle subscription updates (upgrades, downgrades)
      await handleSubscriptionUpdate(subscription)
      break
    case "customer.subscription.deleted":
      const cancelledSubscription = event.data.object as Stripe.Subscription
      // Handle subscription cancellation
      await handleSubscriptionCancellation(cancelledSubscription)
      break
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

// Helper functions to handle different webhook events
async function handleSuccessfulCheckout(session: Stripe.Checkout.Session) {
  // In a real application, you would:
  // 1. Retrieve the customer information
  // 2. Create or update the user account
  // 3. Provision access to the appropriate plan
  console.log("Processing successful checkout:", session.id)

  // Example implementation:
  // const customer = await stripe.customers.retrieve(session.customer as string);
  // await db.user.update({
  //   where: { email: customer.email },
  //   data: {
  //     subscriptionStatus: 'active',
  //     planId: session.metadata?.planId,
  //     stripeCustomerId: customer.id,
  //   },
  // });
}

async function handleSuccessfulPayment(invoice: Stripe.Invoice) {
  // In a real application, you would:
  // 1. Update subscription status in your database
  // 2. Record the payment
  // 3. Send a receipt email
  console.log("Processing successful payment:", invoice.id)

  // Example implementation:
  // await db.payment.create({
  //   data: {
  //     userId: invoice.metadata?.userId,
  //     amount: invoice.amount_paid,
  //     status: 'paid',
  //     invoiceId: invoice.id,
  //   },
  // });
  // await sendReceiptEmail(invoice.customer_email, invoice);
}

async function handleFailedPayment(invoice: Stripe.Invoice) {
  // In a real application, you would:
  // 1. Update subscription status
  // 2. Notify the user
  // 3. Possibly restrict access
  console.log("Processing failed payment:", invoice.id)

  // Example implementation:
  // await db.user.update({
  //   where: { stripeCustomerId: invoice.customer as string },
  //   data: {
  //     paymentStatus: 'failed',
  //   },
  // });
  // await sendPaymentFailedEmail(invoice.customer_email, invoice);
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  // In a real application, you would:
  // 1. Update the subscription details in your database
  // 2. Adjust user access based on the new plan
  console.log("Processing subscription update:", subscription.id)

  // Example implementation:
  // const planId = subscription.items.data[0].price.id;
  // await db.user.update({
  //   where: { stripeCustomerId: subscription.customer as string },
  //   data: {
  //     planId: planId,
  //     subscriptionStatus: subscription.status,
  //   },
  // });
}

async function handleSubscriptionCancellation(subscription: Stripe.Subscription) {
  // In a real application, you would:
  // 1. Update the user's subscription status
  // 2. Schedule access removal at the end of the billing period
  // 3. Send a cancellation confirmation
  console.log("Processing subscription cancellation:", subscription.id)

  // Example implementation:
  // await db.user.update({
  //   where: { stripeCustomerId: subscription.customer as string },
  //   data: {
  //     subscriptionStatus: 'canceled',
  //     subscriptionEndDate: new Date(subscription.current_period_end * 1000),
  //   },
  // });
  // await sendCancellationEmail(subscription.customer as string);
}

