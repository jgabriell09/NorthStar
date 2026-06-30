'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="bg-[#020817] text-white min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-4 transition-all duration-300 ${
        scrolled
          ? 'bg-[#020817]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-lg'
          : 'bg-transparent'
      }`}>
        <div className="flex items-center gap-2.5 text-lg font-medium cursor-pointer" onClick={() => scrollTo('hero')}>
          <div className="w-9 h-9 bg-blue-600 rounded-[10px] flex items-center justify-center text-lg">✦</div>
          Northstar
        </div>
        <div className="flex gap-8 text-sm text-white/50">
          <button onClick={() => scrollTo('hero')} className="hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer text-white/50 hover:text-white text-sm font-inherit">
            Inicio
          </button>
          <button onClick={() => scrollTo('como-funciona')} className="hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer text-white/50 hover:text-white text-sm font-inherit">
            Cómo funciona
          </button>
          <button onClick={() => scrollTo('stella')} className="hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer text-white/50 hover:text-white text-sm font-inherit">
            Stella IA
          </button>
          <button onClick={() => scrollTo('planes')} className="hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer text-white/50 hover:text-white text-sm font-inherit">
            Planes
          </button>
        </div>
        <div className="flex gap-3 items-center">
          <a href="/auth" className="text-sm px-5 py-2 rounded-xl border border-white/15 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-200">
            Iniciar sesión
          </a>
          <a href="/auth" className="text-sm px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-200">
            Comenzar gratis
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="flex flex-col items-center text-center px-12 pt-36 pb-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-2 text-xs px-4 py-2 rounded-full bg-blue-600/15 border border-blue-500/30 text-blue-400 mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          IA conversacional en español
        </div>
        <h1 className="text-6xl font-medium leading-tight text-white mb-6 max-w-3xl">
          Tu brújula interna, <span className="text-blue-500">siempre disponible</span>
        </h1>
        <p className="text-lg text-white/45 max-w-xl leading-relaxed mb-10">
          Orientación vital con IA empática. Sin juicios, sin costo. Para cuando no sabes qué camino tomar.
        </p>
        <div className="flex gap-4">
          <a href="/auth" className="text-base px-8 py-3.5 rounded-xl bg-blue-600 text-white hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-200 hover:-translate-y-0.5">
            Comenzar ahora →
          </a>
          <button onClick={() => scrollTo('como-funciona')} className="text-base px-8 py-3.5 rounded-xl border border-white/20 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-200 font-inherit cursor-pointer">
            Ver cómo funciona
          </button>
        </div>
        <div className="flex gap-14 mt-16">
          {[['24/7','Siempre disponible'],['100%','Gratuito'],['6','Áreas de vida'],['ES','Solo en español']].map(([num,label]) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-medium text-white">{num}</div>
              <div className="text-sm text-white/35 mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Chat preview */}
        <div className="mt-16 w-full max-w-lg bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/[0.06]">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm">✦</div>
            <div>
              <div className="text-sm font-medium">Stella</div>
              <div className="text-xs text-green-400">En línea</div>
            </div>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex gap-2.5 items-start">
              <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-xs flex-shrink-0">✦</div>
              <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-white/80 max-w-xs">
                Hola, soy Stella. ¿En qué área de tu vida sientes más incertidumbre hoy?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-blue-900/60 border border-blue-800/40 rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-blue-200 max-w-xs">
                No sé si seguir en mi trabajo o intentar algo nuevo.
              </div>
            </div>
            <div className="flex gap-2.5 items-start">
              <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-xs flex-shrink-0">✦</div>
              <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-white/80 max-w-xs">
                Entiendo esa incertidumbre. ¿Qué es lo que más te hace dudar del camino actual?
              </div>
            </div>
          </div>
          <div className="flex gap-2.5 px-5 py-4 border-t border-white/[0.06] items-center">
            <div className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/30">
              Escribe tu mensaje...
            </div>
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-base cursor-pointer hover:bg-blue-500 transition">↑</div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="px-12 py-24 max-w-5xl mx-auto">
        <div className="text-xs text-blue-400 uppercase tracking-widest mb-3">Cómo funciona</div>
        <div className="text-4xl font-medium text-white mb-3">Tres pasos para encontrar claridad</div>
        <div className="text-base text-white/40 mb-12">Sin formularios, sin esperas. Solo una conversación.</div>
        <div className="grid grid-cols-3 gap-5">
          {[
            ['🎯','Elige tu área','Carrera, relaciones, propósito, bienestar, decisiones o simplemente hablar.'],
            ['💬','Habla con Stella','Cuéntale lo que sientes. Sin juicios, sin prisa. Stella te escucha y te guía.'],
            ['🌱','Encuentra claridad','Reflexiona, identifica tus valores y da el siguiente paso con más seguridad.'],
            ['🔒','Privado y seguro','Tus conversaciones son tuyas. Nadie más puede verlas.'],
            ['📚','Historial guardado','Stella recuerda el contexto de cada conversación para acompañarte mejor.'],
            ['⚡','Respuestas al instante','Sin tiempos de espera. Stella responde en segundos, cuando tú lo necesitas.'],
          ].map(([icon,title,desc]) => (
            <div key={String(title)} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:border-blue-500/40 hover:bg-white/[0.05] transition-all duration-200 cursor-default">
              <div className="w-10 h-10 rounded-xl bg-blue-600/15 flex items-center justify-center text-xl mb-4">{icon}</div>
              <div className="text-base font-medium text-white mb-2">{String(title)}</div>
              <div className="text-sm text-white/40 leading-relaxed">{String(desc)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STELLA */}
      <section id="stella" className="px-12 py-24 max-w-5xl mx-auto grid grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-5">
          <div className="text-xs px-3 py-1.5 rounded-full bg-blue-600/15 text-blue-400 w-fit border border-blue-500/20">Stella IA</div>
          <div className="text-4xl font-medium text-white leading-snug">Diseñada para acompañarte, no para juzgarte</div>
          <div className="text-base text-white/40 leading-relaxed">Stella no es un chatbot genérico. Fue diseñada específicamente para orientación vital — con empatía, calidez y respeto por tu proceso.</div>
          <div className="flex flex-col gap-3">
            {['Responde siempre en español','Formada en psicología humanista','Detecta situaciones de crisis con cuidado','Nunca reemplaza a un profesional','Disponible las 24 horas'].map(item => (
              <div key={item} className="flex items-center gap-3 text-sm text-white/60">
                <div className="w-5 h-5 rounded-full bg-blue-600/20 flex items-center justify-center text-[11px] text-blue-400 flex-shrink-0">✓</div>
                {item}
              </div>
            ))}
          </div>
          <a href="/auth" className="mt-2 text-sm px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-200 w-fit hover:-translate-y-0.5">
            Hablar con Stella →
          </a>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-200">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-5">✦</div>
          <div className="text-lg font-medium text-white mb-1.5">Stella</div>
          <div className="text-sm text-white/40 mb-5">Tu guía de vida personal, siempre disponible y sin juicios.</div>
          <div className="flex flex-wrap gap-2">
            {['Empática','En español','24/7','Privada','Sin juicios','Gratuita'].map(tag => (
              <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-white/[0.06] text-white/50 border border-white/10 hover:border-white/25 hover:text-white/70 transition-all duration-200 cursor-default">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section id="planes" className="px-12 py-24 max-w-2xl mx-auto text-center">
        <div className="text-xs text-blue-400 uppercase tracking-widest mb-3">Planes</div>
        <div className="text-4xl font-medium text-white mb-3">Elige cómo quieres avanzar</div>
        <div className="text-base text-white/40 mb-12">Empieza gratis. Actualiza cuando lo necesites.</div>
        <div className="grid grid-cols-2 gap-5 text-left">
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-7 hover:border-white/20 transition-all duration-200">
            <div className="text-sm text-white/40 mb-2">Gratis</div>
            <div className="text-4xl font-medium text-white mb-1.5">$0 <span className="text-sm text-white/35 font-normal">/ siempre</span></div>
            <div className="text-sm text-white/35 mb-6">Para comenzar tu camino</div>
            <div className="flex flex-col gap-3 mb-6">
              {[['✓','6 conversaciones por semana',true],['✓','6 áreas de vida',true],['✓','Historial de 7 días',true],['✕','Conversaciones ilimitadas',false]].map(([icon,text,ok]) => (
                <div key={String(text)} className="flex items-center gap-2.5 text-sm">
                  <span className={ok ? 'text-green-400' : 'text-white/20'}>{icon}</span>
                  <span className={ok ? 'text-white/60' : 'text-white/25'}>{String(text)}</span>
                </div>
              ))}
            </div>
            <button className="w-full py-3 rounded-xl text-sm border border-white/15 text-white/60 hover:border-white/30 hover:text-white/80 hover:bg-white/5 transition-all duration-200 font-inherit cursor-pointer">
              Plan actual
            </button>
          </div>
          <div className="bg-blue-600/[0.06] border-2 border-blue-600 rounded-2xl p-7 relative hover:bg-blue-600/10 transition-all duration-200">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-4 py-1.5 rounded-full whitespace-nowrap">Más popular</div>
            <div className="text-sm text-white/40 mb-2">Premium</div>
            <div className="text-4xl font-medium text-white mb-1.5">$9 <span className="text-sm text-white/35 font-normal">/ mes</span></div>
            <div className="text-sm text-white/35 mb-6">Sin límites, sin interrupciones</div>
            <div className="flex flex-col gap-3 mb-6">
              {['Conversaciones ilimitadas','6 áreas de vida','Historial permanente','Soporte prioritario'].map(text => (
                <div key={text} className="flex items-center gap-2.5 text-sm">
                  <span className="text-green-400">✓</span>
                  <span className="text-white/60">{text}</span>
                </div>
              ))}
            </div>
            <button className="w-full py-3 rounded-xl text-sm bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-200 font-inherit cursor-pointer hover:-translate-y-0.5">
              Comenzar Premium →
            </button>
          </div>
        </div>
        <div className="text-sm text-white/25 mt-6">Sin compromisos. Cancela cuando quieras.</div>
      </section>

      {/* FOOTER */}
      <footer className="px-12 py-10 border-t border-white/[0.06] flex justify-between items-center">
        <div className="flex items-center gap-2.5 text-sm text-white/40">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-sm">✦</div>
          Northstar © 2025
        </div>
        <div className="flex gap-6 text-sm text-white/30">
          <span className="cursor-pointer hover:text-white/60 transition-colors duration-200">Privacidad</span>
          <span className="cursor-pointer hover:text-white/60 transition-colors duration-200">Términos</span>
          <span className="cursor-pointer hover:text-white/60 transition-colors duration-200">Contacto</span>
        </div>
      </footer>

    </main>
  )
}