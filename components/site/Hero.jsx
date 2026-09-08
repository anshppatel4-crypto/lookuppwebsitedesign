'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Heart } from 'lucide-react'
import { SITE, SCREENSHOTS } from '@/lib/site'
import PhoneMockup from './PhoneMockup'

export default function Hero() {
  return (
    <section className="relative min-h-[650px] overflow-hidden bg-gradient-to-b from-white via-white to-[#eef3ff] pt-24 sm:pt-28 lg:min-h-[760px]">
      <div className="mx-auto flex min-h-[540px] max-w-[1180px] flex-col items-center gap-12 px-6 pb-16 sm:px-10 lg:flex-row lg:items-center lg:gap-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="z-10 flex w-full max-w-[520px] flex-1 flex-col items-center text-center lg:items-start lg:text-left"
        >
          <h1 className="font-display text-6xl font-extrabold tracking-[-0.075em] text-[#4f7f9e] sm:text-7xl lg:text-[5.5rem] lg:leading-[0.95]">
            lookupp
          </h1>
          <p className="mt-6 max-w-[540px] text-lg leading-[1.65] text-[#5c6081] sm:text-xl lg:text-[23px] lg:leading-[1.55]">
            Rewarding users for being present with the people they care about.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a href={SITE.appStore} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#116dff] to-[#3055cf] px-8 py-4 text-lg font-semibold text-white shadow-[0_18px_30px_-12px_rgba(48,85,207,0.65)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_34px_-12px_rgba(48,85,207,0.75)]">
              <Heart className="h-6 w-6 fill-white/20" /> Download Today <ArrowRight className="h-6 w-6" />
            </a>
            <a href="#learn-more" className="rounded-full border border-[#d5d8e4] bg-white/70 px-8 py-4 text-lg font-semibold text-[#20234f] transition hover:bg-white">
              Learn more
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex h-[430px] w-full flex-1 items-center justify-center gap-1 sm:h-[480px] sm:gap-2 lg:h-[540px] lg:gap-3"
          style={{ perspective: 1200 }}
        >
          <PhoneMockup image={SCREENSHOTS.start} alt="Lookupp start a zone screen" className="relative min-w-0 flex-1 scale-[0.72] sm:scale-[0.8] lg:scale-[0.86]" float="" />
          <PhoneMockup image={SCREENSHOTS.welcome} alt="Lookupp welcome screen" className="relative z-10 min-w-0 flex-1 scale-[0.72] sm:scale-[0.8] lg:scale-[0.86]" float="" />
          <PhoneMockup image={SCREENSHOTS.rewards} alt="Lookupp rewards screen" className="relative min-w-0 flex-1 scale-[0.72] sm:scale-[0.8] lg:scale-[0.86]" float="" />
        </motion.div>
      </div>
    </section>
  )
}

