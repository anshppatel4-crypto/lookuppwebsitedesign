'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/site'
import { Reveal } from './motion'
import { Wave } from './Flow'

export default function Testimonials() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)

  const go = useCallback((n) => {
    setDir(n > i ? 1 : -1)
    setI((n + TESTIMONIALS.length) % TESTIMONIALS.length)
  }, [i])

  const next = useCallback(() => { setDir(1); setI((p) => (p + 1) % TESTIMONIALS.length) }, [])
  const prev = () => { setDir(-1); setI((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length) }

  useEffect(() => {
    const t = setInterval(next, 5500)
    return () => clearInterval(t)
  }, [next])

  const t = TESTIMONIALS[i]

  return (
    <section className="relative overflow-hidden bg-[#f6f7fb] py-24">
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#3055CF]">Testimonials</span>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-[#16163F] sm:text-5xl">
            Loved by real people
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <div className="relative min-h-[280px] overflow-hidden rounded-[2rem] border border-white bg-white p-10 shadow-[0_30px_80px_-40px_rgba(48,85,207,0.4)] sm:p-14">
            <Quote className="absolute right-8 top-8 h-16 w-16 text-[#3055CF]/8" />
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={i}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-display text-2xl font-semibold leading-snug text-[#16163F] sm:text-3xl">
                  “{t.quote}”
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.seed}&radius=50`}
                    alt={t.name}
                    className="h-14 w-14 rounded-full border-2 border-[#3055CF]/20 bg-[#eef1fb]"
                  />
                  <div>
                    <div className="font-semibold text-[#16163F]">{t.name}</div>
                    <div className="text-sm text-[#16163F]/50">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={prev} aria-label="Previous" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e2e5f0] bg-white text-[#16163F] transition hover:bg-[#3055CF] hover:text-white">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => go(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all ${idx === i ? 'w-8 bg-[#3055CF]' : 'w-2.5 bg-[#c7ccdf]'}`}
                />
              ))}
            </div>
            <button onClick={next} aria-label="Next" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e2e5f0] bg-white text-[#16163F] transition hover:bg-[#3055CF] hover:text-white">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <Wave fill="#ffffff" variant={2} height={130} />
    </section>
  )
}
