"use client"

import { motion } from "framer-motion";
import { ReactNode } from "react"

type Props = {
  children: ReactNode;
  className?: string;
  duration?: number;
  translateY?: number;
}

export default function Floaty({ children, className = "", duration = 1.5, translateY = 10 }: Props) {
  return (
    <motion.div
      className={className}
      animate = {{
        y: [0, -translateY, 0],
        opacity: [1, 0.8, 1],
      }}  
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}