'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/*
 * Organic section transitions (no hard divider lines):
 * - <Wave /> renders a soft curved SVG that fills the bottom of a section with
 *   the NEXT section's colour, so blocks melt into one another.
 * - <ParallaxBlob /> is an oversized, low-opacity blurred gradient that drifts
 *   slightly as the user scrolls, adding depth without competing with content.
 */

const PATHS = {
  1: 'M0,40 C360,120 1080,0 1440,60 L1440,141 L0,141 Z',
  2: 'M0,80 C480,10 960,130 1440,50 L1440,141 L0,141 Z',
  3: 'M0,60 C300,10 620,110 900,80 C1130,58 1300,90 1440,66 L1440,141 L0,141 Z',
  4: 'M0,50 C420,140 1040,-10 1440,80 L1440,141 L0,141 Z',
}

export function Wave({ fill, variant = 1, className = '', height = 120 }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-[-1px] z-0 ${className}`}
      style={{ lineHeight: 0 }}
    >
      <svg viewBox="0 0 1440 140" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: `${height}px` }}>
        <path d={PATHS[variant]} fill={fill} />
      </svg>
    </div>
  )
}

export function ParallaxBlob({ className = '', from = -60, to = 60 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [from, to])
  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0 overflow-visible">
      <motion.div style={{ y }} className={className} />
    </div>
  )
}
