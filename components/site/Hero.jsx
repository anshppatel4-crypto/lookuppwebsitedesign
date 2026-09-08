'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Heart } from 'lucide-react'
import { SITE, SCREENSHOTS } from '@/lib/site'
import PhoneMockup from './PhoneMockup'

export default function Hero() {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-gradient-to-b from-white via-white to-[#eef3ff] pt-28 sm:pt-32 lg:min-h-[850px]">
      <div className="mx-auto flex min-h-[600px] max-w-[1280px] flex-col items-center gap-16 px-6 pb-20 sm:px-10 lg:flex-row lg:items-center lg:gap-8 lg:px-14">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="z-10 flex w-full max-w-[600px] flex-1 flex-col items-center text-center lg:items-start lg:text-left"
        >
          <h1 className="font-display text-7xl font-extrabold tracking-[-0.075em] text-[#4f7f9e] sm:text-8xl lg:text-[6.5rem] lg:leading-[0.95]">
            lookupp
          </h1>
          <p className="mt-8 max-w-[620px] text-xl leading-[1.75] text-[#5c6081] sm:text-2xl lg:text-[27px] lg:leading-[1.6]">
            Rewarding users for being present with the people they care about.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5 lg:justify-start">
            <a href={SITE.appStore} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#116dff] to-[#3055cf] px-10 py-5 text-xl font-semibold text-white shadow-[0_18px_30px_-12px_rgba(48,85,207,0.65)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_34px_-12px_rgba(48,85,207,0.75)]">
              <Heart className="h-6 w-6 fill-white/20" /> Download Today <ArrowRight className="h-6 w-6" />
            </a>
            <a href="#learn-more" className="rounded-full border border-[#d5d8e4] bg-white/70 px-10 py-5 text-xl font-semibold text-[#20234f] transition hover:bg-white">
              Learn more
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex h-[490px] w-full flex-1 items-center justify-center lg:h-[620px]"
          style={{ perspective: 1200 }}
        >
          <PhoneMockup image={SCREENSHOTS.start} alt="Lookupp start a zone screen" className="absolute left-[7%] top-[13%] scale-[0.82] sm:left-[12%] lg:left-[7%] lg:scale-100" float="" />
          <PhoneMockup image={SCREENSHOTS.welcome} alt="Lookupp welcome screen" className="absolute left-1/2 top-[13%] z-10 -translate-x-1/2 scale-[0.82] sm:scale-[0.92] lg:scale-100" float="" />
          <PhoneMockup image={SCREENSHOTS.rewards} alt="Lookupp rewards screen" className="absolute right-[7%] top-[13%] scale-[0.82] sm:right-[12%] lg:right-[7%] lg:scale-100" float="" />
        </motion.div>
      </div>
    </section>
  )
}

