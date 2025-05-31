import { serve } from 'https://deno.land/x/sift@0.6.0/mod.ts';

// Telegram Bot Webhook Handler - v1.0.0
const BOT = Deno.env.get('TELEGRAM_BOT_TOKEN')!;

const api = (method: string, body: unknown) =>
  fetch(`https://api.telegram.org/bot${BOT}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

serve(async (req) => {
  // Handle CORS and OPTIONS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  }

  try {
    const upd = await req.json();
    console.log('[TG-WEBHOOK] Received update:', JSON.stringify(upd, null, 2));

    // Handle new messages - show Discard/Sync buttons
    if (upd.message) {
      const m = upd.message;
      
      console.log(`[TG-WEBHOOK] New message from ${m.from.id}: ${m.text || m.caption || 'media'}`);
      
      await api('sendMessage', {
        chat_id: m.chat.id,
        text: 'Choose an action:',
        reply_to_message_id: m.message_id,
        reply_markup: {
          inline_keyboard: [[
            { text: '🗑️ Discard', callback_data: `discard:${m.message_id}` },
            { text: '✅ Sync Message', callback_data: `sync:${m.message_id}` }
          ]]
        }
      });

      console.log(`[TG-WEBHOOK] Sent buttons for message ${m.message_id}`);
    }

    // Handle button clicks
    if (upd.callback_query) {
      const cb = upd.callback_query;
      const [action, messageId] = cb.data.split(':');
      
      console.log(`[TG-WEBHOOK] Button clicked: ${action} for message ${messageId}`);

      if (action === 'discard') {
        // Delete the original message and the button message
        try {
          await api('deleteMessage', {
            chat_id: cb.message.chat.id,
            message_id: Number(messageId)
          });
          
          await api('deleteMessage', {
            chat_id: cb.message.chat.id,
            message_id: cb.message.message_id
          });
          
          console.log(`[TG-WEBHOOK] Discarded message ${messageId}`);
        } catch (deleteError) {
          console.error('[TG-WEBHOOK] Error deleting message:', deleteError);
          // Still answer the callback even if deletion fails
        }
      }

      if (action === 'sync') {
        console.log(`[TG-WEBHOOK] Syncing message ${messageId}...`);
        
        // Find the original message from the callback query
        const originalMessage = cb.message.reply_to_message;
        
        if (originalMessage) {
          try {
            // Forward to ingest function
            const ingestResponse = await fetch(
              'https://llsjysvklkohnzgmpyob.supabase.co/functions/v1/ingest_telegram_message',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${BOT}`
                },
                body: JSON.stringify(originalMessage)
              }
            );

            const result = await ingestResponse.json();
            
            if (ingestResponse.ok) {
              // Update button message to show success
              await api('editMessageText', {
                chat_id: cb.message.chat.id,
                message_id: cb.message.message_id,
                text: '✅ Message synced to Skoop successfully!'
              });
              
              console.log(`[TG-WEBHOOK] Successfully synced message ${messageId}`);
            } else {
              // Show error message
              await api('editMessageText', {
                chat_id: cb.message.chat.id,
                message_id: cb.message.message_id,
                text: `❌ Sync failed: ${result.error || 'Unknown error'}`
              });
              
              console.error(`[TG-WEBHOOK] Sync failed:`, result);
            }
          } catch (syncError) {
            console.error('[TG-WEBHOOK] Error during sync:', syncError);
            
            // Show error message
            await api('editMessageText', {
              chat_id: cb.message.chat.id,
              message_id: cb.message.message_id,
              text: '❌ Sync failed: Network error'
            });
          }
        } else {
          console.error('[TG-WEBHOOK] No original message found in callback');
          
          // Show error message
          await api('editMessageText', {
            chat_id: cb.message.chat.id,
            message_id: cb.message.message_id,
            text: '❌ Sync failed: Original message not found'
          });
        }
      }

      // Always answer the callback query
      await api('answerCallbackQuery', {
        callback_query_id: cb.id
      });
    }

    return new Response('ok', {
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('[TG-WEBHOOK] Error processing update:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}); 