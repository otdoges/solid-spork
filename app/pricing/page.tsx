"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, HelpCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

export default function PricingPage() {
  const [billingInterval, setBillingInterval] = useState<"monthly" | "annually">("monthly")

  const plans = [
    {
      name: "Free",
      description: "For individuals just getting started with newsletters",
      price: {
        monthly: 0,
        annually: 0,
      },
      features: [
        { name: "Up to 500 subscribers", included: true },
        { name: "Up to 2,000 emails per month", included: true },
        { name: "Basic newsletter templates", included: true },
        { name: "Email support", included: true },
        { name: "Basic analytics", included: true },
        { name: "Single user account", included: true },
        { name: "A/B testing", included: false },
        { name: "Advanced segmentation", included: false },
        { name: "Custom domains", included: false },
        { name: "API access", included: false },
        { name: "Remove Pulse branding", included: false },
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Starter",
      description: "For creators and small businesses",
      price: {
        monthly: 29,
        annually: 24,
      },
      features: [
        { name: "Up to 5,000 subscribers", included: true },
        { name: "Up to 50,000 emails per month", included: true },
        { name: "All newsletter templates", included: true },
        { name: "Priority email support", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Up to 3 user accounts", included: true },
        { name: "Basic A/B testing", included: true },
        { name: "Basic segmentation", included: true },
        { name: "Custom domains", included: false },
        { name: "API access", included: false },
        { name: "Remove Pulse branding", included: false },
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      description: "For growing newsletters and businesses",
      price: {
        monthly: 79,
        annually: 69,
      },
      features: [
        { name: "Up to 25,000 subscribers", included: true },
        { name: "Up to 250,000 emails per month", included: true },
        { name: "All newsletter templates", included: true },
        { name: "Priority support with 24h response", included: true },
        { name: "Advanced analytics & reporting", included: true },
        { name: "Up to 10 user accounts", included: true },
        { name: "Advanced A/B testing", included: true },
        { name: "Advanced segmentation", included: true },
        { name: "Custom domains", included: true },
        { name: "API access", included: true },
        { name: "Remove Pulse branding", included: true },
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations and publications",
      price: {
        monthly: 249,
        annually: 199,
      },
      features: [
        { name: "Unlimited subscribers", included: true },
        { name: "Unlimited emails", included: true },
        { name: "All newsletter templates + custom", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "Enterprise analytics & reporting", included: true },
        { name: "Unlimited user accounts", included: true },
        { name: "Advanced A/B testing", included: true },
        { name: "Advanced segmentation", included: true },
        { name: "Custom domains", included: true },
        { name: "Full API access", included: true },
        { name: "White labeling", included: true },
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <DashboardShell className="max-w-7xl mx-auto">
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center mb-12">
        <DashboardHeader
          heading="Choose Your Plan"
          text="Select the perfect plan for your newsletter needs"
          className="text-center mx-auto"
        />

        <div className="flex items-center justify-center mt-8 space-x-2">
          <Label htmlFor="billing-toggle" className={`text-sm ${billingInterval === "monthly" ? "font-medium" : ""}`}>
            Monthly
          </Label>
          <Switch
            id="billing-toggle"
            checked={billingInterval === "annually"}
            onCheckedChange={(checked) => setBillingInterval(checked ? "annually" : "monthly")}
          />
          <Label htmlFor="billing-toggle" className={`text-sm ${billingInterval === "annually" ? "font-medium" : ""}`}>
            Annually
          </Label>
          <Badge
            variant="outline"
            className="ml-2 bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
          >
            Save up to 20%
          </Badge>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {plans.map((plan) => (
          <motion.div key={plan.name} variants={fadeIn}>
            <Card className={`flex flex-col h-full ${plan.popular ? "border-primary shadow-lg" : ""} relative`}>
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">
                      {plan.price[billingInterval] === 0 ? "Free" : `$${plan.price[billingInterval]}`}
                    </span>
                    {plan.price[billingInterval] > 0 && (
                      <span className="ml-1 text-muted-foreground">
                        /{billingInterval === "monthly" ? "mo" : "mo, billed annually"}
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-start">
                      {feature.included ? (
                        <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                      ) : (
                        <X className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                      )}
                      <span className={feature.included ? "" : "text-muted-foreground"}>{feature.name}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="ml-1 h-3 w-3 text-muted-foreground inline-block" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-[200px] text-xs">{getFeatureDescription(feature.name)}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${plan.popular ? "bg-primary" : ""}`}
                  variant={plan.name === "Free" ? "outline" : "default"}
                  asChild
                >
                  <Link href={plan.name === "Enterprise" ? "/contact" : "/signup"}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-16 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Need something custom?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          We offer custom solutions for large organizations with specific needs. Our team will work with you to create a
          tailored plan that fits your requirements.
        </p>
        <Button asChild>
          <Link href="/contact">Contact Sales</Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 border-t pt-12"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="font-bold mb-2">Can I change plans later?</h3>
            <p className="text-muted-foreground text-sm">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll
              prorate your billing.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">What happens if I exceed my limits?</h3>
            <p className="text-muted-foreground text-sm">
              We'll notify you when you're approaching your subscriber or email limits. You can upgrade your plan or
              we'll pause new subscriptions until you upgrade.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Do you offer refunds?</h3>
            <p className="text-muted-foreground text-sm">
              We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, contact our support
              team within 14 days of your purchase.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">How do I cancel my subscription?</h3>
            <p className="text-muted-foreground text-sm">
              You can cancel your subscription at any time from your account settings. Your plan will remain active
              until the end of your billing period.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Do you offer discounts for nonprofits?</h3>
            <p className="text-muted-foreground text-sm">
              Yes, we offer special pricing for nonprofits and educational institutions. Contact our sales team to learn
              more.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">What payment methods do you accept?</h3>
            <p className="text-muted-foreground text-sm">
              We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed
              securely through Stripe.
            </p>
          </div>
        </div>
      </motion.div>
    </DashboardShell>
  )
}

function getFeatureDescription(featureName: string): string {
  const descriptions: Record<string, string> = {
    "Up to 500 subscribers": "Maximum number of subscribers you can have on your list.",
    "Up to 2,000 emails per month": "Total number of emails you can send each month across all campaigns.",
    "Basic newsletter templates": "Access to a limited selection of pre-designed newsletter templates.",
    "Email support": "Get help via email with response times typically within 48 hours.",
    "Basic analytics": "Track opens, clicks, and basic subscriber growth metrics.",
    "Single user account": "One login for managing your newsletters.",
    "A/B testing": "Test different subject lines, content, and send times to optimize performance.",
    "Advanced segmentation": "Target subscribers based on behavior, demographics, and custom attributes.",
    "Custom domains": "Use your own domain for newsletter sending and tracking links.",
    "API access": "Programmatic access to your newsletter data and functionality.",
    "Remove Pulse branding": "Send newsletters without Pulse branding in the footer.",
    "Up to 5,000 subscribers": "Maximum number of subscribers you can have on your list.",
    "Up to 50,000 emails per month": "Total number of emails you can send each month across all campaigns.",
    "All newsletter templates": "Access to our full library of premium newsletter templates.",
    "Priority email support": "Get help via email with faster response times (within 24 hours).",
    "Advanced analytics": "Detailed insights including engagement scores, subscriber lifetime value, and more.",
    "Up to 3 user accounts": "Add team members to help manage your newsletters.",
    "Basic A/B testing": "Test different subject lines and basic content variations.",
    "Basic segmentation": "Segment subscribers based on basic attributes and engagement.",
    "Up to 25,000 subscribers": "Maximum number of subscribers you can have on your list.",
    "Up to 250,000 emails per month": "Total number of emails you can send each month across all campaigns.",
    "Priority support with 24h response": "Get help via email or chat with guaranteed 24-hour response times.",
    "Advanced analytics & reporting": "Comprehensive analytics with custom reports and data export.",
    "Up to 10 user accounts": "Add team members with customizable permissions.",
    "Advanced A/B testing": "Test multiple variables simultaneously with detailed results analysis.",
    "Advanced segmentation": "Create complex segments based on multiple attributes and behaviors.",
    "Unlimited subscribers": "No limit on the number of subscribers you can have.",
    "Unlimited emails": "Send as many emails as you need with no monthly limit.",
    "All newsletter templates + custom": "Access to all templates plus custom template development.",
    "Dedicated account manager": "A personal point of contact for all your needs.",
    "Enterprise analytics & reporting": "Custom analytics dashboards and automated reporting.",
    "Unlimited user accounts": "Add as many team members as needed with role-based permissions.",
    "Full API access": "Complete API access with higher rate limits and dedicated support.",
    "White labeling": "Completely remove Pulse branding and customize the platform to match your brand.",
  }

  return descriptions[featureName] || "Feature description not available."
}

