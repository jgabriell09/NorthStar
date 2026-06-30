import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const { email, password, nombre, apellido, apodo, fechaNacimiento, genero } = await req.json()

    if (!email || !password || !nombre || !apellido || !fechaNacimiento || !genero) {
      return NextResponse.json(
        { error: 'Todos los campos obligatorios deben completarse' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Actualizamos el perfil que se creó automáticamente con los datos extra
    if (data.user) {
      await supabase
        .from('profiles')
        .update({
          nombre,
          apellido,
          apodo: apodo || null,
          fecha_nacimiento: fechaNacimiento,
          genero,
        })
        .eq('id', data.user.id)
    }

    return NextResponse.json({ user: data.user })

  } catch (error) {
    console.error('Error en registro:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}