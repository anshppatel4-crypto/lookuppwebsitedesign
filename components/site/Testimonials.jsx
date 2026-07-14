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
            Loved by real users
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-[2rem] border border-white bg-white p-8 shadow-[0_30px_80px_-40px_rgba(48,85,207,0.4)] sm:min-h-[240px] sm:p-14">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={i}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <Quote className="mx-auto mb-5 h-9 w-9 text-[#3055CF]/25" />
                <p className="text-center font-display text-xl font-semibold leading-snug text-[#16163F] sm:text-3xl">
                  &ldquo;{t.quote}&rdquo;
                </p>
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
