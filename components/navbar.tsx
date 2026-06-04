"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Programs", href: "#programs" },
  { name: "About Us", href: "#trainers" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Hall of Fame", href: "#transformation" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("Home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Update active item based on scroll position
      const sections = navItems.map(item => item.href.replace('#', ''))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            const navItem = navItems.find(item => item.href === `#${section}`)
            if (navItem) setActiveItem(navItem.name)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string, name: string) => {
    setActiveItem(name)
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-40"
      style={{
        backgroundColor: scrolled ? "rgba(10, 10, 10, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.3)" : "none",
        transition: "background-color 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            href="#home" 
            onClick={() => handleNavClick('#home', 'Home')}
            className="flex items-center gap-2"
          >
            <img 
              src="/images/logo.png" 
              alt="Absolute Mindset Logo"
              className="h-10 md:h-12 w-auto"
              style={{
                mixBlendMode: "screen",
                filter: "brightness(1.1) contrast(1.1)",
              }}
            />
            <div className="flex flex-col items-start">
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-medium leading-none">
                ABSOLUTE
              </span>
              <span className="text-lg md:text-xl font-black tracking-tight leading-none text-white">
                MINDSET
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href, item.name)}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  activeItem === item.name
                    ? "text-orange-500"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Sign Up Button */}
          <div className="hidden lg:block">
            <Link
              href="#membership"
              onClick={() => handleNavClick('#membership', 'Membership')}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-orange-500 rounded-md transition-all duration-300 hover:bg-orange-600 hover:shadow-[0_0_20px_rgba(234,88,12,0.3)]"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              backgroundColor: "rgba(10, 10, 10, 0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            className="lg:hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => handleNavClick(item.href, item.name)}
                    className={`block w-full text-left py-3 text-lg font-medium transition-colors ${
                      activeItem === item.name
                        ? "text-orange-500"
                        : "text-white/70"
                    }`}
                  >
                    {item.name}
                  </button>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="pt-4"
              >
                <Link
                  href="#membership"
                  onClick={() => handleNavClick('#membership', 'Membership')}
                  className="block w-full px-6 py-3 text-center text-sm font-semibold text-white bg-orange-500 rounded-md"
                >
                  Sign Up
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
