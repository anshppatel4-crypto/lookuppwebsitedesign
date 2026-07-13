'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Heart } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV_LINKS } from '@/lib/site'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className={cn(
          'transition-all duration-300',
          scrolled ? 'glass border-b border-white/40 shadow-sm' : 'bg-transparent'
        )}
      >
        <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-extrabold tracking-tight text-gradient-blue">Lookupp</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => {
              const active = pathname === l.href
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    active ? 'text-[#3055CF]' : 'text-[#16163F]/70 hover:text-[#16163F]'
                  )}
                >
                  {l.name}
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-[#3055CF]/10"
                    />
                  )}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/donate"
              className="group hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#116DFF] to-[#3055CF] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#3055CF]/30 transition-all hover:shadow-xl hover:shadow-[#3055CF]/40 hover:-translate-y-0.5 sm:flex">
              <Heart className="h-4 w-4 fill-white/30" /> Donate
            </Link>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-xl text-[#16163F] md:hidden"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass mx-4 mt-2 overflow-hidden rounded-3xl border border-white/50 p-3 shadow-xl md:hidden"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'block rounded-2xl px-4 py-3 text-base font-medium',
                  pathname === l.href ? 'bg-[#3055CF]/10 text-[#3055CF]' : 'text-[#16163F]'
                )}
              >
                {l.name}
              </Link>
            ))}
            <Link
              href="/donate"
              className="mt-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#116DFF] to-[#3055CF] px-4 py-3 text-base font-semibold text-white"
            >
              <Heart className="h-4 w-4 fill-white/30" /> Donate
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
