const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");

// Replace with your values from https://my.telegram.org/apps
const apiId = 20151707;
const apiHash = "68c9850b66581c18eb4ba41c0ce077d5";

const stringSession = new StringSession("");

(async () => {
  console.log("🔐 Generating NEW clean Telegram Session String...");
  console.log("⚠️  IMPORTANT: This will create a NEW session, invalidating the old one");
  console.log(`📱 Using API ID: ${apiId}`);
  
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  
  try {
    await client.start({
      phoneNumber: async () => await input.text("📱 Enter your phone number (with country code, e.g., +385xxxxxxxxx): "),
      password: async () => await input.text("🔒 Enter your 2FA password (or press Enter if none): "),
      phoneCode: async () => await input.text("💬 Enter the verification code from Telegram: "),
      onError: (err) => console.error("❌ Authentication error:", err),
    });
    
    const sessionString = client.session.save();
    
    console.log("\n✅ Successfully authenticated with Telegram!");
    console.log("📝 Your NEW CLEAN session string:");
    console.log("==================================================");
    console.log(sessionString);
    console.log("==================================================");
    console.log(`\n📏 Session length: ${sessionString.length} characters`);
    console.log(`🔍 Session preview: ${sessionString.substring(0, 30)}...`);
    
    // Validate the session string doesn't contain spaces
    if (sessionString.includes(' ')) {
      console.log("⚠️  WARNING: Session string contains spaces! This is unusual.");
    } else {
      console.log("✅ Session string validation: No spaces found - looks good!");
    }
    
    console.log("\n🔥 NEXT STEPS:");
    console.log("1. Copy the COMPLETE session string above");
    console.log("2. Go to your Supabase dashboard SQL editor");
    console.log("3. Run this EXACT SQL (copy/paste):");
    console.log(`
UPDATE connected_accounts 
SET 
  telegram_session_string = '${sessionString}',
  status = 'active',
  last_error = NULL,
  updated_at = NOW()
WHERE user_id = 'e3ef0830-5658-445e-8193-17b28703ebf2' 
AND provider = 'telegram';
    `);
    console.log("4. Test sync in your app at https://skoop.pro/tgbookmarks");
    console.log("\n🚨 The old session is now invalid - only this new one will work!");
    
    await client.disconnect();
    
  } catch (error) {
    console.error("💥 Error:", error);
    console.error("\n🔧 Troubleshooting:");
    console.error("- Make sure your API credentials are correct");
    console.error("- Check your internet connection");
    console.error("- Verify your phone number includes country code");
    console.error("- Try again in a few minutes if rate limited");
  }
})(); 