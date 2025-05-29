import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const config = {
      botId: process.env.TELEGRAM_BOT_ID || null,
      botToken: process.env.TELEGRAM_BOT_TOKEN ? 'SET' : null,
      botUsername: process.env.TELEGRAM_BOT_USERNAME || null,
      appUrl: process.env.NEXT_PUBLIC_APP_URL || null,
    };

    return NextResponse.json(config);
  } catch (error) {
    console.error('Error checking Telegram config:', error);
    return NextResponse.json(
      { error: 'Failed to check configuration' },
      { status: 500 }
    );
  }
} 