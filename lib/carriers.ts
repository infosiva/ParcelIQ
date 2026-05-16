// Carrier data + pricing engine — fully static so works with no API keys
// Real affiliate links below (replace with your own tracking IDs)

export interface CarrierQuote {
  id:           string
  name:         string
  logo:         string       // emoji fallback
  service:      string
  price:        number       // GBP
  deliveryDays: number       // business days
  deliveryText: string
  maxWeightKg:  number
  maxDimsCm:    [number, number, number]  // L×W×H
  tracking:     'full' | 'basic' | 'none'
  features:     string[]
  badges:       Array<'fast' | 'cheap' | 'tracked' | 'eco' | 'insured' | 'saturday'>
  affiliateUrl: string
  recommended?: boolean
  note?:        string
}

export interface ShipmentParams {
  weightKg:   number
  lengthCm:   number
  widthCm:    number
  heightCm:   number
  from:       string   // UK postcode prefix e.g. "SW1"
  to:         string   // UK postcode prefix or "IE" / "FR" etc.
  isInternational: boolean
  priority:   'cheapest' | 'fastest' | 'balanced'
  isFragile?:  boolean
  value?:      number  // £ declared value
}

// ── Pricing matrix ──────────────────────────────────────
// Real-ish rates as of 2025 (public rate cards)

function royalMailPrice(w: number, vol: number, intl: boolean): number {
  if (intl) return 9.99 + w * 3.5
  if (w <= 0.1 && vol < 5000) return 1.65  // large letter
  if (w <= 0.75) return 3.99
  if (w <= 1.0)  return 5.99
  if (w <= 2.0)  return 7.50
  return 9.00 + (w - 2) * 1.50
}

function evriPrice(w: number, intl: boolean): number {
  if (intl) return 6.99 + w * 2.0
  if (w <= 0.5)  return 2.99
  if (w <= 1.0)  return 3.49
  if (w <= 2.0)  return 3.99
  if (w <= 5.0)  return 4.99
  if (w <= 10.0) return 6.99
  return 9.99
}

function dpdPrice(w: number, intl: boolean): number {
  if (intl) return 14.99 + w * 2.5
  if (w <= 1.0)  return 6.49
  if (w <= 2.0)  return 7.49
  if (w <= 5.0)  return 8.99
  if (w <= 10.0) return 11.99
  return 15.99 + (w - 10) * 0.8
}

function dhlPrice(w: number, intl: boolean): number {
  if (!intl) return dpdPrice(w, false) * 0.95  // DHL domestic = approx DPD
  return 10.99 + w * 3.0
}

function parcelforcePrice(w: number, intl: boolean): number {
  if (intl) return 18.50 + w * 2.0
  if (w <= 2.0)  return 8.99
  if (w <= 5.0)  return 10.99
  if (w <= 10.0) return 14.99
  return 18.99 + (w - 10) * 0.70
}

function upsPrice(w: number, intl: boolean): number {
  if (!intl) return dpdPrice(w, false) * 1.1
  return 13.50 + w * 2.8
}

function collect5Price(w: number): number {
  if (w <= 1.0)  return 2.79
  if (w <= 2.0)  return 3.19
  if (w <= 5.0)  return 4.49
  return 6.49
}

// ── Quote generator ──────────────────────────────────────
export function getQuotes(p: ShipmentParams): CarrierQuote[] {
  const { weightKg: w, lengthCm: l, widthCm: wi, heightCm: h, isInternational: intl } = p
  const vol = l * wi * h

  const quotes: CarrierQuote[] = [
    {
      id: 'royal-mail-tracked-24',
      name: 'Royal Mail',
      logo: '👑',
      service: intl ? 'International Tracked' : 'Tracked 24',
      price: royalMailPrice(w, vol, intl),
      deliveryDays: intl ? 5 : 1,
      deliveryText: intl ? '3-7 business days' : 'Next business day (aim)',
      maxWeightKg: intl ? 20 : 20,
      maxDimsCm: [61, 46, 46],
      tracking: 'full',
      features: ['Door-to-door tracking', 'Delivered to door or PO Box', '£100 compensation'],
      badges: ['tracked', intl ? 'fast' : 'fast'],
      affiliateUrl: 'https://www.royalmail.com/track-my-return',
    },
    {
      id: 'evri-standard',
      name: 'Evri',
      logo: '📦',
      service: intl ? 'Evri International' : 'Parcelshop Drop-off',
      price: evriPrice(w, intl),
      deliveryDays: intl ? 7 : 3,
      deliveryText: intl ? '5-10 business days' : '2-3 business days',
      maxWeightKg: 15,
      maxDimsCm: [120, 60, 60],
      tracking: 'basic',
      features: ['Drop at 7,000+ parcelshops', 'Safe place delivery', 'Named day option'],
      badges: ['cheap'],
      affiliateUrl: 'https://www.evri.com/send-a-parcel',
    },
    {
      id: 'dpd-next-day',
      name: 'DPD',
      logo: '🚐',
      service: intl ? 'DPD Classic International' : 'Next Day',
      price: dpdPrice(w, intl),
      deliveryDays: intl ? 4 : 1,
      deliveryText: intl ? '3-5 business days' : 'Next business day',
      maxWeightKg: 31.5,
      maxDimsCm: [175, 100, 100],
      tracking: 'full',
      features: ['1-hour delivery window SMS', 'Live GPS map tracking', 'In-flight redirect', '£100 standard cover'],
      badges: ['fast', 'tracked'],
      affiliateUrl: 'https://www.dpd.co.uk/content/products_services/next_day_parcel.jsp',
    },
    {
      id: 'dhl-express',
      name: 'DHL Express',
      logo: '🟡',
      service: intl ? 'Express Worldwide' : 'DHL Express',
      price: dhlPrice(w, intl),
      deliveryDays: intl ? 2 : 1,
      deliveryText: intl ? '1-2 business days' : 'Next business day',
      maxWeightKg: 70,
      maxDimsCm: [300, 300, 300],
      tracking: 'full',
      features: ['Full end-to-end tracking', '24/7 customer service', 'GoGreen carbon offset', intl ? 'Customs clearance included' : 'Signature required'],
      badges: intl ? ['fast', 'tracked', 'eco'] : ['tracked'],
      affiliateUrl: 'https://www.dhl.com/gb-en/home/our-divisions/parcel/private-customers/send-a-parcel.html',
    },
    ...(!intl ? [{
      id: 'collect5',
      name: 'Collect+',
      logo: '🏪',
      service: 'Store Drop-off',
      price: collect5Price(w),
      deliveryDays: 3,
      deliveryText: '2-3 business days',
      maxWeightKg: 10,
      maxDimsCm: [60, 50, 50] as [number, number, number],
      tracking: 'basic' as const,
      features: ['Drop at 9,000+ stores inc. Asda', 'No queuing — scan & go', 'Return labels printed in-store'],
      badges: ['cheap'] as Array<'fast' | 'cheap' | 'tracked' | 'eco' | 'insured' | 'saturday'>,
      affiliateUrl: 'https://www.collectplus.co.uk/send',
    }] : []),
    {
      id: 'parcelforce-48',
      name: 'Parcelforce',
      logo: '🔴',
      service: intl ? 'Global Value' : 'Express 48',
      price: parcelforcePrice(w, intl),
      deliveryDays: intl ? 8 : 2,
      deliveryText: intl ? '5-12 business days' : '2 business days',
      maxWeightKg: 30,
      maxDimsCm: [150, 100, 100] as [number, number, number],
      tracking: 'full',
      features: ['Royal Mail Group reliability', 'Saturday delivery available', '£100 standard cover', 'Signature on delivery'],
      badges: ['tracked', 'saturday'],
      affiliateUrl: 'https://www.parcelforce.com/send-a-parcel',
    },
    ...(intl ? [{
      id: 'ups-worldwide',
      name: 'UPS',
      logo: '🟤',
      service: 'Worldwide Expedited',
      price: upsPrice(w, intl),
      deliveryDays: 3,
      deliveryText: '2-5 business days',
      maxWeightKg: 70,
      maxDimsCm: [270, 270, 270] as [number, number, number],
      tracking: 'full' as const,
      features: ['Full customs support', 'Residential delivery', 'Proactive exception management', 'UPS Access Point network'],
      badges: ['tracked', 'fast'] as Array<'fast' | 'cheap' | 'tracked' | 'eco' | 'insured' | 'saturday'>,
      affiliateUrl: 'https://www.ups.com/gb/en/support/shipping-support/shipment-types/parcel.page',
    }] : []),
  ]

  // Mark best value
  const sorted = [...quotes].sort((a, b) => {
    if (p.priority === 'cheapest') return a.price - b.price
    if (p.priority === 'fastest')  return a.deliveryDays - b.deliveryDays
    // balanced = score: lower days + lower price both matter
    const scoreA = a.deliveryDays * 2 + a.price / 5
    const scoreB = b.deliveryDays * 2 + b.price / 5
    return scoreA - scoreB
  })

  sorted[0].recommended = true
  return sorted
}

export function aiRecommendationText(quotes: CarrierQuote[], p: ShipmentParams): string {
  const best = quotes[0]
  const cheapest = [...quotes].sort((a, b) => a.price - b.price)[0]
  const fastest  = [...quotes].sort((a, b) => a.deliveryDays - b.deliveryDays)[0]

  if (p.priority === 'cheapest') {
    return `Best price: **${cheapest.name} ${cheapest.service}** at £${cheapest.price.toFixed(2)}. Saves £${(quotes[quotes.length-1].price - cheapest.price).toFixed(2)} vs most expensive option. ${cheapest.deliveryDays <= 2 ? 'Still arrives quickly.' : 'Slightly slower — ideal if no urgency.'}`
  }
  if (p.priority === 'fastest') {
    return `Fastest: **${fastest.name} ${fastest.service}** — ${fastest.deliveryText}. ${fastest.price > cheapest.price + 5 ? `Premium of £${(fastest.price - cheapest.price).toFixed(2)} over cheapest option.` : 'Barely costs more than slower options.'}`
  }
  return `Best all-rounder: **${best.name} ${best.service}** — £${best.price.toFixed(2)}, ${best.deliveryText}. Full tracking${best.badges.includes('eco') ? ', carbon-neutral' : ''}. ${p.isFragile ? 'Includes compensation cover — wise for fragile items.' : ''}`
}
