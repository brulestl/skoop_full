import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    
    if (!botToken) {
      return NextResponse.json({ 
        error: 'TELEGRAM_BOT_TOKEN not configured' 
      }, { status: 400 });
    }

    if (!appUrl) {
      return NextResponse.json({ 
        error: 'NEXT_PUBLIC_APP_URL not configured' 
      }, { status: 400 });
    }

    // Set webhook
    const webhookUrl = `${appUrl}/api/telegram/webhook`;
    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/setWebhook`;
    
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: webhookUrl,
        allowed_updates: ['message'],
      }),
    });

    const result = await response.json();

    if (result.ok) {
      return NextResponse.json({
        success: true,
        message: 'Webhook configured successfully!',
        webhook_url: webhookUrl,
        telegram_response: result,
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Failed to set webhook',
        telegram_response: result,
      }, { status: 400 });
    }

  } catch (error) {
    console.error('Webhook setup error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
} 