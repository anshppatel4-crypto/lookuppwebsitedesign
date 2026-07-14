'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/site/motion'
import Supporters from '@/components/site/Supporters'
import { TEAM, SITE } from '@/lib/site'

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-[#116DFF]/15 blur-3xl animate-blob" />
          <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-[#3055CF]/15 blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
        </div>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-5xl font-extrabold tracking-tight text-[#16163F] sm:text-7xl"
          >
            People <span className="text-gradient-blue">&gt;</span> Screens
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#16163F]/70"
          >
            Lookupp is a youth-led, community-powered nonprofit and mobile app that aims to address the
            growing issue of social disconnection. The app rewards users for putting down their phones
            when it matters most: when they are with their friends and family. By promoting presence
            during face-to-face interaction, we aim to foster healthy digital habits and improved relationships.
          </motion.p>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#f6f7fb] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-[#3055CF]">The Board</span>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-[#16163F] sm:text-5xl">
              Meet the Board
            </h2>
          </Reveal>
          <div className="mx-auto mt-14 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -8 }}
                className="overflow-hidden rounded-3xl border border-white bg-white p-8 text-center shadow-[0_25px_70px_-40px_rgba(48,85,207,0.5)]"
              >
                <div className="mx-auto h-28 w-28 overflow-hidden rounded-full bg-gradient-to-br from-[#116DFF]/15 to-[#3055CF]/15 ring-4 ring-[#3055CF]/10">
                  <img src={m.photo} alt={m.name} className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-[#16163F]">{m.name}</h3>
                <p className="mt-1 inline-block rounded-full bg-[#3055CF]/10 px-3 py-1 text-sm font-semibold text-[#3055CF]">{m.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#116DFF] to-[#3055CF] p-10 text-white shadow-2xl shadow-[#3055CF]/30 sm:p-16">
              <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
              <div className="relative max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur">
                  <Sparkles className="h-4 w-4" /> Get Involved
                </div>
                <h2 className="mt-5 font-display text-3xl font-extrabold sm:text-4xl">
                  Become a Lookupp Ambassador
                </h2>
                <p className="mt-4 text-lg text-white/80">
                  Want to bring Lookupp to your community? Join the movement and apply to be an ambassador!
                </p>
                <a
                  href={SITE.ambassadorForm}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-[#3055CF] shadow-lg transition hover:-translate-y-0.5"
                >
                  Become a Lookupp Ambassador
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="bg-[#f6f7fb]">
        <Supporters compact />
      </div>
    </div>
  )
}
