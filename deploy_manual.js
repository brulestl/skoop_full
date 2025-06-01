// Manual deployment workaround
const BOT_TOKEN = "7821989338:AAHr057oa_LzQunLYRxNjHdA0rEY7LJwlNc";

console.log("🔧 Manual deployment instructions:");
console.log("");
console.log("1. Go to: https://supabase.com/dashboard/project/llsjysvklkohnzgmpyob");
console.log("2. Click 'Edge Functions' in sidebar");
console.log("3. Click 'telegram_webhook'");
console.log("4. Click 'Settings' tab");
console.log("5. Add environment variable:");
console.log(`   Name: TELEGRAM_BOT_TOKEN`);
console.log(`   Value: ${BOT_TOKEN}`);
console.log("6. Click 'Save' then 'Redeploy'");
console.log("");
console.log("🎯 After doing this, test your bot again!");
console.log("📱 Send a message to @skoop_bot and you should see buttons!"); 