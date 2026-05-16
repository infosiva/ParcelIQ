'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Package2, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(6,9,15,0.80)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-2)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.25rem', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <Package2 size={20} style={{ color: 'var(--accent)' }} />
            <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text)', letterSpacing: '-0.02em' }}>
              Parcel<span style={{ color: 'var(--accent)' }}>IQ</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex" style={{ gap: 4 }}>
            {[
              { href: '/',         label: 'Compare' },
              { href: '/learn',    label: 'Shipping Guide' },
              { href: '/track',    label: 'Track' },
              { href: '/affiliate', label: 'Partner' },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{
                padding: '0.4rem 0.85rem', borderRadius: 8, fontSize: '0.85rem',
                color: 'var(--text-2)', textDecoration: 'none', transition: 'color 0.15s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}
              >{l.label}</Link>
            ))}
          </div>

          <Link href="/" className="hidden md:inline-flex btn-primary" style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem', gap: 6 }}>
            <Package2 size={14} />
            Compare Now
          </Link>

          <button onClick={() => setOpen(v => !v)} className="md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-2)' }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div style={{
          position: 'fixed', top: 56, left: 0, right: 0, zIndex: 40,
          background: 'var(--surface)', borderBottom: '1px solid var(--border)',
          padding: '1rem',
        }}>
          {[
            { href: '/', label: 'Compare' },
            { href: '/learn', label: 'Shipping Guide' },
            { href: '/track', label: 'Track Parcel' },
          ].map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '0.75rem 0.5rem', fontSize: '0.9rem',
              color: 'var(--text-2)', textDecoration: 'none',
              borderBottom: '1px solid var(--border-2)',
            }}>{l.label}</Link>
          ))}
        </div>
      )}

      <div style={{ height: 56 }} />
    </>
  )
}
