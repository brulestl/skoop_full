import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    
    // Check if this is coming from Telegram with user data
    const telegramUserId = url.searchParams.get('id');
    const firstName = url.searchParams.get('first_name');
    const lastName = url.searchParams.get('last_name');
    const username = url.searchParams.get('username');
    const authDate = url.searchParams.get('auth_date');
    const hash = url.searchParams.get('hash');
    
    // If we have Telegram user data, try to auto-connect
    if (telegramUserId && authDate && hash) {
      console.log('Telegram user data received:', { telegramUserId, firstName, lastName, username });
      
      // For now, we'll create a simple success page since we don't have the Skoop user context
      // In a real implementation, you'd verify the hash and handle the connection
      const successHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Telegram Connection</title>
            <style>
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
              }
              .container {
                text-align: center;
                padding: 2rem;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                backdrop-filter: blur(10px);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                max-width: 500px;
              }
              .success {
                font-size: 3rem;
                margin-bottom: 1rem;
              }
              .message {
                font-size: 1.2rem;
                margin-bottom: 2rem;
              }
              .back-button {
                background: #0088cc;
                color: white;
                border: none;
                padding: 16px 32px;
                border-radius: 12px;
                font-size: 18px;
                font-weight: 600;
                cursor: pointer;
                text-decoration: none;
                display: inline-block;
                transition: all 0.2s;
              }
              .back-button:hover {
                background: #006699;
                transform: translateY(-2px);
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="success">✅</div>
              <div class="message">
                Connection received from Telegram!<br>
                User: ${firstName || ''} ${lastName || ''} (@${username || 'unknown'})
              </div>
              <p>Please return to your Skoop dashboard to complete the connection.</p>
              <a href="/dashboard" class="back-button">Go to Dashboard</a>
            </div>
          </body>
        </html>
      `;
      
      return new NextResponse(successHtml, {
        headers: { 'Content-Type': 'text/html' },
      });
    }
    
    // If no Telegram data, show the regular connection instructions
    const botUsername = process.env.TELEGRAM_BOT_USERNAME;
    
    const connectHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Connect Telegram Account</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }
            .container {
              text-align: center;
              padding: 2rem;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 20px;
              backdrop-filter: blur(10px);
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
              max-width: 500px;
            }
            p {
              margin: 0 0 2rem 0;
              font-size: 1.1rem;
              opacity: 0.9;
            }
            .connect-button {
              background: #0088cc;
              color: white;
              border: none;
              padding: 16px 32px;
              border-radius: 12px;
              font-size: 18px;
              font-weight: 600;
              cursor: pointer;
              text-decoration: none;
              display: inline-block;
              transition: all 0.2s;
              margin: 1rem 0;
            }
            .connect-button:hover {
              background: #006699;
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(0, 136, 204, 0.3);
            }
            .steps {
              text-align: left;
              background: rgba(255, 255, 255, 0.1);
              padding: 1.5rem;
              border-radius: 12px;
              margin: 2rem 0;
              font-size: 0.95rem;
            }
            .step {
              margin: 0.8rem 0;
              padding: 0.3rem 0;
            }
            .step-number {
              font-weight: bold;
              color: #4fc3f7;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <p>Connect your Telegram account to sync your saved messages with Skoop</p>
            
            <a href="https://t.me/${botUsername}" class="connect-button" target="_blank">
              Open Telegram Bot
            </a>
            
            <div class="steps">
              <div class="step"><span class="step-number">1.</span> Click the button above to open our Telegram bot</div>
              <div class="step"><span class="step-number">2.</span> Click the "Connect to Skoop" button in the bot</div>
              <div class="step"><span class="step-number">3.</span> You'll be redirected back here automatically</div>
              <div class="step"><span class="step-number">4.</span> Return to your Skoop dashboard</div>
            </div>
            
            <p style="font-size: 0.9rem; opacity: 0.7; margin-top: 2rem;">
              Having trouble? Make sure you're logged into Skoop first.
            </p>
          </div>
        </body>
      </html>
    `;

    return new NextResponse(connectHtml, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error('Telegram OAuth start error:', error);
    
    // Fallback: redirect to dashboard with error
    const dashboardUrl = new URL('/dashboard', request.url);
    dashboardUrl.searchParams.set('error', 'telegram_auth_failed');
    
    return NextResponse.redirect(dashboardUrl);
  }
} 