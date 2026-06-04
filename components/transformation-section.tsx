"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

const transformations = [
  {
    name: "Michael R.",
    before: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=500&fit=crop",
    after: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop",
    weightLoss: "25kg",
    muscleGain: "+15kg lean",
    months: 8,
    quote: "Mindset Fitness changed my life completely.",
  },
  {
    name: "Jennifer L.",
    before: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=500&fit=crop",
    after: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=500&fit=crop",
    weightLoss: "18kg",
    muscleGain: "+8kg lean",
    months: 6,
    quote: "The trainers here are absolutely incredible.",
  },
  {
    name: "David K.",
    before: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop",
    after: "https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=400&h=500&fit=crop",
    weightLoss: "30kg",
    muscleGain: "+20kg lean",
    months: 12,
    quote: "From overweight to competition ready.",
  },
]

function TransformationCard({
  transformation,
  index,
}: {
  transformation: (typeof transformations)[0]
  index: number
}) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100)
    setSliderPosition(percentage)
  }

  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX)
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="glass rounded-2xl overflow-hidden">
        {/* Image comparison slider */}
        <div
          ref={containerRef}
          className="relative h-80 cursor-ew-resize select-none"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* After image (background) */}
          <img
            src={transformation.after}
            alt="After transformation"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Before image (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={transformation.before}
              alt="Before transformation"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ width: `${100 / (sliderPosition / 100)}%` }}
            />
          </div>

          {/* Slider line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-primary glow-orange"
            style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <div className="flex gap-1">
                <div className="w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-primary-foreground" />
                <div className="w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-primary-foreground" />
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-matte-black/80 text-xs font-medium text-foreground">
            Before
          </div>
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/80 text-xs font-medium text-primary-foreground">
            After
          </div>
        </div>

        {/* Stats */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-foreground">{transformation.name}</h3>
          <p className="text-sm text-muted-foreground mt-1 italic">
            &ldquo;{transformation.quote}&rdquo;
          </p>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{transformation.weightLoss}</p>
              <p className="text-xs text-muted-foreground">Weight Lost</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-electric-blue">{transformation.muscleGain}</p>
              <p className="text-xs text-muted-foreground">Muscle Gain</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{transformation.months}</p>
              <p className="text-xs text-muted-foreground">Months</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function TransformationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="transformation" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-background to-charcoal" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium mb-4">
            Real Results
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground text-balance">
            Transformations That{" "}
            <span className="text-primary">Inspire</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Drag the slider to see the incredible journeys of our members
          </p>
        </motion.div>

        {/* Transformation cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {transformations.map((transformation, index) => (
            <TransformationCard
              key={transformation.name}
              transformation={transformation}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
