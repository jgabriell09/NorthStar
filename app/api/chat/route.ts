import { NextRequest, NextResponse } from 'next/server'
import groq from '@/lib/groq'
import { STELLA_SYSTEM_PROMPT, CRISIS_KEYWORDS } from '@/lib/prompts'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: NextRequest) {
  try {
    // 1. Leemos lo que nos manda el frontend
    const { messages } = await req.json()

    // 2. Validamos que venga el historial de mensajes
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'El campo messages es requerido' },
        { status: 400 }
      )
    }

    // 3. Detectamos si el último mensaje tiene palabras de crisis
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''
    const isCrisis = CRISIS_KEYWORDS.some(keyword =>
      lastMessage.includes(keyword)
    )

    // 4. Le mandamos el historial a Groq con el prompt de Stella
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: STELLA_SYSTEM_PROMPT },
        ...messages as Message[]
      ],
      max_tokens: 700,
      temperature: 0.78,
    })

    // 5. Extraemos la respuesta
    const reply = completion.choices[0].message.content || ''

    // 6. Respondemos al frontend
    return NextResponse.json({ reply, isCrisis })

  } catch (error) {
    console.error('Error en /api/chat:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}