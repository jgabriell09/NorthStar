'use client'

import { useState, useRef, useEffect } from 'react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type Session = {
  id: string
  titulo: string
  area: string
  created_at: string
}

const AREAS = [
  { id: 'carrera', label: 'Carrera y trabajo', emoji: '🎯', descripcion: 'No sé si seguir en mi trabajo o intentar algo nuevo.' },
  { id: 'relaciones', label: 'Relaciones', emoji: '♥', descripcion: 'Siento que me cuesta conectar con las personas.' },
  { id: 'proposito', label: 'Propósito', emoji: '🌱', descripcion: 'Quiero encontrar lo que me da sentido en la vida.' },
  { id: 'bienestar', label: 'Bienestar', emoji: '⚖️', descripcion: 'Me siento agotado y no sé cómo recuperarme.' },
  { id: 'decisiones', label: 'Decisiones', emoji: '💡', descripcion: 'Tengo una decisión importante y no sé qué hacer.' },
  { id: 'hablar', label: 'Solo hablar', emoji: '💬', descripcion: 'Necesito contarle algo a alguien sin que me juzgue.' },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [areaActual, setAreaActual] = useState<string | null>(null)
  const [isCrisis, setIsCrisis] = useState(false)
  const [historial, setHistorial] = useState<Session[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Cargar historial de sesiones desde Supabase
  useEffect(() => {
    cargarHistorial()
  }, [])

  async function cargarHistorial() {
    try {
      const res = await fetch('/api/sessions')
      const data = await res.json()
      if (data.sessions) setHistorial(data.sessions)
    } catch (e) {}
  }

  // Cuando el usuario hace clic en una card
  async function iniciarConArea(area: typeof AREAS[0]) {
    setAreaActual(area.id)
    setMessages([])
    setSessionId(null)
    setIsCrisis(false)

    // Mandamos un mensaje inicial según el área
    const mensajeInicial = area.descripcion
    await enviarMensaje(mensajeInicial, area.id)
  }

  // Cargar conversación anterior
  async function cargarConversacion(sesion: Session) {
    try {
      const res = await fetch(`/api/sessions/${sesion.id}`)
      const data = await res.json()
      if (data.messages) {
        setMessages(data.messages)
        setSessionId(sesion.id)
        setAreaActual(sesion.area)
        setIsCrisis(false)
      }
    } catch (e) {}
  }

  function nuevaConversacion() {
    setMessages([])
    setSessionId(null)
    setAreaActual(null)
    setIsCrisis(false)
    cargarHistorial()
  }

  async function enviarMensaje(texto?: string, area?: string) {
    const contenido = texto || input.trim()
    if (!contenido || loading) return

    setInput('')
    setLoading(true)
    setIsCrisis(false)

    setMessages(prev => [...prev, { role: 'user', content: contenido }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: contenido,
          sessionId: sessionId,
          area: area || areaActual
        })
      })

      const data = await res.json()

      if (data.sessionId) {
        setSessionId(data.sessionId)
        cargarHistorial()
      }
      if (data.isCrisis) setIsCrisis(true)

      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])

    } catch (e) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Lo siento, hubo un problema. ¿Puedes intentarlo de nuevo?'
      }])
    }

    setLoading(false)
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      enviarMensaje()
    }
  }

  // Agrupar historial por área
  const historialPorArea = AREAS.map(area => ({
    ...area,
    sesiones: historial.filter(s => s.area === area.id)
  })).filter(a => a.sesiones.length > 0)

  const sesionsSinArea = historial.filter(s => !s.area || s.area === 'hablar')

  return (
    <main className="h-screen flex bg-[#020817] text-white">
      {/* Sidebar */}
      <aside className="w-[260px] border-r border-slate-800 bg-[#081122] flex flex-col overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
      <div className="p-6">
 <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm mb-4">
  ← Inicio
</a>
<button
  onClick={async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/auth'
  }}
  className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm mb-4"
>
  Cerrar sesión
</button>
  <h1 className="text-2xl font-bold">Northstar</h1>
</div>

        <div className="px-4">
          <button
            onClick={nuevaConversacion}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 text-sm hover:bg-slate-800 transition"
          >
            + Nueva conversación
          </button>
        </div>

        {/* Historial agrupado por área */}
        {historialPorArea.map(area => (
  <AreaHistorial
    key={area.id}
    area={area}
    sessionId={sessionId}
    onSelect={cargarConversacion}
  />
))}

        {sesionsSinArea.length > 0 && (
          <div className="mt-6 px-4">
            <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide">💬 Conversaciones</p>
            {sesionsSinArea.map(sesion => (
              <div
                key={sesion.id}
                onClick={() => cargarConversacion(sesion)}
                className={`rounded-xl p-3 cursor-pointer text-sm mb-1 transition ${
                  sessionId === sesion.id
                    ? 'bg-blue-900 text-blue-200'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
                }`}
              >
                💬 {sesion.titulo}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 px-4 pb-6">
          <p className="text-xs text-slate-500 mb-3 uppercase tracking-wide">Áreas</p>
          <div className="space-y-3 text-slate-300 text-sm">
            {AREAS.map(area => (
              <div
                key={area.id}
                onClick={() => iniciarConArea(area)}
                className="cursor-pointer hover:text-white transition"
              >
                {area.emoji} {area.label}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Chat */}
      <section className="flex-1 flex flex-col">
        {isCrisis && (
          <div className="bg-red-900 border-b border-red-700 px-6 py-3 text-sm text-red-200">
            💙 Si estás pasando por un momento muy difícil, recuerda que puedes llamar a la
            <strong> Línea 106</strong> (Colombia) — disponible las 24 horas.
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center text-3xl mb-6">✦</div>
              <h1 className="text-5xl font-bold mb-4">Hola, soy Stella 👋</h1>
              <p className="text-slate-400 text-center max-w-2xl mb-12">
                Tu brújula interna, siempre disponible. ¿Por dónde empezamos?
              </p>

              {/* Cards clicables */}
              <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
                {AREAS.map(area => (
                  <div
                    key={area.id}
                    onClick={() => iniciarConArea(area)}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-5 hover:border-blue-500 cursor-pointer transition"
                  >
                    <div className="text-2xl mb-3">{area.emoji}</div>
                    <h3 className="font-semibold mb-2">{area.label}</h3>
                    <p className="text-sm text-slate-400">{area.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm flex-shrink-0 mt-1">✦</div>
              )}
              <div className={`max-w-2xl px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-slate-800 text-white rounded-br-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-4 justify-start">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm flex-shrink-0 mt-1">✦</div>
              <div className="bg-slate-900 border border-slate-800 px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1 items-center h-5">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0ms]"></span>
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-slate-800 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Escribe lo que tienes en mente..."
                className="flex-1 bg-transparent outline-none text-white"
                disabled={loading}
              />
              <button
                onClick={() => enviarMensaje()}
                disabled={loading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 rounded-xl transition"
              >
                ↑
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )

  function AreaHistorial({ area, sessionId, onSelect }: {
  area: { id: string, label: string, emoji: string, sesiones: Session[] }
  sessionId: string | null
  onSelect: (s: Session) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const visibles = expanded ? area.sesiones : area.sesiones.slice(0, 3)

  return (
    <div className="mt-6 px-4">
      <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide">
        {area.emoji} {area.label}
      </p>
      {visibles.map(sesion => (
        <div
          key={sesion.id}
          onClick={() => onSelect(sesion)}
          className={`rounded-xl p-3 cursor-pointer text-sm mb-1 transition ${
            sessionId === sesion.id
              ? 'bg-blue-900 text-blue-200'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
          }`}
        >
          <div className="truncate">💬 {sesion.titulo}</div>
          <div className="text-xs text-slate-500 mt-1">
            {new Date(sesion.created_at).toLocaleDateString('es-CO', {
              day: 'numeric', month: 'short'
            })}
          </div>
        </div>
      ))}
      {area.sesiones.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-slate-500 hover:text-slate-300 mt-1 transition"
        >
          {expanded ? '▲ Ver menos' : `▼ Ver ${area.sesiones.length - 3} más`}
        </button>
      )}
    </div>
  )
}
}