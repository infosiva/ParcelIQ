import { ImageResponse } from 'next/og'
export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'
export default function Icon() {
  return new ImageResponse(
    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #14532d, #16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M4.5 7.5L12 12l7.5-4.5M12 12v9" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}
