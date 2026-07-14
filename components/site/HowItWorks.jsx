'use client'

import { motion } from 'framer-motion'
import { STEPS } from '@/lib/site'
import { Reveal } from './motion'
import { Wave } from './Flow'

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#f6f7fb] py-24">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#3055CF]">How it works</span>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-[#16163F] sm:text-5xl">
            How Lookupp Works
          </h2>
        </Reveal>

        <div className="mt-16 grid items-stretch gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white bg-white p-8 shadow-[0_20px_60px_-30px_rgba(48,85,207,0.35)]"
            >
              <div className="absolute right-6 top-6 font-display text-6xl font-extrabold text-[#3055CF]/5">0{i + 1}</div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#116DFF] to-[#3055CF] text-white shadow-lg shadow-[#3055CF]/30 transition group-hover:scale-110">
                <s.icon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-[#16163F]">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-[#16163F]/60">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <Wave fill="#16163F" variant={2} height={130} />
    </section>
  )
}
