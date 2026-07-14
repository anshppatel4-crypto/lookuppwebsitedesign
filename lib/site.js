import { Users, HeartHandshake, Gift, Utensils, GraduationCap, Ticket } from 'lucide-react'

export const SITE = {
  logo: 'https://customer-assets.emergentagent.com/job_people-first-web/artifacts/rzvf67cc_lookupp%20logo.png',
  appStore: 'https://apps.apple.com/us/app/lookupp/id1666548055',
  donate: 'https://www.zeffy.com/en-US/donation-form/67f93c29-8946-410a-8f9d-8d1efca14732',
  calendly: 'https://calendly.com/atiksh-bhan-lookupp/30min',
  ambassadorForm: 'https://forms.gle/mFUJLaHeC9Ja1vBg7',
  instagram: 'https://instagram.com/lookupp.app',
  instagramHandle: '@lookupp.app',
  linkedin: 'https://www.linkedin.com/company/lookupp-app',
  email: 'team@lookupp.net',
  phone: '(910) 264-6023',
  phoneHref: 'tel:+19102646023',
}

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Business Portal', href: '/business' },
  { name: 'Contact', href: '/contact' },
]

export const STEPS = [
  {
    icon: Users,
    title: 'Start a Lookupp Zone',
    desc: 'Start a Lookupp Zone when you are with the people you care about.',
  },
  {
    icon: HeartHandshake,
    title: 'Be present.',
    desc: 'Put down your phone and earn points for every minute you stay off it. If you use your phone for more than three minutes during the zone, you lose the points earned for that zone.',
  },
  {
    icon: Gift,
    title: 'Earn Rewards',
    desc: 'Earn real rewards worth anywhere from $5 to over $100, including free food, cash, event tickets, and more.',
  },
]

export const REWARDS = [
  {
    icon: Utensils,
    title: 'Food & Drinks',
    desc: 'Grab free food and drinks at your favorite local spots for staying present.',
  },
  {
    icon: GraduationCap,
    title: 'Academic Credits',
    desc: 'Earn extra credit and academic perks in the classes that matter most.',
  },
  {
    icon: Ticket,
    title: 'Event Tickets',
    desc: 'Score free tickets to sports, music, and community events near you.',
  },
]

export const TESTIMONIALS = [
  {
    quote: 'This app actually brought my friends and I together.',
    name: 'Maya R.',
    role: 'Lookupp User',
    seed: 'MayaLookupp',
  },
  {
    quote: 'I felt like I was able to spend quality time with my friends without feeling impacted by my screen time.',
    name: 'Jordan T.',
    role: 'Lookupp User',
    seed: 'JordanLookupp',
  },
  {
    quote: 'It made me get off my phone and actually talk to the people I was hanging out with.',
    name: 'Priya S.',
    role: 'Lookupp User',
    seed: 'PriyaLookupp',
  },
  {
    quote: 'When in a zone with my friends I felt as though everyone was more present in the moment and it allowed us to truly enjoy our time together more.',
    name: 'Ethan K.',
    role: 'Lookupp User',
    seed: 'EthanLookupp',
  },
]

// Supporter / recognition logos reused from the existing lookupp.net site.
export const SUPPORTERS = [
  { name: 'Young Futures Grant', src: 'https://static.wixstatic.com/media/016a1b_6a9148561e0549aea31e13cdcdb57064~mv2.png/v1/fill/w_126,h_122,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/blue%20ocean_edited.png' },
  { name: 'Congressional App Challenge', src: 'https://static.wixstatic.com/media/016a1b_cd84a7b6591b409ab0329a3eab419b7a~mv2.png/v1/fill/w_215,h_122,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/016a1b_cd84a7b6591b409ab0329a3eab419b7a~mv2.png' },
  { name: 'Under Pressure Challenge', src: 'https://static.wixstatic.com/media/016a1b_8fdb2cf350a5459189bfaf470a021594~mv2.png/v1/fill/w_133,h_129,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/016a1b_8fdb2cf350a5459189bfaf470a021594~mv2.png' },
  { name: 'Taco Bell Ambition Accelerator', src: 'https://static.wixstatic.com/media/016a1b_5c7ee8b03b7648c4a4737ca7510fe4c5~mv2.png/v1/fill/w_197,h_122,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/016a1b_5c7ee8b03b7648c4a4737ca7510fe4c5~mv2.png' },
  { name: 'YEPex', src: 'https://static.wixstatic.com/media/016a1b_522098ab695846759b53d4ee7adf4b2b~mv2.jpeg/v1/fill/w_248,h_96,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/016a1b_522098ab695846759b53d4ee7adf4b2b~mv2.jpeg' },
]

export const TEAM = [  {
    name: 'Atiksh Bhan',
    role: 'Co-Founder & CEO',
    photo: 'https://customer-assets.emergentagent.com/job_people-first-web/artifacts/neot6d4p_image.png',
  },
  {
    name: 'Samin Bhan',
    role: 'Co-Founder & Advisor',
    photo: 'https://customer-assets.emergentagent.com/job_people-first-web/artifacts/ysu9uem3_image.png',
  },
  {
    name: 'Dr. Ellie Ebrahimi',
    role: 'Research Advisor',
    photo: 'https://customer-assets.emergentagent.com/job_people-first-web/artifacts/yrecrhys_image.png',
  },
  {
    name: 'Crawford Anderson',
    role: 'CFO',
    photo: 'https://customer-assets.emergentagent.com/job_people-first-web/artifacts/w5q2kxrt_image.png',
  },
]


// Real in-app screenshots used inside the hero / rewards phone mockups.
export const SCREENSHOTS = {
  welcome: 'https://customer-assets.emergentagent.com/job_people-first-web/artifacts/4lj9th0e_welcome%20screenshot.webp',
  zone: 'https://customer-assets.emergentagent.com/job_people-first-web/artifacts/jypwrjv7_blue%20screenshot.webp',
  start: 'https://customer-assets.emergentagent.com/job_people-first-web/artifacts/eym2ne2u_IMG_2940.webp',
  rewards: 'https://customer-assets.emergentagent.com/job_people-first-web/artifacts/3u118d2j_rewards%20page%20updated.webp',
}

// Real screen recordings of the app in action.
export const VIDEOS = [
  {
    src: '/videos/starting-zone.mp4',
    poster: '/videos/starting-zone.jpg',
    title: 'Start a Zone',
    desc: 'Kick off a Lookupp Zone and invite everyone to be present.',
  },
  {
    src: '/videos/joining-zone.mp4',
    poster: '/videos/joining-zone.jpg',
    title: 'Join a Zone',
    desc: 'Hop into a friend\u2019s Zone and put your phone down together.',
  },
]

