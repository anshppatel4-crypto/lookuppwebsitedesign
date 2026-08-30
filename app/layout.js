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

          {/* Curved Banner Below Navbar */}
          <div className="relative w-full flex justify-center">
            <div
              className="
                absolute
                top-0
                left-0
                right-0
                h-[80px]
                bg-gradient-to-b from-[#f8faff] to-[#e9f0ff]
                shadow-[0_4px_12px_rgba(0,0,0,0.08)]
                rounded-b-[60%]
                z-[40]
              "
            ></div>

            <div className="relative mt-[20px] flex justify-center">
              <a
                href='https://docs.google.com/forms/d/e/1FAIpQLSepbxcS2tIcjpWGB9o9PaGBjKm5pvsjW3r4XQbiD_B1rV3c9g/viewform?usp=send_form'
                className="
                  bg-[#3055CF]
                  text-white
                  font-medium
                  tracking-wide
                  text-base
                  py-3 px-8
                  rounded-full
                  shadow-md
                  hover:bg-[#2748b3]
                  transition-all
                  duration-200
                "
              >
                Bring Lookupp to Your Community
              </a>
            </div>
          </div>

          {/* Adjust padding since banner sits below navbar */}
          <main className="pt-[130px]">
            {children}
          </main>

          <Footer />
          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  )
}
