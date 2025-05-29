import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get the current user session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const adminEmails = ['admin@skoop.pro', 'support@skoop.pro', 'fjankovic@gmail.com']; // Add your admin emails
    const isAdmin = adminEmails.includes(session.user.email || '');
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const { email } = await request.json();
    
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email parameter required' },
        { status: 400 }
      );
    }

    // Search users using service role
    const { createClient } = await import('@supabase/supabase-js');
    const serviceSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Try to get users from auth.users (requires service role)
    try {
      const { data, error } = await serviceSupabase.auth.admin.listUsers();
      
      if (error) throw error;
      
      const filteredUsers = data.users
        .filter(user => user.email?.toLowerCase().includes(email.toLowerCase()))
        .slice(0, 10) // Limit results
        .map(user => ({
          id: user.id,
          email: user.email || '',
          created_at: user.created_at
        }));
      
      return NextResponse.json({ users: filteredUsers });
    } catch (authError) {
      console.error('Auth admin API error:', authError);
      
      // Fallback: search in connected_accounts table for existing users
      const { data, error } = await supabase
        .from('connected_accounts')
        .select('user_id')
        .neq('provider', 'telegram'); // Get users with other providers
      
      if (error) throw error;
      
      // This is a simplified fallback - in production you'd have a users/profiles table
      const userIds = [...new Set(data.map(account => account.user_id))];
      
      return NextResponse.json({ 
        users: userIds.slice(0, 10).map(id => ({
          id,
          email: `user-${id.slice(0, 8)}@example.com`, // Placeholder
          created_at: new Date().toISOString()
        })),
        note: 'Limited search - service role key required for full user search'
      });
    }

  } catch (error) {
    console.error('User search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 