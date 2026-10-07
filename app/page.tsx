'use client'
import CompareForm from '@/components/CompareForm'
import { MagneticButton } from '@infosiva/shared-ui/modern'
import { ArrowRight, ShieldCheck, Scale, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { logEvent } from '@/components/Telemetry'

const CARRIERS = ['Royal Mail', 'Evri', 'DPD', 'DHL', 'Parcelforce']
const STORIES = [
  { k: 'Compare', t: 'One form, every carrier', d: 'Enter weight, size and route once. See the options side by side.', href: '#compare' },
  { k: 'Explained', t: 'Why this carrier wins', d: 'An AI note explains the trade-off between price, speed and tracking for your parcel.', href: '#compare' },
  { k: 'Guide', t: 'Packing, customs and limits', d: 'Plain-English advice before you pay for postage.', href: '/learn' },
]

export default function Home() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.25rem 3rem' }}>
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', alignItems: 'start' }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>UK parcel price check</p>
          <h1 className="display" style={{ fontSize: 'clamp(2.2rem,6vw,3.6rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--text)', marginBottom: 16 }}>
            Send it for less.<span style={{ display: 'block', color: 'var(--accent)', fontStyle: 'italic' }}>Know why.</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-2)', lineHeight: 1.6, maxWidth: 460, marginBottom: 18 }}>
            Compare UK carriers for your parcel and get a plain explanation of the best pick. Free, no account.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {CARRIERS.map(c => (
              <span key={c} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 999, padding: '6px 14px', fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{c}</span>
            ))}
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <ShieldCheck size={14} aria-hidden /> Prices are indicative. Confirm with the carrier before shipping.
          </p>
        </div>
        <div id="compare" className="card" style={{ padding: 'clamp(14px,3vw,24px)', boxShadow: '0 20px 50px rgba(194,55,26,0.12)' }}>
          <CompareForm />
        </div>
      </motion.section>

      <section aria-label="What you get" style={{ marginTop: '3.5rem', display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))' }}>
        {STORIES.map((s, i) => (
          <motion.article key={s.t} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.45 }}
            className="card" style={{ padding: 20, borderTop: '3px solid var(--accent)' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>{s.k}</p>
            <h2 className="display" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>{s.t}</h2>
            <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.55, marginBottom: 12 }}>{s.d}</p>
            <Link href={s.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, minHeight: 44, fontSize: 14, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}>Read more <ArrowRight size={14} aria-hidden /></Link>
          </motion.article>
        ))}
      </section>

      <section style={{ marginTop: '3rem', textAlign: 'center' }}>
        <MagneticButton onClick={() => { logEvent('cta_compare'); document.getElementById('compare')?.scrollIntoView({ behavior: 'smooth' }) }}
          style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 12, padding: '0 28px', minHeight: 48, fontWeight: 700, fontSize: 15, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <Scale size={16} aria-hidden /> Compare my parcel <Sparkles size={14} aria-hidden />
        </MagneticButton>
      </section>
    </div>
  )
}
