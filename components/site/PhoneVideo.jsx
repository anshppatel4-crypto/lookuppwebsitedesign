'use client'

import { motion } from 'framer-motion'

export default function PhoneVideo({ src, poster, className = '', delay = 0, float = 'animate-floaty' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`${float} ${className}`}
    >
      <div className="relative h-[430px] w-[210px] rounded-[2.8rem] bg-[#0f0f2e] p-[8px] shadow-[0_45px_90px_-35px_rgba(22,22,63,0.7)] ring-1 ring-white/10">
        <div className="absolute left-1/2 top-[16px] z-20 h-[24px] w-[84px] -translate-x-1/2 rounded-full bg-[#0f0f2e]" />
        <div className="relative h-full w-full overflow-hidden rounded-[2.25rem] bg-black">
          <video
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="pointer-events-none absolute inset-[8px] rounded-[2.25rem] bg-gradient-to-tr from-transparent via-white/5 to-white/15" />
      </div>
    </motion.div>
  )
}
