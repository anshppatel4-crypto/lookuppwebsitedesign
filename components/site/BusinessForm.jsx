'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Loader2, CalendarCheck } from 'lucide-react'
import { SITE } from '@/lib/site'

const BUSINESS_TYPES = [
  'Restaurant / Café',
  'Retail',
  'Entertainment / Events',
  'Fitness / Wellness',
  'Services',
  'Education',
  'Other',
]

export default function BusinessForm() {
  const [form, setForm] = useState({
    businessName: '', contactName: '', email: '', phone: '', website: '',
    address: '', businessType: '', description: '', rewards: '', notes: '',
  })
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.businessName || !form.contactName || !form.email) {
      toast.error('Please fill in Business Name, Contact Name, and Email.')
      return
    }
    setLoading(true)
    try {
      // 1. Store submission first so no business info is ever lost.
      await fetch('/api/business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      // 2. Optionally forward to Formspree (emails team@lookupp.net) if configured.
      const fs = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT
      if (fs) {
        await fetch(fs, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      }

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
          <Label>Business Name *</Label>
          <Input value={form.businessName} onChange={set('businessName')} className={field} placeholder="Acme Coffee Co." />
        </div>
        <div className="space-y-2">
          <Label>Contact Name *</Label>
          <Input value={form.contactName} onChange={set('contactName')} className={field} placeholder="Jane Doe" />
        </div>
        <div className="space-y-2">
          <Label>Email *</Label>
          <Input type="email" value={form.email} onChange={set('email')} className={field} placeholder="jane@acme.com" />
        </div>
        <div className="space-y-2">
          <Label>Phone</Label>
          <Input value={form.phone} onChange={set('phone')} className={field} placeholder="(555) 123-4567" />
        </div>
        <div className="space-y-2">
          <Label>Website (optional)</Label>
          <Input value={form.website} onChange={set('website')} className={field} placeholder="https://" />
        </div>
        <div className="space-y-2">
          <Label>Business Type</Label>
          <Select value={form.businessType} onValueChange={(v) => setForm((f) => ({ ...f, businessType: v }))}>
            <SelectTrigger className={field}><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent>
              {BUSINESS_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Business Address</Label>
        <Input value={form.address} onChange={set('address')} className={field} placeholder="123 Main St, City, State" />
      </div>
      <div className="space-y-2">
        <Label>Describe Your Business</Label>
        <Textarea value={form.description} onChange={set('description')} rows={3} className="rounded-xl border-[#e2e5f0] bg-white/70" placeholder="Tell us what you do…" />
      </div>
      <div className="space-y-2">
        <Label>What rewards would you like to offer?</Label>
        <Textarea value={form.rewards} onChange={set('rewards')} rows={3} className="rounded-xl border-[#e2e5f0] bg-white/70" placeholder="e.g. free drinks, discounts, exclusive perks…" />
      </div>
      <div className="space-y-2">
        <Label>Additional Notes</Label>
        <Textarea value={form.notes} onChange={set('notes')} rows={2} className="rounded-xl border-[#e2e5f0] bg-white/70" placeholder="Anything else we should know?" />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="h-13 w-full rounded-xl bg-gradient-to-r from-[#116DFF] to-[#3055CF] py-6 text-base font-semibold text-white shadow-lg shadow-[#3055CF]/30 transition hover:-translate-y-0.5 hover:shadow-xl"
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><CalendarCheck className="mr-2 h-5 w-5" /> Submit &amp; Schedule a Call</>}
      </Button>
      <p className="text-center text-xs text-[#16163F]/50">After submitting, you’ll be redirected to book a 30-minute call with our team.</p>
    </form>
  )
}
