'use client'

import { motion } from 'framer-motion'
import { SUPPORTERS } from '@/lib/site'
import { Reveal } from './motion'

export default function Supporters({ compact = false }) {
  return (
    <section className={compact ? 'py-16' : 'py-24'}>
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#3055CF]">Recognitions &amp; Supporters</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#16163F] sm:text-4xl">
            Backed by people who believe in presence
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 md:grid-cols-5">
          {SUPPORTERS.map((s, idx) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group flex h-28 items-center justify-center rounded-2xl border border-[#eef0f7] bg-white p-5 shadow-sm transition hover:shadow-lg"
            >
              <img
                src={s.src}
                alt={s.name}
                className="max-h-16 w-auto object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
