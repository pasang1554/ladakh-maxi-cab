"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface ScaleProps {
  children: ReactNode
  delay?: number
  scale?: number
}

export function Scale({ children, delay = 0, scale = 0.8 }: ScaleProps) {
  return (
    <motion.div
      initial={{ scale, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
} 