'use client'
import { ExternalLink, Zap, PoundSterling, ShieldCheck, Leaf, Clock, Star, Truck, Trophy } from 'lucide-react'
import type { CarrierQuote } from '@/lib/carriers'

const BADGE_CONFIG = {
  fast:     { label: 'Fastest',   icon: <Zap size={9} />,          cls: 'badge-fast' },
  cheap:    { label: 'Cheapest',  icon: <PoundSterling size={9} />, cls: 'badge-cheap' },
  tracked:  { label: 'Tracked',   icon: <Truck size={9} />,         cls: 'badge-track' },
  eco:      { label: 'Eco',       icon: <Leaf size={9} />,          cls: 'badge-eco' },
  insured:  { label: 'Insured',   icon: <ShieldCheck size={9} />,   cls: 'badge-fast' },
  saturday: { label: 'Sat delivery', icon: <Clock size={9} />,      cls: 'badge-track' },
}

interface Props {
  quote: CarrierQuote
  rank: number
}

export default function QuoteCard({ quote, rank }: Props) {
  const isRec = quote.recommended

  return (
    <div
      className={`card-sm fade-up`}
      style={{
        animationDelay: `${rank * 0.06}s`,
        border: isRec ? '1px solid rgba(16,185,129,0.5)' : undefined,
        background: isRec ? 'linear-gradient(135deg, rgba(16,185,129,0.08), var(--surface-2))' : undefined,
        boxShadow: isRec ? '0 0 0 3px rgba(16,185,129,0.12), 0 4px 24px rgba(16,185,129,0.10)' : undefined,
        padding: '1.1rem 1.25rem',
        position: 'relative',
      }}
    >
      {/* AI Pick badge — top of recommended card */}
      {isRec && (
        <>
          <div style={{
            position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
            background: 'linear-gradient(90deg, #059669, #10b981)',
            color: '#fff',
            padding: '3px 14px', borderRadius: 999, fontSize: '0.65rem', fontWeight: 700,
            letterSpacing: '0.06em', whiteSpace: 'nowrap',
            display: 'flex', alignItems: 'center', gap: 5,
            boxShadow: '0 2px 8px rgba(16,185,129,0.35)',
          }}>
            <Trophy size={9} fill="currentColor" /> AI Pick · Best for this parcel
          </div>
          {/* 1-line AI reasoning */}
          <div style={{
            marginBottom: '0.75rem',
            marginTop: '0.5rem',
            padding: '0.4rem 0.75rem',
            background: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: 8,
            fontSize: '0.72rem',
            color: '#6ee7b7',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <Trophy size={10} style={{ flexShrink: 0, color: '#10b981' }} />
            {quote.aiReason ?? `Cheapest option for parcels under 2kg to mainland UK`}
          </div>
        </>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Logo + name */}
        <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, background: 'var(--surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
          {quote.logo}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)' }}>{quote.name}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>{quote.service}</span>
          </div>

          {/* Badges */}
          <div style={{ display: 'flex', gap: 4, marginTop: 5, flexWrap: 'wrap' }}>
            {quote.badges.map(b => {
              const cfg = BADGE_CONFIG[b]
              return (
                <span key={b} className={`badge ${cfg.cls}`}>
                  {cfg.icon} {cfg.label}
                </span>
              )
            })}
          </div>
        </div>

        {/* Price + days + CTA */}
        <div style={{ flexShrink: 0, textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          <div>
            <span className="price-tag" style={{ color: isRec ? 'var(--green)' : 'var(--text)' }}>
              £{quote.price.toFixed(2)}
            </span>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', marginTop: 1 }}>
              {quote.deliveryText}
            </div>
          </div>

          <a
            href={quote.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={isRec ? 'btn-primary' : 'btn-ghost'}
            style={{ fontSize: '0.78rem', padding: '0.4rem 0.85rem', gap: 5, borderRadius: 8, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
            onClick={() => {
              // Analytics stub — replace with your tracking
              if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).gtag) {
                ((window as unknown as Record<string, unknown>).gtag as Function)('event', 'carrier_click', { carrier: quote.id, price: quote.price })
              }
            }}
          >
            Ship now <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* Features row — collapsed on mobile */}
      {quote.features.length > 0 && (
        <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {quote.features.map(f => (
            <span key={f} style={{ fontSize: '0.7rem', color: 'var(--text-3)', background: 'var(--surface-3)', padding: '2px 8px', borderRadius: 6 }}>
              {f}
            </span>
          ))}
        </div>
      )}

      {quote.note && (
        <p style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: 'var(--amber)', padding: '0.3rem 0.6rem', background: 'var(--amber-dim)', borderRadius: 6 }}>
          ⚠ {quote.note}
        </p>
      )}
    </div>
  )
}
