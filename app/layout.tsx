import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import FloatingChat from '@/components/FloatingChat'
import FeedbackWidget from '@/components/FeedbackWidget'
import Script from 'next/script'
import { loadSiteTheme, buildThemeStyleTag, buildGa4Snippet } from '@/lib/theme-loader'
import { AnimatedBg } from '@/components/AnimatedBg'
import Telemetry from '@/components/Telemetry'
import { getSiteFlags } from '@/lib/flags'

import { MotionProvider } from "@infosiva/shared-ui/modern";
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
  other: {
    'google-adsense-account': 'ca-pub-4237294630161176',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const flags = await getSiteFlags('parceliq')
  const theme = await loadSiteTheme('parceliq')
  const ga4 = buildGa4Snippet(theme)
  return (
    <html lang="en" data-layout={theme?.layout?.archetype ?? 'default'}>
      <head>
        <style id="site-theme" dangerouslySetInnerHTML={{ __html: buildThemeStyleTag(theme) }} />
        {ga4 && <script dangerouslySetInnerHTML={{ __html: ga4 }} />}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4237294630161176"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
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
        <AnimatedBg theme={theme} fallback="aurora" />
        <Telemetry />
        <Navbar />
        <main><MotionProvider>{children}</MotionProvider></main>
        {flags.chatbot && <FloatingChat />}
        <FeedbackWidget siteName="ParcelIQ" position="left" />
        <footer style={{ textAlign: 'center', padding: '2rem 1rem', fontSize: '0.8125rem', color: 'var(--text-3)', borderTop: '1px solid var(--border-2)' }}>
          <p>© 2026 ParcelIQ · Prices are indicative — confirm at carrier website before shipping · <a href="/learn" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Shipping Guide</a> · <a href="/privacy" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Privacy</a></p>
        </footer>
      </body>
    </html>
  )
}
