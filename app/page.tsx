import CompareForm from '@/components/CompareForm'
import { Package2, ShieldCheck, Zap, TrendingDown, Globe, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const CARRIERS = [
  { logo: '👑', name: 'Royal Mail', color: 'from-red-500/20 to-red-600/10 border-red-500/20 text-red-300' },
  { logo: '📦', name: 'Evri', color: 'from-purple-500/20 to-purple-600/10 border-purple-500/20 text-purple-300' },
  { logo: '🚐', name: 'DPD', color: 'from-red-400/20 to-orange-500/10 border-orange-500/20 text-orange-300' },
  { logo: '🟡', name: 'DHL Express', color: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/20 text-yellow-300' },
  { logo: '🔴', name: 'Parcelforce', color: 'from-rose-500/20 to-rose-600/10 border-rose-500/20 text-rose-300' },
  { logo: '🏪', name: 'Collect+', color: 'from-teal-500/20 to-teal-600/10 border-teal-500/20 text-teal-300' },
  { logo: '🟤', name: 'UPS', color: 'from-amber-500/20 to-amber-600/10 border-amber-500/20 text-amber-300' },
]

const FEATURES = [
  {
    icon: <TrendingDown size={22} />,
    title: 'Real prices, no fluff',
    body: 'Live rate cards from 7 carriers. The actual price you\'ll pay, not a teaser.',
    gradient: 'from-blue-500/10 to-indigo-500/10',
    border: 'border-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: <Zap size={22} />,
    title: 'AI picks the winner',
    body: 'Cheapest, fastest, or best all-rounder — AI explains the recommendation.',
    gradient: 'from-violet-500/10 to-purple-500/10',
    border: 'border-violet-500/20',
    iconColor: 'text-violet-400',
  },
  {
    icon: <Globe size={22} />,
    title: 'UK & international',
    body: 'Domestic and worldwide quotes in one view. Customs info included.',
    gradient: 'from-emerald-500/10 to-teal-500/10',
    border: 'border-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    icon: <ShieldCheck size={22} />,
    title: 'Tracking & cover',
    body: 'We flag which carriers include tracking, insurance, and signature.',
    gradient: 'from-amber-500/10 to-orange-500/10',
    border: 'border-amber-500/20',
    iconColor: 'text-amber-400',
  },
]

const REVIEWS = [
  { text: 'Saved £3.50 on a single package vs what I normally pay. Booked DPD in 30 seconds.', name: 'Sarah M', location: 'Manchester' },
  { text: 'Finally a comparison site that isn\'t bloated. Entered my parcel dims, got 7 quotes instantly.', name: 'James T', location: 'London' },
  { text: 'Used it for an international parcel. The DHL vs Royal Mail breakdown was really clear.', name: 'Priya K', location: 'Birmingham' },
]

const STATS = [
  { value: '7', label: 'Carriers', sub: 'compared live' },
  { value: 'Free', label: 'Always', sub: 'no signup needed' },
  { value: '30s', label: 'To compare', sub: 'average time' },
]

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      {/* Hero */}
      <section className="relative mb-8 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-6 md:p-10 text-white shadow-2xl border border-blue-500/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl translate-y-1/2" />
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-start">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-300 mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Live · 7 UK carriers compared
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3 leading-tight">
              Ship smarter.<br />
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Pay less.</span>
            </h1>

            <p className="text-blue-100/70 text-base md:text-lg mb-6 max-w-md leading-relaxed">
              Compare Royal Mail, DPD, DHL, Evri and more. AI finds the cheapest, fastest, or best-value carrier instantly.
            </p>

            {/* Carriers */}
            <div className="flex flex-wrap gap-2 mb-6">
              {CARRIERS.map(c => (
                <div key={c.name} className={`flex items-center gap-1.5 bg-gradient-to-r ${c.color} border rounded-lg px-3 py-1.5 text-xs font-semibold backdrop-blur-sm`}>
                  <span>{c.logo}</span> {c.name}
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              {STATS.map(s => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-center">
                  <p className="text-xl font-black text-white">{s.value}</p>
                  <p className="text-xs text-blue-300 font-semibold">{s.label}</p>
                  <p className="text-[10px] text-blue-200/50">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form card */}
          <div className="bg-white/5 border border-blue-400/15 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Package2 size={18} className="text-blue-400" />
              <span className="font-bold text-sm text-white">Get instant quotes</span>
            </div>
            <CompareForm />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-white">⚡ Why ParcelIQ?</h2>
          <Link href="/compare" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
            Compare now <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FEATURES.map(f => (
            <div
              key={f.title}
              className={`bg-gradient-to-br ${f.gradient} border ${f.border} rounded-2xl p-4 backdrop-blur-sm hover:scale-[1.02] transition-transform`}
            >
              <div className={`${f.iconColor} mb-3`}>{f.icon}</div>
              <h3 className="font-bold text-sm text-white mb-1.5">{f.title}</h3>
              <p className="text-xs text-blue-100/60 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Compare CTA band */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-6 mb-10 shadow-xl">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute right-0 top-0 w-48 h-48 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 text-xs font-semibold text-white mb-2">
              🤖 AI-powered
            </div>
            <h3 className="text-xl font-black text-white">Compare all 7 carriers now</h3>
            <p className="text-white/80 text-sm mt-1">Enter your parcel size and destination — get quotes in seconds.</p>
          </div>
          <Link
            href="/compare"
            className="shrink-0 bg-white text-indigo-700 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg whitespace-nowrap"
          >
            Start comparing →
          </Link>
        </div>
      </section>

      {/* Reviews */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-5">⭐ What shippers say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {REVIEWS.map((r, i) => {
            const colors = [
              'border-blue-500/20 from-blue-500/5 to-indigo-500/5',
              'border-violet-500/20 from-violet-500/5 to-purple-500/5',
              'border-emerald-500/20 from-emerald-500/5 to-teal-500/5',
            ]
            return (
              <div key={r.name} className={`bg-gradient-to-br ${colors[i % 3]} border rounded-2xl p-5`}>
                <div className="flex gap-0.5 mb-3">
                  {Array(5).fill(0).map((_, j) => <Star key={j} size={12} fill="#f59e0b" className="text-amber-400" />)}
                </div>
                <p className="text-sm text-blue-100/70 leading-relaxed mb-3">&ldquo;{r.text}&rdquo;</p>
                <p className="text-xs font-semibold text-white/50">{r.name} · {r.location}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Carrier breakdown */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-5">📦 Carriers we compare</h2>
        <div className="bg-white/5 border border-blue-500/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-blue-700/50 to-violet-700/50 text-blue-200">
              <tr>
                <th className="px-4 py-3 text-left">Carrier</th>
                <th className="px-4 py-3 text-center hidden sm:table-cell">Tracking</th>
                <th className="px-4 py-3 text-center hidden sm:table-cell">Insurance</th>
                <th className="px-4 py-3 text-center">Best for</th>
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
                <tr key={c.name} className={i % 2 === 0 ? 'bg-transparent' : 'bg-white/5'}>
                  <td className="px-4 py-2.5 font-semibold text-white flex items-center gap-2">
                    <span>{c.logo}</span> {c.name}
                  </td>
                  <td className="px-4 py-2.5 text-center text-xs hidden sm:table-cell">{c.tracking}</td>
                  <td className="px-4 py-2.5 text-center text-xs text-blue-200/60 hidden sm:table-cell">{c.insurance}</td>
                  <td className="px-4 py-2.5 text-center">
                    <span className="text-xs bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full px-2 py-0.5">{c.best}</span>
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
