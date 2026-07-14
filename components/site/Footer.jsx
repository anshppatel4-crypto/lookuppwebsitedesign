'use client'

import Link from 'next/link'
import { Instagram, Mail, Phone, Heart } from 'lucide-react'
import { SITE } from '@/lib/site'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden bg-[#16163F] text-white">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#3055CF]/30 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <img src={SITE.logo} alt="Lookupp" className="h-9 w-auto brightness-0 invert" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              A youth-led nonprofit rewarding people for being present with those they care about. People &gt; Screens.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">Quick Links</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href={SITE.donate} target="_blank" rel="noreferrer" className="text-white/80 transition hover:text-white">Donate</a></li>
              <li><Link href="/business" className="text-white/80 transition hover:text-white">Business Portal</Link></li>
              <li><Link href="/about" className="text-white/80 transition hover:text-white">About</Link></li>
              <li><Link href="/contact" className="text-white/80 transition hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">Connect</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={SITE.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/80 transition hover:text-white">
                  <Instagram className="h-4 w-4" /> {SITE.instagramHandle}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-white/80 transition hover:text-white">
                  <Mail className="h-4 w-4" /> {SITE.email}
                </a>
              </li>
              <li>
                <a href={SITE.phoneHref} className="flex items-center gap-2 text-white/80 transition hover:text-white">
                  <Phone className="h-4 w-4" /> {SITE.phone}
                </a>
              </li>
            </ul>
            <a
              href={SITE.donate}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#116DFF] to-[#3055CF] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#3055CF]/30 transition hover:-translate-y-0.5"
            >
              <Heart className="h-4 w-4 fill-white/30" /> Support Lookupp
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>© {year} Lookupp. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="transition hover:text-white">Privacy Policy</Link>
            <Link href="#" className="transition hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
