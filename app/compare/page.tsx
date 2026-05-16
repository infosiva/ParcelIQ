import { getQuotes, aiRecommendationText } from '@/lib/carriers'
import type { ShipmentParams } from '@/lib/carriers'
import QuoteCard from '@/components/QuoteCard'
import CompareForm from '@/components/CompareForm'
import { Sparkles, RotateCcw, Package2 } from 'lucide-react'

interface SearchParams {
  weightKg?: string
  lengthCm?: string
  widthCm?: string
  heightCm?: string
  from?: string
  to?: string
  isInternational?: string
  priority?: string
  isFragile?: string
  value?: string
}

export default async function ComparePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams

  const params: ShipmentParams = {
    weightKg:        parseFloat(sp.weightKg  ?? '1'),
    lengthCm:        parseFloat(sp.lengthCm  ?? '30'),
    widthCm:         parseFloat(sp.widthCm   ?? '20'),
    heightCm:        parseFloat(sp.heightCm  ?? '10'),
    from:            sp.from ?? 'UK',
    to:              sp.to   ?? 'UK',
    isInternational: sp.isInternational === 'true',
    priority:        (sp.priority as ShipmentParams['priority']) ?? 'balanced',
    isFragile:       sp.isFragile === 'true',
    value:           sp.value ? parseFloat(sp.value) : undefined,
  }

  const quotes = getQuotes(params)
  const recommendation = aiRecommendationText(quotes, params)

  const cheapest = [...quotes].sort((a, b) => a.price - b.price)[0]
  const savings   = quotes[quotes.length - 1].price - cheapest.price

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '2rem 1.25rem 4rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.5rem' }}>
          <Package2 size={16} style={{ color: 'var(--accent)' }} />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>
            {params.weightKg}kg · {params.lengthCm}×{params.widthCm}×{params.heightCm}cm ·{' '}
            {params.from} → {params.to} · {params.priority}
          </span>
          <a href="/" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.78rem', color: 'var(--text-3)', textDecoration: 'none' }}>
            <RotateCcw size={12} /> New search
          </a>
        </div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
          {quotes.length} quotes found
          <span style={{ fontSize: '0.85rem', fontWeight: 400, color: 'var(--text-3)', marginLeft: 10 }}>
            Save up to £{savings.toFixed(2)} vs most expensive
          </span>
        </h1>
      </div>

      {/* AI recommendation */}
      <div className="ai-card" style={{ padding: '1.1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <Sparkles size={16} style={{ color: 'var(--accent-2)', flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
            AI Recommendation
          </div>
          <p style={{ fontSize: '0.87rem', color: 'var(--text-2)', lineHeight: 1.55 }}
            dangerouslySetInnerHTML={{ __html: recommendation.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text)">$1</strong>') }}
          />
        </div>
      </div>

      {/* Quote cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {quotes.map((q, i) => (
          <QuoteCard key={q.id} quote={q} rank={i} />
        ))}
      </div>

      {/* Affiliate disclosure */}
      <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.68rem', color: 'var(--text-3)', lineHeight: 1.6 }}>
        Prices shown are indicative based on public rate cards. ParcelIQ may earn a commission when you click carrier links — this never affects the order or accuracy of results.
        Always confirm the final price at the carrier website before shipping.
      </p>

      {/* Try different params */}
      <div className="card" style={{ padding: '1.5rem', marginTop: '2.5rem' }}>
        <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', marginBottom: '1rem' }}>
          Change parcel details
        </h3>
        <CompareForm />
      </div>
    </div>
  )
}
