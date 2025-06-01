// Test the webhook endpoint directly to see the actual error
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

async function testWebhookDirect() {
  try {
    console.log('🔍 Testing webhook endpoint directly...\n');
    
    // Test with a fake message to see the error
    const testMessage = {
      message: {
        message_id: 999,
        from: { id: 123, first_name: "Test" },
        chat: { id: 123 },
        text: "test",
        date: Math.floor(Date.now() / 1000)
      }
    };
    
    console.log('📡 Sending test request to webhook...');
    
    const response = await fetch('https://llsjysvklkohnzgmpyob.supabase.co/functions/v1/telegram_webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testMessage)
    });
    
    console.log(`📊 Response status: ${response.status}`);
    console.log(`📊 Response status text: ${response.statusText}`);
    
    const responseText = await response.text();
    console.log(`📝 Response body: ${responseText}`);
    
    if (response.status === 401) {
      console.log('\n❌ The webhook is returning 401 Unauthorized');
      console.log('💡 This means the TELEGRAM_BOT_TOKEN environment variable is not accessible');
      console.log('🔧 Let me try to redeploy the function...');
      
      // Let's try to delete the webhook and set it up again
      console.log('\n🧹 Clearing webhook to reset...');
      const deleteWebhook = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/deleteWebhook`);
      const deleteResult = await deleteWebhook.json();
      console.log('🗑️ Delete webhook result:', deleteResult);
      
      // Wait a moment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Set it up again
      console.log('🔄 Setting webhook again...');
      const setWebhook = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: 'https://llsjysvklkohnzgmpyob.supabase.co/functions/v1/telegram_webhook',
          allowed_updates: ['message', 'callback_query']
        })
      });
      
      const setResult = await setWebhook.json();
      console.log('✅ Set webhook result:', setResult);
      
      console.log('\n🎯 Now try sending a message to @skoop_bot again!');
    }
    
  } catch (error) {
    console.error('❌ Error testing webhook:', error);
  }
}

testWebhookDirect(); 