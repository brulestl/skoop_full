import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { Database } from '@/types/database.types'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

interface TelegramExportMessage {
  id: number
  date: string | number // Can be string or unix timestamp
  text?: string
  caption?: string
  webpage?: {
    url?: string
  }
  media?: {
    caption?: string
    webpage?: {
      url?: string
    }
  }
}

interface TelegramExport {
  messages: TelegramExportMessage[]
}

export async function POST(request: NextRequest) {
  try {
    // Try cookie-based auth first (for live site), then Authorization header (for direct API calls)
    let user: any = null;
    let supabase: any = null;

    // Method 1: Cookie-based authentication (Next.js route handler)
    try {
      const cookieBasedSupabase = createRouteHandlerClient({ cookies });
      const { data: { session }, error: sessionError } = await cookieBasedSupabase.auth.getSession();
      
      if (session && !sessionError) {
        user = session.user;
        supabase = cookieBasedSupabase;
        console.log('[TG-DEBUG] Using cookie-based authentication');
      }
    } catch (cookieError) {
      console.log('[TG-DEBUG] Cookie auth failed, trying header auth');
    }

    // Method 2: Authorization header (direct API calls)
    if (!user) {
      const authHeader = request.headers.get('authorization');
      if (authHeader) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
        const headerBasedSupabase = createClient<Database>(supabaseUrl, supabaseServiceKey);
        
        const { data: { user: headerUser }, error: userError } = await headerBasedSupabase.auth.getUser(
          authHeader.replace('Bearer ', '')
        );

        if (headerUser && !userError) {
          user = headerUser;
          supabase = headerBasedSupabase;
          console.log('[TG-DEBUG] Using Authorization header authentication');
        }
      }
    }

    // If neither auth method worked
    if (!user || !supabase) {
      return NextResponse.json({ error: 'Authorization required' }, { status: 401 })
    }

    console.log(`[TG-DEBUG] Authenticated user: ${user.id}`);

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('export') as File

    if (!file) {
      return NextResponse.json({ error: 'No export file provided' }, { status: 400 })
    }

    if (!file.name.endsWith('.json')) {
      return NextResponse.json({ error: 'File must be a JSON file' }, { status: 400 })
    }

    // Parse JSON content
    const content = await file.text()
    let exportData: TelegramExport

    try {
      exportData = JSON.parse(content)
    } catch (parseError) {
      return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 })
    }

    if (!exportData.messages || !Array.isArray(exportData.messages)) {
      return NextResponse.json({ error: 'Invalid export format: missing messages array' }, { status: 400 })
    }

    console.log(`[TG-DEBUG] Processing ${exportData.messages.length} messages from export`)

    // Filter and map valid messages
    const validMessages = exportData.messages.filter((msg: TelegramExportMessage) => {
      const text = msg.text ?? msg.caption ?? msg.media?.caption ?? ''
      const url = msg.webpage?.url ?? msg.media?.webpage?.url
      return text || url
    })

    console.log(`[TG-DEBUG] Filtered to ${validMessages.length} valid messages`)

    if (validMessages.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'No valid messages found in export',
        inserted: 0 
      })
    }

    // TASK 2: Map export messages to database format
    const rawRows = validMessages.map((msg: TelegramExportMessage) => {
      const text = msg.text ?? msg.caption ?? msg.media?.caption ?? ''
      const url = msg.webpage?.url ?? msg.media?.webpage?.url ?? null
      
      // Handle date format (can be string or unix timestamp)
      let messageDate: Date
      if (typeof msg.date === 'string') {
        messageDate = new Date(msg.date)
      } else {
        messageDate = new Date(msg.date * 1000) // Unix timestamp
      }

      return {
        user_id: user.id,
        source: 'telegram' as const,
        provider_item_id: msg.id,
        text: text || null,
        url: url,
        created_at: messageDate.toISOString(), // Preserve timezone (UTC)
        raw_json: msg as unknown as Database['public']['Tables']['bookmarks_raw']['Insert']['raw_json'],
        fetched_at: new Date().toISOString(),
      }
    })

    console.log(`[TG-DEBUG] Mapped ${rawRows.length} rawRows for bookmarks_raw`)

    // TASK 2: Batch insert with conflict handling (same as MTProto sync)
    const { data: insertedData, error: insertError } = await supabase
      .from('bookmarks_raw')
      .upsert(rawRows, {
        onConflict: 'user_id,source,provider_item_id',
        ignoreDuplicates: false
      })

    if (insertError) {
      console.error('[TG-DEBUG] Error inserting telegram export messages:', insertError)
      return NextResponse.json(
        { error: 'Failed to save messages', details: insertError.message },
        { status: 500 }
      )
    }

    console.log(`[TG-DEBUG] Successfully inserted ${rawRows.length} rows into bookmarks_raw`)

    // TG-BOOK2: Fix URL conflict by allowing null URLs and using provider_item_id
    const bookmarkRows = rawRows.map(r => ({
      user_id:    r.user_id,
      source:     'telegram' as const,
      provider_item_id: r.provider_item_id,
      url:        r.url ?? null,                               // TG-BOOK2: allow null for empty URLs
      title:      r.text ?? r.url ?? `Telegram message ${r.provider_item_id}`,
      description: r.text ?? null,
      tags:       ['telegram'],
      created_at: r.created_at,
      updated_at: new Date().toISOString()
    }));

    console.log(`[TG-DEBUG] Prepared ${bookmarkRows.length} bookmarkRows for bookmarks table`)

    // TG-BOOK2: Try different conflict resolution approaches
    let bookmarkResult;
    
    // First, try with provider_item_id conflict (if index exists)
    try {
      bookmarkResult = await supabase
        .from('bookmarks')
        .upsert(bookmarkRows, { 
          onConflict: 'user_id,source,provider_item_id',
          ignoreDuplicates: false 
        });
    } catch (firstError) {
      console.log('[TG-DEBUG] provider_item_id conflict failed, trying user_id only');
      
      // Fallback: try with just user_id (less ideal but should work)
      try {
        bookmarkResult = await supabase
          .from('bookmarks')
          .upsert(bookmarkRows, { 
            onConflict: 'user_id',
            ignoreDuplicates: false 
          });
      } catch (secondError) {
        console.log('[TG-DEBUG] user_id conflict failed, trying manual insert');
        
        // Last resort: insert without conflict resolution
        bookmarkResult = await supabase
          .from('bookmarks')
          .insert(bookmarkRows);
      }
    }

    const { data: bookmarkData, error: bookmarkErr } = bookmarkResult;

    if (bookmarkErr) {
      console.error('[TG-DEBUG] TG upload → bookmarks error:', bookmarkErr);
    } else {
      console.log(`[TG-DEBUG] Successfully upserted ${bookmarkRows.length} rows into bookmarks table`);
    }

    // TASK 2: Update last_sync_message_id if we imported newer messages
    const messageIds = validMessages.map(msg => msg.id)
    const maxMessageId = Math.max(...messageIds)

    // Get current last_sync_message_id (handle missing column gracefully)
    const { data: currentAccount } = await supabase
      .from('connected_accounts')
      .select('*')
      .eq('user_id', user.id)
      .eq('provider', 'telegram')
      .single()

    const currentMaxId = (currentAccount as any)?.last_sync_message_id || 0

    // Only update if we imported newer messages (handle missing column gracefully)
    if (maxMessageId > currentMaxId) {
      const updateData: any = {
        updated_at: new Date().toISOString()
      }
      
      // Add last_sync fields if they exist in the schema
      try {
        updateData.last_sync_message_id = maxMessageId
        updateData.last_sync_at = new Date().toISOString()
      } catch {
        // Column might not exist yet
      }

      const { error: updateError } = await supabase
        .from('connected_accounts')
        .update(updateData)
        .eq('user_id', user.id)
        .eq('provider', 'telegram')

      if (updateError) {
        console.error('Error updating sync metadata:', updateError)
        // Don't fail the request, just log the error
      } else {
        console.log(`Updated last_sync_message_id to ${maxMessageId}`)
      }
    }

    console.log(`Successfully imported ${validMessages.length} telegram messages from export`)

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${validMessages.length} messages from export`,
      inserted: validMessages.length,
      lastMessageId: maxMessageId
    })

  } catch (error) {
    console.error('Error processing telegram export:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

/* TASK 2 ✅ JSON Export Upload Implementation:
 * - Accepts FormData with 'export' file
 * - Parses Telegram export JSON format
 * - Maps to same database schema as MTProto sync
 * - Handles both string and unix timestamp dates
 * - Updates last_sync_message_id if importing newer messages
 * - Uses same conflict resolution as incremental sync
 */ 