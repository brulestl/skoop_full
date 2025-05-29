import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Store pending connections temporarily (in production, use Redis or database)
const pendingConnections = new Map<string, { userId: string, timestamp: number }>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Full webhook body:', JSON.stringify(body, null, 2));
    
    const message = body.message;
    const callbackQuery = body.callback_query;
    
    // Handle button clicks
    if (callbackQuery) {
      const chatId = callbackQuery.message.chat.id;
      const userId = callbackQuery.from.id;
      const username = callbackQuery.from.username;
      const firstName = callbackQuery.from.first_name;
      const lastName = callbackQuery.from.last_name;
      const data = callbackQuery.data;
      
      console.log('Button callback received:', { chatId, userId, data });
      
      if (data === 'connect_account') {
        // Check if there's a pending connection for this user
        const pendingKey = `telegram_${userId}`;
        const pending = pendingConnections.get(pendingKey);
        
        if (!pending) {
          await sendTelegramMessage(chatId, '❌ No pending connection found. Please start the connection from your Skoop dashboard first.');
          return NextResponse.json({ ok: true });
        }
        
        // Check if connection is still valid (within 10 minutes)
        if (Date.now() - pending.timestamp > 10 * 60 * 1000) {
          pendingConnections.delete(pendingKey);
          await sendTelegramMessage(chatId, '❌ Connection request expired. Please try again from your Skoop dashboard.');
          return NextResponse.json({ ok: true });
        }
        
        try {
          // Store the connection in database
          const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
          );
          
          const { error: insertError } = await supabase
            .from('connected_accounts')
            .upsert({
              user_id: pending.userId,
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
            await sendTelegramMessage(chatId, '❌ Failed to connect your account. Please try again.');
            return NextResponse.json({ ok: true });
          }

          // Remove pending connection
          pendingConnections.delete(pendingKey);
          
          console.log('Successfully connected Telegram user', userId, 'to Skoop user', pending.userId);
          await sendTelegramMessage(chatId, '✅ Successfully connected to Skoop! Your saved messages will now sync. You can return to the Skoop dashboard.');
          
        } catch (error) {
          console.error('Error processing connection:', error);
          await sendTelegramMessage(chatId, '❌ Failed to connect your account. Please try again.');
        }
        
        return NextResponse.json({ ok: true });
      }
    }
    
    // Handle text messages
    if (!message || !message.text) {
      console.log('No message or text found');
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;
    const userId = message.from.id;
    const username = message.from.username;
    const firstName = message.from.first_name;
    const lastName = message.from.last_name;
    const text = message.text;

    console.log('Telegram message received:', { 
      chatId, 
      userId, 
      username, 
      text,
      fullText: text,
      textLength: text.length 
    });

    // Handle /start command
    if (text === '/start') {
      console.log('Regular /start command received');
      
      // Check if there's a pending connection
      const pendingKey = `telegram_${userId}`;
      const pending = pendingConnections.get(pendingKey);
      
      if (pending && Date.now() - pending.timestamp < 10 * 60 * 1000) {
        // Show connection button
        await sendTelegramMessageWithButton(
          chatId, 
          '🔗 Ready to connect your Telegram account to Skoop!\n\nClick the button below to complete the connection:',
          'Connect to Skoop',
          'connect_account'
        );
      } else {
        await sendTelegramMessage(chatId, 'Welcome to Skoop! 👋\n\nTo connect your account:\n1. Go to your Skoop dashboard\n2. Click "Connect Telegram"\n3. Return here and click /start again');
      }
    } else {
      console.log('Unhandled message:', text);
      await sendTelegramMessage(chatId, 'I only respond to connection requests from the Skoop dashboard. Please use the "Connect Telegram" button in your dashboard.');
    }

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('Telegram webhook error:', error);
    return NextResponse.json({ ok: true });
  }
}

// Function to create a pending connection
export async function createPendingConnection(telegramUserId: string, skoopUserId: string) {
  const pendingKey = `telegram_${telegramUserId}`;
  pendingConnections.set(pendingKey, {
    userId: skoopUserId,
    timestamp: Date.now()
  });
  console.log('Created pending connection for Telegram user', telegramUserId, 'to Skoop user', skoopUserId);
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
    } else {
      console.log('Successfully sent Telegram message to chat:', chatId);
    }
  } catch (error) {
    console.error('Error sending Telegram message:', error);
  }
}

async function sendTelegramMessageWithButton(chatId: number, text: string, buttonText: string, callbackData: string) {
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
        reply_markup: {
          inline_keyboard: [[
            {
              text: buttonText,
              callback_data: callbackData
            }
          ]]
        }
      }),
    });

    if (!response.ok) {
      console.error('Failed to send Telegram message with button:', await response.text());
    } else {
      console.log('Successfully sent Telegram message with button to chat:', chatId);
    }
  } catch (error) {
    console.error('Error sending Telegram message with button:', error);
  }
} 