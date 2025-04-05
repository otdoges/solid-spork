"use client"

import Link from "next/link"
import { ArrowRight, Mail, Users, BarChart3, Clock, Layers, Repeat } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <motion.div initial={{ rotate: -10 }} animate={{ rotate: 0 }} transition={{ duration: 0.5 }}>
                <Mail className="h-6 w-6 text-primary" />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="hidden font-bold sm:inline-block"
              >
                Pulse
              </motion.span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/dashboard" className="transition-colors hover:text-primary">
                Dashboard
              </Link>
              <Link href="/newsletters" className="transition-colors hover:text-primary">
                Newsletters
              </Link>
              <Link href="/subscribers" className="transition-colors hover:text-primary">
                Subscribers
              </Link>
              <Link href="/analytics" className="transition-colors hover:text-primary">
                Analytics
              </Link>
              <Link href="/templates" className="transition-colors hover:text-primary">
                Templates
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <ThemeToggle />
            <nav className="flex items-center">
              <Link href="/login" className="border rounded-md px-3 py-1 text-sm hover:bg-accent transition-colors">
                Sign in
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-10 md:pb-12 md:pt-12 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400"
            >
              Elevate Your Email Marketing
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
            >
              Create stunning newsletters, manage subscribers with precision, and analyze performance with powerful
              insights.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              >
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/templates">Browse Templates</Link>
              </Button>
            </motion.div>
          </div>
        </section>
        <section className="container space-y-6 py-8 md:py-12 lg:py-24 bg-accent/50 rounded-lg">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
            >
              Powerful Features
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
            >
              Everything you need to create and manage successful email campaigns
            </motion.p>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3"
          >
            <motion.div variants={item}>
              <Card className="overflow-hidden border-none shadow-lg transition-all duration-200 hover:shadow-xl">
                <CardHeader className="bg-gradient-to-br from-primary/10 to-purple-400/10 pb-2">
                  <div className="p-2 bg-primary/10 w-fit rounded-md mb-2">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Rich Newsletter Editor</CardTitle>
                  <CardDescription>Create stunning newsletters with our advanced editor</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  Design professional newsletters with our drag-and-drop editor. Add dynamic content, personalization,
                  and interactive elements.
                </CardContent>
                <CardFooter>
                  <Link href="/features/editor" className="text-sm text-primary hover:underline">
                    Learn more
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="overflow-hidden border-none shadow-lg transition-all duration-200 hover:shadow-xl">
                <CardHeader className="bg-gradient-to-br from-primary/10 to-purple-400/10 pb-2">
                  <div className="p-2 bg-primary/10 w-fit rounded-md mb-2">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Advanced Segmentation</CardTitle>
                  <CardDescription>Target the right audience with precision</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  Segment your subscribers based on behavior, demographics, engagement history, and custom attributes
                  for targeted campaigns.
                </CardContent>
                <CardFooter>
                  <Link href="/features/segmentation" className="text-sm text-primary hover:underline">
                    Learn more
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="overflow-hidden border-none shadow-lg transition-all duration-200 hover:shadow-xl">
                <CardHeader className="bg-gradient-to-br from-primary/10 to-purple-400/10 pb-2">
                  <div className="p-2 bg-primary/10 w-fit rounded-md mb-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Comprehensive Analytics</CardTitle>
                  <CardDescription>Gain insights with detailed metrics</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  Track opens, clicks, conversions, and subscriber engagement with interactive dashboards and exportable
                  reports.
                </CardContent>
                <CardFooter>
                  <Link href="/features/analytics" className="text-sm text-primary hover:underline">
                    Learn more
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="overflow-hidden border-none shadow-lg transition-all duration-200 hover:shadow-xl">
                <CardHeader className="bg-gradient-to-br from-primary/10 to-purple-400/10 pb-2">
                  <div className="p-2 bg-primary/10 w-fit rounded-md mb-2">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Smart Scheduling</CardTitle>
                  <CardDescription>Send at the perfect time</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  Schedule newsletters with AI-powered timing optimization or set up automated sequences based on
                  subscriber actions.
                </CardContent>
                <CardFooter>
                  <Link href="/features/scheduling" className="text-sm text-primary hover:underline">
                    Learn more
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="overflow-hidden border-none shadow-lg transition-all duration-200 hover:shadow-xl">
                <CardHeader className="bg-gradient-to-br from-primary/10 to-purple-400/10 pb-2">
                  <div className="p-2 bg-primary/10 w-fit rounded-md mb-2">
                    <Repeat className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Advanced A/B Testing</CardTitle>
                  <CardDescription>Optimize every element of your campaigns</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  Test subject lines, content variations, send times, and CTAs to discover what resonates best with your
                  audience.
                </CardContent>
                <CardFooter>
                  <Link href="/features/testing" className="text-sm text-primary hover:underline">
                    Learn more
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="overflow-hidden border-none shadow-lg transition-all duration-200 hover:shadow-xl">
                <CardHeader className="bg-gradient-to-br from-primary/10 to-purple-400/10 pb-2">
                  <div className="p-2 bg-primary/10 w-fit rounded-md mb-2">
                    <Layers className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Seamless Integrations</CardTitle>
                  <CardDescription>Connect with your favorite tools</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  Integrate with CRMs, e-commerce platforms, and marketing tools to create a unified workflow and data
                  ecosystem.
                </CardContent>
                <CardFooter>
                  <Link href="/features/integrations" className="text-sm text-primary hover:underline">
                    Learn more
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </section>
        <section className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
            >
              Pricing
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
            >
              Flexible plans for businesses of all sizes
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid w-full gap-8 md:grid-cols-3 pt-8"
            >
              <Card className="flex flex-col transition-all duration-200 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">$29</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>Perfect for beginners and small audiences</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Up to 5,000 subscribers
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Unlimited newsletters
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Basic analytics
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Email support
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Basic segmentation
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col border-primary relative transition-all duration-200 hover:shadow-lg">
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Most Popular
                </div>
                <CardHeader>
                  <CardTitle>Professional</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">$79</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>For growing newsletters and businesses</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Up to 25,000 subscribers
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Unlimited newsletters
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Advanced analytics
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      A/B testing
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Advanced segmentation
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Priority support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col transition-all duration-200 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">$249</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>For large organizations and publications</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Unlimited subscribers
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Unlimited newsletters
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Enterprise analytics & reporting
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Dedicated account manager
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Custom integrations
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      White labeling
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Contact Sales</Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </section>
        <section className="container py-8 md:py-12 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-[58rem] text-center"
          >
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl mb-6">Ready to get started?</h2>
            <p className="mb-8 text-muted-foreground sm:text-lg">
              Join thousands of marketers and creators who trust Pulse for their newsletter needs.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
              <Link href="/signup">
                Start Your Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <p className="text-sm leading-loose text-muted-foreground">© 2025 Pulse. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

