"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"

export function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Background MINDSET watermark text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-[1]">
        <span
          className="text-[22vw] md:text-[15vw] font-black tracking-wider select-none whitespace-nowrap"
          style={{
            color: "transparent",
            WebkitTextStroke: "2px rgba(234, 88, 12, 0.25)",
            opacity: 0.4
          }}
        >
          MINDSET
        </span>
      </div>

      {/* Background Image - Dramatic muscular figure */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Main hero image - dramatic muscular back */}
          <img
            src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=1600&q=80"
            alt="Muscular athlete from behind"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-50"
            crossOrigin="anonymous"
          />
          {/* Dark gradient overlay from bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
          {/* Dark gradient overlay from top */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-transparent to-transparent" />
        </div>
      </div>

      {/* ===== MOBILE LAYOUT: Tagline centered over watermark, buttons at bottom ===== */}
      <div className="relative z-10 flex flex-col min-h-screen sm:hidden">
        {/* Tagline - vertically centered to straddle the MINDSET watermark */}
        <div className="flex-1 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center"
          >
            <h1 className="text-[1.25rem] font-medium text-white leading-relaxed tracking-wide">
              {"It's"} Time To Become The
            </h1>
            <h1 className="text-[1.25rem] font-medium text-white leading-relaxed tracking-wide mt-1">
              Main Character of Your{" "}
              <span className="text-orange-500 font-bold">LIFE</span>
            </h1>

            {/* Mirror reflection */}
            <div className="relative mt-1 h-10 overflow-hidden">
              <div
                style={{
                  transform: "scaleY(-1)",
                  maskImage: "linear-gradient(to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)"
                }}
              >
                <p className="text-[1.25rem] font-medium tracking-wide text-white/20">
                  Main Character of Your{" "}
                  <span className="text-orange-500/20">LIFE</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Buttons - at the bottom with comfortable spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col items-stretch gap-3 px-6 pb-20"
        >
          <Link
            href="#membership"
            className="block px-8 py-3 text-base font-semibold text-white bg-orange-500 rounded-lg transition-all duration-300 text-center"
          >
            {"Let's Grind"}
          </Link>
          <Link
            href="#programs"
            className="block px-8 py-3 text-base font-semibold text-white border-2 border-white/30 rounded-lg transition-all duration-300 text-center"
          >
            Explore Programs
          </Link>
        </motion.div>
      </div>

      {/* ===== DESKTOP/TABLET LAYOUT: Content at bottom ===== */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 lg:px-8 text-center hidden sm:flex flex-col items-stretch justify-end flex-1 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full space-y-6"
        >
          {/* Main tagline */}
          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-snug tracking-wide"
            >
              {"It's"} Time To Become The Main Character of Your{" "}
              <span className="text-orange-500 font-bold">LIFE</span>
            </motion.h1>

            {/* Mirror reflection effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative mt-1 h-16 overflow-hidden"
            >
              <div
                className="absolute inset-x-0 top-0"
                style={{
                  transform: "scaleY(-1)",
                  maskImage: "linear-gradient(to top, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 100%)"
                }}
              >
                <p className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-wide text-white/30">
                  {"It's"} Time To Become The Main Character of Your{" "}
                  <span className="text-orange-500/30">LIFE</span>
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="#membership"
              className="inline-block px-8 py-4 text-lg font-semibold text-white bg-orange-500 rounded-lg transition-all duration-300 hover:bg-orange-600 hover:scale-105 hover:shadow-[0_0_30px_rgba(234,88,12,0.4)] text-center"
            >
              {"Let's Grind"}
            </Link>
            <Link
              href="#programs"
              className="inline-block px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-lg transition-all duration-300 hover:border-orange-500 hover:text-orange-500 hover:scale-105 text-center"
            >
              Explore Programs
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-orange-500 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
