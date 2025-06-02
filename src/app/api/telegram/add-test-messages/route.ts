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

    console.log(`[TELEGRAM-TEST] Adding test messages for user: ${session.user.id}`);

    // Create sample Telegram messages
    const testMessages = [
      {
        user_id: session.user.id,
        source: 'telegram',
        provider_item_id: 1001,
        url: null,
        title: 'Important reminder about the meeting tomorrow',
        description: 'Important reminder about the meeting tomorrow at 3 PM. Don\'t forget to bring the project documents and your laptop.',
        tags: ['telegram', 'meeting', 'reminder'],
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        updated_at: new Date().toISOString()
      },
      {
        user_id: session.user.id,
        source: 'telegram',
        provider_item_id: 1002,
        url: null,
        title: 'Check out this interesting article about AI developments',
        description: 'Check out this interesting article about AI developments in 2024. The progress in language models is fascinating and could change how we work.',
        tags: ['telegram', 'ai', 'article'],
        created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        updated_at: new Date().toISOString()
      },
      {
        user_id: session.user.id,
        source: 'telegram',
        provider_item_id: 1003,
        url: null,
        title: 'Grocery list: milk, bread, eggs, coffee',
        description: 'Grocery list: milk, bread, eggs, coffee, bananas, chicken, rice, and don\'t forget the special sauce mom mentioned.',
        tags: ['telegram', 'grocery', 'shopping'],
        created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
        updated_at: new Date().toISOString()
      },
      {
        user_id: session.user.id,
        source: 'telegram',
        provider_item_id: 1004,
        url: null,
        title: 'Great quote from today\'s book',
        description: 'Great quote from today\'s book: "The only way to do great work is to love what you do." - Steve Jobs. This really resonates with me.',
        tags: ['telegram', 'quote', 'inspiration'],
        created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
        updated_at: new Date().toISOString()
      },
      {
        user_id: session.user.id,
        source: 'telegram',
        provider_item_id: 1005,
        url: null,
        title: 'Weekend plans: hiking, movie, dinner with friends',
        description: 'Weekend plans: hiking in the morning, movie in the afternoon, and dinner with friends at that new Italian restaurant downtown.',
        tags: ['telegram', 'weekend', 'plans'],
        created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
        updated_at: new Date().toISOString()
      }
    ];

    console.log(`[TELEGRAM-TEST] Adding ${testMessages.length} test messages`);

    // Insert test messages into bookmarks table
    const { data: insertedData, error: insertError } = await supabase
      .from('bookmarks')
      .upsert(testMessages, { 
        onConflict: 'user_id,source,provider_item_id',
        ignoreDuplicates: false 
      })
      .select();

    if (insertError) {
      console.error('[TELEGRAM-TEST] Failed to insert test messages:', insertError);
      return NextResponse.json(
        { error: 'Failed to add test messages', details: insertError.message },
        { status: 500 }
      );
    }

    const addedCount = insertedData?.length || testMessages.length;
    
    console.log(`[TELEGRAM-TEST] Successfully added ${addedCount} test messages`);

    // Get total count of Telegram bookmarks
    const { count: totalCount } = await supabase
      .from('bookmarks')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', session.user.id)
      .eq('source', 'telegram');

    return NextResponse.json({
      success: true,
      count: addedCount,
      inserted: addedCount,
      existing_count: totalCount || 0,
      message: `Successfully added ${addedCount} test Telegram messages`,
      test: true
    });

  } catch (error) {
    console.error('[TELEGRAM-TEST] Route error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 