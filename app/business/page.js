'use client'

import { motion } from 'framer-motion'
import { Store, Users, TrendingUp, HeartHandshake } from 'lucide-react'
import { Reveal } from '@/components/site/motion'
import BusinessForm from '@/components/site/BusinessForm'

const BENEFITS = [
  { icon: Users, title: 'Brand Visibility', desc: 'Improve brand visibility by reaching younger demographics (primarily ages 13–21).' },
  { icon: HeartHandshake, title: 'Brand Reputation', desc: 'Improve brand reputation by associating with a movement to improve mental health.' },
  { icon: TrendingUp, title: 'Increased Revenue', desc: 'Increase revenue through improving product distribution and marketing.' },
]

export default function BusinessPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f7f9ff] to-[#eef3ff] py-24 sm:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-[#116DFF]/15 blur-3xl animate-blob" />
          <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-[#3055CF]/15 blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
        </div>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#3055CF]/20 bg-white/60 px-4 py-1.5 text-sm font-medium text-[#3055CF] backdrop-blur"
          >
            <Store className="h-4 w-4" /> Business Portal
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-extrabold tracking-tight text-[#16163F] sm:text-6xl"
          >
            Partner with <span className="text-gradient-blue">Lookupp</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#16163F]/70"
          >
            Reward your community for being present. Offer perks to Lookupp users who put their phones
            away and show up in real life — and turn meaningful moments into loyal customers.
          </motion.p>
        </div>
      </section>

      {/* Benefits */}
      <section className="pb-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }} whileHover={{ y: -8 }}
                className="rounded-3xl border border-[#eef0f7] bg-white p-8 shadow-[0_20px_60px_-38px_rgba(48,85,207,0.4)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#116DFF] to-[#3055CF] text-white shadow-lg shadow-[#3055CF]/30">
                  <b.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-[#16163F]">{b.title}</h3>
                <p className="mt-2 text-[#16163F]/60">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#16163F] sm:text-4xl">
              Business Inquiry
            </h2>
            <p className="mt-3 text-lg text-[#16163F]/60">
              Tell us about your business and we’ll set up a quick call to get you onboarded.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 rounded-[2rem] border border-white bg-white/80 p-8 shadow-[0_30px_80px_-42px_rgba(48,85,207,0.5)] backdrop-blur sm:p-10">
              <BusinessForm />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
