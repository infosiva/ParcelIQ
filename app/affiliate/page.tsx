import { PoundSterling, TrendingUp, Users, Package2 } from 'lucide-react'

export default function AffiliatePage() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1.25rem 4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '0.6rem' }}>Partner with ParcelIQ</h1>
        <p style={{ color: 'var(--text-2)', fontSize: '0.95rem', maxWidth: 500, margin: '0 auto' }}>
          Got a shipping-related business, blog, or audience? Earn commissions by sending shippers our way.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { icon: <PoundSterling size={22} />, stat: 'Up to £2/booking', label: 'Commission per referred shipment' },
          { icon: <TrendingUp size={22} />,    stat: 'Real-time',         label: 'Earnings dashboard with click tracking' },
          { icon: <Users size={22} />,          stat: 'No minimum',       label: 'Payout from first referral' },
          { icon: <Package2 size={22} />,       stat: '7 carriers',       label: 'All major UK carriers tracked' },
        ].map(s => (
          <div key={s.label} className="card-sm" style={{ padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--accent)', marginBottom: 8, display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text)', marginBottom: 4 }}>{s.stat}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: '2rem' }}>
        <h2 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text)', marginBottom: '1.25rem' }}>Apply to partner</h2>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {[
            { label: 'Your name',        placeholder: 'Jane Smith',                  type: 'text'  },
            { label: 'Email address',    placeholder: 'jane@yourblog.co.uk',          type: 'email' },
            { label: 'Website / channel', placeholder: 'https://yourblog.co.uk',     type: 'url'   },
            { label: 'Monthly audience', placeholder: 'e.g. 5,000 monthly visitors', type: 'text'  },
          ].map(f => (
            <div key={f.label}>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-3)', marginBottom: 4, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</label>
              <input type={f.type} className="input-field" placeholder={f.placeholder} />
            </div>
          ))}
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', marginTop: 4 }}>
            Submit application
          </button>
        </form>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-3)', marginTop: '0.75rem', textAlign: 'center' }}>
          We aim to respond within 48 hours. Spam-free — your email stays with us.
        </p>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.1rem 1.25rem', borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--border-2)' }}>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--text)' }}>Carrier affiliates:</strong> ParcelIQ earns from carrier affiliate programmes including Royal Mail, DPD, Evri, DHL, Parcelforce, UPS and Collect+. These commissions fund the free service and never affect the order of results — cheapest always shown first when selected.
        </p>
      </div>
    </div>
  )
}
