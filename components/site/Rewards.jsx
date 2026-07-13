'use client'

import { motion } from 'framer-motion'
import { REWARDS, SCREENSHOTS } from '@/lib/site'
import { Reveal } from './motion'
import PhoneMockup from './PhoneMockup'

export default function Rewards() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-[#116DFF]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 bottom-10 h-72 w-72 rounded-full bg-[#3055CF]/10 blur-3xl" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Phone with real rewards screen */}
          <div className="relative flex justify-center" style={{ perspective: 1200 }}>
            <div className="pointer-events-none absolute inset-0 -z-10 mx-auto h-64 w-64 self-center rounded-full bg-gradient-to-tr from-[#116DFF]/30 to-[#3055CF]/20 blur-3xl" />
            <PhoneMockup image={SCREENSHOTS.rewards} float="animate-floaty" className="rotate-[-4deg]" />
          </div>

          <div>
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-wider text-[#3055CF]">Rewards</span>
              <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-[#16163F] sm:text-5xl">
                Get rewarded for real connection
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[#16163F]/60">
                Every meaningful, in-person interaction earns you points. Put your phone away when
                you&rsquo;re with friends, family, in class, or at an event &mdash; and redeem your presence
                for real rewards from partners in your community.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4">
              {REWARDS.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-4 rounded-3xl border border-[#eef0f7] bg-white p-5 shadow-[0_20px_50px_-32px_rgba(48,85,207,0.4)]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#116DFF]/10 to-[#3055CF]/10 text-[#3055CF]">
                    <r.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#16163F]">{r.title}</h3>
                    <p className="mt-1 text-[#16163F]/60">{r.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
