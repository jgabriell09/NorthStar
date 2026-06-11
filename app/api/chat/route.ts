import { NextRequest, NextResponse } from 'next/server'
import groq from '@/lib/groq'
import { STELLA_SYSTEM_PROMPT, CRISIS_KEYWORDS } from '@/lib/prompts'
import { supabaseAdmin } from '@/lib/supabase'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: NextRequest) {
  try {
    // 1. Leemos lo que nos manda el frontend
    const { messages, sessionId } = await req.json()

    // 2. Validamos que venga el historial de mensajes
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'El campo messages es requerido' },
        { status: 400 }
      )
    }

    // 3. Si no viene sessionId, creamos una sesión nueva en Supabase
    let currentSessionId = sessionId
    if (!currentSessionId) {
      const { data, error } = await supabaseAdmin
        .from('sessions')
        .insert({})
        .select()
        .single()

      if (error) throw error
      currentSessionId = data.id
    }

    // 4. Detectamos si el último mensaje tiene palabras de crisis
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''
    const isCrisis = CRISIS_KEYWORDS.some(keyword =>
      lastMessage.includes(keyword)
    )

    // 5. Le mandamos el historial a Groq con el prompt de Stella
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: STELLA_SYSTEM_PROMPT },
        ...messages as Message[]
      ],
      max_tokens: 700,
      temperature: 0.78,
    })

    // 6. Extraemos la respuesta
    const reply = completion.choices[0].message.content || ''

    // 7. Guardamos el mensaje del usuario y la respuesta de Stella
    await supabaseAdmin.from('messages').insert([
      {
        session_id: currentSessionId,
        role: 'user',
        content: messages[messages.length - 1].content,
      },
      {
        session_id: currentSessionId,
        role: 'assistant',
        content: reply,
      }
    ])

    // 8. Respondemos al frontend con la respuesta y el sessionId
    return NextResponse.json({
      reply,
      isCrisis,
      sessionId: currentSessionId
    })

  } catch (error) {
    console.error('Error en /api/chat:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}