'use client'

import { Mail, Phone, Instagram, Linkedin } from 'lucide-react'
import ContactForm from './ContactForm'
import { Reveal } from './motion'
import { SITE } from '@/lib/site'

export default function ContactSection() {
  const items = [
    { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Phone, label: 'Phone', value: SITE.phone, href: SITE.phoneHref },
    { icon: Instagram, label: 'Instagram', value: SITE.instagramHandle, href: SITE.instagram },
    { icon: Linkedin, label: 'LinkedIn', value: 'Lookupp', href: SITE.linkedin },
  ]
  return (
    <section id="contact" className="bg-[#f6f7fb] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wider text-[#3055CF]">Contact</span>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-[#16163F] sm:text-5xl">
              Let&rsquo;s get in touch
            </h2>
            <p className="mt-4 text-lg text-[#16163F]/60">
              Questions, partnerships, or just want to say hi? We&rsquo;d love to hear from you.
            </p>

            <div className="mt-8 space-y-4">
              {items.map((it) => (
                <a
                  key={it.label}
                  href={it.href}
                  target={it.label === 'Instagram' || it.label === 'LinkedIn' ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-[#eef0f7] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#116DFF]/10 to-[#3055CF]/10 text-[#3055CF]">
                    <it.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-[#16163F]/40">{it.label}</div>
                    <div className="font-semibold text-[#16163F]">{it.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-[2rem] border border-[#eef0f7] bg-white p-8 shadow-[0_30px_80px_-40px_rgba(48,85,207,0.4)]">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
