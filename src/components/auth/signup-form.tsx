'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const passwordStrength = 
    (hasMinLength ? 1 : 0) +
    (hasUpperCase ? 1 : 0) + 
    (hasLowerCase ? 1 : 0) + 
    (hasNumber ? 1 : 0);
  
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
      // In a real app, you'd create a user here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store auth state in localStorage (for demo only)
      localStorage.setItem('skoop_user', JSON.stringify({
        email,
        name,
        isLoggedIn: true
      }));
      
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="skoop-card p-8"
    >
      {error && (
        <div className="mb-6 p-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium block">
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background"
            placeholder="John Doe"
            required
            disabled={isLoading}
          />
        </div>
      
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium block">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background"
            placeholder="you@example.com"
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium block">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          
          {/* Password strength meter */}
          {password && (
            <div className="mt-2">
              <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${getStrengthClass()}`} 
                  style={{ width: `${25 * passwordStrength}%` }}
                />
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-muted-foreground">Password strength:</span>
                <span className={
                  passwordStrength < 2 ? 'text-destructive' :
                  passwordStrength < 4 ? 'text-accent' :
                  'text-primary'
                }>
                  {getStrengthText()}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex items-center text-xs">
                  <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${hasMinLength ? 'bg-primary text-white' : 'bg-muted'}`}>
                    {hasMinLength && <Check className="h-3 w-3" />}
                  </div>
                  <span>8+ characters</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${hasUpperCase ? 'bg-primary text-white' : 'bg-muted'}`}>
                    {hasUpperCase && <Check className="h-3 w-3" />}
                  </div>
                  <span>Uppercase letter</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${hasLowerCase ? 'bg-primary text-white' : 'bg-muted'}`}>
                    {hasLowerCase && <Check className="h-3 w-3" />}
                  </div>
                  <span>Lowercase letter</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${hasNumber ? 'bg-primary text-white' : 'bg-muted'}`}>
                    {hasNumber && <Check className="h-3 w-3" />}
                  </div>
                  <span>Number</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="h-4 w-4 rounded border-border bg-background"
              disabled={isLoading}
            />
          </div>
          <label htmlFor="terms" className="ml-3 text-sm text-muted-foreground">
            I agree to the{' '}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>
        
        <Button 
          type="submit" 
          className="w-full skoop-button-accent flex items-center justify-center"
          disabled={isLoading || !acceptTerms}
        >
          {isLoading ? (
            <>
              <span className="animate-spin mr-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </span>
              <span>Creating account...</span>
            </>
          ) : (
            <>
              <span>Create account</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
