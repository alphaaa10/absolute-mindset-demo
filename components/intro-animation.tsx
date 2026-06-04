"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [showLetters, setShowLetters] = useState(false)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const absoluteRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const tl = gsap.timeline()

    // Phase 1: Logo moves from right-of-center to left AND letters start revealing simultaneously
    tl.to(logoRef.current, {
      x: 0,
      duration: 1.2,
      ease: "power3.out",
      onStart: () => setShowLetters(true), // Start showing letters when logo starts moving
    })

    // Show "ABSOLUTE" text
    tl.to(absoluteRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.3")

    // Hold for a moment
    tl.to({}, { duration: 1 })

    // Fade out everything
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => onComplete(),
    })

    return () => {
      tl.kill()
    }
  }, [mounted, onComplete])

  const letters = ["I", "N", "D", "S", "E", "T"]

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: "#0a0a0a" }}
        initial={{ opacity: 1 }}
      >
        {/* Ambient glow effects - Orange theme */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full blur-[120px]" 
            style={{ backgroundColor: "rgba(234, 88, 12, 0.15)" }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px]" 
            style={{ backgroundColor: "rgba(59, 130, 246, 0.08)" }}
          />
        </div>

        <div className="relative flex flex-col items-center justify-center">
          {/* ABSOLUTE text above */}
          <span
            ref={absoluteRef}
            className="text-xs md:text-sm tracking-[0.5em] uppercase mb-2 font-medium"
            style={{ 
              color: "rgba(255, 255, 255, 0.5)",
              opacity: 0,
              transform: "translateY(10px)"
            }}
          >
            ABSOLUTE
          </span>

          {/* Logo + INDSET text */}
          <div className="flex items-center">
            {/* Gym Logo - starts from right half of center */}
            <div
              ref={logoRef}
              className="flex-shrink-0"
              style={{ transform: "translateX(120px)" }}
            >
              <img 
                src="/images/logo.png" 
                alt="Absolute Mindset Logo"
                className="h-[80px] md:h-[120px] lg:h-[140px] w-auto"
                style={{
                  objectFit: "contain",
                  marginRight: "-8px",
                  marginLeft: "-12px",
                  /* Remove white background */
                  mixBlendMode: "screen",
                  filter: "brightness(1.1) contrast(1.1)",
                }}
              />
            </div>

            {/* Remaining letters - appear simultaneously with logo movement */}
            {letters.map((letter, index) => (
              <motion.span
                key={letter + index}
                initial={{ opacity: 0, x: -20 }}
                animate={showLetters ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight"
                style={{ color: "#fafafa" }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Subtle particles - Orange theme */}
        {mounted && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ 
                  backgroundColor: "rgba(234, 88, 12, 0.5)",
                  left: `${10 + (i * 6)}%`,
                  top: `${20 + (i * 4)}%`,
                }}
                animate={{
                  y: [-20, -100],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 2 + (i * 0.2),
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
