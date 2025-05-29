import TelegramSupportForm from '@/components/telegram-support-form';

export default function TelegramSupportPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Telegram Setup Support</h1>
        
        <div className="mb-8 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Before You Submit</h2>
          <div className="space-y-3 text-sm">
            <p>✅ <strong>Created Telegram app</strong> at https://my.telegram.org/apps</p>
            <p>✅ <strong>Generated session string</strong> using the provided Node.js script</p>
            <p>✅ <strong>Copied the session string</strong> from the script output</p>
          </div>
        </div>

        <TelegramSupportForm />

        <div className="mt-8 p-6 border rounded">
          <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Can't create a Telegram app?</strong> Make sure you're logged into Telegram and have a verified phone number.</p>
            <p><strong>Script not working?</strong> Ensure you have Node.js installed and all dependencies: <code>npm install telegram input</code></p>
            <p><strong>Session string looks wrong?</strong> It should be a long string of letters and numbers, typically 200+ characters.</p>
            <p><strong>Still stuck?</strong> Contact us at support@skoop.pro with your issue details.</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a 
            href="/dashboard" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
} 