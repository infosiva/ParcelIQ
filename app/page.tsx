'use client'
import CompareForm from '@/components/CompareForm'
import { Package2, ShieldCheck, Zap, TrendingDown, Globe, ArrowRight, CheckCircle2, Clock, MapPin } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

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
  {
    icon: <TrendingDown size={22} />,
    title: 'Real prices, no fluff',
    body: 'Live rate cards from 7 carriers. The actual price you\'ll pay, not a teaser.',
    bg: 'rgba(5,150,105,0.06)',
    border: 'rgba(5,150,105,0.15)',
    iconColor: '#059669',
  },
  {
    icon: <Zap size={22} />,
    title: 'AI picks the winner',
    body: 'Cheapest, fastest, or best all-rounder — AI explains the recommendation.',
    bg: 'rgba(4,120,87,0.06)',
    border: 'rgba(4,120,87,0.15)',
    iconColor: '#047857',
  },
  {
    icon: <Globe size={22} />,
    title: 'UK & international',
    body: 'Domestic and worldwide quotes in one view. Customs info included.',
    bg: 'rgba(16,185,129,0.06)',
    border: 'rgba(16,185,129,0.15)',
    iconColor: '#10b981',
  },
  {
    icon: <ShieldCheck size={22} />,
    title: 'Tracking & cover',
    body: 'We flag which carriers include tracking, insurance, and signature.',
    bg: 'rgba(5,150,105,0.04)',
    border: 'rgba(5,150,105,0.12)',
    iconColor: '#059669',
  },
]

const REVIEWS = [
  { text: 'Saved £3.50 on a single package vs what I normally pay. Booked DPD in 30 seconds.', name: 'Sarah M', location: 'Manchester' },
  { text: 'Finally a comparison site that isn\'t bloated. Entered my parcel dims, got 7 quotes instantly.', name: 'James T', location: 'London' },
  { text: 'Used it for an international parcel. The DHL vs Royal Mail breakdown was really clear.', name: 'Priya K', location: 'Birmingham' },
]

const STATS = [
  { value: '7', label: 'Carriers compared live' },
  { value: 'Free', label: 'Always — no signup needed' },
  { value: '30s', label: 'Average comparison time' },
]

// Animated tracking demo data
const TRACKING_STEPS = [
  { icon: <CheckCircle2 size={14} />, label: 'Order collected', time: '09:12', done: true },
  { icon: <MapPin size={14} />, label: 'In transit — Birmingham hub', time: '11:47', done: true },
  { icon: <Clock size={14} />, label: 'Out for delivery', time: '13:20', done: true },
  { icon: <Package2 size={14} />, label: 'Delivered — front door', time: '14:05', done: false },
]

const QUOTE_ROWS = [
  { logo: '🚐', name: 'DPD Next Day', price: '£4.99', tag: 'Fastest', tagColor: '#059669', tagBg: 'rgba(5,150,105,0.10)' },
  { logo: '📦', name: 'Evri Standard', price: '£2.89', tag: 'Cheapest', tagColor: '#d97706', tagBg: 'rgba(217,119,6,0.10)' },
  { logo: '👑', name: 'Royal Mail 2nd', price: '£3.40', tag: 'Reliable', tagColor: '#0284c7', tagBg: 'rgba(2,132,199,0.10)' },
]

function TrackingDemo() {
  const [activeStep, setActiveStep] = useState(0)
  const [showQuotes, setShowQuotes] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(s => {
        if (s < TRACKING_STEPS.length - 1) return s + 1
        setShowQuotes(true)
        return s
      })
    }, 1200)
    const reset = setTimeout(() => {
      clearInterval(interval)
      setTimeout(() => {
        setActiveStep(0)
        setShowQuotes(false)
      }, 3000)
    }, 6000)
    return () => { clearInterval(interval); clearTimeout(reset) }
  }, [])

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid rgba(5,150,105,0.15)',
      borderRadius: 20,
      padding: 24,
      boxShadow: '0 4px 32px rgba(5,150,105,0.08)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#059669', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Live tracking</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#064e3b' }}>Parcel #PQ-84921</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(5,150,105,0.08)', borderRadius: 20, padding: '4px 10px' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#059669', display: 'inline-block', animation: 'trackingPulse 1.4s ease infinite' }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: '#059669' }}>In transit</span>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 20 }}>
        {TRACKING_STEPS.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, position: 'relative' }}>
            {/* line */}
            {i < TRACKING_STEPS.length - 1 && (
              <div style={{
                position: 'absolute', left: 13, top: 24, width: 2, height: 28,
                background: i < activeStep ? '#059669' : 'rgba(5,150,105,0.15)',
                transition: 'background 0.4s ease',
              }} />
            )}
            {/* dot */}
            <motion.div
              animate={i === activeStep ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.4 }}
              style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                background: i <= activeStep ? '#059669' : '#f0fdf4',
                border: `2px solid ${i <= activeStep ? '#059669' : 'rgba(5,150,105,0.20)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: i <= activeStep ? '#fff' : 'rgba(5,150,105,0.4)',
                transition: 'all 0.4s ease',
                marginBottom: 20,
              }}
            >
              {step.icon}
            </motion.div>
            {/* text */}
            <div style={{ paddingTop: 4, paddingBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: i <= activeStep ? 600 : 400, color: i <= activeStep ? '#064e3b' : '#6b7280', transition: 'all 0.3s' }}>{step.label}</div>
              <div style={{ fontSize: 11, color: 'rgba(6,78,59,0.4)', marginTop: 1 }}>{step.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quote comparison mini panel */}
      <AnimatePresence>
        {showQuotes && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <div style={{ fontSize: 11, fontWeight: 600, color: '#059669', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
              AI quotes for next shipment
            </div>
            {QUOTE_ROWS.map((q, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px 12px', borderRadius: 10, marginBottom: 6,
                background: i === 0 ? 'rgba(5,150,105,0.06)' : '#f8fffe',
                border: `1px solid ${i === 0 ? 'rgba(5,150,105,0.20)' : 'rgba(5,150,105,0.08)'}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{q.logo}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#064e3b' }}>{q.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: q.tagColor, background: q.tagBg, borderRadius: 20, padding: '2px 8px' }}>{q.tag}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#064e3b' }}>{q.price}</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      {/* Hero — split layout */}
      <section className="relative mb-10 rounded-3xl overflow-hidden p-6 md:p-10"
        style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)', border: '1px solid rgba(5,150,105,0.12)', boxShadow: '0 4px 40px rgba(5,150,105,0.06)' }}>

        <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-start">
          {/* Left — headline + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(5,150,105,0.10)', border: '1px solid rgba(5,150,105,0.20)', borderRadius: 999, padding: '6px 14px', marginBottom: 16 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#059669', display: 'inline-block', animation: 'trackingPulse 1.4s ease infinite' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#059669' }}>Live · 7 UK carriers compared</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.12, color: '#064e3b', marginBottom: 14 }}>
              Find the cheapest UK shipping
              <span style={{ display: 'block', background: 'linear-gradient(90deg,#059669,#047857)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                in 10 seconds.
              </span>
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'rgba(6,78,59,0.70)', lineHeight: 1.65, marginBottom: 8, maxWidth: 440 }}>
              AI explains why one carrier beats the rest for your parcel.
            </p>
            <p style={{ fontSize: '0.9rem', color: 'rgba(6,78,59,0.50)', lineHeight: 1.6, marginBottom: 24, maxWidth: 440 }}>
              Compare Royal Mail, Evri, DPD, DHL and more — free, instant, no login.
            </p>

            {/* Carrier chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {CARRIERS.map(c => (
                <div key={c.name} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: '#fff', border: '1px solid rgba(5,150,105,0.15)',
                  borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 600, color: '#064e3b',
                }}>
                  <span>{c.logo}</span> {c.name}
                </div>
              ))}
            </div>

            {/* Stats strip */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 24 }}>
              {STATS.map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#059669', letterSpacing: '-0.02em' }}>{s.value}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(6,78,59,0.55)', marginTop: 1 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              {[
                { icon: '🔒', label: 'No account needed' },
                { icon: '📦', label: 'All UK carriers' },
                { icon: '⚡', label: 'Real-time prices' },
              ].map(b => (
                <span key={b.label} style={{ fontSize: 12, color: 'rgba(6,78,59,0.55)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span>{b.icon}</span> {b.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — animated parcel tracking demo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
          >
            <TrackingDemo />
          </motion.div>
        </div>

        {/* Compare form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          style={{ marginTop: 28, padding: 24, background: '#fff', borderRadius: 16, border: '1px solid rgba(5,150,105,0.15)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Package2 size={18} style={{ color: '#059669' }} />
            <span style={{ fontWeight: 700, fontSize: 14, color: '#064e3b' }}>Get instant quotes</span>
          </div>
          <CompareForm />
        </motion.div>
      </section>

      {/* Features */}
      <section className="mb-10">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#064e3b' }}>⚡ Why ParcelIQ?</h2>
          <Link href="/compare" style={{ fontSize: 12, color: '#059669', display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none', fontWeight: 600 }}>
            Compare now <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FEATURES.map(f => (
            <div key={f.title} style={{
              background: f.bg, border: `1px solid ${f.border}`,
              borderRadius: 16, padding: 18,
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.02)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(5,150,105,0.10)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none' }}
            >
              <div style={{ color: f.iconColor, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: 13, color: '#064e3b', marginBottom: 6 }}>{f.title}</h3>
              <p style={{ fontSize: 12, color: 'rgba(6,78,59,0.60)', lineHeight: 1.55 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #059669, #047857)',
        borderRadius: 24, padding: '24px 28px', marginBottom: 40,
        boxShadow: '0 8px 32px rgba(5,150,105,0.25)',
      }} className="mb-10">
        <div style={{ position: 'absolute', right: 0, top: 0, width: 160, height: 160, background: 'rgba(255,255,255,0.06)', borderRadius: '50%', transform: 'translate(40%, -40%)' }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 16 }} className="md:flex-row md:items-center md:justify-between">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.18)', borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 600, color: '#fff', marginBottom: 8 }}>
              🤖 AI-powered
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff', marginBottom: 4 }}>Compare all 7 carriers now</h3>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.80)' }}>Enter your parcel size and destination — get quotes in seconds.</p>
          </div>
          <Link href="/compare" style={{
            flexShrink: 0, background: '#fff', color: '#047857', fontWeight: 700,
            padding: '12px 24px', borderRadius: 12, textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)', whiteSpace: 'nowrap', fontSize: 14,
            display: 'inline-block',
          }}>
            Start comparing →
          </Link>
        </div>
      </section>

      {/* Reviews */}
      <section className="mb-10">
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#064e3b', marginBottom: 20 }}>What shippers say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {REVIEWS.map((r, i) => (
            <div key={r.name} style={{
              background: '#fff', border: '1px solid rgba(5,150,105,0.12)',
              borderRadius: 16, padding: 20,
            }}>
              <p style={{ fontSize: 13, color: 'rgba(6,78,59,0.70)', lineHeight: 1.6, marginBottom: 12 }}>&ldquo;{r.text}&rdquo;</p>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(6,78,59,0.45)' }}>{r.name} · {r.location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Carrier breakdown */}
      <section className="mb-8">
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#064e3b', marginBottom: 20 }}>📦 Carriers we compare</h2>
        <div style={{ background: '#fff', border: '1px solid rgba(5,150,105,0.12)', borderRadius: 16, overflow: 'hidden' }}>
          <table className="w-full text-sm">
            <thead style={{ background: 'rgba(5,150,105,0.06)' }}>
              <tr style={{ color: '#064e3b' }}>
                <th className="px-4 py-3 text-left" style={{ fontWeight: 700, fontSize: 12 }}>Carrier</th>
                <th className="px-4 py-3 text-center hidden sm:table-cell" style={{ fontWeight: 700, fontSize: 12 }}>Tracking</th>
                <th className="px-4 py-3 text-center hidden sm:table-cell" style={{ fontWeight: 700, fontSize: 12 }}>Insurance</th>
                <th className="px-4 py-3 text-center" style={{ fontWeight: 700, fontSize: 12 }}>Best for</th>
              </tr>
            </thead>
            <tbody>
              {[
                { logo: '👑', name: 'Royal Mail', tracking: '✅', insurance: '✅', best: 'Light parcels' },
                { logo: '📦', name: 'Evri', tracking: '✅', insurance: '➕ add-on', best: 'Budget shipping' },
                { logo: '🚐', name: 'DPD', tracking: '✅', insurance: '✅', best: 'Next-day UK' },
                { logo: '🟡', name: 'DHL Express', tracking: '✅', insurance: '✅', best: 'International' },
                { logo: '🔴', name: 'Parcelforce', tracking: '✅', insurance: '✅', best: 'Heavy items' },
              ].map((c, i) => (
                <tr key={c.name} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(5,150,105,0.02)' }}>
                  <td className="px-4 py-2.5" style={{ fontWeight: 600, color: '#064e3b', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>{c.logo}</span> {c.name}
                  </td>
                  <td className="px-4 py-2.5 text-center text-xs hidden sm:table-cell">{c.tracking}</td>
                  <td className="px-4 py-2.5 text-center text-xs hidden sm:table-cell" style={{ color: 'rgba(6,78,59,0.60)' }}>{c.insurance}</td>
                  <td className="px-4 py-2.5 text-center">
                    <span style={{ fontSize: 11, background: 'rgba(5,150,105,0.08)', color: '#059669', border: '1px solid rgba(5,150,105,0.18)', borderRadius: 20, padding: '2px 10px', fontWeight: 600 }}>{c.best}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
