import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { telegramConnections } from '@/lib/telegram-connections';

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Create pending connection and get unique ID
    const connectionId = telegramConnections.createPendingConnection(user.id);

    return NextResponse.json({
      success: true,
      connection_id: connectionId,
      message: 'Pending connection created',
      expires_in: 600 // 10 minutes
    });

  } catch (error) {
    console.error('Error creating pending connection:', error);
    return NextResponse.json({ error: 'Failed to create connection' }, { status: 500 });
  }
} 