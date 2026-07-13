'use client'

import { motion } from 'framer-motion'
import { PlayCircle } from 'lucide-react'
import { VIDEOS } from '@/lib/site'
import { Reveal } from './motion'
import PhoneVideo from './PhoneVideo'

export default function Demo() {
  return (
    <section className="relative overflow-hidden bg-[#16163F] py-24">
      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#3055CF]/40 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#116DFF]/30 blur-3xl animate-blob" style={{ animationDelay: '4s' }} />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-[#a9c0ff] backdrop-blur">
            <PlayCircle className="h-4 w-4" /> See it in action
          </span>
          <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            A tap to be present
          </h2>
          <p className="mt-4 text-lg text-white/60">
            Starting or joining a Lookupp Zone takes seconds. Here&rsquo;s how it looks in the app.
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col items-center justify-center gap-12 sm:flex-row sm:items-start sm:gap-16">
          {VIDEOS.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              <PhoneVideo src={v.src} poster={v.poster} delay={i * 0.15} float={i % 2 ? 'animate-floaty2' : 'animate-floaty'} />
              <h3 className="mt-8 font-display text-xl font-bold text-white">{v.title}</h3>
              <p className="mt-2 max-w-[15rem] text-sm text-white/60">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
