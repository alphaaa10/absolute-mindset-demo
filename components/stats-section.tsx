"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

interface AnimatedCounterProps {
  end: number
  suffix?: string
  label: string
  delay?: number
}

function AnimatedCounter({ end, suffix = "", label, delay = 0 }: AnimatedCounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <motion.span
        className="text-4xl md:text-5xl font-black text-primary"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        {isInView ? (
          <CountUp end={end} duration={2} />
        ) : (
          0
        )}
        {suffix}
      </motion.span>
      <p className="text-muted-foreground mt-2">{label}</p>
    </motion.div>
  )
}

function CountUp({ end, duration }: { end: number; duration: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useRef(() => {
    const element = ref.current
    if (!element) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const current = Math.floor(progress * end)
      element.textContent = current.toString()

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  })

  return <span ref={ref}>{end}</span>
}

export function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const stats = [
    { end: 5000, suffix: "+", label: "Active Members" },
    { end: 50, suffix: "+", label: "Expert Trainers" },
    { end: 15, label: "Years Experience" },
    { end: 98, suffix: "%", label: "Satisfaction Rate" },
  ]

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-charcoal to-electric-blue/10"
        style={{ y: backgroundY }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-6 sm:p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <AnimatedCounter
                key={stat.label}
                end={stat.end}
                suffix={stat.suffix}
                label={stat.label}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
