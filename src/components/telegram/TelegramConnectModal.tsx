"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, MessageSquare, Phone, Key, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface TelegramConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type Step = 'phone' | 'code' | 'connecting' | 'success';

export function TelegramConnectModal({ isOpen, onClose, onSuccess }: TelegramConnectModalProps) {
  const [step, setStep] = useState<Step>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resetModal = () => {
    setStep('phone');
    setPhoneNumber('');
    setVerificationCode('');
    setError('');
    setLoading(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const sendVerificationCode = async () => {
    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Call Supabase function to send verification code
      const { data, error } = await supabase.functions.invoke('telegram_send_code', {
        body: { phone_number: phoneNumber }
      });

      if (error) {
        setError(error.message || 'Failed to send verification code');
        return;
      }

      if (data?.success) {
        setStep('code');
      } else {
        setError(data?.error || 'Failed to send verification code');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Telegram send code error:', err);
    } finally {
      setLoading(false);
    }
  };

  const verifyCodeAndConnect = async () => {
    if (!verificationCode.trim()) {
      setError('Please enter the verification code');
      return;
    }

    setLoading(true);
    setError('');
    setStep('connecting');

    try {
      // Call Supabase function to verify code and create session
      const { data, error } = await supabase.functions.invoke('telegram_verify_and_connect', {
        body: { 
          phone_number: phoneNumber,
          verification_code: verificationCode
        }
      });

      if (error) {
        setError(error.message || 'Failed to verify code');
        setStep('code');
        return;
      }

      if (data?.success) {
        setStep('success');
        setTimeout(() => {
          onSuccess();
          handleClose();
        }, 2000);
      } else {
        setError(data?.error || 'Failed to verify code');
        setStep('code');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setStep('code');
      console.error('Telegram verify error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, action: () => void) => {
    if (e.key === 'Enter' && !loading) {
      action();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Connect Telegram</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {step === 'phone' && (
            <>
              <div className="space-y-2">
                <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+1234567890"
                  value={phoneNumber}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyPress(e, sendVerificationCode)}
                  disabled={loading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-sm text-gray-600">
                  Enter your phone number with country code (e.g., +1234567890)
                </p>
              </div>
              
              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}

              <Button 
                onClick={sendVerificationCode} 
                disabled={loading || !phoneNumber.trim()}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending Code...
                  </>
                ) : (
                  'Send Verification Code'
                )}
              </Button>
            </>
          )}

          {step === 'code' && (
            <>
              <div className="space-y-2">
                <label htmlFor="code" className="flex items-center gap-2 text-sm font-medium">
                  <Key className="h-4 w-4" />
                  Verification Code
                </label>
                <input
                  id="code"
                  type="text"
                  placeholder="12345"
                  value={verificationCode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVerificationCode(e.target.value)}
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyPress(e, verifyCodeAndConnect)}
                  disabled={loading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={5}
                />
                <p className="text-sm text-gray-600">
                  Enter the 5-digit code sent to {phoneNumber}
                </p>
              </div>
              
              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setStep('phone')}
                  disabled={loading}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  onClick={verifyCodeAndConnect} 
                  disabled={loading || !verificationCode.trim()}
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Connect'
                  )}
                </Button>
              </div>
            </>
          )}

          {step === 'connecting' && (
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
              <div>
                <h3 className="font-medium">Connecting to Telegram...</h3>
                <p className="text-sm text-gray-600">This will only take a moment</p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <MessageSquare className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-green-900">Successfully Connected!</h3>
                <p className="text-sm text-gray-600">Your Telegram account is now linked</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 