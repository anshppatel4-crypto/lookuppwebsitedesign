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
          <div className="fixed top-0 left-0 right-0 z-[60] w-full bg-[#E8F0FE] border-b border-[#D0DAE8]">
            <div className="max-w-6xl mx-auto flex items-center justify-center py-3 px-4">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSepbxcS2tIcjpWGB9o9PaGBjKm5pvsjW3r4XQbiD_B1rV3c9g/viewform?usp=send_form"
                className="
                  bg-[#3A63D9]
                  text-white
                  font-semibold
                  text-sm sm:text-base
                  py-2.5 px-6
                  rounded-lg
                  shadow-sm
                  hover:bg-[#2f55c4]
                  transition-all
                  duration-200
                "
              >
                Bring Lookupp to Your Community
              </a>
            </div>
          </div>

          <Navbar />

          {/* Extra padding for banner + navbar */}
          <main className="pt-[140px]">
            {children}
          </main>

          <Footer />
          <Toaster position="top-center" richColors />

        </Providers>
      </body>
    </html>
  )
}

