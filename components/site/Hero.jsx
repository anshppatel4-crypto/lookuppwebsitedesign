'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Apple, ArrowRight } from 'lucide-react'
import PhoneMockup from './PhoneMockup'
import { SITE, SCREENSHOTS } from '@/lib/site'
import { Wave, ParallaxBlob } from './Flow'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f7f9ff] to-[#eef3ff]">
      {/* clean soft background */}

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 pb-28 pt-6 md:grid-cols-2 md:pt-12">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display"
          >
            <img src={SITE.logo} alt="Lookupp" className="h-14 w-auto sm:h-20" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-5 max-w-md text-lg leading-relaxed text-[#16163F]/70"
          >
            Rewarding users for being present with the people they care about.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href={SITE.appStore}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#116DFF] to-[#3055CF] px-7 py-4 text-base font-semibold text-white shadow-xl shadow-[#3055CF]/30 transition hover:-translate-y-0.5 hover:shadow-2xl"
            >
              <Apple className="h-5 w-5" /> Download Today
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <Link href="/about" className="inline-flex items-center gap-2 rounded-full border border-[#16163F]/15 bg-white/60 px-6 py-4 text-base font-semibold text-[#16163F] backdrop-blur transition hover:bg-white">
              Learn more
            </Link>
          </motion.div>
        </div>

        <div className="relative flex items-end justify-center gap-3 md:justify-end" style={{ perspective: 1200 }}>
          <div className="pointer-events-none absolute inset-0 -z-10 mx-auto h-72 w-72 self-center rounded-full bg-gradient-to-tr from-[#116DFF]/30 to-[#3055CF]/20 blur-3xl" />
          <PhoneMockup image={SCREENSHOTS.welcome} delay={0.3} float="" className="z-10 -mr-8 hidden sm:block" />
          <PhoneMockup image={SCREENSHOTS.start} delay={0.15} float="" className="z-20 scale-105" />
          <PhoneMockup image={SCREENSHOTS.rewards} delay={0.45} float="" className="z-10 -ml-8 hidden sm:block" />
        </div>
      </div>

    </section>
  )
}
