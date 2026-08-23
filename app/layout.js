import './globals.css'
import { Providers } from './providers'
import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://lookupp.net'),
  title: 'Lookupp | People > Screens',
  description:
    'Lookupp is a youth-led nonprofit helping people build healthier digital habits by rewarding face-to-face interaction.',
  keywords: ['Lookupp', 'nonprofit', 'screen time', 'digital wellness', 'youth', 'presence', 'rewards'],
  openGraph: {
    title: 'Lookupp | People > Screens',
    description:
      'Lookupp is a youth-led nonprofit helping people build healthier digital habits by rewarding face-to-face interaction.',
    type: 'website',
    siteName: 'Lookupp',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lookupp | People > Screens',
    description:
      'Lookupp is a youth-led nonprofit helping people build healthier digital habits by rewarding face-to-face interaction.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);',
          }}
        />
      </head>

      <body suppressHydrationWarning>
        <Providers>

          {/* Ambassador Banner */}
          <div className="w-full bg-[#116DFF] text-white text-center py-2 px-4 fixed top-0 left-0 right-0 z-[60]">
            <a
              href="https://your-ambassador-form-link.com"
              className="font-medium hover:underline"
            >
              Bring Lookupp to your Community
            </a>
          </div>

          <Navbar />

          {/* Increased padding so banner + navbar don't overlap content */}
          <main className="pt-[120px]">
            {children}
          </main>

          <Footer />
          <Toaster position="top-center" richColors />

        </Providers>
      </body>
    </html>
  )
}
