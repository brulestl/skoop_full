// Setup Telegram Bot Webhook
// Run this after deploying your webhook function

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_URL = 'https://llsjysvklkohnzgmpyob.supabase.co/functions/v1/telegram_webhook';

if (!BOT_TOKEN) {
  console.error('❌ TELEGRAM_BOT_TOKEN environment variable not set!');
  console.log('Please set it with: $env:TELEGRAM_BOT_TOKEN="your_bot_token_here"');
  process.exit(1);
}

async function setupBot() {
  try {
    console.log('🤖 Setting up Telegram bot...');
    
    // First, get current webhook info
    const webhookInfo = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`);
    const webhookData = await webhookInfo.json();
    
    console.log('📡 Current webhook info:', webhookData);
    
    // Set the webhook
    const setWebhook = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: WEBHOOK_URL,
        allowed_updates: ['message', 'callback_query']
      })
    });
    
    const setWebhookData = await setWebhook.json();
    console.log('✅ Webhook setup result:', setWebhookData);
    
    if (setWebhookData.ok) {
      console.log('🎉 Bot is now ready to receive messages!');
      console.log('📱 Send a message to your bot to test it');
    } else {
      console.error('❌ Failed to set webhook:', setWebhookData);
    }
    
  } catch (error) {
    console.error('❌ Error setting up bot:', error);
  }
}

setupBot(); 