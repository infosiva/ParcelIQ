'use client'
import { useState } from 'react'
import { Search, ExternalLink } from 'lucide-react'

const CARRIER_TRACK = [
  { name: 'Royal Mail',  url: 'https://www.royalmail.com/track-my-return/labels',     hint: 'RM + 9-digit code (e.g. RM123456789GB)' },
  { name: 'DPD',         url: 'https://www.dpd.co.uk/service/tracking.jsp',            hint: '14-digit parcel number' },
  { name: 'Evri',        url: 'https://www.evri.com/track',                            hint: 'H + 17 characters' },
  { name: 'DHL Express', url: 'https://www.dhl.com/gb-en/home/tracking.html',          hint: '10-digit waybill number' },
  { name: 'Parcelforce', url: 'https://www.parcelforce.com/track-trace',               hint: 'GE + 9 digits + GB' },
  { name: 'UPS',         url: 'https://www.ups.com/track',                             hint: '18-character 1Z tracking number' },
  { name: 'Collect+',    url: 'https://www.collectplus.co.uk/track',                   hint: 'Collect+ parcel number from label' },
]

export default function TrackPage() {
  const [query, setQuery] = useState('')

  // Detect carrier from number format
  function detect(num: string) {
    if (/^RM/i.test(num))           return CARRIER_TRACK[0]
    if (/^\d{14}$/.test(num))       return CARRIER_TRACK[1] // DPD
    if (/^H/i.test(num))            return CARRIER_TRACK[2] // Evri
    if (/^\d{10}$/.test(num))       return CARRIER_TRACK[3] // DHL
    if (/^GE.*GB$/i.test(num))      return CARRIER_TRACK[4] // Parcelforce
    if (/^1Z/i.test(num))           return CARRIER_TRACK[5] // UPS
    return null
  }

  const detected = query.trim() ? detect(query.trim()) : null

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1.25rem 4rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.6rem' }}>Track your parcel</h1>
      <p style={{ color: 'var(--text-2)', marginBottom: '2rem' }}>Enter your tracking number — we&apos;ll detect the carrier.</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: '1rem' }}>
        <input
          className="input-field"
          placeholder="Enter tracking number..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {detected && (
          <a
            href={`${detected.url}?parcelNumber=${encodeURIComponent(query.trim())}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ whiteSpace: 'nowrap', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            Track <ExternalLink size={13} />
          </a>
        )}
        {!detected && <button className="btn-primary" style={{ whiteSpace: 'nowrap', gap: 6 }}><Search size={14} /> Search</button>}
      </div>

      {detected && (
        <div className="ai-card" style={{ padding: '1rem', marginBottom: '1.5rem', textAlign: 'left' }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-2)' }}>Detected: <strong style={{ color: 'var(--text)' }}>{detected.name}</strong></p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginTop: 3 }}>{detected.hint}</p>
        </div>
      )}

      {!detected && query.trim() && (
        <p style={{ color: 'var(--text-3)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          Couldn&apos;t auto-detect carrier. Use the direct links below.
        </p>
      )}

      {/* All carrier links */}
      <div style={{ textAlign: 'left', marginTop: '1.5rem' }}>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
          Track directly with each carrier
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {CARRIER_TRACK.map(c => (
            <a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-sm"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', textDecoration: 'none', transition: 'border-color 0.15s' }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text)' }}>{c.name}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', marginTop: 2 }}>{c.hint}</div>
              </div>
              <ExternalLink size={13} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
