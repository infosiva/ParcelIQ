import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import FloatingChat from '@/components/FloatingChat'
import Script from 'next/script'
import { ThemeLoader } from '@/lib/theme-loader-client'

export const metadata: Metadata = {
  metadataBase: new URL('https://parceliq.app'),
  title: 'ParcelIQ — UK Parcel Price Comparison | Find Cheapest Shipping',
  description: 'Find the cheapest UK shipping in 10 seconds — AI explains why one carrier beats the rest. Compare Royal Mail, Evri, DPD, DHL, Parcelforce and more. Free, instant, no login.',
  keywords: ['parcel comparison UK', 'cheapest UK shipping', 'DPD vs Royal Mail', 'Evri price', 'parcel price checker', 'UK shipping comparison', 'Royal Mail vs Evri'],
  openGraph: {
    title: 'ParcelIQ — UK Parcel Price Comparison | Find Cheapest Shipping',
    description: 'AI explains why one carrier beats the rest. Compare Royal Mail, Evri, DPD, DHL and more — free, instant, no login.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'ParcelIQ — UK parcel price comparison' }],
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
        <ThemeLoader />
        <div className="bg-mesh" aria-hidden />
        <Navbar />
        <main>{children}</main>
        <FloatingChat />
        <footer style={{ textAlign: 'center', padding: '2rem 1rem', fontSize: '0.8125rem', color: 'rgba(6,78,59,0.40)', borderTop: '1px solid rgba(5,150,105,0.10)' }}>
          <p>© 2025 ParcelIQ · Prices are indicative — confirm at carrier website before shipping · <a href="/learn" style={{ color: 'rgba(5,150,105,0.70)', textDecoration: 'none' }}>Shipping Guide</a> · <a href="/privacy" style={{ color: 'rgba(5,150,105,0.70)', textDecoration: 'none' }}>Privacy</a></p>
        </footer>
        <Script defer data-site="parceliq.app" src="http://31.97.56.148:3098/t.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
