"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Basic",
    price: 2000,
    period: "month",
    description: "Perfect for beginners starting their fitness journey",
    features: [
      "Full gym access",
      "Locker room access",
      "Basic equipment training",
      "Group fitness classes",
      "Fitness assessment",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: 4999,
    period: "half year",
    description: "For dedicated athletes seeking serious results",
    features: [
      "Everything in Basic",
      "Personal trainer (2x/week)",
      "Nutrition consultation",
      "Priority equipment access",
      "Sauna & recovery room",
      "Progress tracking app",
    ],
    highlighted: true,
  },
  {
    name: "Elite",
    price: 7999,
    period: "year",
    description: "The ultimate premium fitness experience",
    features: [
      "Everything in Pro",
      "Unlimited personal training",
      "Custom meal plans",
      "Private locker",
      "VIP lounge access",
      "Guest passes (4x/month)",
      "Exclusive member events",
    ],
    highlighted: false,
  },
]

export function MembershipSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="membership" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-background to-matte-black" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium mb-4">
            Membership Plans
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground text-balance">
            Invest In Your{" "}
            <span className="text-primary">Future Self</span>
          </h2>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-2 sm:px-0">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative group ${plan.highlighted ? "md:-mt-4 md:mb-4" : ""}`}
            >
              <div
                className={`h-full rounded-3xl p-6 sm:p-8 transition-all duration-300 group-hover:-translate-y-2 ${plan.highlighted
                  ? "glass border-2 border-primary glow-orange"
                  : "glass border border-border group-hover:border-primary/50"
                  }`}
              >
                {/* Popular badge */}
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                {/* Plan info */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mt-2">{plan.description}</p>
                  <div className="mt-6">
                    <span className="text-5xl font-black text-foreground">₹{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div
                        className={`p-1 rounded-full ${plan.highlighted ? "bg-primary" : "bg-primary/20"
                          }`}
                      >
                        <Check
                          className={`w-3 h-3 ${plan.highlighted ? "text-primary-foreground" : "text-primary"
                            }`}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href="#contact"
                  className={`block w-full py-4 rounded-xl text-center font-semibold transition-all ${plan.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-orange-glow"
                    : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                    }`}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
