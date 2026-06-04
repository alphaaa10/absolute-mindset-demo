"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Instagram, Twitter, Linkedin, ChevronLeft, ChevronRight } from "lucide-react"

const trainers = [
  {
    name: "Marcus Cole",
    specialty: "Strength & Conditioning",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=500&fit=crop",
    bio: "15+ years of elite athletic training",
    instagram: "#",
    twitter: "#",
    linkedin: "#",
  },
  {
    name: "Sarah Chen",
    specialty: "HIIT & Functional Training",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=500&fit=crop",
    bio: "Former Olympic athlete and certified trainer",
    instagram: "#",
    twitter: "#",
    linkedin: "#",
  },
  {
    name: "David Rodriguez",
    specialty: "Bodybuilding & Nutrition",
    image: "https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=400&h=500&fit=crop",
    bio: "Pro bodybuilder with 10+ competition wins",
    instagram: "#",
    twitter: "#",
    linkedin: "#",
  },
  {
    name: "Emma Thompson",
    specialty: "Yoga & Mobility",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=500&fit=crop",
    bio: "Certified yoga instructor and flexibility coach",
    instagram: "#",
    twitter: "#",
    linkedin: "#",
  },
  {
    name: "James Wilson",
    specialty: "Boxing & MMA",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop",
    bio: "Professional MMA fighter and coach",
    instagram: "#",
    twitter: "#",
    linkedin: "#",
  },
]

export function TrainersSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320
      const newIndex =
        direction === "left"
          ? Math.max(0, currentIndex - 1)
          : Math.min(trainers.length - 1, currentIndex + 1)
      setCurrentIndex(newIndex)
      scrollRef.current.scrollTo({
        left: newIndex * scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="trainers" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-charcoal" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-electric-blue/5" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium mb-4">
              Expert Trainers
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-foreground text-balance">
              Train With The{" "}
              <span className="text-primary">Best</span>
            </h2>
          </div>

          {/* Navigation arrows */}
          <div className="flex gap-3 mt-6 md:mt-0">
            <button
              onClick={() => scroll("left")}
              disabled={currentIndex === 0}
              className="p-3 rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous trainer"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={currentIndex === trainers.length - 1}
              className="p-3 rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next trainer"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </motion.div>

        {/* Trainers carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
        >
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-72"
            >
              <div className="group relative rounded-2xl overflow-hidden glass">
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-transparent to-transparent" />

                  {/* Hover overlay with socials */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                      href={trainer.instagram}
                      className="p-3 rounded-full bg-matte-black/80 text-foreground hover:text-primary transition-colors"
                      aria-label={`${trainer.name} Instagram`}
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href={trainer.twitter}
                      className="p-3 rounded-full bg-matte-black/80 text-foreground hover:text-primary transition-colors"
                      aria-label={`${trainer.name} Twitter`}
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href={trainer.linkedin}
                      className="p-3 rounded-full bg-matte-black/80 text-foreground hover:text-primary transition-colors"
                      aria-label={`${trainer.name} LinkedIn`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {trainer.name}
                  </h3>
                  <p className="text-sm text-primary font-medium mt-1">
                    {trainer.specialty}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {trainer.bio}
                  </p>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/30 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
