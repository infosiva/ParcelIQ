import { NextRequest, NextResponse } from 'next/server'
import { getQuotes, aiRecommendationText, ShipmentParams } from '@/lib/carriers'

export const runtime = 'nodejs'

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

    const quotes  = getQuotes(params)
    const summary = aiRecommendationText(quotes, params)

    return NextResponse.json({ quotes, summary })
  } catch (e) {
    console.error('[parceliq][compare]', e)
    return NextResponse.json({ error: String(e) }, { status: 400 })
  }
}
