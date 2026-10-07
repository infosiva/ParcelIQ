export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="14" fill="var(--accent)" /><path d="M32 12 50 21v22L32 52 14 43V21z" fill="var(--bg)" /><path d="M14 21 32 30l18-9M32 30v22" stroke="var(--accent)" strokeWidth="3" fill="none" strokeLinejoin="round" /></svg>
      <span className="display" style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text)', letterSpacing: '-0.02em' }}>
        Parcel<span style={{ color: 'var(--accent)' }}>IQ</span>
      </span>
    </span>
  )
}
