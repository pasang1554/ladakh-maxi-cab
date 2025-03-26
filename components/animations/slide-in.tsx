"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface SlideInProps {
  children: ReactNode
  direction?: "left" | "right" | "up" | "down"
  delay?: number
}

export function SlideIn({ children, direction = "left", delay = 0 }: SlideInProps) {
  const variants = {
    left: { x: -100, opacity: 0 },
    right: { x: 100, opacity: 0 },
    up: { y: 100, opacity: 0 },
    down: { y: -100, opacity: 0 },
  }

  const animate = {
    left: { x: 0, opacity: 1 },
    right: { x: 0, opacity: 1 },
    up: { y: 0, opacity: 1 },
    down: { y: 0, opacity: 1 },
  }

  return (
    <motion.div
      initial={variants[direction]}
      animate={animate[direction]}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
} 