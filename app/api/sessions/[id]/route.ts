import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { createClient } from '@/lib/supabase-server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Verificamos que la sesión le pertenezca al usuario
    const { data: sesion } = await supabaseAdmin
      .from('sessions')
      .select('user_id')
      .eq('id', params.id)
      .single()

    if (!sesion || sesion.user_id !== user.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const { data, error } = await supabaseAdmin
      .from('messages')
      .select('role, content')
      .eq('session_id', params.id)
      .order('created_at', { ascending: true })

    if (error) throw error

    return NextResponse.json({ messages: data })

  } catch (error) {
    console.error('Error cargando conversación:', error)
    return NextResponse.json(
      { error: 'Error cargando conversación' },
      { status: 500 }
    )
  }
}