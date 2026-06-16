import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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