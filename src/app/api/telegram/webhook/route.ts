import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = body.message;
    
    if (!message || !message.text) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;
    const userId = message.from.id;
    const username = message.from.username;
    const firstName = message.from.first_name;
    const lastName = message.from.last_name;
    const text = message.text;

    // Check if this is a connection request
    if (text.startsWith('/start connect_')) {
      const stateParam = text.replace('/start connect_', '');
      
      try {
        const stateData = JSON.parse(atob(stateParam));
        const skoopUserId = stateData.userId;
        
        // Store the connection in database
        const supabase = createRouteHandlerClient({ cookies });
        
        const { error: insertError } = await supabase
          .from('connected_accounts')
          .upsert({
            user_id: skoopUserId,
            provider: 'telegram',
            provider_user_id: userId.toString(),
            username: username,
            display_name: `${firstName || ''} ${lastName || ''}`.trim(),
            status: 'active',
            connected_at: new Date().toISOString(),
            access_token: 'telegram_bot_connected',
          }, {
            onConflict: 'user_id,provider'
          });

        if (insertError) {
          console.error('Error storing Telegram connection:', insertError);
          
          // Send error message to user
          await sendTelegramMessage(chatId, '❌ Failed to connect your account. Please try again.');
          return NextResponse.json({ ok: true });
        }

        // Send success message to user
        await sendTelegramMessage(chatId, '✅ Successfully connected to Skoop! Your saved messages will now sync. You can return to the Skoop dashboard.');
        
        return NextResponse.json({ ok: true });
        
      } catch (error) {
        console.error('Error processing connection:', error);
        await sendTelegramMessage(chatId, '❌ Invalid connection request. Please try connecting again from the Skoop dashboard.');
        return NextResponse.json({ ok: true });
      }
    }
    
    // Handle other messages
    if (text === '/start') {
      await sendTelegramMessage(chatId, 'Welcome to Skoop! To connect your account, please use the "Connect Telegram" button in your Skoop dashboard.');
    }

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('Telegram webhook error:', error);
    return NextResponse.json({ ok: true });
  }
}

async function sendTelegramMessage(chatId: number, text: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  
  if (!botToken) {
    console.error('TELEGRAM_BOT_TOKEN not configured');
    return;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      console.error('Failed to send Telegram message:', await response.text());
    }
  } catch (error) {
    console.error('Error sending Telegram message:', error);
  }
} 