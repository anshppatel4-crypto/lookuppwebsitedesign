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

          <Navbar />

          {/* Glassy Ambassador Banner BELOW NAVBAR */}
          <div className="w-full flex justify-center mt-4">
            <div className="
              backdrop-blur-md
              bg-white/60
              border border-white/40
              shadow-lg
              rounded-xl
              px-6 py-3
              flex items-center justify-center
            ">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSepbxcS2tIcjpWGB9o9PaGBjKm5pvsjW3r4XQbiD_B1rV3c9g/viewform?usp=send_form"
                className="
                  text-[#3055CF]
                  font-semibold
                  text-sm sm:text-base
                  hover:text-[#1f3ea8]
                  transition-colors
                "
              >
                Bring Lookupp to Your Community
              </a>
            </div>
          </div>

          {/* Adjust padding since banner is BELOW navbar */}
          <main className="pt-[40px]">
            {children}
          </main>

          <Footer />
          <Toaster position="top-center" richColors />

        </Providers>
      </body>
    </html>
  )
}
