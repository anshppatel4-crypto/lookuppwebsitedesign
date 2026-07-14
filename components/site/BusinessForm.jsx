'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2, CalendarCheck } from 'lucide-react'
import { SITE } from '@/lib/site'

export default function BusinessForm() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', business: '', email: '', phone: '', reward: '',
  })
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.firstName || !form.business || !form.email) {
      toast.error('Please fill in First Name, Business, and Email.')
      return
    }
    setLoading(true)
    try {
      // 1. Store the submission first so no business info is ever lost.
      await fetch('/api/business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, businessName: form.business, contactName: `${form.firstName} ${form.lastName}`.trim() }),
      })

      // 2. Email the submission to team@lookupp.net via Formspree.
      const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT
      if (endpoint) {
        await fetch(endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, _subject: `New business inquiry from ${form.business}` }),
        })
      }

      // 3. Redirect to Calendly to schedule a call.
      toast.success('Submission received! Redirecting you to schedule a call…')
      setTimeout(() => { window.location.href = SITE.calendly }, 1200)
    } catch (err) {
      toast.error('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const field = 'h-12 rounded-xl border-[#e2e5f0] bg-white/70'

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>First Name *</Label>
          <Input value={form.firstName} onChange={set('firstName')} className={field} placeholder="Jane" />
        </div>
        <div className="space-y-2">
          <Label>Last Name</Label>
          <Input value={form.lastName} onChange={set('lastName')} className={field} placeholder="Doe" />
        </div>
        <div className="space-y-2">
          <Label>Business *</Label>
          <Input value={form.business} onChange={set('business')} className={field} placeholder="Acme Coffee Co." />
        </div>
        <div className="space-y-2">
          <Label>Email *</Label>
          <Input type="email" value={form.email} onChange={set('email')} className={field} placeholder="jane@acme.com" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Phone</Label>
          <Input value={form.phone} onChange={set('phone')} className={field} placeholder="(555) 123-4567" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Reward</Label>
        <Textarea value={form.reward} onChange={set('reward')} rows={3} className="rounded-xl border-[#e2e5f0] bg-white/70" placeholder="What reward would you like to offer? (e.g. free drinks, discounts, merch)" />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-[#116DFF] to-[#3055CF] py-6 text-base font-semibold text-white shadow-lg shadow-[#3055CF]/30 transition hover:-translate-y-0.5 hover:shadow-xl"
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><CalendarCheck className="mr-2 h-5 w-5" /> Send &amp; Schedule a Call</>}
      </Button>
      <p className="text-center text-xs text-[#16163F]/50">After submitting, you&rsquo;ll be redirected to book a 30-minute call with our team.</p>
    </form>
  )
}
