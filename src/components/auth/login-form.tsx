'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (signInError) {
        throw signInError;
      }

      if (data.user) {
        // Redirect to dashboard on successful login
        router.push(redirect);
      }
    } catch (err: any) {
      // Surface the error message from Supabase
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return <motion.div initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.4
  }} className="skoop-card p-8" data-unique-id="2cd341f5-3d98-4fd7-a28e-514b20e97378" data-file-name="components/auth/login-form.tsx" data-dynamic-text="true">
      {error && <div className="mb-6 p-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg text-sm" data-unique-id="73ae27a0-b6d7-4eec-a969-4c54e9f5df51" data-file-name="components/auth/login-form.tsx" data-dynamic-text="true">
          {error}
        </div>}

      <form onSubmit={handleSubmit} className="space-y-6" data-unique-id="c9b04700-a807-4e37-b2c3-9b7da1022ced" data-file-name="components/auth/login-form.tsx">
        <div className="space-y-2" data-unique-id="4046ccdc-cc5c-4c2a-b0fb-5bca2f79297d" data-file-name="components/auth/login-form.tsx">
          <label htmlFor="email" className="text-sm font-medium block" data-unique-id="db6b96ba-2609-450c-a749-040f924aef2c" data-file-name="components/auth/login-form.tsx"><span className="editable-text" data-unique-id="3b47cce5-e4af-4eac-8fab-ec30b8e5c263" data-file-name="components/auth/login-form.tsx">
            Email address
          </span></label>
          <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border border-border rounded-md bg-background" placeholder="you@example.com" required disabled={isLoading} data-unique-id="0d84404d-616b-4b09-ab43-c7a5f316a1f0" data-file-name="components/auth/login-form.tsx" />
        </div>
        
        <div className="space-y-2" data-unique-id="0495b346-f004-413f-aca2-574d2770f3cf" data-file-name="components/auth/login-form.tsx">
          <div className="flex items-center justify-between" data-unique-id="716a6cae-69af-4bab-8c60-44918d9f386b" data-file-name="components/auth/login-form.tsx">
            <label htmlFor="password" className="text-sm font-medium block" data-unique-id="64a2f64c-9d3f-43b3-bab8-797bcf897d56" data-file-name="components/auth/login-form.tsx"><span className="editable-text" data-unique-id="568d43af-f4d0-4c30-81c6-07ab8d3b7cc1" data-file-name="components/auth/login-form.tsx">
              Password
            </span></label>
            <Link href="/forgot-password" className="text-xs text-primary hover:underline" data-unique-id="8ff30adc-1f61-403d-8016-e7d7a1698252" data-file-name="components/auth/login-form.tsx"><span className="editable-text" data-unique-id="e582551c-b4be-4f3b-9190-5ebd1f59c78e" data-file-name="components/auth/login-form.tsx">
              Forgot password?
            </span></Link>
          </div>
          <div className="relative" data-unique-id="6968486d-e4c0-47be-8913-dcc4c854f992" data-file-name="components/auth/login-form.tsx">
            <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border border-border rounded-md bg-background" placeholder="••••••••" required disabled={isLoading} data-unique-id="1aa92f4a-c9b3-4f52-950d-9e020376b9d3" data-file-name="components/auth/login-form.tsx" />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)} data-unique-id="6c7802fe-384f-4f3a-a0ae-89105428047a" data-file-name="components/auth/login-form.tsx" data-dynamic-text="true">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        
        <Button type="submit" className="w-full skoop-button-primary flex items-center justify-center" disabled={isLoading} data-unique-id="a0c38041-0382-43c5-af79-3d116b7500bd" data-file-name="components/auth/login-form.tsx" data-dynamic-text="true">
          {isLoading ? <>
              <span className="animate-spin mr-2" data-unique-id="131627a4-5793-439b-b328-7e1b9473580d" data-file-name="components/auth/login-form.tsx">
                <svg className="h-4 w-4" viewBox="0 0 24 24" data-unique-id="d5ba2ca3-e409-457c-8996-76c32d2dfb19" data-file-name="components/auth/login-form.tsx">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </span>
              <span data-unique-id="2a2a4ebd-978f-4cc4-b4ca-21fb61b38f88" data-file-name="components/auth/login-form.tsx"><span className="editable-text" data-unique-id="8cc731cb-a00d-4809-afbb-4586de0e2687" data-file-name="components/auth/login-form.tsx">Logging in...</span></span>
            </> : <>
              <span data-unique-id="6477efa1-4bd0-4bc1-a598-73ed7d579dac" data-file-name="components/auth/login-form.tsx"><span className="editable-text" data-unique-id="906947ac-b591-4727-bc49-aa810f0b27aa" data-file-name="components/auth/login-form.tsx">Log in</span></span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </>}
        </Button>
      </form>
      
      <div className="mt-6 text-center" data-unique-id="6f828235-3858-49d0-b522-2e353b4e64b6" data-file-name="components/auth/login-form.tsx">
        <p className="text-sm text-muted-foreground" data-unique-id="951b4254-e9a8-4ed1-9532-0a8197a6af4e" data-file-name="components/auth/login-form.tsx"><span className="editable-text" data-unique-id="6bd7214d-a2d0-44ec-998c-9a4cecb01ff2" data-file-name="components/auth/login-form.tsx">
          Don't have an account?</span>{' '}
          <Link href="/signup" className="text-primary hover:underline font-medium" data-unique-id="527bb289-18b5-4787-9786-93c0f1b57abf" data-file-name="components/auth/login-form.tsx"><span className="editable-text" data-unique-id="092550e8-08f6-48ff-8d53-91b143d03ec4" data-file-name="components/auth/login-form.tsx">
            Sign up
          </span></Link>
        </p>
      </div>
    </motion.div>;
}