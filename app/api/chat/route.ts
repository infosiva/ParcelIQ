import { NextRequest, NextResponse } from 'next/server'
import { AI_LIMITER } from '@/lib/rateLimit'
import { chatChain } from '@/lib/chat-chain'

const SYSTEM = 'You are the ParcelIQ assistant, a UK parcel shipping helper. Help with choosing between Royal Mail, DPD, Evri, DHL and Parcelforce, packaging, customs and tracking. Be concise. You do not know live prices: tell users to confirm at the carrier. If asked anything outside UK parcel shipping, reply: "I\'m trained for ParcelIQ. For that, try Google or ChatGPT!"'

export async function POST(req: NextRequest) {
  const limited = AI_LIMITER.check(req); if (limited) return limited
  try {
    const { messages } = await req.json()
    const safe = (Array.isArray(messages) ? messages : []).slice(-10).map((m: { role?: string; content?: unknown }) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content ?? '').slice(0, 1000) })) as { role: 'user' | 'assistant'; content: string }[]
    const out = await chatChain([{ role: 'system', content: SYSTEM }, ...safe])
    return NextResponse.json({ text: out?.text ?? 'The assistant is busy right now. Use the comparison tool to see options, then confirm prices at the carrier.' })
  } catch (e) {
    console.error(JSON.stringify({ level: 'error', scope: 'parceliq.chat', message: String((e as Error)?.message).slice(0, 200) }))
    return NextResponse.json({ text: 'The assistant is busy right now. Use the comparison tool to see options.' })
  }
}
