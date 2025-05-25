'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const router = useRouter();

  // Password validation
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordStrength = (hasMinLength ? 1 : 0) + (hasUpperCase ? 1 : 0) + (hasLowerCase ? 1 : 0) + (hasNumber ? 1 : 0);
  const getStrengthClass = () => {
    if (password === '') return 'bg-border';
    if (passwordStrength < 2) return 'bg-destructive';
    if (passwordStrength < 4) return 'bg-accent';
    return 'bg-primary';
  };
  const getStrengthText = () => {
    if (password === '') return '';
    if (passwordStrength < 2) return 'Weak';
    if (passwordStrength < 4) return 'Medium';
    return 'Strong';
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!acceptTerms) {
      setError('You must accept the terms and conditions');
      return;
    }
    if (passwordStrength < 2) {
      setError('Please choose a stronger password');
      return;
    }

    setIsLoading(true);

    try {
      // Sign up the user with Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: name.trim(),
          }
        }
      });

      if (signUpError) {
        throw signUpError;
      }

      if (data.user) {
        // User profile will be created automatically by the database trigger
        // No need to manually insert into public.users anymore

        // If email confirmation is required, show a message
        if (!data.session) {
          setError('Please check your email and click the confirmation link to complete your registration.');
          return;
        }

        // Redirect to dashboard on successful signup
      router.push('/dashboard');
      }
    } catch (err: any) {
      // Surface the error message from Supabase
      setError(err.message || 'An error occurred during signup');
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
  }} className="skoop-card p-8" data-unique-id="be0acf95-3f87-4ed9-a1e2-62d8f28d4e6f" data-file-name="components/auth/signup-form.tsx" data-dynamic-text="true">
      {error && <div className="mb-6 p-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg text-sm" data-unique-id="a91cd828-4f81-4ffa-9898-b14a7b9dd706" data-file-name="components/auth/signup-form.tsx" data-dynamic-text="true">
          {error}
        </div>}

      <form onSubmit={handleSubmit} className="space-y-6" data-unique-id="bb87fbad-d631-43ba-9bb6-a5eb8a1ddeae" data-file-name="components/auth/signup-form.tsx">
        <div className="space-y-2" data-unique-id="3ee68744-3c0f-4ca8-bb81-bf9588f9b0e4" data-file-name="components/auth/signup-form.tsx">
          <label htmlFor="name" className="text-sm font-medium block" data-unique-id="a51af0a9-e9d2-4e95-b74a-a9eceaaa240e" data-file-name="components/auth/signup-form.tsx"><span className="editable-text" data-unique-id="598bee60-f3a3-44a8-883f-51a687227ea3" data-file-name="components/auth/signup-form.tsx">
            Full name
          </span></label>
          <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border border-border rounded-md bg-background" placeholder="John Doe" required disabled={isLoading} data-unique-id="102bb239-3c05-4571-9ec1-560406389078" data-file-name="components/auth/signup-form.tsx" />
        </div>
      
        <div className="space-y-2" data-unique-id="66f86640-29e9-4945-bd61-42c7eb2608de" data-file-name="components/auth/signup-form.tsx">
          <label htmlFor="email" className="text-sm font-medium block" data-unique-id="37ba939f-7ef6-4df6-a1cb-61449c9c62b3" data-file-name="components/auth/signup-form.tsx"><span className="editable-text" data-unique-id="204060bf-5e19-4dfc-a89e-43615567796b" data-file-name="components/auth/signup-form.tsx">
            Email address
          </span></label>
          <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border border-border rounded-md bg-background" placeholder="you@example.com" required disabled={isLoading} data-unique-id="5a375c73-9fa1-4b4b-beb4-6a212a1656c0" data-file-name="components/auth/signup-form.tsx" />
        </div>
        
        <div className="space-y-2" data-unique-id="77f1906a-8e7d-4339-b926-97f2d63e19d4" data-file-name="components/auth/signup-form.tsx" data-dynamic-text="true">
          <label htmlFor="password" className="text-sm font-medium block" data-unique-id="a6ff2ba7-f2a1-4388-bc7a-df9e89dd2d53" data-file-name="components/auth/signup-form.tsx"><span className="editable-text" data-unique-id="f7b90a0a-3693-4ed4-bea7-ba5ed6f4edb6" data-file-name="components/auth/signup-form.tsx">
            Password
          </span></label>
          <div className="relative" data-unique-id="a2248695-618f-4596-b8a6-7457f71f00ca" data-file-name="components/auth/signup-form.tsx">
            <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border border-border rounded-md bg-background" placeholder="••••••••" required disabled={isLoading} data-unique-id="02a9f6a2-2fbf-4722-a1ce-a35151aae3de" data-file-name="components/auth/signup-form.tsx" />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)} data-unique-id="dc9e2bc4-58f7-42fd-b638-b389b18a4d53" data-file-name="components/auth/signup-form.tsx" data-dynamic-text="true">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          
          {/* Password strength meter */}
          {password && <div className="mt-2" data-unique-id="2446fe69-4b4f-4941-91d6-5a7b9e3662a1" data-file-name="components/auth/signup-form.tsx">
              <div className="h-1 w-full bg-border rounded-full overflow-hidden" data-unique-id="22b7b8a1-dd8f-4691-a86e-731e8fce731d" data-file-name="components/auth/signup-form.tsx">
                <div className={`h-full transition-all duration-300 ${getStrengthClass()}`} style={{
              width: `${25 * passwordStrength}%`
            }} data-unique-id="0bfb2d73-2a63-462e-89d9-d3da54faa564" data-file-name="components/auth/signup-form.tsx" />
              </div>
              <div className="flex justify-between text-xs mt-1" data-unique-id="7e9edb30-2541-42f0-a4ce-e67b051a6789" data-file-name="components/auth/signup-form.tsx">
                <span className="text-muted-foreground" data-unique-id="c9b1a3d2-7ffe-4333-a73b-854cf177c367" data-file-name="components/auth/signup-form.tsx"><span className="editable-text" data-unique-id="bee5b8dd-f001-4a82-802e-c78dc05c2c3f" data-file-name="components/auth/signup-form.tsx">Password strength:</span></span>
                <span className={passwordStrength < 2 ? 'text-destructive' : passwordStrength < 4 ? 'text-accent' : 'text-primary'} data-unique-id="a96d84b8-1174-48d3-b96f-372adda0467c" data-file-name="components/auth/signup-form.tsx" data-dynamic-text="true">
                  {getStrengthText()}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-2" data-unique-id="034f7120-f14b-458e-88fa-87b8c920a7ad" data-file-name="components/auth/signup-form.tsx">
                <div className="flex items-center text-xs" data-unique-id="97a27a74-6868-48f5-a195-b0bf1bfeac2a" data-file-name="components/auth/signup-form.tsx">
                  <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${hasMinLength ? 'bg-primary text-white' : 'bg-muted'}`} data-unique-id="8f64ba32-0829-4834-8003-5cfad2f7032f" data-file-name="components/auth/signup-form.tsx" data-dynamic-text="true">
                    {hasMinLength && <Check className="h-3 w-3" />}
                  </div>
                  <span data-unique-id="7eef7272-a249-46c9-8eb0-4bf92ae8e695" data-file-name="components/auth/signup-form.tsx"><span className="editable-text" data-unique-id="dde933a9-a5db-43a9-a6e6-a4e47c976a78" data-file-name="components/auth/signup-form.tsx">8+ characters</span></span>
                </div>
                <div className="flex items-center text-xs" data-unique-id="df933157-cc9f-4c04-ba3d-e4c4340ae971" data-file-name="components/auth/signup-form.tsx">
                  <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${hasUpperCase ? 'bg-primary text-white' : 'bg-muted'}`} data-unique-id="34013f40-bf98-4a72-9612-beb252fb0afa" data-file-name="components/auth/signup-form.tsx" data-dynamic-text="true">
                    {hasUpperCase && <Check className="h-3 w-3" />}
                  </div>
                  <span data-unique-id="8de225fe-f90f-4c7a-b413-309d615c3303" data-file-name="components/auth/signup-form.tsx"><span className="editable-text" data-unique-id="2c9c7c05-30f2-4b0a-a5f8-12b094515c4b" data-file-name="components/auth/signup-form.tsx">Uppercase letter</span></span>
                </div>
                <div className="flex items-center text-xs" data-unique-id="b29c5ef3-c849-4d23-b4ee-22993355a0eb" data-file-name="components/auth/signup-form.tsx">
                  <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${hasLowerCase ? 'bg-primary text-white' : 'bg-muted'}`} data-unique-id="401d1d48-87b7-47e6-bca0-676985f202f1" data-file-name="components/auth/signup-form.tsx" data-dynamic-text="true">
                    {hasLowerCase && <Check className="h-3 w-3" />}
                  </div>
                  <span data-unique-id="d4c218b0-51c0-4656-bccb-6e2ef98312d0" data-file-name="components/auth/signup-form.tsx"><span className="editable-text" data-unique-id="523831d7-dad0-4f9e-b883-3ffec59e6351" data-file-name="components/auth/signup-form.tsx">Lowercase letter</span></span>
                </div>
                <div className="flex items-center text-xs" data-unique-id="259e5db9-ad88-4687-b7c4-8554cf919d22" data-file-name="components/auth/signup-form.tsx">
                  <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${hasNumber ? 'bg-primary text-white' : 'bg-muted'}`} data-unique-id="70a1465d-8e6f-40b6-98c1-93921ad0c97f" data-file-name="components/auth/signup-form.tsx" data-dynamic-text="true">
                    {hasNumber && <Check className="h-3 w-3" />}
                  </div>
                  <span data-unique-id="c2f27840-b7e1-4415-9b54-85e35967723a" data-file-name="components/auth/signup-form.tsx"><span className="editable-text" data-unique-id="72a0aa8f-65f1-4e38-a18b-19716f670af4" data-file-name="components/auth/signup-form.tsx">Number</span></span>
                </div>
              </div>
            </div>}
        </div>
        
        <div className="flex items-start" data-unique-id="c258be3e-ab6a-4fa9-8c4a-475861308b77" data-file-name="components/auth/signup-form.tsx">
          <div className="flex items-center h-5" data-unique-id="9f398cb2-504b-44e8-8465-d5f09d8b310c" data-file-name="components/auth/signup-form.tsx">
            <input id="terms" type="checkbox" checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)} className="h-4 w-4 rounded border-border bg-background" disabled={isLoading} data-unique-id="bfe4e034-bd19-4fd6-9ead-f32ee8dd41de" data-file-name="components/auth/signup-form.tsx" />
          </div>
          <label htmlFor="terms" className="ml-3 text-sm text-muted-foreground" data-unique-id="eb5be488-a773-46ec-96fd-5869d95740a6" data-file-name="components/auth/signup-form.tsx"><span className="editable-text" data-unique-id="5a8898ce-f2fc-4568-ba8e-d31b5e5cd5f9" data-file-name="components/auth/signup-form.tsx">
            I agree to the</span>{' '}
            <Link href="/terms" className="text-primary hover:underline" data-unique-id="374529aa-b3aa-4d6a-97a0-f6bef540aa0b" data-file-name="components/auth/signup-form.tsx"><span className="editable-text" data-unique-id="30140fbe-cf59-48fd-9d9e-015769c8cafa" data-file-name="components/auth/signup-form.tsx">
              Terms of Service
            </span></Link>{' '}<span className="editable-text" data-unique-id="10b97a0a-665a-46bc-b5bd-b2aaf042ae1c" data-file-name="components/auth/signup-form.tsx">
            and</span>{' '}
            <Link href="/privacy" className="text-primary hover:underline" data-unique-id="3c455045-bd09-4cee-9a82-9db7d06379c5" data-file-name="components/auth/signup-form.tsx"><span className="editable-text" data-unique-id="52209575-b430-4750-ada7-adbef02c8866" data-file-name="components/auth/signup-form.tsx">
              Privacy Policy
            </span></Link>
          </label>
        </div>
        
        <Button type="submit" className="w-full skoop-button-accent flex items-center justify-center" disabled={isLoading || !acceptTerms} data-unique-id="7a752379-6df3-4788-87c9-72161b0b1d87" data-file-name="components/auth/signup-form.tsx" data-dynamic-text="true">
          {isLoading ? <>
              <span className="animate-spin mr-2" data-unique-id="bb658068-540d-446f-a7b1-7ab9be4c5877" data-file-name="components/auth/signup-form.tsx">
                <svg className="h-4 w-4" viewBox="0 0 24 24" data-unique-id="6b6636da-daf1-4201-8a2f-3bcdac9f28be" data-file-name="components/auth/signup-form.tsx">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </span>
              <span data-unique-id="cc826fcd-54b4-4aea-b964-44e022378ca3" data-file-name="components/auth/signup-form.tsx"><span className="editable-text" data-unique-id="8f60574b-0df8-493b-a90c-86f472de725b" data-file-name="components/auth/signup-form.tsx">Creating account...</span></span>
            </> : <>
              <span data-unique-id="681c0730-8296-48e5-b8b6-cfb751998eb5" data-file-name="components/auth/signup-form.tsx"><span className="editable-text" data-unique-id="20b905ae-2d2e-4663-9a91-997541999265" data-file-name="components/auth/signup-form.tsx">Create account</span></span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </>}
        </Button>
      </form>
      
      <div className="mt-6 text-center" data-unique-id="356ff0ef-8d71-4f9d-b10b-190f2cdca542" data-file-name="components/auth/signup-form.tsx">
        <p className="text-sm text-muted-foreground" data-unique-id="8a2b6aa6-61a2-44cd-8780-e69e8323da3c" data-file-name="components/auth/signup-form.tsx"><span className="editable-text" data-unique-id="4ba49a40-f352-49db-b119-877333490525" data-file-name="components/auth/signup-form.tsx">
          Already have an account?</span>{' '}
          <Link href="/login" className="text-primary hover:underline font-medium" data-unique-id="6a3f48bf-9c8a-47ea-9870-ed8e07cb2aef" data-file-name="components/auth/signup-form.tsx"><span className="editable-text" data-unique-id="4b0dfc60-5ab9-4d5e-b701-f5964080a650" data-file-name="components/auth/signup-form.tsx">
            Log in
          </span></Link>
        </p>
      </div>
    </motion.div>;
}