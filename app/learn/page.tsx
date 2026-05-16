import { Package2, Weight, Globe, ShieldCheck, Clock } from 'lucide-react'

const GUIDES = [
  {
    icon: <Weight size={22} />,
    title: 'How to weigh and measure your parcel',
    body: 'Use a kitchen scale for parcels under 5kg. For larger items, bathroom scales work. Measure L×W×H with a tape measure — carriers use volumetric weight (L×W×H ÷ 5000) if it\'s higher than actual weight. Always round up to the nearest whole cm and 0.1kg.',
  },
  {
    icon: <Package2 size={22} />,
    title: 'Choosing the right packaging',
    body: 'Double-wall cardboard for items over 2kg or fragile goods. Jiffy bags for soft items under 500g. Never leave void space — fill with bubble wrap or paper. Tape all seams. Write addresses clearly and include a return label inside the box in case the outer label gets damaged.',
  },
  {
    icon: <Globe size={22} />,
    title: 'International shipping from the UK',
    body: 'Post-Brexit, all EU shipments need a customs declaration (CN22 or CN23). Most carriers generate this automatically at booking. Declare the accurate item value — under-declaring can cause customs delays or fines. For high-value items (£250+), consider DHL or UPS for dedicated customs clearance.',
  },
  {
    icon: <ShieldCheck size={22} />,
    title: 'Parcel insurance and compensation',
    body: 'Royal Mail Tracked 24/48 covers up to £100 by default. DPD includes £100 standard cover. DHL and UPS offer higher limits with add-on insurance. Evri\'s standard compensation is lower — consider adding their Protection service for items over £50. Always keep the original receipt for claims.',
  },
  {
    icon: <Clock size={22} />,
    title: 'Understanding delivery speeds',
    body: '"Next day" means next business day if dropped off before the carrier cut-off (usually 5-6pm for parcelshops, earlier for collection). Bank holidays don\'t count. Saturday delivery usually costs extra. International "2-3 days" is customs clearance at origin — allow 1-2 more days for any delays.',
  },
]

export default function LearnPage() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1.25rem 4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '0.6rem' }}>UK Shipping Guide</h1>
        <p style={{ color: 'var(--text-2)', fontSize: '0.95rem' }}>Everything you need to know to ship your parcel safely and affordably.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {GUIDES.map(g => (
          <div key={g.title} className="card-sm" style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }}>{g.icon}</div>
              <div>
                <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)', marginBottom: '0.5rem' }}>{g.title}</h2>
                <p style={{ fontSize: '0.87rem', color: 'var(--text-2)', lineHeight: 1.65 }}>{g.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="ai-card" style={{ marginTop: '2rem', padding: '1.25rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--text)', fontWeight: 600, marginBottom: '0.6rem' }}>Ready to compare prices?</p>
        <a href="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', padding: '0.6rem 1.4rem' }}>
          <Package2 size={15} /> Get instant quotes
        </a>
      </div>
    </div>
  )
}
