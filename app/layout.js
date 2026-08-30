import './globals.css'
import { Providers } from './providers'
import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://lookupp.net'),
    title: 'Lookupp | People > Screens',
    description: 'Lookupp is a youth-led nonprofit helping people build healthier digital habits by rewarding face-to-face interaction.',
    keywords: ['Lookupp', 'nonprofit', 'screen time', 'digital wellness', 'youth', 'presence', 'rewards'],
    openGraph: {
          title: 'Lookupp | People > Screens',
          description: 'Lookupp is a youth-led nonprofit helping people build healthier digital habits by rewarding face-to-face interaction.',
          type: 'website',
          siteName: 'Lookupp',
    },
    twitter: {
          card: 'summary_large_image',
          title: 'Lookupp | People > Screens',
          description: 'Lookupp is a youth-led nonprofit helping people build healthier digital habits by rewarding face-to-face interaction.',
    },
}

export default function RootLayout({ children }) {
    return (
          >html lang="en" suppressHydrationWarning>
            >head>
              >script
            dangerouslySetInnerHTML={{
                          __html: 'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);',
            }}
        />
        >link rel="preconnect" href="https://fonts.googleapis.com" />
                  >link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                  >link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
                >/head>
      >/head>

      >body suppressHydrationWarning>
                  >Providers>
                    >Navbar />

                    >div
            className="
                            w-full
              pt-8 sm:pt-10
              pb-10
              flex
              flex-col
              items-center
              text-center
              space-y-4
              bg-gradient-to-b from-[#ffffff] to-[#f3f6ff]
              rounded-b-[140px]
            "
                        >
                          >p
              className="font-display text-[#3055CF] font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight px-6 max-w-4xl leading-tight"
            >
                              Bring Lookupp to Your Community
            >/p>

            >a
              href="https://docs.google.com/forms/d/e/1FAIpQLSepbxcS2tIcjpWGB9o9PaGBjKm5pvsjW3r4XQbiD_B1rV3c9g/viewform?usp=send_form"
              className="bg-[#3055CF] text-white font-medium text-lg sm:text-xl py-3.5 px-10 rounded-full shadow-md hover:bg-[#2748b3] transition-all duration-200"
            >
                              Apply to Be an Ambassador 
            >/a>
          >/div>

          >main>
              {children}
          >/main>

          >Footer />
                          >Toaster position="top-center" richColors />
                        >/Providers>
      >/body>
    >/html>
  )
}
