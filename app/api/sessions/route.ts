import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('sessions')
      .select('id, titulo, area, created_at')
      .order('created_at', { ascending: false })
      .limit(20)

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