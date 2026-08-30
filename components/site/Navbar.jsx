'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Menu, X } from 'lucide-react'
import { NAV_LINKS, SITE } from '@/lib/site'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
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
      <motion.header
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-5"
      >
        <nav
          className={cn(
            'flex w-full max-w-3xl items-center justify-between rounded-full transition-all duration-500 ease-out',
            scrolled ? 'h-[58px] bg-white/75 px-4 shadow-[0_10px_40px_-10px_rgba(48,85,207,0.35)] backdrop-blur-2xl sm:px-5' : 'h-[66px] bg-white/55 px-5 shadow-[0_12px_50px_-16px_rgba(48,85,207,0.3)] backdrop-blur-xl sm:px-6',
          )}
        >
          <Link href="/" className="flex items-center gap-2">
            <img src={SITE.logo} alt="Lookupp" className={cn('w-auto transition-all duration-500', scrolled ? 'h-6' : 'h-7')} />
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href
              return (
                <Link key={link.href} href={link.href} className={cn('relative rounded-full px-4 py-2 text-sm font-medium transition-colors', active ? 'text-[#3055CF]' : 'text-[#16163F]/70 hover:text-[#16163F]')}>
                  {active && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-[#3055CF]/10" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                  {link.name}
                </Link>
              )
            })}
          </div>
          <div className="flex items-center gap-2">
            <Link href={SITE.donate} target="_blank" rel="noreferrer" className="group hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#116DFF] to-[#3055CF] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#3055CF]/30 transition-all duration-300 hover:-translate-y-0.5 sm:flex">
              <Heart className="h-4 w-4 fill-white/30" /> Donate
            </Link>
            <button aria-label="Toggle menu" onClick={() => setOpen((value) => !value)} className="flex h-10 w-10 items-center justify-center rounded-full text-[#16163F] transition hover:bg-[#3055CF]/10 md:hidden">
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 flex flex-col bg-white/90 backdrop-blur-2xl md:hidden">
            <motion.nav initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } } }} className="flex flex-1 flex-col items-center justify-center gap-2 px-8">
              {NAV_LINKS.map((link) => (
                <motion.div key={link.href} variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }} className="w-full max-w-sm">
                  <Link href={link.href} className={cn('block rounded-2xl px-6 py-5 text-center font-display text-2xl font-bold transition', pathname === link.href ? 'bg-[#3055CF]/10 text-[#3055CF]' : 'text-[#16163F] hover:bg-[#3055CF]/5')}>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
