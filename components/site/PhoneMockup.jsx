'use client'

import { motion } from 'framer-motion'

export default function PhoneMockup({ className = '', tone = 'blue', delay = 0, float = 'animate-floaty', label = true }) {
  const screens = {
    blue: 'from-[#116DFF] to-[#3055CF]',
    navy: 'from-[#3055CF] to-[#16163F]',
    light: 'from-[#eaf1ff] to-[#dbe6ff]',
  }
  const textColor = tone === 'light' ? 'text-[#3055CF]' : 'text-white'
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 12 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`${float} ${className}`}
      style={{ perspective: 1000 }}
    >
      <div className="relative w-[190px] h-[400px] rounded-[2.6rem] bg-[#16163F] p-[10px] shadow-2xl shadow-[#16163F]/30 ring-1 ring-white/10">
        <div className="absolute left-1/2 top-[18px] z-20 h-[26px] w-[90px] -translate-x-1/2 rounded-full bg-[#16163F]" />
        <div className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br ${screens[tone]}`}>
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
          {label && (
            <div className={`px-6 text-center ${textColor}`}>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                <span className="font-display text-2xl font-extrabold">L</span>
              </div>
              <p className="text-[13px] font-semibold leading-snug opacity-95">Updated App Screenshot Placeholder</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
