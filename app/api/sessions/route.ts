import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { createClient } from '@/lib/supabase-server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ sessions: [] })
    }

    const { data, error } = await supabaseAdmin
      .from('sessions')
      .select('id, titulo, area, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) throw error

    return NextResponse.json({ sessions: data })

  } catch (error) {
    console.error('Error cargando sesiones:', error)
    return NextResponse.json(
      { error: 'Error cargando historial' },
      { status: 500 }
    )
  }
}