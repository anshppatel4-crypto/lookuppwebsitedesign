'use client'

import ContactSection from '@/components/site/ContactSection'
import { motion } from 'framer-motion'

export default function ContactPage() {
  return (
    <div>
      <section className="relative overflow-hidden pt-24 pb-4 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#116DFF]/10 blur-3xl animate-blob" />
        </div>
        <div className="mx-auto max-w-3xl px-6">
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="font-display text-5xl font-extrabold tracking-tight text-[#16163F] sm:text-6xl"
          >
            Get in <span className="text-gradient-blue">touch</span>
          </motion.h1>
        </div>
      </section>
      <ContactSection />
    </div>
  )
}
