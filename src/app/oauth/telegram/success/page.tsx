'use client';
import { useEffect } from 'react';

export default function TelegramSuccess() {
  useEffect(() => {
    console.log('TelegramSuccess: Component mounted');
    
    if (window.opener) {
      console.log('TelegramSuccess: Posting success message to parent window');
      window.opener.postMessage(
        { 
          type: 'oauth_success',
          provider: 'telegram', 
          success: true,
          message: 'Telegram connected successfully!'
        }, 
        window.location.origin // Use same origin for security
      );
      
      // Close popup after a short delay to ensure message is sent
      setTimeout(() => {
        console.log('TelegramSuccess: Closing popup window');
        window.close();
      }, 500);
    } else {
      console.log('TelegramSuccess: No opener window found, redirecting to dashboard');
      // Fallback if not opened in popup
      setTimeout(() => {
        window.location.href = '/dashboard?connected=telegram&success=true';
      }, 1000);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <div className="mb-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Telegram Connected!
        </h1>
        <p className="text-gray-600 mb-4">
          Your Telegram account has been successfully connected to Skoop.
        </p>
        <p className="text-sm text-gray-500">
          This window will close automatically...
        </p>
      </div>
    </div>
  );
} 