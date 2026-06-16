import { NextRequest, NextResponse } from 'next/server'
import groq from '@/lib/groq'
import { STELLA_SYSTEM_PROMPT, CRISIS_KEYWORDS } from '@/lib/prompts'
import { supabaseAdmin } from '@/lib/supabase'
import { ratelimit } from '@/lib/ratelimit'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting
    const ip = req.headers.get('x-forwarded-for') ?? 'anonymous'
    const { success, remaining } = await ratelimit.limit(ip)

    if (!success) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes, espera un momento.' },
        { status: 429 }
      )
    }

    // 2. Leemos el body
   const { message, sessionId, area } = await req.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'El campo message es requerido' },
        { status: 400 }
      )
    }

    // 3. Creamos sesión nueva o usamos la existente
    let currentSessionId = sessionId
 if (!currentSessionId) {
      const { data, error } = await supabaseAdmin
        .from('sessions')
        .insert({ 
  area: area || null, 
  titulo: message.slice(0, 40) + (message.length > 40 ? '...' : '')
})
        .select()
        .single()

      if (error) throw error
      currentSessionId = data.id
    }

    // 4. Recuperamos el historial de la sesión desde Supabase
    const { data: historial } = await supabaseAdmin
      .from('messages')
      .select('role, content')
      .eq('session_id', currentSessionId)
      .order('created_at', { ascending: true })
      .limit(20) // máximo 20 mensajes anteriores

    const historialPrevio: Message[] = historial || []

    // 5. Detectamos crisis en el mensaje actual
    const lastMessage = message.toLowerCase()
    const isCrisis = CRISIS_KEYWORDS.some(keyword =>
      lastMessage.includes(keyword)
    )

    // 6. Llamada a Groq con historial completo
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: STELLA_SYSTEM_PROMPT },
        ...historialPrevio,
        { role: 'user', content: message }
      ],
      max_tokens: 700,
      temperature: 0.78,
    })

    const reply = completion.choices[0].message.content || ''

    // 7. Guardamos el nuevo mensaje y respuesta en Supabase
    await supabaseAdmin.from('messages').insert([
      {
        session_id: currentSessionId,
        role: 'user',
        content: message,
      },
      {
        session_id: currentSessionId,
        role: 'assistant',
        content: reply,
      }
    ])

    // 8. Respondemos al frontend
    return NextResponse.json({
      reply,
      isCrisis,
      sessionId: currentSessionId,
      remainingRequests: remaining
    })

  } catch (error) {
    console.error('Error en /api/chat:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}