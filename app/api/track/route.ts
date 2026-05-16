import { NextRequest, NextResponse } from 'next/server'

const CARRIER_PATTERNS: { name: string; pattern: RegExp; trackUrl: string }[] = [
  { name: 'Royal Mail',  pattern: /^RM\d{9}GB$/i,          trackUrl: 'https://www.royalmail.com/track-my-return/labels' },
  { name: 'DPD',         pattern: /^\d{14}$/,              trackUrl: 'https://www.dpd.co.uk/service/tracking.jsp' },
  { name: 'Evri',        pattern: /^H[A-Z0-9]{17}$/i,      trackUrl: 'https://www.evri.com/track' },
  { name: 'DHL Express', pattern: /^\d{10}$/,              trackUrl: 'https://www.dhl.com/gb-en/home/tracking.html' },
  { name: 'Parcelforce', pattern: /^GE\d{9}GB$/i,          trackUrl: 'https://www.parcelforce.com/track-trace' },
  { name: 'UPS',         pattern: /^1Z[A-Z0-9]{16}$/i,     trackUrl: 'https://www.ups.com/track' },
]

export async function GET(req: NextRequest) {
  const num = req.nextUrl.searchParams.get('number')?.trim()
  if (!num) return NextResponse.json({ error: 'Missing tracking number' }, { status: 400 })

  const match = CARRIER_PATTERNS.find(c => c.pattern.test(num))
  if (!match) return NextResponse.json({ carrier: null, trackUrl: null })

  return NextResponse.json({
    carrier: match.name,
    trackUrl: `${match.trackUrl}?parcelNumber=${encodeURIComponent(num)}`,
  })
}
