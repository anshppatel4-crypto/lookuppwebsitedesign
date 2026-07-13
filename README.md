# Lookupp — People &gt; Screens

A production-quality, mobile-first redesign of the Lookupp nonprofit website. Built with **Next.js (App Router)**, **React**, **Tailwind CSS**, **Framer Motion**, **shadcn/ui**, and **Lucide** icons. Brand palette extracted from the original lookupp.net (navy `#16163F`, royal blue `#3055CF`, bright blue `#116DFF`).

## Pages
- **Home** — hero with floating 3D phone mockups, How Lookupp Works, Rewards, Impact stat, Testimonials carousel, Supporters, Contact.
- **About** — `People &gt; Screens` hero, team cards, "Become a Lookupp Ambassador" section, supporters.
- **Business Portal** — partner value props + business inquiry form (stores data, optional email, then redirects to Calendly).
- **Donate** — always-prominent donate flow.
- **Contact** — full contact section (form + email/phone/Instagram).

---

## Running Locally
```bash
yarn install
yarn dev        # http://localhost:3000
```
Environment variables live in `/app/.env`. `MONGO_URL`, `DB_NAME`, and `NEXT_PUBLIC_BASE_URL` are pre-configured for this environment — do not change them here.

Form submissions are persisted to MongoDB via `/api/contact` and `/api/business` regardless of whether an email service is configured, so **no submission is ever lost**.

---

## Configuration Guide

### 1. Contact form email (EmailJS)
The contact form always saves to the database. To also email `team@lookupp.net` live, fill these in `.env` and restart:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```
1. Create a free account at https://www.emailjs.com
2. Add an email service and a template. In the template, use variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`, `{{to_email}}` and set the recipient to `team@lookupp.net`.
3. Copy the Service ID, Template ID, and Public Key into the vars above.

### 2. Business inquiry form (Formspree + Calendly)
The business form: **(1)** stores the submission in the database, **(2)** optionally forwards it to Formspree (which emails `team@lookupp.net`), then **(3)** redirects the user to Calendly. This ordering guarantees business information is captured **before** scheduling, so nothing is lost even if the user drops off at the Calendly step.

Enable email forwarding:
```
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
```
1. Create a form at https://formspree.io and set the notification email to `team@lookupp.net`.
2. Paste the full form endpoint into the var above.

Change the Calendly link in `/app/lib/site.js` (`SITE.calendly`). Current: `https://calendly.com/atiksh-bhan-lookupp/30min`.

### 3. Replace placeholder app screenshots
The hero uses CSS phone mockups in `/app/components/site/PhoneMockup.jsx` labeled "Updated App Screenshot Placeholder". To use real screenshots, drop images into `/app/public/` and render an `<img>` inside the phone screen `<div>` (replace the label block).

### 4. Replace placeholder team photos
Team members and photos are in `/app/lib/site.js` under `TEAM`. Swap the `photo` URLs (currently DiceBear placeholders) with real image paths (e.g. `/team/atiksh.jpg` placed in `/app/public/team/`).

### 5. Replace supporter logos
Supporter/recognition logos are in `/app/lib/site.js` under `SUPPORTERS` (currently reusing the original lookupp.net logos). Update `src`/`name` there.

### 6. Update contact details / links
All contact info and external links (App Store, ambassador form, Instagram, phone, email) live in `SITE` in `/app/lib/site.js`.

---

## Deploying to Vercel
1. Push the repo to GitHub.
2. Import the project at https://vercel.com/new.
3. Add environment variables in Vercel (Project → Settings → Environment Variables): `MONGO_URL`, `DB_NAME`, and any EmailJS/Formspree keys. Use a hosted MongoDB (e.g. MongoDB Atlas) connection string for `MONGO_URL`.
4. Deploy.

### Connecting a custom domain (lookupp.net)
1. In Vercel → Project → Settings → Domains, add `lookupp.net` and `www.lookupp.net`.
2. At your DNS provider, add the records Vercel shows (an `A` record for the apex domain and a `CNAME` for `www`).
3. Wait for DNS propagation and SSL to provision automatically.

---

## Project Structure
```
app/
  layout.js            # metadata (SEO + Open Graph), Navbar, Footer, Toaster
  page.js              # Home
  about/page.js
  business/page.js
  donate/page.js
  contact/page.js
  api/[[...path]]/route.js   # /api/contact + /api/business (MongoDB)
components/site/
  Navbar, Footer, Hero, HowItWorks, Rewards, Stats, Testimonials,
  Supporters, ContactSection, ContactForm, BusinessForm, PhoneMockup, motion
lib/site.js            # all content + config (links, team, testimonials, supporters)
```

## Notes
- Animations use Framer Motion (fade-ins, slide-ins, hover scaling, floating phones, animated gradient blobs, scroll reveal).
- SEO: title `Lookupp | People > Screens`, meta description, and Open Graph tags in `app/layout.js`.
- All submissions use UUIDs (no Mongo ObjectIDs) for clean JSON.
