const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");

// STEP 1: Replace these with your actual values from https://my.telegram.org/apps
const apiId = 20151707; // ⚠️ REPLACE: Your numeric API ID (e.g., 1234567)
const apiHash = "68c9850b66581c18eb4ba41c0ce077d5"; // ⚠️ REPLACE: Your API Hash (e.g., "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6")

// ⚠️ IMPORTANT: You MUST update apiId and apiHash above before running!
if (apiId === 0 || apiHash === "") {
  console.error("❌ ERROR: Please update apiId and apiHash in the script first!");
  console.error("🔗 Get your credentials from: https://my.telegram.org/apps");
  console.error("📝 Update lines 6-7 in this file with your actual values");
  process.exit(1);
}

const stringSession = new StringSession("");

(async () => {
  console.log("🔐 Generating Telegram Session String...");
  console.log(`📱 Using API ID: ${apiId}`);
  
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  
  try {
    await client.start({
      phoneNumber: async () => await input.text("📱 Enter your phone number (with country code, e.g., +1234567890): "),
      password: async () => await input.text("🔒 Enter your 2FA password (or press Enter if none): "),
      phoneCode: async () => await input.text("💬 Enter the verification code from Telegram: "),
      onError: (err) => console.error("❌ Authentication error:", err),
    });
    
    console.log("\n✅ Successfully authenticated with Telegram!");
    console.log("📝 Your session string:");
    console.log("==================================================");
    console.log(client.session.save());
    console.log("==================================================");
    console.log("\n🔥 NEXT STEPS:");
    console.log("1. Copy the session string above");
    console.log("2. Go to your Supabase dashboard SQL editor");
    console.log("3. Run this SQL:");
    console.log(`   UPDATE connected_accounts 
   SET telegram_session_string = 'PASTE_SESSION_STRING_HERE'
   WHERE user_id = 'e3ef0830-5658-445e-8193-17b28703ebf2' 
   AND provider = 'telegram';`);
    console.log("4. Test sync in your app at https://skoop.pro/tgbookmarks");
    
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