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
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: 'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);' }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <Navbar />
          <div className="w-full bg-gradient-to-b from-[#ffffff] to-[#f3f6ff] pb-10 pt-24 text-center sm:pt-28">
            <p className="font-display px-6 text-4xl font-bold leading-tight tracking-tight text-[#3055CF] sm:text-5xl md:text-6xl">Bring Lookupp to Your Community</p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSepbxcS2tIcjpWGB9o9PaGBjKm5pvsjW3r4XQbiD_B1rV3c9g/viewform?usp=send_form" className="mt-4 inline-block rounded-full bg-[#3055CF] px-10 py-3.5 text-lg font-medium text-white shadow-md transition hover:bg-[#2748b3] sm:text-xl">Apply to Be an Ambassador</a>
          </div>
          <main>{children}</main>
          <Footer />
          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  )
}
