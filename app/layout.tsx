import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'ParcelIQ — Compare UK Shipping Prices Instantly',
  description: 'Compare Royal Mail, DPD, Evri, DHL and more. AI picks the best carrier for your parcel. Free, instant, no login.',
  keywords: 'parcel comparison UK, cheapest shipping, DPD vs Royal Mail, Evri price, parcel price checker',
  openGraph: {
    title: 'ParcelIQ — UK Shipping Price Comparison',
    description: 'AI-powered carrier comparison. Find the cheapest, fastest, or best-value shipping in seconds.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-mesh" aria-hidden />
        <Navbar />
        <main>{children}</main>
        <footer className="text-center py-8 text-sm" style={{ color: 'var(--text-3)' }}>
          <p>© 2025 ParcelIQ · Prices are indicative — confirm at carrier website before shipping · <a href="/learn" style={{ color: 'var(--accent-2)' }}>Shipping Guide</a></p>
        </footer>
      </body>
    </html>
  )
}
