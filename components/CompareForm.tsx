'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Package2, ArrowRight, Globe, Weight, Ruler } from 'lucide-react'

export default function CompareForm({ inline = false }: { inline?: boolean }) {
  const router = useRouter()
  const [form, setForm] = useState({
    weightKg:  '1',
    lengthCm:  '30',
    widthCm:   '20',
    heightCm:  '10',
    from:      'SW1',
    to:        'M1',
    isInternational: false,
    priority:  'balanced' as 'cheapest' | 'fastest' | 'balanced',
    isFragile: false,
    value:     '',
  })

  function set(k: string, v: string | boolean) {
    setForm(prev => ({ ...prev, [k]: v }))
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams({
      weightKg:        form.weightKg,
      lengthCm:        form.lengthCm,
      widthCm:         form.widthCm,
      heightCm:        form.heightCm,
      from:            form.from,
      to:              form.to,
      isInternational: String(form.isInternational),
      priority:        form.priority,
      isFragile:       String(form.isFragile),
      value:           form.value,
    })
    router.push(`/compare?${params}`)
  }

  const labelStyle: React.CSSProperties = { fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4, display: 'block' }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* Weight + dims row */}
      <div>
        <label style={labelStyle}><Weight size={10} style={{ display: 'inline', marginRight: 4 }} />Parcel size</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.6rem' }}>
          {[
            { key: 'weightKg', label: 'Weight (kg)', placeholder: '1.5', step: '0.1' },
            { key: 'lengthCm', label: 'Length (cm)', placeholder: '30' },
            { key: 'widthCm',  label: 'Width (cm)',  placeholder: '20' },
            { key: 'heightCm', label: 'Height (cm)', placeholder: '10' },
          ].map(f => (
            <div key={f.key}>
              <label style={{ ...labelStyle, marginBottom: 2 }}>{f.label}</label>
              <input
                type="number"
                min="0.1"
                step={f.step ?? '1'}
                required
                className="input-field"
                placeholder={f.placeholder}
                value={(form as unknown as Record<string, string>)[f.key]}
                onChange={e => set(f.key, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* From / To */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div>
          <label style={labelStyle}>From postcode</label>
          <input className="input-field" placeholder="e.g. SW1A" value={form.from} onChange={e => set('from', e.target.value)} required />
        </div>
        <div>
          <label style={labelStyle}>To postcode / country</label>
          <input className="input-field" placeholder="e.g. M1 or FR" value={form.to} onChange={e => set('to', e.target.value)} required />
        </div>
      </div>

      {/* International toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          type="button"
          role="switch"
          aria-checked={form.isInternational}
          onClick={() => set('isInternational', !form.isInternational)}
          style={{
            width: 40, height: 22, borderRadius: 11, border: 'none', cursor: 'pointer',
            background: form.isInternational ? 'var(--accent)' : 'var(--surface-3)',
            position: 'relative', transition: 'background 0.2s',
          }}
        >
          <span style={{
            position: 'absolute', top: 3, left: form.isInternational ? 21 : 3,
            width: 16, height: 16, borderRadius: '50%', background: '#fff',
            transition: 'left 0.2s',
          }} />
        </button>
        <label style={{ fontSize: '0.85rem', color: 'var(--text-2)', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
          onClick={() => set('isInternational', !form.isInternational)}>
          <Globe size={14} style={{ color: form.isInternational ? 'var(--accent-2)' : 'var(--text-3)' }} />
          International shipment
        </label>
      </div>

      {/* Priority */}
      <div>
        <label style={labelStyle}>What matters most?</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['cheapest', 'balanced', 'fastest'] as const).map(p => (
            <button
              key={p}
              type="button"
              onClick={() => set('priority', p)}
              style={{
                flex: 1, padding: '0.55rem 0', borderRadius: 10, border: '1px solid',
                fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
                background:   form.priority === p ? (p === 'cheapest' ? 'var(--amber-dim)' : p === 'fastest' ? 'var(--green-dim)' : 'var(--accent-dim)') : 'var(--surface-2)',
                borderColor:  form.priority === p ? (p === 'cheapest' ? 'rgba(245,158,11,0.4)' : p === 'fastest' ? 'rgba(16,185,129,0.4)' : 'rgba(59,130,246,0.4)') : 'var(--border-2)',
                color:        form.priority === p ? (p === 'cheapest' ? 'var(--amber)' : p === 'fastest' ? 'var(--green)' : 'var(--accent-2)') : 'var(--text-3)',
              }}
            >
              {p === 'cheapest' ? '💰 Cheapest' : p === 'fastest' ? '⚡ Fastest' : '⭐ Best value'}
            </button>
          ))}
        </div>
      </div>

      {/* Optional: fragile + value */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" id="fragile" checked={form.isFragile} onChange={e => set('isFragile', e.target.checked)}
            style={{ width: 16, height: 16, accentColor: 'var(--accent)', cursor: 'pointer' }} />
          <label htmlFor="fragile" style={{ fontSize: '0.85rem', color: 'var(--text-2)', cursor: 'pointer' }}>Fragile item</label>
        </div>
        <div>
          <input className="input-field" type="number" min="0" step="0.01" placeholder="Declared value £ (optional)"
            value={form.value} onChange={e => set('value', e.target.value)} />
        </div>
      </div>

      <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '0.95rem', borderRadius: 12, gap: 8 }}>
        <Package2 size={17} />
        Compare prices — free
        <ArrowRight size={15} />
      </button>

      <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-3)' }}>
        No login · No spam · Prices updated regularly
      </p>
    </form>
  )
}
