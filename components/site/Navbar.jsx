'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Heart } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV_LINKS, SITE } from '@/lib/site'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.header initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.65 }} className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-[18px]">
        <nav className={cn('flex h-[56px] w-full max-w-[1150px] items-center justify-between rounded-full border border-[#d6def8] bg-white/80 px-3 shadow-[0_18px_45px_-20px_rgba(48,85,207,0.42)] backdrop-blur-xl transition-all sm:px-5', scrolled && 'h-[62px] bg-white/90')}>
          <Link href="/" className="flex items-center">
            <img src={SITE.logo} alt="Lookupp" className="h-6 w-auto sm:h-7" />
          </Link>
          <div className="hidden items-center gap-2 md:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href
              return <Link key={link.href} href={link.href} className={cn('rounded-full px-3 py-1.5 text-sm font-medium transition', active ? 'bg-[#edf1fb] text-[#3055cf]' : 'text-[#252548]/75 hover:text-[#252548]')}>{link.name}</Link>
            })}
          </div>
          <div className="flex items-center gap-2">
            <Link href={SITE.donate} target="_blank" rel="noreferrer" className="hidden items-center gap-3 rounded-full bg-gradient-to-r from-[#116dff] to-[#3055cf] px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_24px_-12px_rgba(48,85,207,0.75)] transition hover:-translate-y-0.5 md:flex">
              <Heart className="h-6 w-6" /> Donate
            </Link>
            <button aria-label="Toggle menu" onClick={() => setOpen((value) => !value)} className="flex h-10 w-10 items-center justify-center rounded-full text-[#16163f] md:hidden">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </motion.header>
      <AnimatePresence>
        {open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 flex flex-col bg-white/95 pt-28 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-2 px-6 text-center">
            {NAV_LINKS.map((link) => <Link key={link.href} href={link.href} className={cn('rounded-2xl px-5 py-4 text-xl font-semibold', pathname === link.href ? 'bg-[#edf1fb] text-[#3055cf]' : 'text-[#252548]')}>{link.name}</Link>)}
            <Link href={SITE.donate} target="_blank" rel="noreferrer" className="mt-4 rounded-full bg-[#3055cf] px-5 py-4 text-xl font-semibold text-white">Donate</Link>
          </nav>
        </motion.div>}
      </AnimatePresence>
    </>
  )
}

