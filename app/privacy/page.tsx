export const metadata = { title: 'Privacy Policy — ParcelIQ', description: 'How ParcelIQ handles your data.' }

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 32 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: '#047857', marginBottom: 12 }}>{title}</h2>
    <div style={{ color: '#374151', lineHeight: 1.7, fontSize: 15 }}>{children}</div>
  </section>
)

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px 80px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 900, color: '#0f172a', marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ color: '#64748b', marginBottom: 48, fontSize: 14 }}>Last updated: June 2025</p>
      <Section title="Data We Collect"><p>We collect tracking numbers and carrier information you enter to track parcels. We do not collect shipping addresses or recipient personal data.</p></Section>
      <Section title="How We Use Data"><p>Tracking numbers are used to query carrier APIs and provide delivery status. We do not store tracking data after your session.</p></Section>
      <Section title="Cookies"><p>We use minimal session cookies for functionality. No advertising or tracking cookies are used.</p></Section>
      <Section title="Third-Party Services"><p>Parcel tracking uses carrier APIs (UPS, FedEx, USPS, Royal Mail, etc.). AI insights use Groq and/or OpenAI. Data is subject to their privacy policies.</p></Section>
      <Section title="Data Retention"><p>Tracking numbers and shipment data are not retained after your session ends. Nothing is stored server-side.</p></Section>
      <Section title="Your Rights"><p>Email privacy@parceliq.app to request deletion of any data we hold about you.</p></Section>
      <Section title="Children&apos;s Privacy"><p>This service is not directed at children under 13. We do not knowingly collect data from minors.</p></Section>
      <Section title="Contact"><p>Questions? Email <a href="mailto:privacy@parceliq.app" style={{ color: '#059669' }}>privacy@parceliq.app</a></p></Section>
    </main>
  )
}
