// Check what the pending Telegram updates contain
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

async function checkPendingUpdates() {
  try {
    console.log('🔍 Checking what the 18 pending updates are...\n');
    
    // Get all pending updates without confirming them (don't use offset)
    const getUpdates = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`);
    const updates = await getUpdates.json();
    
    if (updates.ok && updates.result.length > 0) {
      console.log(`📬 Found ${updates.result.length} pending updates:\n`);
      
      updates.result.forEach((update, index) => {
        console.log(`--- Update ${index + 1} ---`);
        console.log(`Update ID: ${update.update_id}`);
        
        if (update.message) {
          const msg = update.message;
          console.log(`📱 Message from: ${msg.from.first_name} (@${msg.from.username || 'no_username'})`);
          console.log(`📅 Date: ${new Date(msg.date * 1000).toLocaleString()}`);
          console.log(`💬 Text: "${msg.text || msg.caption || '[media]'}"`);
          console.log(`🆔 Message ID: ${msg.message_id}`);
        }
        
        if (update.callback_query) {
          const cb = update.callback_query;
          console.log(`🔘 Button click from: ${cb.from.first_name}`);
          console.log(`📊 Data: ${cb.data}`);
        }
        
        console.log(''); // Empty line
      });
      
      console.log('🔄 These are the messages that failed because your webhook returned 401 Unauthorized.');
      console.log('💡 They happened when the bot token wasn\'t set in your Supabase function.');
      console.log('\n🧹 Want to clear them? Send a new message to test the bot!');
      
    } else {
      console.log('📭 No pending updates found (they might have been cleared).');
    }
    
  } catch (error) {
    console.error('❌ Error checking updates:', error);
  }
}

checkPendingUpdates(); 