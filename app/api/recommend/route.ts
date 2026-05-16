import { NextRequest, NextResponse } from 'next/server'
import { getQuotes, aiRecommendationText, ShipmentParams } from '@/lib/carriers'

export const runtime = 'nodejs'

// Optional: deeper AI recommendation using lib/ai.ts fallback chain
// Falls back to static aiRecommendationText if no AI keys configured

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Partial<ShipmentParams>

    const params: ShipmentParams = {
      weightKg:        Number(body.weightKg ?? 1),
      lengthCm:        Number(body.lengthCm ?? 30),
      widthCm:         Number(body.widthCm  ?? 20),
      heightCm:        Number(body.heightCm ?? 10),
      from:            body.from ?? 'UK',
      to:              body.to   ?? 'UK',
      isInternational: Boolean(body.isInternational),
      priority:        body.priority ?? 'balanced',
      isFragile:       Boolean(body.isFragile),
      value:           body.value,
    }

    const quotes = getQuotes(params)
    const staticRec = aiRecommendationText(quotes, params)

    // Try AI-enhanced recommendation if Groq/Gemini key is available
    let enhancedRec = staticRec
    try {
      const GROQ_KEY = process.env.GROQ_API_KEY
      if (GROQ_KEY) {
        const quotesSummary = quotes.slice(0, 4).map(q =>
          `${q.name} ${q.service}: £${q.price.toFixed(2)}, ${q.deliveryText}, tracking: ${q.tracking}`
        ).join('\n')

        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_KEY}` },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            max_tokens: 120,
            messages: [
              {
                role: 'system',
                content: 'You are a UK parcel shipping expert. Give a single, concise recommendation in 2 sentences. Be specific about price and delivery time. No fluff.',
              },
              {
                role: 'user',
                content: `Parcel: ${params.weightKg}kg, ${params.isInternational ? 'international' : 'UK domestic'}, priority: ${params.priority}${params.isFragile ? ', fragile' : ''}\n\nTop options:\n${quotesSummary}\n\nRecommend the best option.`,
              },
            ],
          }),
        })
        const groqData = await groqRes.json()
        if (groqData.choices?.[0]?.message?.content) {
          enhancedRec = groqData.choices[0].message.content.trim()
        }
      }
    } catch {
      // fall through to static recommendation
    }

    return NextResponse.json({ quotes, recommendation: enhancedRec })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 })
  }
}
