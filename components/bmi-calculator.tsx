"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Scale, Ruler, Calendar, User } from "lucide-react"

type BMICategory = "Underweight" | "Normal" | "Overweight" | "Obese"

interface BMIResult {
  value: number
  category: BMICategory
}

const getCategoryColor = (category: BMICategory) => {
  switch (category) {
    case "Underweight":
      return "text-electric-blue"
    case "Normal":
      return "text-green-500"
    case "Overweight":
      return "text-yellow-500"
    case "Obese":
      return "text-red-500"
    default:
      return "text-foreground"
  }
}

const getCategoryPercentage = (bmi: number) => {
  if (bmi < 18.5) return (bmi / 18.5) * 25
  if (bmi < 25) return 25 + ((bmi - 18.5) / 6.5) * 25
  if (bmi < 30) return 50 + ((bmi - 25) / 5) * 25
  return Math.min(75 + ((bmi - 30) / 10) * 25, 100)
}

export function BMICalculator() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState<"male" | "female">("male")
  const [result, setResult] = useState<BMIResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateBMI = () => {
    const h = parseFloat(height) / 100 // Convert cm to m
    const w = parseFloat(weight)

    if (!h || !w || h <= 0 || w <= 0) return

    setIsCalculating(true)

    setTimeout(() => {
      const bmi = w / (h * h)
      let category: BMICategory

      if (bmi < 18.5) category = "Underweight"
      else if (bmi < 25) category = "Normal"
      else if (bmi < 30) category = "Overweight"
      else category = "Obese"

      setResult({ value: bmi, category })
      setIsCalculating(false)
    }, 800)
  }

  return (
    <section id="bmi" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-matte-black" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-electric-blue/5" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium mb-4">
            Know Your Body
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground text-balance">
            BMI <span className="text-primary">Calculator</span>
          </h2>
        </motion.div>

        {/* Calculator card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-3xl p-5 sm:p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Inputs */}
            <div className="space-y-6">
              {/* Height */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                  <Ruler className="w-4 h-4 text-primary" />
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="170"
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground transition-all"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                  <Scale className="w-4 h-4 text-primary" />
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="70"
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground transition-all"
                />
              </div>

              {/* Age */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="25"
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground transition-all"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                  <User className="w-4 h-4 text-primary" />
                  Gender
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setGender("male")}
                    className={`flex-1 px-4 py-3 rounded-xl border transition-all ${
                      gender === "male"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-input border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender("female")}
                    className={`flex-1 px-4 py-3 rounded-xl border transition-all ${
                      gender === "female"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-input border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Calculate button */}
              <motion.button
                onClick={calculateBMI}
                disabled={isCalculating}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg relative overflow-hidden group disabled:opacity-70"
              >
                <span className="relative z-10">
                  {isCalculating ? "Calculating..." : "Calculate BMI"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-glow opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </div>

            {/* Result */}
            <div className="flex flex-col items-center justify-center">
              {result ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center w-full"
                >
                  {/* BMI Value */}
                  <div className="mb-6">
                    <p className="text-6xl md:text-7xl font-black text-foreground">
                      {result.value.toFixed(1)}
                    </p>
                    <p className={`text-2xl font-bold mt-2 ${getCategoryColor(result.category)}`}>
                      {result.category}
                    </p>
                  </div>

                  {/* Progress meter */}
                  <div className="w-full h-4 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getCategoryPercentage(result.value)}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        result.category === "Normal"
                          ? "bg-green-500"
                          : result.category === "Underweight"
                          ? "bg-electric-blue"
                          : result.category === "Overweight"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    />
                  </div>

                  {/* Scale labels */}
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Underweight</span>
                    <span>Normal</span>
                    <span>Overweight</span>
                    <span>Obese</span>
                  </div>

                  {/* BMI ranges */}
                  <div className="mt-6 text-sm text-muted-foreground">
                    <p>Underweight: {"<"} 18.5</p>
                    <p>Normal: 18.5 - 24.9</p>
                    <p>Overweight: 25 - 29.9</p>
                    <p>Obese: 30+</p>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <div className="w-32 h-32 rounded-full border-4 border-dashed border-border flex items-center justify-center mx-auto mb-4">
                    <Scale className="w-12 h-12 text-muted" />
                  </div>
                  <p>Enter your details and click calculate to see your BMI</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
