import CompareForm from '@/components/CompareForm'
import { Package2, ShieldCheck, Zap, TrendingDown, Globe, Star } from 'lucide-react'

const CARRIERS = [
  { logo: '👑', name: 'Royal Mail' },
  { logo: '📦', name: 'Evri' },
  { logo: '🚐', name: 'DPD' },
  { logo: '🟡', name: 'DHL Express' },
  { logo: '🔴', name: 'Parcelforce' },
  { logo: '🏪', name: 'Collect+' },
  { logo: '🟤', name: 'UPS' },
]

const FEATURES = [
  { icon: <TrendingDown size={20} />, title: 'Real prices, no fluff', body: 'Live rate cards from 7 carriers. We show the actual price you\'ll pay, not a teaser.' },
  { icon: <Zap size={20} />, title: 'AI picks the winner', body: 'Tell us if you want cheapest, fastest, or best all-rounder. AI explains the recommendation.' },
  { icon: <Globe size={20} />, title: 'UK & international', body: 'Domestic and worldwide quotes in one comparison. Customs info included.' },
  { icon: <ShieldCheck size={20} />, title: 'Tracking & cover', body: 'We flag which carriers include tracking, insurance, and signature as standard.' },
]

const REVIEWS = [
  { text: 'Saved £3.50 on a single package vs what I normally pay. Booked DPD in 30 seconds.', name: 'Sarah M, Manchester' },
  { text: 'Finally a comparison site that isn\'t bloated. Entered my parcel dims, got 7 quotes instantly.', name: 'James T, London' },
  { text: 'Used it for an international parcel. The DHL vs Royal Mail comparison was really clear.', name: 'Priya K, Birmingham' },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1.25rem 2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
        <div>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '0.3rem 0.85rem', borderRadius: 999,
            background: 'var(--accent-dim)', border: '1px solid rgba(59,130,246,0.2)',
            fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-2)', marginBottom: '1.25rem',
          }}>
            <Star size={11} fill="currentColor" /> 7 carriers compared instantly
          </div>

          <h1 style={{ fontSize: 'clamp(1.9rem,4vw,2.8rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '1rem' }}>
            Ship smarter.<br />
            <span style={{ background: 'linear-gradient(135deg, var(--accent), var(--purple))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Pay less.
            </span>
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-2)', lineHeight: 1.6, marginBottom: '1.75rem', maxWidth: 420 }}>
            Compare Royal Mail, DPD, DHL, Evri and more in seconds.
            AI finds the cheapest, fastest, or best-value carrier for your parcel.
          </p>

          {/* Carrier logos */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '2rem' }}>
            {CARRIERS.map(c => (
              <div key={c.name} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '0.35rem 0.75rem', borderRadius: 8,
                background: 'var(--surface-2)', border: '1px solid var(--border-2)',
                fontSize: '0.78rem', color: 'var(--text-3)',
              }}>
                <span>{c.logo}</span> {c.name}
              </div>
            ))}
          </div>

          {/* Trust stats */}
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[['Free', 'always'], ['7', 'carriers'], ['0', 'signup needed']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)' }}>{n}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
            <Package2 size={18} style={{ color: 'var(--accent)' }} />
            <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>Get instant quotes</span>
          </div>
          <CompareForm />
        </div>
      </section>

      {/* Features */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1.25rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: '2rem' }}>
          Why ParcelIQ?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {FEATURES.map(f => (
            <div key={f.title} className="card-sm" style={{ padding: '1.25rem' }}>
              <div style={{ color: 'var(--accent)', marginBottom: '0.6rem' }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)', marginBottom: 4 }}>{f.title}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.55 }}>{f.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '1rem 1.25rem 4rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: '2rem' }}>
          What shippers say
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {REVIEWS.map(r => (
            <div key={r.name} className="card-sm" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', gap: 2, marginBottom: '0.6rem' }}>
                {Array(5).fill(0).map((_, i) => <Star key={i} size={12} fill="var(--amber)" style={{ color: 'var(--amber)' }} />)}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-2)', lineHeight: 1.55, marginBottom: '0.6rem' }}>&ldquo;{r.text}&rdquo;</p>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-3)' }}>{r.name}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
