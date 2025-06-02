import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const config = {
      TELEGRAM_BOT_TOKEN: !!process.env.TELEGRAM_BOT_TOKEN,
      TELEGRAM_BOT_USERNAME: !!process.env.TELEGRAM_BOT_USERNAME,
      TELEGRAM_API_ID: !!process.env.TELEGRAM_API_ID,
      TELEGRAM_API_HASH: !!process.env.TELEGRAM_API_HASH,
      OAUTH_ENCRYPTION_KEY: !!process.env.OAUTH_ENCRYPTION_KEY,
      NEXT_PUBLIC_APP_URL: !!process.env.NEXT_PUBLIC_APP_URL,
    };

    const missingVars = Object.entries(config)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    const isConfigured = missingVars.length === 0;

    return NextResponse.json({
      configured: isConfigured,
      environment_variables: config,
      missing_variables: missingVars,
      message: isConfigured 
        ? 'Telegram is properly configured' 
        : `Missing environment variables: ${missingVars.join(', ')}`,
    });

  } catch (error) {
    console.error('Config check error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to check configuration',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
} 