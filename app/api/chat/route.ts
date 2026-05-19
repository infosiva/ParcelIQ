import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

let _groq: Groq | null = null
function groq(): Groq {
  if (!_groq) _groq = new Groq({ apiKey: process.env.GROQ_API_KEY! })
  return _groq
}

export async function POST(req: NextRequest) {
  try {
    const { messages, system } = await req.json()
    const sysPrompt = system ?? 'You are ParcelIQ AI — a UK shipping expert. Help users compare Royal Mail, DPD, Evri, DHL, Parcelforce. Give practical advice on cheapest/fastest options, packaging, customs, tracking. Be concise and actionable.'

    const res = await groq().chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'system', content: sysPrompt }, ...messages],
      max_tokens: 400,
      temperature: 0.6,
    })

    const text = res.choices[0]?.message?.content ?? 'Let me help you find the best shipping option!'
    return NextResponse.json({ text })
  } catch {
    return NextResponse.json({ text: 'Use the comparison tool above to get instant quotes!' }, { status: 200 })
  }
}
