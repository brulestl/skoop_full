import { Suspense } from 'react';
import SignupForm from '@/components/auth/signup-form';
import Link from 'next/link';

export const metadata = {
  title: "Sign Up | SKOOP",
  description: "Create your SKOOP account to collect and organize your digital content"
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border h-16">
        <div className="skoop-container h-full flex items-center">
          <Link href="/" className="logo text-2xl font-bold text-primary">SKOOP</Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center py-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create your account</h1>
            <p className="text-muted-foreground">Join SKOOP to organize your digital knowledge</p>
          </div>
          
          <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
            <SignupForm />
          </Suspense>
        </div>
      </main>

      <footer className="py-6 border-t border-border">
        <div className="skoop-container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SKOOP. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
