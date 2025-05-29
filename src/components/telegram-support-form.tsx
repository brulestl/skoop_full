'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function TelegramSupportForm() {
  const [sessionString, setSessionString] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sessionString.trim()) {
      setMessage('Please enter your session string');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/support/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionString: sessionString.trim(),
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setSubmitted(true);
      setMessage('Session string submitted successfully! Our team will process it within 24 hours.');
    } catch (error) {
      console.error('Error submitting session:', error);
      setMessage(error instanceof Error ? error.message : 'Failed to submit session string');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto p-6 border rounded bg-green-50 border-green-200">
        <div className="flex items-center gap-2 text-green-700 mb-3">
          <CheckCircle className="h-5 w-5" />
          <h3 className="font-semibold">Submission Successful!</h3>
        </div>
        <p className="text-green-600 text-sm">
          Your Telegram session string has been submitted. Our support team will process it and activate your account within 24 hours.
        </p>
        <p className="text-green-600 text-sm mt-2">
          You'll receive an email confirmation once your Telegram account is connected.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 border rounded">
      <h3 className="text-lg font-semibold mb-4">Submit Telegram Session String</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="sessionString" className="block text-sm font-medium mb-2">
            Session String
          </label>
          <textarea
            id="sessionString"
            value={sessionString}
            onChange={(e) => setSessionString(e.target.value)}
            placeholder="Paste your generated session string here..."
            rows={4}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            This should be the output from the session generation script
          </p>
        </div>

        {message && (
          <div className={`p-3 rounded text-sm ${
            submitted 
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            <div className="flex items-center gap-2">
              {submitted ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <span>{message}</span>
            </div>
          </div>
        )}

        <Button 
          type="submit" 
          disabled={loading || !sessionString.trim()}
          className="w-full"
        >
          {loading ? (
            'Submitting...'
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Submit Session String
            </>
          )}
        </Button>
      </form>

      <div className="mt-4 p-3 bg-blue-50 rounded text-sm">
        <p className="text-blue-700">
          <strong>Security Note:</strong> Your session string will be securely stored and only used to connect your Telegram account. Our team will delete any temporary copies after processing.
        </p>
      </div>
    </div>
  );
} 