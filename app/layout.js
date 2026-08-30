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

          {/* Curved banner below navbar */}
          <div className="relative w-full flex justify-center mt-[80px]">
            <div
              className="
                absolute
                top-0
                left-0
                right-0
                h-[140px]
                bg-gradient-to-b from-[#ffffff] to-[#f3f6ff]
                backdrop-blur-md
                shadow-[0_8px_20px_rgba(0,0,0,0.08)]
                rounded-b-[120px]
                z-[30]
              "
            ></div>

            <div className="relative mt-[50px] flex flex-col items-center space-y-4 z-[40]">
              <p className="text-[#3055CF] font-extrabold text-3xl sm:text-4xl tracking-wide">
                Bring Lookupp to Your Community
              </p>

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSepbxcS2tIcjpWGB9o9PaGBjKm5pvsjW3r4XQbiD_B1rV3c9g/viewform?usp=send_form"
                className="
                  bg-[#3055CF]
                  text-white
                  font-semibold
                  text-lg sm:text-xl
                  py-3.5 px-10
                  rounded-full
                  shadow-md
                  hover:bg-[#2748b3]
                  transition-all
                  duration-200
                "
              >
                Apply to Be an Ambassador →
              </a>
            </div>
          </div>

          {/* Push content down so banner doesn’t overlap */}
          <main className="pt-[220px]">
            {children}
          </main>

          <Footer />
          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  )
}
