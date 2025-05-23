import { Suspense } from 'react';
import LoginForm from '@/components/auth/login-form';
import Link from 'next/link';
export const metadata = {
  title: "Login | SKOOP",
  description: "Log in to access your saved content across the internet"
};
export default function LoginPage() {
  return <div className="min-h-screen flex flex-col" data-unique-id="0b4af1f6-c170-450a-b39b-b8fd1ed6baa7" data-file-name="app/login/page.tsx" data-dynamic-text="true">
      {/* Header */}
      <header className="border-b border-border h-16" data-unique-id="6e0dbab1-6715-4621-b5d8-05e9ead04bb6" data-file-name="app/login/page.tsx">
        <div className="skoop-container h-full flex items-center" data-unique-id="1006f5bf-cfc5-42a5-bd26-f422630399ea" data-file-name="app/login/page.tsx">
          <Link href="/" className="logo text-2xl font-bold text-primary" data-unique-id="690038da-888e-4919-9b5c-6ed6d2cae53f" data-file-name="app/login/page.tsx"><span className="editable-text" data-unique-id="b6453257-6bf7-4680-95bb-6e30ebf5ec94" data-file-name="app/login/page.tsx">SKOOP</span></Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center py-10" data-unique-id="3b87535b-2cc6-418d-8d7d-a85823db925f" data-file-name="app/login/page.tsx">
        <div className="w-full max-w-md" data-unique-id="31f25ac0-2b53-4772-a1df-85c674fa5419" data-file-name="app/login/page.tsx">
          <div className="text-center mb-8" data-unique-id="bf96ef29-c402-44e5-9690-f62d0185b5ba" data-file-name="app/login/page.tsx">
            <h1 className="text-3xl font-bold mb-2" data-unique-id="d37f66bf-750d-49ba-adb1-2a556aed82bd" data-file-name="app/login/page.tsx"><span className="editable-text" data-unique-id="c7bc855d-f299-4ef8-a9cc-2eed076e6960" data-file-name="app/login/page.tsx">Welcome back</span></h1>
            <p className="text-muted-foreground" data-unique-id="4fcb6fdf-320b-4e12-a68a-c3ecaf16f34d" data-file-name="app/login/page.tsx"><span className="editable-text" data-unique-id="cf5a2d96-b90d-4a07-9fcd-8ead4c10b126" data-file-name="app/login/page.tsx">Log in to continue to your dashboard</span></p>
          </div>
          
          <Suspense fallback={<div className="p-8 text-center" data-unique-id="624482e9-019e-47cc-8d9c-84534cbacb31" data-file-name="app/login/page.tsx"><span className="editable-text" data-unique-id="d3567438-6d31-43e5-be6f-69e2ff1c1916" data-file-name="app/login/page.tsx">Loading...</span></div>}>
            <LoginForm />
          </Suspense>
        </div>
      </main>

      <footer className="py-6 border-t border-border" data-unique-id="affa0a43-2927-4239-8da7-3baa67fee754" data-file-name="app/login/page.tsx">
        <div className="skoop-container text-center text-sm text-muted-foreground" data-unique-id="367dee3b-165b-4de2-8108-424906d0f879" data-file-name="app/login/page.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="a8ac132d-4c5c-42c7-bdf9-f655e7c583d5" data-file-name="app/login/page.tsx">
          © </span>{new Date().getFullYear()}<span className="editable-text" data-unique-id="3189658b-96dd-44af-9ce8-64f8a90f223f" data-file-name="app/login/page.tsx"> SKOOP. All rights reserved.
        </span></div>
      </footer>
    </div>;
}