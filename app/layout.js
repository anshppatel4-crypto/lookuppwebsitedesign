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
          <html lang="en" suppressHydrationWarning>
            <head>
              <script
            dangerouslySetInnerHTML={{
                          __html: 'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServer")&&delete e.error.message,e.error.stack="")try{console.error(e.error)}catch(e){}});'
            }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
                </head>

      <body suppressHydrationWarning>
                  <Providers>
                    <Navbar />

                    <main>
                        {children}
                    </main>

                    <Footer />
                    <Toaster position="top-center" richColors />
                  </Providers>
      </body>
    </html>
   )
}