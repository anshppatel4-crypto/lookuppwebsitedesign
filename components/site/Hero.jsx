'use client'

import { motion } from 'framer-motion'
import PhoneMockup from './PhoneMockup'

export default function Hero() {
    return (
          >section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f3f6ff] via-[#f7f9ff] to-[#eef3ff]">
            >div className="mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-6 md:pt-12 lg:px-8">
              >div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">

                >motion.div
              initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left"
          >
                          >h1 className="text-4xl font-bold tracking-tight text-[#16163F] sm:text-5xl md:text-6xl leading-tight">
                            People{' '}
              >span className="text-[#3055CF]">&gt;>/span>{' '}
              Screens
            >/h1>

            >p className="mt-6 max-w-lg text-lg text-[#16163F]/60 leading-relaxed">
                              Lookupp rewards real-world connections and helps youth build healthier
              digital habits  one face-to-face interaction at a time.
                            >/p>

            >div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                              >a
                href="#download"
                className="rounded-full bg-gradient-to-r from-[#116DFF] to-[#3055CF] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#3055CF]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(48,85,207,0.5)]"
              >
                                  Download Today
              >/a>
              >a
                href="#learn-more"
                className="rounded-full border border-[#16163F]/15 bg-white/60 px-8 py-3.5 text-base font-semibold text-[#16163F] backdrop-blur-sm transition-all duration-300 hover:bg-white/80"
              >
                                  Learn more
              >/a>
            >/div>
          >/motion.div>

          >motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-1 items-center justify-center"
          >
                          >PhoneMockup />
                        >/motion.div>

        >/div>
      >/div>
    >/section>
  )
}
