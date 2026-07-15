'use client'

import { motion } from 'framer-motion'
import { Wave } from './Flow'

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-[#16163F] py-24">
      <div className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-[#3055CF]/40 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#116DFF]/30 blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8ea6ff]"
        >
          Our Impact
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl"
        >
          Fostered over{' '}
          <span className="text-gradient-blue bg-gradient-to-r from-[#8ea6ff] to-[#c9b6ff]">12,500 hours</span>{' '}
          of screen-free, face-to-face interaction.
        </motion.h2>
      </div>
    </section>
  )
}
