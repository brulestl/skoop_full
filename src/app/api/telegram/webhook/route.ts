import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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
      
      if (data === 'connect_to_skoop') {
        await sendTelegramMessage(chatId, '🔗 Click the link below to connect your account:\n\nhttps://skoop.pro/api/oauth/telegram/start');
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
      console.log('/start command received');
      
      // Show URL button that goes to the login widget page
      await sendTelegramMessageWithUrlButton(
        chatId, 
        '🔗 Welcome to Skoop!\n\nTo connect your Telegram account and sync your saved messages, click the button below:',
        'Connect to Skoop',
        'https://skoop.pro/api/oauth/telegram/start'
      );
    } else {
      console.log('Unhandled message:', text);
      await sendTelegramMessage(chatId, 'Welcome to Skoop! Send /start to connect your account.');
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
    } else {
      console.log('Successfully sent Telegram message to chat:', chatId);
    }
  } catch (error) {
    console.error('Error sending Telegram message:', error);
  }
}

async function sendTelegramMessageWithUrlButton(chatId: number, text: string, buttonText: string, url: string) {
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
              url: url
            }
          ]]
        }
      }),
    });

    if (!response.ok) {
      console.error('Failed to send Telegram message with URL button:', await response.text());
    } else {
      console.log('Successfully sent Telegram message with URL button to chat:', chatId);
    }
  } catch (error) {
    console.error('Error sending Telegram message with URL button:', error);
  }
} 