export default function ChatPage() {
  return (
    <main className="h-screen flex bg-[#020817] text-white">
      {/* Sidebar */}
      <aside className="w-[260px] border-r border-slate-800 bg-[#081122] flex flex-col">
        {/* Logo */}
        <div className="p-6">
          <h1 className="text-2xl font-bold">Northstar</h1>
        </div>

        {/* Nueva conversación */}
        <div className="px-4">
          <button className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 text-sm hover:bg-slate-800 transition">
            + Nueva conversación
          </button>
        </div>

        {/* Recientes */}
        <div className="mt-8 px-4">
          <p className="text-xs text-slate-500 mb-3">RECIENTES</p>

          <div className="rounded-xl bg-slate-900 p-3 cursor-pointer hover:bg-slate-800 transition">
            💬 Mi camino profesional
          </div>
        </div>

        {/* Áreas */}
        <div className="mt-8 px-4">
          <p className="text-xs text-slate-500 mb-3">ÁREAS</p>

          <div className="space-y-4 text-slate-300">
            <div>🎯 Carrera y trabajo</div>
            <div>❤️ Relaciones</div>
            <div>🌱 Crecimiento personal</div>
            <div>⚖️ Bienestar</div>
          </div>
        </div>
      </aside>

      {/* Contenido */}
      <section className="flex-1 flex flex-col">
        {/* Centro */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="max-w-5xl w-full">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center text-3xl mb-6">
                ✦
              </div>

              <h1 className="text-5xl font-bold mb-4">
                Hola, soy Stella 👋
              </h1>

              <p className="text-slate-400 text-center max-w-2xl">
                Tu brújula interna, siempre disponible.
                Cuéntame qué está pasando — sin juicios,
                sin prisa. ¿Por dónde empezamos?
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 hover:border-blue-500 cursor-pointer transition">
                <div className="text-2xl mb-3">🎯</div>
                <h3 className="font-semibold mb-2">
                  Carrera y trabajo
                </h3>
                <p className="text-sm text-slate-400">
                  No sé si seguir en mi trabajo o intentar algo nuevo.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 hover:border-blue-500 cursor-pointer transition">
                <div className="text-2xl mb-3">❤️</div>
                <h3 className="font-semibold mb-2">
                  Relaciones
                </h3>
                <p className="text-sm text-slate-400">
                  Siento que me cuesta conectar con las personas.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 hover:border-blue-500 cursor-pointer transition">
                <div className="text-2xl mb-3">🌱</div>
                <h3 className="font-semibold mb-2">
                  Propósito
                </h3>
                <p className="text-sm text-slate-400">
                  Quiero encontrar lo que me da sentido en la vida.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 hover:border-blue-500 cursor-pointer transition">
                <div className="text-2xl mb-3">⚖️</div>
                <h3 className="font-semibold mb-2">
                  Bienestar
                </h3>
                <p className="text-sm text-slate-400">
                  Me siento agotado y no sé cómo recuperarme.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 hover:border-blue-500 cursor-pointer transition">
                <div className="text-2xl mb-3">💡</div>
                <h3 className="font-semibold mb-2">
                  Decisiones
                </h3>
                <p className="text-sm text-slate-400">
                  Tengo una decisión importante y no sé qué hacer.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 hover:border-blue-500 cursor-pointer transition">
                <div className="text-2xl mb-3">💬</div>
                <h3 className="font-semibold mb-2">
                  Solo hablar
                </h3>
                <p className="text-sm text-slate-400">
                  Necesito contarle algo a alguien sin que me juzgue.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-slate-800 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3">
              <input
                type="text"
                placeholder="Escribe lo que tienes en mente..."
                className="flex-1 bg-transparent outline-none text-white"
              />

              <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl transition">
                →
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}