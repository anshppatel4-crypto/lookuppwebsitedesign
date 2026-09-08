'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Heart } from 'lucide-react'
import { SITE, SCREENSHOTS } from '@/lib/site'
import PhoneMockup from './PhoneMockup'

export default function Hero() {
  return (
    <section className="relative min-h-[520px] overflow-hidden bg-gradient-to-b from-white via-white to-[#eef3ff] pt-20 sm:pt-24 lg:min-h-[660px] lg:pt-24">
      <div className="mx-auto flex min-h-[420px] max-w-[1240px] flex-col items-center gap-12 px-6 pb-16 sm:px-10 lg:flex-row lg:items-center lg:gap-4 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="z-10 flex w-full max-w-[480px] flex-1 flex-col items-center text-center lg:items-start lg:text-left lg:pl-8"
        >
          <img src={SITE.logo} alt="Lookupp" className="h-auto w-[250px] max-w-full object-contain sm:w-[290px] lg:w-[280px]" />
          <p className="mt-6 max-w-[460px] text-base leading-6 text-[#5c6081] sm:text-lg lg:text-[19px] lg:leading-7">
            Rewarding users for being present with the people they care about.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a href={SITE.appStore} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#116dff] to-[#3055cf] px-6 py-3 text-base font-semibold text-white shadow-[0_18px_30px_-12px_rgba(48,85,207,0.65)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_34px_-12px_rgba(48,85,207,0.75)]">
              <Heart className="h-6 w-6 fill-white/20" /> Download Today <ArrowRight className="h-6 w-6" />
            </a>
            <a href="#learn-more" className="rounded-full border border-[#d5d8e4] bg-white/70 px-6 py-3 text-base font-semibold text-[#20234f] transition hover:bg-white">
              Learn more
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative grid h-[320px] w-full flex-1 grid-cols-3 items-center justify-items-center gap-0 sm:h-[390px] lg:h-[455px] lg:min-w-[470px]"
          style={{ perspective: 1200 }}
        >
          <PhoneMockup image={SCREENSHOTS.start} alt="Lookupp start a zone screen" className="relative -mx-3 left-4 scale-[0.68] sm:-mx-4 sm:left-5 sm:scale-[0.76] lg:-mx-6 lg:left-6 lg:scale-[0.86] 2xl:scale-[0.92]" float="" />
          <PhoneMockup image={SCREENSHOTS.welcome} alt="Lookupp welcome screen" className="relative z-10 -mx-3 scale-[0.68] sm:-mx-4 sm:scale-[0.76] lg:-mx-6 lg:scale-[0.86] 2xl:scale-[0.92]" float="" />
          <PhoneMockup image={SCREENSHOTS.rewards} alt="Lookupp rewards screen" className="relative -mx-3 -right-4 scale-[0.68] sm:-mx-4 sm:-right-5 sm:scale-[0.76] lg:-mx-6 lg:-right-6 lg:scale-[0.86] 2xl:scale-[0.92]" float="" />
        </motion.div>
      </div>
    </section>
  )
}

