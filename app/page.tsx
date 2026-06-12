export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 bg-[#1A3C5E]">
        <h1 className="text-5xl font-bold text-white mb-4">
          NorthStar
        </h1>
        <p className="text-xl text-blue-200 mb-8 max-w-xl">
          Tu brújula interna, siempre disponible. Orientación vital con IA, gratis y en español.
        </p>
        <a href="/chat" className="bg-[#2E86C1] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-500 transition">
          Comenzar ahora
        </a>
      </section>

      {/* Cómo funciona */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#1A3C5E] mb-12">
          ¿Cómo funciona?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🎧</div>
            <h3 className="text-xl font-semibold text-[#1A3C5E] mb-2">1. Te escuchamos</h3>
            <p className="text-gray-600">Stella, nuestra IA, te hace preguntas para entender tu situación sin juzgarte.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-[#1A3C5E] mb-2">2. Reflexionamos juntos</h3>
            <p className="text-gray-600">Identificamos tus valores, miedos y fortalezas para ver el camino con claridad.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-[#1A3C5E] mb-2">3. Defines tu acción</h3>
            <p className="text-gray-600">Sales con 3 pasos concretos y alcanzables para avanzar desde hoy.</p>
          </div>
        </div>
      </section>

      {/* Áreas de vida */}
      <section className="py-20 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-[#1A3C5E] mb-12">
          ¿En qué área necesitas orientación?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { emoji: "💼", label: "Carrera" },
            { emoji: "❤️", label: "Relaciones" },
            { emoji: "🧭", label: "Propósito" },
            { emoji: "😊", label: "Bienestar" },
            { emoji: "🎓", label: "Educación" },
            { emoji: "✨", label: "Otra" },
          ].map((area) => (
            <div key={area.label} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer">
              <div className="text-4xl mb-3">{area.emoji}</div>
              <p className="font-semibold text-[#1A3C5E]">{area.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm">
        NorthStar © 2026 — Hecho con ❤️ por estudiantes
      </footer>

    </main>
  );
}