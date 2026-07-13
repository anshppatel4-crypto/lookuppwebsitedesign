'use client'

import { motion } from 'framer-motion'

export default function PhoneMockup({ className = '', image, alt = 'Lookupp app screenshot', tone = 'blue', delay = 0, float = 'animate-floaty', label = false }) {
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
      <div className="relative w-[200px] h-[420px] rounded-[2.8rem] bg-[#0f0f2e] p-[8px] shadow-[0_40px_80px_-30px_rgba(22,22,63,0.6)] ring-1 ring-white/10">
        {/* notch */}
        <div className="absolute left-1/2 top-[16px] z-20 h-[24px] w-[84px] -translate-x-1/2 rounded-full bg-[#0f0f2e]" />
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2.25rem] bg-white">
          {image ? (
            <img src={image} alt={alt} loading="lazy" className="h-full w-full object-cover" />
          ) : (
            <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${screens[tone]}`}>
              {label && (
                <div className={`px-6 text-center ${textColor}`}>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                    <span className="font-display text-2xl font-extrabold">L</span>
                  </div>
                  <p className="text-[13px] font-semibold leading-snug opacity-95">Updated App Screenshot Placeholder</p>
                </div>
              )}
            </div>
          )}
        </div>
        {/* subtle screen glare */}
        <div className="pointer-events-none absolute inset-[8px] rounded-[2.25rem] bg-gradient-to-tr from-transparent via-white/5 to-white/20" />
      </div>
    </motion.div>
  )
}
