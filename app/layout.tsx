import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import FloatingChat from '@/components/FloatingChat'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://parceliq.app'),
  title: 'ParcelIQ — Cheapest UK Parcel, Found Instantly',
  description: 'Enter weight and destination — AI compares Royal Mail, DPD, Evri, DHL and picks the best-value carrier for your parcel. Free, instant, no login.',
  keywords: ['parcel comparison UK', 'cheapest shipping', 'DPD vs Royal Mail', 'Evri price', 'parcel price checker'],
  openGraph: {
    title: 'ParcelIQ — UK Shipping Price Comparison',
    description: 'AI-powered carrier comparison. Find the cheapest, fastest, or best-value shipping in seconds.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "ParcelIQ",
              "description": "AI-powered UK parcel shipping price comparison tool",
              "applicationCategory": "UtilityApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "GBP"
              }
            })
          }}
        />
      </head>
      <body>
        <div className="bg-mesh" aria-hidden />
        <Navbar />
        <main>{children}</main>
        <FloatingChat />
        <footer className="text-center py-8 text-sm text-blue-300/40 border-t border-blue-500/10">
          <p>© 2025 ParcelIQ · Prices are indicative — confirm at carrier website before shipping · <a href="/learn" className="text-blue-400 hover:text-blue-300">Shipping Guide</a> · <a href="/privacy" className="text-blue-400 hover:text-blue-300">Privacy</a></p>
        </footer>
        <Script defer data-site="parceliq.app" src="http://31.97.56.148:3098/t.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
