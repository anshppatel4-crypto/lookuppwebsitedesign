'use client'

import { motion } from 'framer-motion'
import { Heart, PhoneOff, Users, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/site/motion'

const AMOUNTS = [15, 25, 50, 100]
const DONATE_URL = 'mailto:team@lookupp.net?subject=I%20want%20to%20support%20Lookupp'

export default function DonatePage() {
  return (
    <div>
      <section className="relative overflow-hidden py-24 sm:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-[#116DFF]/15 blur-3xl animate-blob" />
          <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-[#3055CF]/20 blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
        </div>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#3055CF]/20 bg-white/60 px-4 py-1.5 text-sm font-medium text-[#3055CF] backdrop-blur"
          >
            <Heart className="h-4 w-4 fill-[#3055CF]/20" /> Support the mission
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-extrabold tracking-tight text-[#16163F] sm:text-6xl"
          >
            Help people <span className="text-gradient-blue">look up</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#16163F]/70"
          >
            Lookupp is a youth-led nonprofit. Every donation helps us reward more screen-free moments,
            reach more communities, and build healthier digital habits for the next generation.
          </motion.p>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <div className="rounded-[2.5rem] border border-white bg-white p-8 shadow-[0_30px_80px_-42px_rgba(48,85,207,0.5)] sm:p-12">
              <h2 className="font-display text-2xl font-bold text-[#16163F]">Choose an amount</h2>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {AMOUNTS.map((a) => (
                  <a
                    key={a}
                    href={DONATE_URL}
                    className="group flex items-center justify-center rounded-2xl border-2 border-[#e2e5f0] bg-white py-6 font-display text-2xl font-bold text-[#16163F] transition hover:border-[#3055CF] hover:bg-[#3055CF]/5 hover:text-[#3055CF]"
                  >
                    ${a}
                  </a>
                ))}
              </div>
              <a
                href={DONATE_URL}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#116DFF] to-[#3055CF] py-5 text-lg font-semibold text-white shadow-lg shadow-[#3055CF]/30 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Heart className="h-5 w-5 fill-white/30" /> Donate now
              </a>
              <p className="mt-4 text-center text-sm text-[#16163F]/50">
                Prefer another way to give? Email us at{' '}
                <a href="mailto:team@lookupp.net" className="font-semibold text-[#3055CF]">team@lookupp.net</a>.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              { icon: PhoneOff, title: 'More screen-free hours', desc: 'Fund rewards that get people present.' },
              { icon: Users, title: 'More communities', desc: 'Bring Lookupp to more schools and towns.' },
              { icon: Sparkles, title: 'A youth-led future', desc: 'Empower students leading the movement.' },
            ].map((it, i) => (
              <Reveal key={it.title} delay={i * 0.1}>
                <div className="h-full rounded-3xl border border-[#eef0f7] bg-white p-6">
                  <it.icon className="h-7 w-7 text-[#3055CF]" />
                  <h3 className="mt-4 font-display font-bold text-[#16163F]">{it.title}</h3>
                  <p className="mt-1 text-sm text-[#16163F]/60">{it.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
