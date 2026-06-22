'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [modo, setModo] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const endpoint = modo === 'login' ? '/api/auth/login' : '/api/auth/register'

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Ocurrió un error')
        setLoading(false)
        return
      }

      router.push('/chat')

    } catch (err) {
      setError('Error de conexión, intenta de nuevo')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#020817] text-white px-6">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl mx-auto mb-4">
          ✦
        </div>
        <h1 className="text-xl font-semibold text-center mb-1">Bienvenido a Northstar</h1>
        <p className="text-sm text-slate-400 text-center mb-6">
          Tu brújula interna, siempre disponible
        </p>

        <div className="flex bg-slate-800 rounded-xl p-1 mb-6">
          <button
            type="button"
            onClick={() => setModo('login')}
            className={`flex-1 py-2 rounded-lg text-sm transition ${
              modo === 'login' ? 'bg-blue-600 text-white' : 'text-slate-400'
            }`}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={() => setModo('register')}
            className={`flex-1 py-2 rounded-lg text-sm transition ${
              modo === 'register' ? 'bg-blue-600 text-white' : 'text-slate-400'
            }`}
          >
            Registrarse
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="tu@correo.com"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-xl py-2.5 text-sm font-medium transition"
          >
            {loading ? 'Cargando...' : modo === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>
        </form>
      </div>
    </main>
  )
}