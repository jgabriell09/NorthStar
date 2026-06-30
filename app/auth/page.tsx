'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [modo, setModo] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [apodo, setApodo] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState('')
  const [genero, setGenero] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mensajeExito, setMensajeExito] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setMensajeExito('')

    if (modo === 'register' && password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    setLoading(true)

    const endpoint = modo === 'login' ? '/api/auth/login' : '/api/auth/register'
    const body = modo === 'login'
      ? { email, password }
      : { email, password, nombre, apellido, apodo, fechaNacimiento, genero }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Ocurrió un error')
        setLoading(false)
        return
      }

      if (modo === 'register') {
        setMensajeExito('¡Cuenta creada! Ya puedes iniciar sesión.')
        setLoading(false)
        setModo('login')
        return
      }

      router.push('/chat')

    } catch (err) {
      setError('Error de conexión, intenta de nuevo')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#020817] text-white px-6 py-12">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8">
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
            onClick={() => { setModo('login'); setError(''); setMensajeExito('') }}
            className={`flex-1 py-2 rounded-lg text-sm transition ${
              modo === 'login' ? 'bg-blue-600 text-white' : 'text-slate-400'
            }`}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={() => { setModo('register'); setError(''); setMensajeExito('') }}
            className={`flex-1 py-2 rounded-lg text-sm transition ${
              modo === 'register' ? 'bg-blue-600 text-white' : 'text-slate-400'
            }`}
          >
            Registrarse
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {modo === 'register' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Nombre</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    required
                    placeholder="Sayo"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Apellido</label>
                  <input
                    type="text"
                    value={apellido}
                    onChange={e => setApellido(e.target.value)}
                    required
                    placeholder="García"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Apodo (opcional)</label>
                <input
                  type="text"
                  value={apodo}
                  onChange={e => setApodo(e.target.value)}
                  placeholder="¿Cómo te gusta que te llamen?"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Fecha de nacimiento</label>
                  <input
                    type="date"
                    value={fechaNacimiento}
                    onChange={e => setFechaNacimiento(e.target.value)}
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Género</label>
                  <select
                    value={genero}
                    onChange={e => setGenero(e.target.value)}
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-500"
                  >
                    <option value="">Selecciona</option>
                    <option value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>
            </>
          )}

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

          {modo === 'register' && (
            <div>
              <label className="text-xs text-slate-400 block mb-1">Confirmar contraseña</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>
          )}

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          {mensajeExito && (
            <p className="text-green-400 text-sm">{mensajeExito}</p>
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