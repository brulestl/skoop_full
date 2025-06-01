// Test and clear pending Telegram bot messages
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

async function testBot() {
  try {
    console.log('🧪 Testing bot and clearing pending messages...');
    
    // Get and clear pending updates
    const getUpdates = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=-1`);
    const updates = await getUpdates.json();
    
    console.log('📬 Pending updates cleared:', updates.result ? updates.result.length : 0);
    
    // Get bot info
    const getMe = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`);
    const botInfo = await getMe.json();
    
    if (botInfo.ok) {
      console.log('🤖 Bot info:', botInfo.result.first_name, '@' + botInfo.result.username);
    } else {
      console.log('❌ Bot error:', botInfo);
    }
    
    // Get webhook info again
    const webhookInfo = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`);
    const webhookData = await webhookInfo.json();
    
    if (webhookData.ok) {
      console.log('📡 Webhook URL:', webhookData.result.url);
      console.log('📊 Pending updates:', webhookData.result.pending_update_count || 0);
      if (webhookData.result.last_error_message) {
        console.log('⚠️  Last error:', webhookData.result.last_error_message);
      }
    }
    
    console.log('\n✅ Setup complete! The issue is likely that your Supabase function needs the bot token.');
    console.log('📱 Try sending a message to your bot. If it still doesn\'t work, we need to start Docker and redeploy.');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testBot(); 