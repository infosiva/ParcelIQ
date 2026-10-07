import { ImageResponse } from 'next/og'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: 180, height: 180, background: '#c2371a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbf6ee', fontSize: 92, fontWeight: 900, fontFamily: 'Georgia, serif' }}>
        PQ
      </div>
    ),
    size
  )
}
