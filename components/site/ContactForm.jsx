'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2, Send } from 'lucide-react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all fields.')
      return
    }
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const sid = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const tid = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const pk = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      if (sid && tid && pk) {
        const emailjs = (await import('@emailjs/browser')).default
        await emailjs.send(
          sid,
          tid,
          { from_name: form.name, from_email: form.email, message: form.message, to_email: 'team@lookupp.net' },
          { publicKey: pk }
        )
      }

      toast.success("Thanks for reaching out! We'll be in touch soon.")
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-[#16163F]">Name</Label>
        <Input id="name" value={form.name} onChange={set('name')} placeholder="Your name" className="h-12 rounded-xl border-[#e2e5f0] bg-white/70" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-[#16163F]">Email</Label>
        <Input id="email" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" className="h-12 rounded-xl border-[#e2e5f0] bg-white/70" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="text-[#16163F]">Message</Label>
        <Textarea id="message" value={form.message} onChange={set('message')} placeholder="How can we help?" rows={5} className="rounded-xl border-[#e2e5f0] bg-white/70" />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="h-12 w-full rounded-xl bg-gradient-to-r from-[#116DFF] to-[#3055CF] text-base font-semibold text-white shadow-lg shadow-[#3055CF]/30 transition hover:-translate-y-0.5 hover:shadow-xl"
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Send className="mr-2 h-4 w-4" /> Send Message</>}
      </Button>
    </form>
  )
}
